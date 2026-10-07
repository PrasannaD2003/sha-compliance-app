import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  quotationNo: {
    type: String,
    required: true,
    unique: true
  },
  clientId: String,
  clientName: String,
  contactPerson: String,
  phone: String,
  email: String,
  gstin: String,
  address: String,
  date: Date,
  validUntil: Date,
  status: { type: String, enum: ['Draft', 'Sent', 'Accepted', 'Rejected'], default: 'Draft' },
  items: [{
    id: mongoose.Schema.Types.Mixed,
    serviceName: String,
    description: String,
    qty: Number,
    govtFee: Number,
    consultancyFee: Number,
    gstRate: Number,
    total: Number
  }],
  govtSubtotal: Number,
  consultancySubtotal: Number,
  subtotal: Number,
  discount: Number,
  taxableAmount: Number,
  cgst: Number,
  sgst: Number,
  grandTotal: Number,
  amountInWords: String,
  paymentTerms: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quotation', quotationSchema);
