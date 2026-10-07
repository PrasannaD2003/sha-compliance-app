import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  clientLicenseId: String,
  name: String,
  description: String,
  mandatory: { type: Boolean, default: false },
  status: { type: String, enum: ['Submitted', 'Pending from Client', 'Requested', 'Under Review', 'Approved', 'Not Started'], default: 'Not Started' },
  fileName: String,
  fileSize: String,
  uploadDate: Date,
  remarks: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Document', documentSchema);
