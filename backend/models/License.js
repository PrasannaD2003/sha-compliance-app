import mongoose from 'mongoose';

const licenseSchema = new mongoose.Schema({
  clientId: String,
  licenseMasterId: String,
  licenseName: String,
  description: String,
  status: { type: String, enum: ['Document Collection', 'Application Submitted', 'Under Review', 'Approved', 'Rejected', 'Expired'], default: 'Document Collection' },
  stage: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  applicationDate: Date,
  expectedSubmission: Date,
  targetApprovalDate: Date,
  renewalDate: Date,
  responsiblePerson: String,
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
  govtFee: Number,
  consultancyFee: Number,
  governingAuthority: String,
  validity: String,
  timeline: String,
  documents: [{
    id: mongoose.Schema.Types.Mixed,
    name: String,
    description: String,
    mandatory: Boolean,
    status: { type: String, enum: ['Submitted', 'Pending from Client', 'Requested', 'Under Review', 'Approved', 'Not Started'], default: 'Not Started' },
    fileName: String,
    remarks: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('License', licenseSchema);
