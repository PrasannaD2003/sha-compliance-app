import React, { useState, useEffect } from 'react';
import { Plus, Download, Printer, Mail, Share2, Eye, Edit2, Trash2, Users, Calendar, DollarSign, FileText } from 'lucide-react';
import { PayrollFormView } from './PayrollFormView';
import { ProfessionalPayslipView } from './ProfessionalPayslipView';

const EmployeePayrollView = () => {
  // Load html2pdf library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(false);
  const [showSlipDetail, setShowSlipDetail] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [salarySlips, setSalarySlips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [formData, setFormData] = useState({
    employeeCode: '',
    employeeName: '',
    department: '',
    designation: '',
    mobile: '',
    email: '',
    dateOfJoining: '',
    location: '',
    gender: 'Male',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyContactName: '',
    status: 'Active'
  });

  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [showAttendanceDetail, setShowAttendanceDetail] = useState(false);
  const [selectedAttendanceEmployee, setSelectedAttendanceEmployee] = useState(null);
  const [attendanceTab, setAttendanceTab] = useState('daily');

  useEffect(() => {
    fetchEmployees();
    fetchSalarySlips();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data);
        if (result.data.length > 0) setSelectedEmployee(result.data[0]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchSalarySlips = async () => {
    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/salary-slips', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) setSalarySlips(result.data);
    } catch (error) {
      console.error('Error fetching salary slips:', error);
    }
  };

  const handleAddEmployee = async () => {
    if (!formData.employeeCode || !formData.employeeName || !formData.department) {
      alert('Please fill required fields');
      return;
    }

    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        setEmployees([result.data, ...employees]);
        setFormData({
          employeeCode: '', employeeName: '', department: '', designation: '',
          mobile: '', email: '', dateOfJoining: '', location: '', gender: 'Male',
          dateOfBirth: '', address: '', emergencyContact: '', emergencyContactName: '', status: 'Active'
        });
        setShowAddModal(false);
        alert('✅ Employee added!');
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const onLeave = 2;
  const monthlyPayroll = 685000;
  const slipsGenerated = salarySlips.length;
  const filteredEmployees = employees.filter(e =>
    (!filterDept || e.department === filterDept) &&
    (!filterStatus || e.status === filterStatus)
  );
  const selectedEmpSlips = selectedEmployee ? salarySlips.filter(s => s.employeeId === selectedEmployee._id) : [];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f7fa' }}>
      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: '20px', display: 'flex', flexDirection: 'column' }}>
        {/* HEADER */}
        <div style={{ padding: '20px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>Employee & Payroll</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>Manage employees, attendance, leave and payroll</p>
        </div>

        {/* SUMMARY CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', padding: '20px' }}>
          {[
            { label: 'Total Employees', value: employees.length, color: '#007bff', icon: '👥' },
            { label: 'Active Employees', value: activeEmployees, color: '#28a745', icon: '✓' },
            { label: 'On Leave', value: onLeave, color: '#ffc107', icon: '📅' },
            { label: 'This Month Payroll', value: `₹${(monthlyPayroll/100000).toFixed(1)}L`, color: '#dc3545', icon: '💰' },
            { label: 'Salary Slips Generated', value: slipsGenerated, color: '#9333ea', icon: '📄' }
          ].map((card, i) => (
            <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>{card.label}</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ padding: '20px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '20px' }}>
          {['Employees', 'Attendance', 'Leave Management', 'Generate Payroll', 'Reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 0',
                color: activeTab === tab.toLowerCase().replace(' ', '-') ? '#2563eb' : '#64748b',
                fontWeight: activeTab === tab.toLowerCase().replace(' ', '-') ? '600' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                borderBottom: activeTab === tab.toLowerCase().replace(' ', '-') ? '2px solid #2563eb' : 'none'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* EMPLOYEES TAB CONTENT */}
        {activeTab === 'employees' && (
          <div style={{ padding: '20px' }}>
            {/* EMPLOYEE LIST HEADER */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#0f172a' }}>All Employees ({filteredEmployees.length})</h3>
              <button
                onClick={() => setShowAddModal(true)}
                style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '0.9rem' }}
              >
                <Plus size={16} /> Add Employee
              </button>
            </div>

            {/* FILTERS */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
              <input type="text" placeholder="Search employee..." style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' }} />
              <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' }}>
                <option value="">All Departments</option>
                <option value="License Compliance">License Compliance</option>
                <option value="Documentation">Documentation</option>
                <option value="Operations">Operations</option>
                <option value="Compliance">Compliance</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' }}>
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' }}>
                <option>All Locations</option>
                <option>Chennai</option>
              </select>
            </div>

            {/* EMPLOYEE TABLE */}
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e2e8f0' }}>
                    {['S.No', 'Code', 'Name', 'Department', 'Designation', 'Mobile', 'Email', 'DOJ', 'Location', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b', fontSize: '0.85rem' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.slice(0, 10).map((emp, idx) => (
                    <tr key={emp._id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                      <td style={{ padding: '12px' }}>{idx + 1}</td>
                      <td style={{ padding: '12px', fontWeight: '600', color: '#0f172a' }}>{emp.employeeCode}</td>
                      <td style={{ padding: '12px', color: '#0f172a' }}>{emp.employeeName}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.department}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.designation}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.mobile}</td>
                      <td style={{ padding: '12px', color: '#2563eb', fontSize: '0.85rem' }}>{emp.email}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '0.85rem' }}>{new Date(emp.dateOfJoining).toLocaleDateString()}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.location}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ display: 'inline-block', padding: '4px 8px', background: emp.status === 'Active' ? '#d4edda' : '#f8d7da', color: emp.status === 'Active' ? '#155724' : '#721c24', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                          {emp.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button onClick={() => { setSelectedEmployee(emp); setShowEmployeeProfile(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#2563eb' }} title="View"><Eye size={16} /></button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#7c3aed', marginLeft: '8px' }} title="Edit"><Edit2 size={16} /></button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#dc2626', marginLeft: '8px' }} title="Delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BOTTOM SECTION - 3 CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
              {/* RECENT EMPLOYEES */}
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>Recent Employees</h4>
                {employees.slice(0, 5).map(emp => (
                  <div key={emp._id} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#64748b', fontSize: '0.85rem' }}>
                      {emp.employeeName.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>{emp.employeeName}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{emp.designation}</p>
                    </div>
                  </div>
                ))}
                <button style={{ width: '100%', marginTop: '10px', padding: '6px', background: 'none', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                  View All
                </button>
              </div>

              {/* UPCOMING BIRTHDAYS */}
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>Upcoming Birthdays</h4>
                {[
                  { name: 'Priya', date: '15 Oct 2026', days: 13 },
                  { name: 'Vivek', date: '20 Oct 2026', days: 18 },
                  { name: 'Arun Kumar', date: '05 Nov 2026', days: 34 },
                  { name: 'Ramesh', date: '12 Nov 2026', days: 41 }
                ].map(bd => (
                  <div key={bd.name} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>{bd.name}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{bd.date}</p>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#ffc107', fontWeight: '600' }}>{bd.days}d</span>
                  </div>
                ))}
              </div>

              {/* PAYROLL STATUS */}
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>Payroll Status – September 2026</h4>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <svg viewBox="0 0 120 120" style={{ width: '100px', height: '100px' }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#d1e7f0" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#28a745" strokeWidth="8" strokeDasharray="88.36 314.16" strokeDashoffset="0" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#ffc107" strokeWidth="8" strokeDasharray="26.51 314.16" strokeDashoffset="-88.36" />
                    <text x="60" y="65" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">25</text>
                    <text x="60" y="80" textAnchor="middle" fontSize="10" fill="#64748b">Employees</text>
                  </svg>
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  <p style={{ margin: '4px 0', color: '#28a745' }}>● Paid: 20</p>
                  <p style={{ margin: '4px 0', color: '#ffc107' }}>● Pending: 3</p>
                  <p style={{ margin: '4px 0', color: '#0066cc' }}>● Processing: 1</p>
                  <p style={{ margin: '4px 0', color: '#dc2626' }}>● Not Generated: 1</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* GENERATE PAYROLL TAB */}
        {activeTab === 'generate-payroll' && (
          <PayrollFormView />
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div style={{ padding: '20px' }}>
            {/* Attendance Header with Filters */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '5px' }}>Attendance Date</label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '5px' }}>Department</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                    <option>All Departments</option>
                    <option>License Compliance</option>
                    <option>Operations</option>
                    <option>HR</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '5px' }}>Shift</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                    <option>All Shifts</option>
                    <option>09:30 AM - 06:30 PM</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                  <button style={{ flex: 1, padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Search</button>
                </div>
              </div>

              {/* Summary Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#0066cc', fontWeight: '600' }}>Total Employees</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>25</p>
                </div>
                <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>Present Today</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>21</p>
                </div>
                <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#dc2626', fontWeight: '600' }}>Absent Today</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>2</p>
                </div>
                <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#b45309', fontWeight: '600' }}>On Leave</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>2</p>
                </div>
                <div style={{ background: '#f3e8ff', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#a855f7', fontWeight: '600' }}>Late Arrivals</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '1.3rem', fontWeight: '700', color: '#0f172a' }}>3</p>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button
                onClick={() => {
                  const newRecords = {};
                  employees.forEach(emp => {
                    newRecords[emp._id] = 'Present';
                  });
                  setAttendanceRecords(newRecords);
                }}
                style={{ padding: '8px 16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
              >
                Mark All Present
              </button>
              <button
                onClick={() => {
                  const newRecords = {};
                  employees.forEach(emp => {
                    newRecords[emp._id] = 'Absent';
                  });
                  setAttendanceRecords(newRecords);
                }}
                style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
              >
                Mark All Absent
              </button>
              <button style={{ padding: '8px 16px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                Bulk Update
              </button>
              <button style={{ padding: '8px 16px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', marginLeft: 'auto' }}>
                Export Excel
              </button>
            </div>

            {/* Attendance Table */}
            <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>S.No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Employee Code</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Employee Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Department</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Designation</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Shift</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Check In</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Check Out</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Working Hours</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(0, 8).map((emp, idx) => (
                    <tr key={emp._id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                      <td style={{ padding: '12px' }}>{idx + 1}</td>
                      <td style={{ padding: '12px', fontWeight: '600', color: '#0f172a' }}>{emp.employeeCode}</td>
                      <td style={{ padding: '12px', color: '#0f172a' }}>{emp.employeeName}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.department}</td>
                      <td style={{ padding: '12px', color: '#64748b' }}>{emp.designation}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '0.8rem' }}>09:30 AM - 06:30 PM</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>09:24 AM</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>06:35 PM</td>
                      <td style={{ padding: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>9h 11m</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <select
                          value={attendanceRecords[emp._id] || 'Select'}
                          onChange={(e) => setAttendanceRecords({...attendanceRecords, [emp._id]: e.target.value})}
                          style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: attendanceRecords[emp._id] === 'Present' ? '#d4edda' : attendanceRecords[emp._id] === 'Absent' ? '#f8d7da' : attendanceRecords[emp._id] === 'Late' ? '#fff3cd' : '#fff' }}
                        >
                          <option value="Select">Select</option>
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button
                          onClick={() => {
                            setSelectedAttendanceEmployee(emp);
                            setShowAttendanceDetail(true);
                          }}
                          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {activeTab !== 'employees' && activeTab !== 'attendance' && activeTab !== 'generate-payroll' && (
          <div style={{ padding: '20px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '8px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0 }}>{activeTab.split('-').join(' ').toUpperCase()} - Coming Soon</p>
            </div>
          </div>
        )}
      </div>

      {/* ADD EMPLOYEE MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '700px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '1.3rem', fontWeight: '600', color: '#0f172a' }}>Add New Employee</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Employee Code *</label>
                <input type="text" placeholder="EMP-001" value={formData.employeeCode} onChange={(e) => setFormData({...formData, employeeCode: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Employee Name *</label>
                <input type="text" placeholder="Arun Kumar" value={formData.employeeName} onChange={(e) => setFormData({...formData, employeeName: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Department *</label>
                <input type="text" placeholder="License Compliance" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Designation *</label>
                <input type="text" placeholder="Compliance Executive" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Mobile</label>
                <input type="tel" placeholder="9876543210" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Email</label>
                <input type="email" placeholder="arun@shasgroup.in" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Date of Joining</label>
                <input type="date" value={formData.dateOfJoining} onChange={(e) => setFormData({...formData, dateOfJoining: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Location</label>
                <input type="text" placeholder="Chennai" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '10px 20px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Cancel</button>
              <button onClick={handleAddEmployee} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Save Employee</button>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE PROFILE MODAL */}
      {showEmployeeProfile && selectedEmployee && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>{selectedEmployee.employeeName}</h2>
              <button onClick={() => setShowEmployeeProfile(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem' }}>
              <div><strong>Employee Code:</strong> {selectedEmployee.employeeCode}</div>
              <div><strong>Department:</strong> {selectedEmployee.department}</div>
              <div><strong>Designation:</strong> {selectedEmployee.designation}</div>
              <div><strong>Location:</strong> {selectedEmployee.location}</div>
              <div><strong>Mobile:</strong> {selectedEmployee.mobile}</div>
              <div><strong>Email:</strong> {selectedEmployee.email}</div>
              <div><strong>Date of Joining:</strong> {new Date(selectedEmployee.dateOfJoining).toLocaleDateString()}</div>
              <div><strong>Status:</strong> {selectedEmployee.status}</div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => setShowEmployeeProfile(false)} style={{ width: '100%', padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* SALARY SLIP DETAIL MODAL */}
      {showSlipDetail && selectedSlip && (
        <ProfessionalPayslipView
          slip={selectedSlip}
          onClose={() => setShowSlipDetail(false)}
        />
      )}

      {/* OLD MODAL - REPLACED */}
      {false && showSlipDetail && selectedSlip && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '900px', width: '95%', maxHeight: '95vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Salary Slip - {selectedSlip.month} {selectedSlip.year}</h2>
              <button onClick={() => setShowSlipDetail(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Left Column - View */}
              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Payslip Details</h3>

                {/* Employee Summary */}
                <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '12px', backgroundColor: '#f9f9f9', fontSize: '0.8rem' }}>
                  <p style={{ margin: 0, fontWeight: '700', marginBottom: '8px' }}>EMPLOYEE PAY SUMMARY</p>
                  <div style={{ display: 'grid', gap: '4px' }}>
                    <div><span style={{ fontWeight: '600' }}>Name:</span> {selectedSlip.employeeName}</div>
                    <div><span style={{ fontWeight: '600' }}>Code:</span> {selectedSlip.employeeCode}</div>
                    <div><span style={{ fontWeight: '600' }}>Designation:</span> {selectedSlip.designation}</div>
                    <div><span style={{ fontWeight: '600' }}>Department:</span> {selectedSlip.department}</div>
                    <div><span style={{ fontWeight: '600' }}>Pay Period:</span> {selectedSlip.month} {selectedSlip.year}</div>
                  </div>
                </div>

                {/* Earnings & Deductions Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', border: '1px solid #ccc', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                      <th style={{ padding: '6px 4px', textAlign: 'left', fontWeight: '700', border: '1px solid #ccc' }}>EARNINGS</th>
                      <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: '700', border: '1px solid #ccc' }}>AMOUNT</th>
                      <th style={{ padding: '6px 4px', textAlign: 'left', fontWeight: '700', border: '1px solid #ccc' }}>DEDUCTIONS</th>
                      <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: '700', border: '1px solid #ccc' }}>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}>Basic</td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.earnings.basic.toLocaleString()}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}>Professional Tax</td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.deductions.professionalTax.toLocaleString()}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}>House Rent</td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.earnings.houseRent.toLocaleString()}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}>EPF</td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.deductions.epf.toLocaleString()}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}>Allowances</td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{(selectedSlip.earnings.conveyance + selectedSlip.earnings.medicalAllowance + selectedSlip.earnings.specialAllowance).toLocaleString()}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #ccc' }}></td>
                      <td style={{ padding: '5px 4px', textAlign: 'right', border: '1px solid #ccc' }}></td>
                    </tr>
                    <tr style={{ background: '#f0f0f0', fontWeight: '700', border: '1px solid #ccc' }}>
                      <td style={{ padding: '6px 4px', border: '1px solid #ccc' }}>Gross Earnings</td>
                      <td style={{ padding: '6px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.totalEarnings.toLocaleString()}</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #ccc', fontWeight: '700' }}>Total Deductions</td>
                      <td style={{ padding: '6px 4px', textAlign: 'right', border: '1px solid #ccc' }}>₹{selectedSlip.totalDeductions.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Net Pay */}
                <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f0fdf4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.85rem' }}>
                    <span>Net Payable:</span>
                    <span>₹{selectedSlip.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Edit Form */}
              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', fontWeight: '600' }}>Edit Amounts</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Basic</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.earnings.basic} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>House Rent</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.earnings.houseRent} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Conveyance</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.earnings.conveyance} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Medical Allowance</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.earnings.medicalAllowance} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Special Allowance</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.earnings.specialAllowance} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                </div>

                <hr style={{ margin: '15px 0' }} />

                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: '600' }}>Deductions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Professional Tax</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.deductions.professionalTax} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>EPF</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.deductions.epf} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>TDS</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.deductions.tds} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>ESI</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem' }}>₹</span>
                      <input type="number" defaultValue={selectedSlip.deductions.esi} style={{ flex: 1, padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setShowSlipDetail(false)} style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Save Changes</button>
                  <button onClick={() => setShowSlipDetail(false)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATTENDANCE DETAILS MODAL - PROFESSIONAL DESIGN */}
      {showAttendanceDetail && selectedAttendanceEmployee && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '40px 20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: 'calc(70vw)', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
            {/* HEADER */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff' }}>
              <h2 style={{ margin: 0, fontSize: '21px', fontWeight: '700', color: '#0f172a' }}>Attendance Details – {selectedAttendanceEmployee.employeeName} ({selectedAttendanceEmployee.employeeCode})</h2>
              <button onClick={() => setShowAttendanceDetail(false)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#64748b', padding: '0', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>

            {/* Employee Info Section */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', alignItems: 'start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: '700' }}>
                {selectedAttendanceEmployee.employeeName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>{selectedAttendanceEmployee.employeeName}</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#64748b' }}>{selectedAttendanceEmployee.employeeCode} • {selectedAttendanceEmployee.designation} • {selectedAttendanceEmployee.department} • {selectedAttendanceEmployee.location}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                  <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#0066cc', fontWeight: '600' }}>Date of Joining</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>{new Date(selectedAttendanceEmployee.dateOfJoining).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#0066cc', fontWeight: '600' }}>Shift</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a' }}>09:30 AM – 06:30 PM</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#64748b' }}>General Shift</p>
                  </div>
                  <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#0066cc', fontWeight: '600' }}>Reporting Manager</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>Suresh Kumar</p>
                  </div>
                  <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#0066cc', fontWeight: '600' }}>Employment Type</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>Full Time</p>
                  </div>
                  <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#16a34a', fontWeight: '600' }}>Status</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '600', color: '#16a34a' }}>Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 24px' }}>
              {['daily', 'monthly', 'leave', 'overtime', 'reports', 'activity'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setAttendanceTab(tab)}
                  style={{
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: attendanceTab === tab ? '3px solid #2563eb' : 'none',
                    color: attendanceTab === tab ? '#2563eb' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: attendanceTab === tab ? '600' : '500',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab === 'daily' ? 'Daily Attendance' : tab === 'monthly' ? 'Monthly Summary' : tab === 'leave' ? 'Leave History' : tab === 'overtime' ? 'Overtime' : tab === 'reports' ? 'Attendance Reports' : 'Activity Log'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: '24px' }}>
              {attendanceTab === 'daily' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>Attendance for 02 October 2026</h4>
                    <button style={{ padding: '6px 12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>✏️ Edit Attendance</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Date</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>02 October 2026</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Shift</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', fontWeight: '600', color: '#0f172a' }}>09:30 AM - 06:30 PM</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Check In</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>09:24 AM</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Check Out</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>06:38 PM</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Working Hours</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>9h 14m</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Status</p>
                      <p style={{ margin: '4px 0 0 0', padding: '4px 8px', background: '#d4edda', color: '#155724', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600', display: 'inline-block' }}>Present</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Break Duration</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>01:00</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Late Minutes</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>0 min</p>
                    </div>
                    <div style={{ background: '#f9f9f9', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Overtime</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>44 min</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', padding: '12px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Remarks</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#0f172a' }}>-</p>
                  </div>
                </div>
              )}

              {attendanceTab === 'monthly' && (
                <div>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: '0.95rem', fontWeight: '600', color: '#0f172a' }}>Monthly Attendance Summary – October 2026</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#0066cc', fontWeight: '600' }}>Working Days</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>26</p>
                    </div>
                    <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#16a34a', fontWeight: '600' }}>Present</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>22</p>
                    </div>
                    <div style={{ background: '#fef2f2', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#dc2626', fontWeight: '600' }}>Absent</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>1</p>
                    </div>
                    <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#b45309', fontWeight: '600' }}>Leave</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>2</p>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '12px' }}>
                    <div style={{ background: '#f3e8ff', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#a855f7', fontWeight: '600' }}>Half Day</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>1</p>
                    </div>
                    <div style={{ background: '#fff3cd', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#856404', fontWeight: '600' }}>Late</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>2</p>
                    </div>
                    <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#0369a1', fontWeight: '600' }}>Overtime</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>6h 20m</p>
                    </div>
                    <div style={{ background: '#dcfce7', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#15803d', fontWeight: '600' }}>Attendance %</p>
                      <p style={{ margin: '8px 0 0 0', fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>88.5%</p>
                    </div>
                  </div>
                </div>
              )}

              {attendanceTab !== 'daily' && attendanceTab !== 'monthly' && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                  <p style={{ margin: 0 }}>{attendanceTab.toUpperCase()} - Coming Soon</p>
                </div>
              )}
            </div>

            {/* Remarks Section */}
            <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0', background: '#f9f9f9' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>Remarks / Notes</label>
              <textarea
                placeholder="Add internal remarks about attendance..."
                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box', minHeight: '80px', fontFamily: 'inherit' }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAttendanceDetail(false)} style={{ padding: '10px 20px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Cancel</button>
              <button style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePayrollView;
