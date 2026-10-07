import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  proformaId: String,
  clientId: String,
  clientName: String,
  contactPerson: String,
  phone: String,
  email: String,
  gstin: String,
  address: String,
  date: Date,
  dueDate: Date,
  status: { type: String, enum: ['Unpaid', 'Partially Paid', 'Paid'], default: 'Unpaid' },
  items: [{ serviceName: String, description: String, qty: Number, govtFee: Number, consultancyFee: Number, gstRate: Number, total: Number }],
  govtSubtotal: Number,
  consultancySubtotal: Number,
  subtotal: Number,
  discount: Number,
  taxableAmount: Number,
  cgst: Number,
  sgst: Number,
  grandTotal: Number,
  amountInWords: String,
  amountReceived: { type: Number, default: 0 },
  balanceAmount: Number,
  paymentTerms: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Invoice', invoiceSchema);
