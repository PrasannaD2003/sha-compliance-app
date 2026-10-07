import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  invoiceNo: String,
  invoiceId: String,
  clientName: String,
  clientId: String,
  date: Date,
  amount: Number,
  method: { type: String, enum: ['UPI', 'Bank Transfer', 'Cheque', 'Cash'], default: 'UPI' },
  refNo: String,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
