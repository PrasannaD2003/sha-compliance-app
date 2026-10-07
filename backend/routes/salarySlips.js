import express from 'express';
import { authenticate } from '../middleware/auth.js';
import SalarySlip from '../models/SalarySlip.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// GET all salary slips
router.get('/', authenticate, async (req, res) => {
  try {
    const slips = await SalarySlip.find().sort({ createdAt: -1 }).populate('employeeId', 'employeeName employeeCode');
    res.json({ success: true, count: slips.length, data: slips });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET salary slips for specific employee
router.get('/employee/:employeeId', authenticate, async (req, res) => {
  try {
    const slips = await SalarySlip.find({ employeeId: req.params.employeeId }).sort({ createdAt: -1 });
    res.json({ success: true, count: slips.length, data: slips });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single salary slip
router.get('/:id', authenticate, async (req, res) => {
  try {
    const slip = await SalarySlip.findById(req.params.id).populate('employeeId');
    if (!slip) return res.status(404).json({ success: false, error: 'Salary slip not found' });
    res.json({ success: true, data: slip });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create salary slip
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      employeeId,
      month,
      year,
      earnings,
      deductions,
      workingDays,
      presentDays,
      remarks
    } = req.body;

    if (!employeeId || !month || !year) {
      return res.status(400).json({
        success: false,
        error: 'Employee ID, month, and year are required'
      });
    }

    // Get employee details
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }

    const slip = new SalarySlip({
      employeeId,
      employeeCode: employee.employeeCode,
      employeeName: employee.employeeName,
      department: employee.department,
      designation: employee.designation,
      location: employee.location,
      month,
      year,
      earnings: earnings || {},
      deductions: deductions || {},
      workingDays: workingDays || 26,
      presentDays: presentDays || 26,
      remarks,
      status: 'Generated'
    });

    await slip.save();

    res.status(201).json({
      success: true,
      message: 'Salary slip created successfully',
      data: slip
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update salary slip
router.put('/:id', authenticate, async (req, res) => {
  try {
    const slip = await SalarySlip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!slip) return res.status(404).json({ success: false, error: 'Salary slip not found' });
    res.json({
      success: true,
      message: 'Salary slip updated successfully',
      data: slip
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE salary slip
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const slip = await SalarySlip.findByIdAndDelete(req.params.id);
    if (!slip) return res.status(404).json({ success: false, error: 'Salary slip not found' });
    res.json({ success: true, message: 'Salary slip deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
