import React from 'react';
import { Download, Printer, X } from 'lucide-react';

export const ProfessionalPayslipView = ({ slip, onClose }) => {
  if (!slip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.getElementById('payslip-content');
    if (window.html2pdf) {
      window.html2pdf().set({
        margin: 10,
        filename: `Payslip_${slip.employeeCode}_${slip.month}_${slip.year}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      }).from(element).save();
    }
  };

  // Reimbursements data (default)
  const reimbursements = [
    { name: 'Reimbursement 1', amount: 0 },
    { name: 'Reimbursement 2', amount: 0 }
  ];
  const totalReimbursements = reimbursements.reduce((sum, r) => sum + r.amount, 0);

  const companyInfo = {
    name: 'SHA COMPLIANCE & SERVICES PVT LTD',
    tagline: 'Software & Healthcare License Consultancy',
    address: 'Chennai, Tamil Nadu - 600001',
    phone: '+91 98765 43210',
    email: 'info@shacompliance.com',
    website: 'www.shacompliance.com'
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '95vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }}>
        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
            Salary Slip - {slip.month} {slip.year}
          </h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              style={{
                padding: '8px 16px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748b'
              }}
            >
              <Printer size={16} /> Print
            </button>
            <button
              onClick={handleDownload}
              style={{
                padding: '8px 16px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <Download size={16} /> Download PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#64748b'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Payslip Content */}
        <div id="payslip-content" style={{ padding: '20px', fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
          {/* Header - Gold Band */}
          <div style={{ background: '#2d2d2d', color: '#FFD700', padding: '12px', textAlign: 'center', marginBottom: '2px' }}>
            <h1 style={{ margin: '0', fontSize: '20px', fontWeight: 700, letterSpacing: '2px' }}>
              SHA COMPLIANCE & SERVICES PVT LTD
            </h1>
          </div>

          {/* Subheader */}
          <div style={{ background: '#f5f5f5', padding: '6px 12px', textAlign: 'center', marginBottom: '2px', borderTop: '1px solid #999', borderBottom: '1px solid #999' }}>
            <p style={{ margin: 0, fontSize: '11px', fontWeight: 600 }}>Software & Healthcare License Consultancy</p>
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', padding: '12px 0', borderBottom: '2px solid #999', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
              Payslip for the Month of {slip.month}, {slip.year}
            </h2>
          </div>

          {/* Employee Pay Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginBottom: '16px', border: '1px solid #999' }}>
            {/* Left Column */}
            <div style={{ borderRight: '1px solid #999', background: '#e8f5e9' }}>
              <div style={{ background: '#FFD700', color: '#000', padding: '6px 8px', fontWeight: 700, fontSize: '11px' }}>
                Employee Pay Summary
              </div>
              <div style={{ padding: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '11px' }}>
                  <span style={{ fontWeight: 600 }}>Employee Name</span>
                  <span>: {slip.employeeName}</span>
                  <span style={{ fontWeight: 600 }}>Designation</span>
                  <span>: {slip.designation}</span>
                  <span style={{ fontWeight: 600 }}>Date of Joining</span>
                  <span>: dd-mm-yyyy</span>
                  <span style={{ fontWeight: 600 }}>Pay Period</span>
                  <span>: {slip.month}, {slip.year}</span>
                  <span style={{ fontWeight: 600 }}>Pay Date</span>
                  <span>: dd-mm-yyyy</span>
                  <span style={{ fontWeight: 600 }}>PF A/C Number</span>
                  <span>: AA/AAA.0000000/000/0000000</span>
                  <span style={{ fontWeight: 600 }}>UAN Number</span>
                  <span>: 10101010101010</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ background: '#f5f5f5', padding: '8px', textAlign: 'center' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '4px 0', fontSize: '11px', fontWeight: 700, color: '#2563eb' }}>Employee Net Pay</p>
                <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: 700 }}>₹{slip.netSalary.toLocaleString('en-IN')}</p>
              </div>
              <div style={{ borderTop: '1px solid #999', paddingTop: '8px' }}>
                <p style={{ margin: '0', fontSize: '10px' }}>Paid Days: {slip.workingDays} | LOP Days: 0</p>
              </div>
            </div>
          </div>

          {/* Earnings & Deductions Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', border: '1px solid #999' }}>
            <thead>
              <tr style={{ background: '#2d2d2d', color: '#FFD700' }}>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, fontSize: '11px', width: '25%' }}>EARNINGS</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, fontSize: '11px', width: '15%' }}>AMOUNT</th>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, fontSize: '11px', width: '25%' }}>DEDUCTIONS</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, fontSize: '11px', width: '15%' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #999' }}>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>Basic Salary</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', borderRight: '1px solid #999' }}>₹{slip.earnings.basic.toLocaleString('en-IN')}</td>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>PF</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{slip.deductions.epf.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #999', background: '#f5f5f5' }}>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>Allowances</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', borderRight: '1px solid #999' }}>₹{(slip.earnings.houseRent + slip.earnings.medicalAllowance + slip.earnings.conveyance).toLocaleString('en-IN')}</td>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>TDS</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{slip.deductions.tds.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #999' }}>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>Other Benefits</td>
                <td style={{ padding: '6px 8px', textAlign: 'right', borderRight: '1px solid #999' }}>₹{slip.earnings.specialAllowance.toLocaleString('en-IN')}</td>
                <td style={{ padding: '6px 8px', borderRight: '1px solid #999' }}>Other Deduction</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹0.00</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #999', background: '#e8f5e9', fontWeight: 700 }}>
                <td style={{ padding: '8px', borderRight: '1px solid #999' }}>Gross Earnings</td>
                <td style={{ padding: '8px', textAlign: 'right', borderRight: '1px solid #999' }}>₹{slip.totalEarnings.toLocaleString('en-IN')}</td>
                <td style={{ padding: '8px', borderRight: '1px solid #999' }}>Total Deductions</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>₹{slip.totalDeductions.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Reimbursements Section */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', border: '1px solid #999' }}>
            <thead>
              <tr style={{ background: '#2d2d2d', color: '#FFD700' }}>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, fontSize: '11px' }}>REIMBURSEMENTS</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, fontSize: '11px', width: '30%' }}></th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimb, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #999', background: idx % 2 === 0 ? '#f5f5f5' : 'white' }}>
                  <td style={{ padding: '6px 8px' }}>{reimb.name}</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{reimb.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr style={{ borderBottom: '2px solid #999', background: '#e8f5e9', fontWeight: 700 }}>
                <td style={{ padding: '8px' }}>Total Reimbursements</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>₹{totalReimbursements.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* NET PAY Section */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', border: '1px solid #999' }}>
            <thead>
              <tr style={{ background: '#2d2d2d', color: '#FFD700' }}>
                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, fontSize: '11px' }}>NETPAY</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, fontSize: '11px' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #999' }}>
                <td style={{ padding: '6px 8px' }}>Gross Earnings</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{slip.totalEarnings.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #999' }}>
                <td style={{ padding: '6px 8px' }}>Total Deductions</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{slip.totalDeductions.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #999' }}>
                <td style={{ padding: '6px 8px' }}>Total Reimbursements</td>
                <td style={{ padding: '6px 8px', textAlign: 'right' }}>₹{totalReimbursements.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ background: '#2d2d2d', color: '#FFD700', fontWeight: 700 }}>
                <td style={{ padding: '10px 8px' }}>Total Net Payable</td>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontSize: '13px' }}>₹{(slip.netSalary + totalReimbursements).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words */}
          <div style={{ textAlign: 'center', padding: '8px', background: '#f5f5f5', border: '1px solid #999', marginBottom: '12px', fontSize: '11px' }}>
            <p style={{ margin: '4px 0' }}>Total Net Payable {convertToWords(slip.netSalary + totalReimbursements)} (Amount In Words)</p>
          </div>

          {/* Footer Formula & Note */}
          <div style={{ padding: '8px', background: '#f5f5f5', border: '1px solid #999', textAlign: 'center', fontSize: '10px', marginBottom: '12px', fontStyle: 'italic' }}>
            <p style={{ margin: '4px 0' }}>**Total Net Payable = Gross Earnings - Total Deductions + Total Reimbursements</p>
          </div>

          {/* Signature Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 8px', fontSize: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '60px 0 4px 0', fontSize: '11px', fontWeight: 600 }}>Employee Signature</p>
              <p style={{ margin: '2px 0', fontSize: '9px' }}>Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: '60px 0 4px 0', fontSize: '11px', fontWeight: 600 }}>Authorized Signatory</p>
              <p style={{ margin: '2px 0', fontSize: '9px' }}>For SHA COMPLIANCE & SERVICES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to convert numbers to words
function convertToWords(num) {
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
