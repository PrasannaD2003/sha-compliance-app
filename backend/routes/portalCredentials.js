import express from 'express';
import { authenticate } from '../middleware/auth.js';
import PortalCredential from '../models/PortalCredential.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const credentials = await PortalCredential.find().sort({ createdAt: -1 });
    res.json({ success: true, data: credentials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/license/:clientLicenseId', authenticate, async (req, res) => {
  try {
    const credentials = await PortalCredential.find({ clientLicenseId: req.params.clientLicenseId });
    res.json({ success: true, data: credentials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const credential = await PortalCredential.findById(req.params.id);
    if (!credential) return res.status(404).json({ success: false, error: 'Portal credential not found' });
    res.json({ success: true, data: credential });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const credential = new PortalCredential(req.body);
    await credential.save();
    res.status(201).json({ success: true, data: credential });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const credential = await PortalCredential.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!credential) return res.status(404).json({ success: false, error: 'Portal credential not found' });
    res.json({ success: true, data: credential });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const credential = await PortalCredential.findByIdAndDelete(req.params.id);
    if (!credential) return res.status(404).json({ success: false, error: 'Portal credential not found' });
    res.json({ success: true, message: 'Portal credential deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
