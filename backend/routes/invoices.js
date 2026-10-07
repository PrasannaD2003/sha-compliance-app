import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Invoice from '../models/Invoice.js';
import Payment from '../models/Payment.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    res.json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    res.json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Record payment
router.post('/:id/payments', authenticate, async (req, res) => {
  try {
    const payment = new Payment({ invoiceId: req.params.id, ...req.body });
    await payment.save();

    const invoice = await Invoice.findById(req.params.id);
    invoice.amountReceived = (invoice.amountReceived || 0) + req.body.amount;
    invoice.balanceAmount = invoice.grandTotal - invoice.amountReceived;
    invoice.status = invoice.balanceAmount <= 0 ? 'Paid' : 'Partially Paid';
    await invoice.save();

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
