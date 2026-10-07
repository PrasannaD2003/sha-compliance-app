import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// GET all employees
router.get('/', authenticate, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single employee
router.get('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create employee
router.post('/', authenticate, async (req, res) => {
  try {
    const { employeeCode, employeeName, department, designation, mobile, email, dateOfJoining, location, gender, dateOfBirth, address, emergencyContact, emergencyContactName, status } = req.body;

    if (!employeeCode || !employeeName || !department || !designation || !dateOfJoining) {
      return res.status(400).json({
        success: false,
        error: 'Employee code, name, department, designation, and date of joining are required'
      });
    }

    // Check if employee code already exists
    const existingEmployee = await Employee.findOne({ employeeCode });
    if (existingEmployee) {
      return res.status(400).json({ success: false, error: 'Employee code already exists' });
    }

    const employee = new Employee({
      employeeCode,
      employeeName,
      department,
      designation,
      mobile,
      email,
      dateOfJoining,
      location,
      gender,
      dateOfBirth,
      address,
      emergencyContact,
      emergencyContactName,
      status: status || 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await employee.save();

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update employee
router.put('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE employee
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
