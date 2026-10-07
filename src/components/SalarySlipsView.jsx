import React, { useState, useEffect } from 'react';
import { Plus, Download, Eye, Trash2, X } from 'lucide-react';

const SalarySlipsView = ({ mode = 'list' }) => {
  const [slips, setSlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(mode === 'generate');
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    month: new Date().toLocaleString('default', { month: 'long' }),
    year: new Date().getFullYear(),
    earnings: {
      basic: 0,
      dearness: 0,
      houseRent: 0,
      conveyance: 0,
      medicalAllowance: 0,
      specialAllowance: 0,
      other: 0
    },
    deductions: {
      professionalTax: 0,
      tds: 0,
      epf: 0,
      esi: 0,
      other: 0
    },
    workingDays: 26,
    presentDays: 26,
    remarks: ''
  });

  useEffect(() => {
    fetchSlips();
    fetchEmployees();
  }, []);

  const fetchSlips = async () => {
    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/salary-slips', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) setSlips(result.data);
    } catch (error) {
      console.error('Error fetching salary slips:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) setEmployees(result.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleGenerateSlip = async () => {
    if (!formData.employeeId) {
      alert('Please select an employee');
      return;
    }

    try {
      const token = localStorage.getItem('authToken') || 'demo-token-employees';
      const response = await fetch('http://localhost:5000/api/salary-slips', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSlips([result.data, ...slips]);
        setFormData({
          employeeId: '',
          month: new Date().toLocaleString('default', { month: 'long' }),
          year: new Date().getFullYear(),
          earnings: { basic: 0, dearness: 0, houseRent: 0, conveyance: 0, medicalAllowance: 0, specialAllowance: 0, other: 0 },
          deductions: { professionalTax: 0, tds: 0, epf: 0, esi: 0, other: 0 },
          workingDays: 26,
          presentDays: 26,
          remarks: ''
        });
        setShowAddModal(false);
        alert('✅ Salary slip generated successfully!');
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  const handleDeleteSlip = async (id) => {
    if (window.confirm('Delete this salary slip?')) {
      try {
        const token = localStorage.getItem('authToken') || 'demo-token-employees';
        const response = await fetch(`http://localhost:5000/api/salary-slips/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success) {
          setSlips(slips.filter(s => s._id !== id));
          alert('✅ Deleted successfully!');
        }
      } catch (error) {
        alert(`❌ Error: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: parseFloat(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getSelectedEmployee = () => {
    return employees.find(e => e._id === formData.employeeId);
  };

  const totalEarnings = Object.values(formData.earnings).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(formData.deductions).reduce((a, b) => a + b, 0);
  const netSalary = totalEarnings - totalDeductions;

  return (
    <div style={{ padding: '20px', background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>Salary Slips ({slips.length})</h1>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          <Plus size={20} /> Generate Salary Slip
        </button>
      </div>

      {/* Salary Slips Table */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Employee</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Code</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Month/Year</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Gross Salary</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Deduction</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Net Salary</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', fontSize: '0.85rem', color: '#64748b' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slips.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  No salary slips found
                </td>
              </tr>
            ) : (
              slips.map((slip, idx) => (
                <tr key={slip._id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', fontSize: '0.9rem', fontWeight: '600' }}>{slip.employeeName}</td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#64748b' }}>{slip.employeeCode}</td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#64748b' }}>{slip.month} {slip.year}</td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#0f172a', fontWeight: '600' }}>₹{slip.totalEarnings.toLocaleString()}</td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#dc3545' }}>₹{slip.totalDeductions.toLocaleString()}</td>
                  <td style={{ padding: '12px', fontSize: '0.9rem', color: '#28a745', fontWeight: '600' }}>₹{slip.netSalary.toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      background: slip.status === 'Paid' ? '#d4edda' : '#cfe2ff',
                      color: slip.status === 'Paid' ? '#155724' : '#084298',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {slip.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => setSelectedSlip(slip)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="View"
                      >
                        <Eye size={16} color="#2563eb" />
                      </button>
                      <button
                        onClick={() => alert('Download feature coming soon')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Download"
                      >
                        <Download size={16} color="#16a34a" />
                      </button>
                      <button
                        onClick={() => handleDeleteSlip(slip._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Delete"
                      >
                        <Trash2 size={16} color="#dc2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Generate Salary Slip Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'auto'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Generate Salary Slip</h2>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={24} color="#64748b" />
              </button>
            </div>

            {/* Employee Selection */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Select Employee *</label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
              >
                <option value="">Choose Employee</option>
                {employees.map(emp => (
                  <option key={emp._id} value={emp._id}>{emp.employeeCode} - {emp.employeeName}</option>
                ))}
              </select>
            </div>

            {/* Month & Year */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Month</label>
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Earnings Section */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '6px', borderLeft: '4px solid #2563eb' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Earnings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {Object.keys(formData.earnings).map(key => (
                  <div key={key}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="number"
                      name={`earnings.${key}`}
                      value={formData.earnings[key]}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                Total Earnings: ₹{totalEarnings.toLocaleString()}
              </div>
            </div>

            {/* Deductions Section */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#fff5f5', borderRadius: '6px', borderLeft: '4px solid #dc2626' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Deductions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {Object.keys(formData.deductions).map(key => (
                  <div key={key}>
                    <label style={{ display: 'block', marginBottom: '3px', fontSize: '0.85rem', fontWeight: '600', color: '#0f172a', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input
                      type="number"
                      name={`deductions.${key}`}
                      value={formData.deductions[key]}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '10px', fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>
                Total Deductions: ₹{totalDeductions.toLocaleString()}
              </div>
            </div>

            {/* Net Salary */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid #16a34a', fontSize: '1.2rem', fontWeight: '700', color: '#166534' }}>
              Net Salary: ₹{netSalary.toLocaleString()}
            </div>

            {/* Working Days */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Working Days</label>
                <input
                  type="number"
                  name="workingDays"
                  value={formData.workingDays}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Present Days</label>
                <input
                  type="number"
                  name="presentDays"
                  value={formData.presentDays}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Remarks */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#0f172a' }}>Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows="2"
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateSlip}
                style={{
                  padding: '10px 20px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Generate Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Salary Slip Modal */}
      {selectedSlip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'auto'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '700px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#0f172a' }}>Salary Slip</h2>
              <button
                onClick={() => setSelectedSlip(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={24} color="#64748b" />
              </button>
            </div>

            {/* Slip Details */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
                <div><strong>Employee:</strong> {selectedSlip.employeeName}</div>
                <div><strong>Code:</strong> {selectedSlip.employeeCode}</div>
                <div><strong>Department:</strong> {selectedSlip.department}</div>
                <div><strong>Month:</strong> {selectedSlip.month} {selectedSlip.year}</div>
                <div><strong>Working Days:</strong> {selectedSlip.workingDays}</div>
                <div><strong>Present Days:</strong> {selectedSlip.presentDays}</div>
              </div>
            </div>

            {/* Earnings Table */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Earnings</h3>
              <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(selectedSlip.earnings).map(([key, value]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '8px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: '600' }}>₹{value.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f0f9ff', fontWeight: '700' }}>
                    <td style={{ padding: '8px' }}>Total Earnings</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>₹{selectedSlip.totalEarnings.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deductions Table */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>Deductions</h3>
              <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(selectedSlip.deductions).map(([key, value]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '8px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: '600' }}>₹{value.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#fff5f5', fontWeight: '700' }}>
                    <td style={{ padding: '8px' }}>Total Deductions</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>₹{selectedSlip.totalDeductions.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Net Salary */}
            <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', color: '#166534' }}>
                <span>Net Salary:</span>
                <span>₹{selectedSlip.netSalary.toLocaleString()}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedSlip(null)}
              style={{
                width: '100%',
                padding: '10px 20px',
                background: '#f1f5f9',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalarySlipsView;
