import express from 'express';
import { authenticate } from '../middleware/auth.js';
import License from '../models/License.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const licenses = await License.find().sort({ createdAt: -1 });
    res.json({ success: true, data: licenses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/client/:clientId', authenticate, async (req, res) => {
  try {
    const licenses = await License.find({ clientId: req.params.clientId });
    res.json({ success: true, data: licenses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) return res.status(404).json({ success: false, error: 'License not found' });
    res.json({ success: true, data: license });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const license = new License(req.body);
    await license.save();
    res.status(201).json({ success: true, data: license });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const license = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!license) return res.status(404).json({ success: false, error: 'License not found' });
    res.json({ success: true, data: license });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const license = await License.findByIdAndDelete(req.params.id);
    if (!license) return res.status(404).json({ success: false, error: 'License not found' });
    res.json({ success: true, message: 'License deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
