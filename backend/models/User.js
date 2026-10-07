import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['CEO', 'Manager', 'Staff'],
    default: 'Staff'
  },
  avatar: {
    type: String,
    default: null
  },
  department: {
    type: String,
    enum: ['Management', 'Operations', 'Compliance', 'Finance', 'Support'],
    default: 'Operations'
  },
  phone: String,
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  },
  permissions: {
    canViewReports: { type: Boolean, default: true },
    canEditDocuments: { type: Boolean, default: true },
    canApprove: { type: Boolean, default: false },
    canManageUsers: { type: Boolean, default: false },
    canExport: { type: Boolean, default: true },
    canCustomize: { type: Boolean, default: false }
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
