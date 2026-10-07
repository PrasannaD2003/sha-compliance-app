import express from 'express';
import { authenticate } from '../middleware/auth.js';
import licenseUpload from '../middleware/licenseUpload.js';
import Branch from '../models/Branch.js';
import Client from '../models/Client.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET all branches for a client
router.get('/client/:clientId', authenticate, async (req, res) => {
  try {
    const branches = await Branch.find({ clientId: req.params.clientId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: branches.length,
      data: branches
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single branch
router.get('/:id', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    res.json({ success: true, data: branch });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create branch
router.post('/', authenticate, async (req, res) => {
  try {
    const { clientId, branchCode, branchName, location, address, contactPerson, phone, email } = req.body;

    if (!clientId || !branchCode || !branchName || !location) {
      return res.status(400).json({
        success: false,
        error: 'Client ID, branch code, branch name, and location are required'
      });
    }

    // Check if client exists
    const clientExists = await Client.findById(clientId);
    if (!clientExists) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    // Check if branch code already exists
    const existingBranch = await Branch.findOne({ branchCode });
    if (existingBranch) {
      return res.status(400).json({ success: false, error: 'Branch code already exists' });
    }

    const branch = new Branch({
      clientId,
      branchCode,
      branchName,
      location,
      address,
      contactPerson,
      phone,
      email,
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await branch.save();

    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      data: branch
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update branch
router.put('/:id', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    res.json({
      success: true,
      message: 'Branch updated successfully',
      data: branch
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE branch
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });
    res.json({
      success: true,
      message: 'Branch deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST upload document to branch (stored as base64 in MongoDB + file on disk)
router.post('/:branchId/upload', authenticate, licenseUpload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const branch = await Branch.findById(req.params.branchId);
    if (!branch) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, error: 'Branch not found' });
    }

    // Read file and convert to base64
    const fileData = fs.readFileSync(req.file.path);
    const base64Data = fileData.toString('base64');

    const documentInfo = {
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
      fileData: base64Data,
      uploadedAt: new Date(),
      uploadedBy: req.user?.email || 'System'
    };

    branch.documents.push(documentInfo);
    await branch.save();

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: documentInfo
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET view document (return base64 for preview)
router.get('/:branchId/documents/:docIndex/view', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });

    const doc = branch.documents[req.params.docIndex];
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });
    if (!doc.fileData) return res.status(400).json({ success: false, error: 'No file data found' });

    res.json({
      success: true,
      data: {
        fileName: doc.fileName,
        fileType: doc.fileType,
        fileData: doc.fileData,
        fileSize: doc.fileSize
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET download document (decode from base64)
router.get('/:branchId/documents/:docIndex/download', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });

    const doc = branch.documents[req.params.docIndex];
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });
    if (!doc.fileData) return res.status(400).json({ success: false, error: 'No file data found' });

    // Decode base64 to buffer
    const buffer = Buffer.from(doc.fileData, 'base64');

    // Set headers for download
    res.setHeader('Content-Type', doc.fileType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
    res.setHeader('Content-Length', buffer.length);

    // Send file
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET all documents for a branch
router.get('/:branchId/documents', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });

    res.json({
      success: true,
      count: branch.documents.length,
      data: branch.documents
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE document from branch
router.delete('/:branchId/documents/:docIndex', authenticate, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    if (!branch) return res.status(404).json({ success: false, error: 'Branch not found' });

    const doc = branch.documents[req.params.docIndex];
    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

    // Delete file from server
    if (fs.existsSync(doc.filePath)) {
      fs.unlinkSync(doc.filePath);
    }

    // Remove from array
    branch.documents.splice(req.params.docIndex, 1);
    await branch.save();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
