import express from 'express';
import { authenticate } from '../middleware/auth.js';
import ProformaInvoice from '../models/ProformaInvoice.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const proformas = await ProformaInvoice.find().sort({ createdAt: -1 });
    res.json({ success: true, data: proformas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const proforma = await ProformaInvoice.findById(req.params.id);
    if (!proforma) return res.status(404).json({ success: false, error: 'Proforma invoice not found' });
    res.json({ success: true, data: proforma });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const proforma = new ProformaInvoice(req.body);
    await proforma.save();
    res.status(201).json({ success: true, data: proforma });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const proforma = await ProformaInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proforma) return res.status(404).json({ success: false, error: 'Proforma invoice not found' });
    res.json({ success: true, data: proforma });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const proforma = await ProformaInvoice.findByIdAndDelete(req.params.id);
    if (!proforma) return res.status(404).json({ success: false, error: 'Proforma invoice not found' });
    res.json({ success: true, message: 'Proforma invoice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
