import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Client from '../models/Client.js';

const router = express.Router();

// GET all clients
router.get('/', authenticate, async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single client
router.get('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create client
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, email, phone, contactPerson, address, gstin } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }

    const client = new Client({
      name,
      email,
      phone,
      contactPerson,
      address,
      gstin,
      status: 'Active',
      outstanding: 0,
      activeLicenses: 0,
      pendingDocuments: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await client.save();
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update client
router.put('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE client
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
