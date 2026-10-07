import mongoose from 'mongoose';

const salarySlipSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee ID is required']
  },
  employeeCode: String,
  employeeName: String,
  department: String,
  designation: String,
  location: String,
  month: {
    type: String,
    required: [true, 'Month is required'] // Format: "September 2026"
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },

  // Earnings
  earnings: {
    basic: { type: Number, default: 0 },
    dearness: { type: Number, default: 0 },
    houseRent: { type: Number, default: 0 },
    conveyance: { type: Number, default: 0 },
    medicalAllowance: { type: Number, default: 0 },
    specialAllowance: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  // Deductions
  deductions: {
    professionalTax: { type: Number, default: 0 },
    tds: { type: Number, default: 0 },
    epf: { type: Number, default: 0 },
    esi: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  // Totals
  totalEarnings: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },

  // Status
  status: {
    type: String,
    enum: ['Draft', 'Generated', 'Approved', 'Paid'],
    default: 'Generated'
  },

  // Additional info
  workingDays: { type: Number, default: 26 },
  presentDays: { type: Number, default: 26 },
  remarks: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

salarySlipSchema.pre('save', function(next) {
  // Calculate totals
  this.totalEarnings = Object.values(this.earnings).reduce((a, b) => a + b, 0);
  this.totalDeductions = Object.values(this.deductions).reduce((a, b) => a + b, 0);
  this.netSalary = this.totalEarnings - this.totalDeductions;
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('SalarySlip', salarySlipSchema);
