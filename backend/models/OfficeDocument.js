import mongoose from 'mongoose';

const officeDocSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Tax Documents', 'Legal Documents', 'Agreements', 'Licenses', 'Insurance', 'Bank Documents', 'Other'], default: 'Other' },
  fileName: String,
  fileSize: String,
  fileType: String,
  fileData: { type: String }, // base64 encoded file data
  uploadDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, enum: ['Active', 'Archived'], default: 'Active' },
  uploadedBy: { type: String, default: 'admin' },
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('OfficeDocument', officeDocSchema);
