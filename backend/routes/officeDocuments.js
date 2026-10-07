import express from 'express';
import { authenticate } from '../middleware/auth.js';
import officeUpload from '../middleware/officeUpload.js';
import OfficeDocument from '../models/OfficeDocument.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const documents = await OfficeDocument.find().sort({ createdAt: -1 });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/category/:category', authenticate, async (req, res) => {
  try {
    const documents = await OfficeDocument.find({ category: req.params.category });
    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const document = await OfficeDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, error: 'Office document not found' });
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// View document (return base64 for preview)
router.get('/:id/view', authenticate, async (req, res) => {
  try {
    const document = await OfficeDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, error: 'Office document not found' });
    if (!document.fileData) return res.status(400).json({ success: false, error: 'No file data found' });

    res.json({
      success: true,
      data: {
        fileName: document.fileName,
        fileType: document.fileType,
        fileData: document.fileData,
        fileSize: document.fileSize
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download document file (decode from base64)
router.get('/:id/download', authenticate, async (req, res) => {
  try {
    const document = await OfficeDocument.findById(req.params.id);
    if (!document) return res.status(404).json({ success: false, error: 'Office document not found' });
    if (!document.fileData) return res.status(400).json({ success: false, error: 'No file data found' });

    // Decode base64 to buffer
    const buffer = Buffer.from(document.fileData, 'base64');

    // Set headers for download
    res.setHeader('Content-Type', document.fileType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}"`);
    res.setHeader('Content-Length', buffer.length);

    // Send file
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload document with file (stored as base64 in MongoDB + file on disk)
router.post('/upload', authenticate, officeUpload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Read file and convert to base64
    const fileData = fs.readFileSync(req.file.path);
    const base64Data = fileData.toString('base64');

    const document = new OfficeDocument({
      name: req.body.name,
      category: req.body.category,
      uploadDate: req.body.uploadDate || new Date().toISOString().split('T')[0],
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: (req.file.size / (1024 * 1024)).toFixed(2) + ' MB',
      fileType: req.file.mimetype,
      fileData: base64Data,
      status: 'Active',
      uploadedBy: req.user?.email || 'admin'
    });

    await document.save();

    res.status(201).json({ success: true, data: document, message: 'Document uploaded successfully' });
  } catch (error) {
    // Clean up uploaded file if save fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create document without file
router.post('/', authenticate, async (req, res) => {
  try {
    const document = new OfficeDocument(req.body);
    await document.save();
    res.status(201).json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const document = await OfficeDocument.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) return res.status(404).json({ success: false, error: 'Office document not found' });
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const document = await OfficeDocument.findByIdAndDelete(req.params.id);
    if (!document) return res.status(404).json({ success: false, error: 'Office document not found' });
    res.json({ success: true, message: 'Office document deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
