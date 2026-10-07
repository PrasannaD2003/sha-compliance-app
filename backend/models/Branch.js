import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client ID is required']
  },
  branchCode: {
    type: String,
    required: [true, 'Branch code is required'],
    unique: true,
    trim: true
  },
  branchName: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true,
    maxlength: [100, 'Branch name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  totalLicenses: {
    type: Number,
    default: 0
  },
  completedLicenses: {
    type: Number,
    default: 0
  },
  inProgressLicenses: {
    type: Number,
    default: 0
  },
  notStartedLicenses: {
    type: Number,
    default: 0
  },
  pendingDocuments: {
    type: Number,
    default: 0
  },
  documents: [{
    fileName: String,
    fileType: String,
    fileSize: Number,
    filePath: String,
    fileData: String,
    uploadedAt: { type: Date, default: Date.now },
    uploadedBy: String
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

branchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Branch', branchSchema);
