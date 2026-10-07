import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Printer, Save } from 'lucide-react';

export const PayrollFormView = () => {
  const [formData, setFormData] = useState({
    employeeCode: 'EMP-001',
    employeeName: 'John Doe',
    designation: 'Senior Manager',
    department: 'Operations',
    month: 'October',
    year: 2026,
    workingDays: 26
  });

  const [earnings, setEarnings] = useState([
    { id: 1, name: 'Basic Salary', amount: 50000 },
    { id: 2, name: 'House Rent Allowance', amount: 15000 },
    { id: 3, name: 'Medical Allowance', amount: 5000 },
    { id: 4, name: 'Conveyance Allowance', amount: 3000 },
    { id: 5, name: 'Special Allowance', amount: 5000 }
  ]);

  const [deductions, setDeductions] = useState([
    { id: 1, name: 'Professional Tax', amount: 200 },
    { id: 2, name: 'Employee Provident Fund (EPF)', amount: 6000 },
    { id: 3, name: 'Tax Deducted at Source (TDS)', amount: 5000 },
    { id: 4, name: 'Employee State Insurance (ESI)', amount: 1500 }
  ]);

  const [nextEarningsId, setNextEarningsId] = useState(6);
  const [nextDeductionsId, setNextDeductionsId] = useState(5);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEarningsChange = (id, field, value) => {
    setEarnings(prev => prev.map(e => e.id === id ? { ...e, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : e));
  };

  const handleDeductionsChange = (id, field, value) => {
    setDeductions(prev => prev.map(d => d.id === id ? { ...d, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : d));
  };

  const addEarning = () => {
    setEarnings([...earnings, { id: nextEarningsId, name: '', amount: 0 }]);
    setNextEarningsId(nextEarningsId + 1);
  };

  const removeEarning = (id) => {
    setEarnings(earnings.filter(e => e.id !== id));
  };

  const addDeduction = () => {
    setDeductions([...deductions, { id: nextDeductionsId, name: '', amount: 0 }]);
    setNextDeductionsId(nextDeductionsId + 1);
  };

  const removeDeduction = (id) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById('payslip-preview');
    if (window.html2pdf) {
      window.html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `Payslip_${formData.employeeCode}_${formData.month}_${formData.year}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      }).from(element).save();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Left: Form */}
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
          Payroll Entry Form
        </h2>

        {/* Employee Details */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Employee Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Employee Code
              </label>
              <input
                type="text"
                value={formData.employeeCode}
                onChange={(e) => handleFormChange('employeeCode', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Employee Name
              </label>
              <input
                type="text"
                value={formData.employeeName}
                onChange={(e) => handleFormChange('employeeName', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => handleFormChange('designation', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleFormChange('department', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Month
              </label>
              <select
                value={formData.month}
                onChange={(e) => handleFormChange('month', e.target.value)}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              >
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Year
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleFormChange('year', parseInt(e.target.value))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#64748b' }}>
                Working Days
              </label>
              <input
                type="number"
                value={formData.workingDays}
                onChange={(e) => handleFormChange('workingDays', parseInt(e.target.value))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Earnings
            </h3>
            <button
              onClick={addEarning}
              style={{
                padding: '6px 12px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#0f172a' }}>Description</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#0f172a', width: '100px' }}>Amount (₹)</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: '#0f172a', width: '40px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map(earning => (
                <tr key={earning.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <input
                      type="text"
                      value={earning.name}
                      onChange={(e) => handleEarningsChange(earning.id, 'name', e.target.value)}
                      placeholder="Earning name"
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input
                      type="number"
                      value={earning.amount}
                      onChange={(e) => handleEarningsChange(earning.id, 'amount', e.target.value)}
                      placeholder="0"
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => removeEarning(earning.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'right', padding: '8px 12px', background: '#f0fdf4', borderRadius: '6px', fontWeight: 600, color: '#15803d' }}>
            Total Earnings: ₹{totalEarnings.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Deductions */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Deductions
            </h3>
            <button
              onClick={addDeduction}
              style={{
                padding: '6px 12px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#0f172a' }}>Description</th>
                <th style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#0f172a', width: '100px' }}>Amount (₹)</th>
                <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: '#0f172a', width: '40px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {deductions.map(deduction => (
                <tr key={deduction.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <input
                      type="text"
                      value={deduction.name}
                      onChange={(e) => handleDeductionsChange(deduction.id, 'name', e.target.value)}
                      placeholder="Deduction name"
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <input
                      type="number"
                      value={deduction.amount}
                      onChange={(e) => handleDeductionsChange(deduction.id, 'amount', e.target.value)}
                      placeholder="0"
                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', textAlign: 'right' }}
                    />
                  </td>
                  <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => removeDeduction(deduction.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'right', padding: '8px 12px', background: '#fee2e2', borderRadius: '6px', fontWeight: 600, color: '#991b1b' }}>
            Total Deductions: ₹{totalDeductions.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Net Pay */}
        <div style={{ padding: '16px 12px', background: '#dbeafe', borderRadius: '8px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '16px', fontWeight: 700, color: '#1e40af' }}>
            <span>Net Payable:</span>
            <span>₹{netSalary.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#64748b'
            }}
          >
            <Printer size={16} /> Print
          </button>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Right: Payslip Preview */}
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxHeight: '100vh', overflow: 'auto' }}>
        <div id="payslip-preview" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #0f172a' }}>
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                SHA COMPLIANCE & SERVICES PVT LTD
              </h1>
              <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>
                Software & Healthcare License Consultancy
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 700, color: '#2563eb' }}>
                SALARY SLIP
              </h2>
            </div>
          </div>

          {/* Employee & Period */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Employee Details</p>
              <div style={{ fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Name:</span> <span>{formData.employeeName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Code:</span> <span>{formData.employeeCode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Dept:</span> <span>{formData.department}</span>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '6px', background: '#f8fafc' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Period</p>
              <div style={{ fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Month:</span> <span>{formData.month} {formData.year}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>Days:</span> <span>{formData.workingDays}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings & Deductions */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 600, color: '#0f172a' }}>EARNINGS</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0f172a', width: '80px' }}>AMOUNT</th>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 600, color: '#0f172a' }}>DEDUCTIONS</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0f172a', width: '80px' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(Math.max(earnings.length, deductions.length))].map((_, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '6px 8px' }}>{earnings[idx]?.name || ''}</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>{earnings[idx] ? `₹${earnings[idx].amount.toLocaleString('en-IN')}` : ''}</td>
                  <td style={{ padding: '6px 8px' }}>{deductions[idx]?.name || ''}</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>{deductions[idx] ? `₹${deductions[idx].amount.toLocaleString('en-IN')}` : ''}</td>
                </tr>
              ))}
              <tr style={{ background: '#f1f5f9', fontWeight: 700, fontSize: '13px' }}>
                <td style={{ padding: '8px', borderTop: '2px solid #0f172a' }}>Total Earnings</td>
                <td style={{ padding: '8px', textAlign: 'right', borderTop: '2px solid #0f172a', color: '#10b981' }}>₹{totalEarnings.toLocaleString('en-IN')}</td>
                <td style={{ padding: '8px', borderTop: '2px solid #0f172a' }}>Total Deductions</td>
                <td style={{ padding: '8px', textAlign: 'right', borderTop: '2px solid #0f172a', color: '#dc2626' }}>₹{totalDeductions.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Net Pay */}
          <div style={{ border: '2px solid #2563eb', padding: '8px 12px', borderRadius: '6px', background: '#dbeafe', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#1e40af' }}>
              <span>NET PAYABLE:</span>
              <span>₹{netSalary.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Amount in Words */}
          <div style={{ textAlign: 'center', padding: '6px 8px', background: '#f5f5f5', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '6px', fontSize: '10px' }}>
            <p style={{ margin: '4px 0', fontWeight: 600 }}>Total Net Payable: {convertAmountToWords(netSalary)}</p>
          </div>

          {/* Formula */}
          <div style={{ padding: '6px 8px', background: '#f5f5f5', border: '1px solid #d0d0d0', borderRadius: '4px', marginBottom: '6px', fontSize: '9px', textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
            <p style={{ margin: '4px 0' }}>**Net Payable = Total Earnings - Total Deductions</p>
          </div>

          {/* Signature Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #d0d0d0', fontSize: '9px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ height: '25px', marginBottom: '2px', borderBottom: '1px solid #666' }}></div>
              <p style={{ margin: '2px 0', fontWeight: 600 }}>Employee Signature</p>
              <p style={{ margin: '1px 0', fontSize: '8px', color: '#666' }}>Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ height: '25px', marginBottom: '2px', borderBottom: '1px solid #666' }}></div>
              <p style={{ margin: '2px 0', fontWeight: 600 }}>Authorized Signatory</p>
              <p style={{ margin: '1px 0', fontSize: '8px', color: '#666' }}>For SHA COMPLIANCE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function convertAmountToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const scales = ['', 'Thousand', 'Lakh', 'Crore'];

  if (num === 0) return 'Zero Rupees Only';

  let result = '';
  let scaleIndex = 0;

  while (num > 0) {
    let chunk = num % 100;
    if (num % 1000 !== 0) {
      if (chunk >= 10 && chunk < 20) {
        result = teens[chunk - 10] + ' ' + scales[scaleIndex] + ' ' + result;
      } else {
        result = (ones[Math.floor(chunk / 10)] + ' ' + tens[chunk % 10]).trim() + ' ' + scales[scaleIndex] + ' ' + result;
      }
    }
    num = Math.floor(num / 100);
    scaleIndex++;
  }

  return result.trim() + ' Rupees Only';
}
