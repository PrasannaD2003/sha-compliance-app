import React from 'react';
import { X, Printer, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDateFull } from '../../utils/formatters';

export const CEOPdfReportModal = ({ isOpen, onClose }) => {
  const { companySettings } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay no-print">
      <div className="modal-content" style={{ maxWidth: 840, maxHeight: '95vh', overflowY: 'auto' }}>
        <div className="modal-header no-print">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Generated CEO Management Report (A4 Printable)
          </h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" onClick={handlePrint}>
              <Printer size={16} /> Print / Save as PDF
            </button>
            <button className="icon-button" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="printable-paper" style={{ margin: '0 auto', boxShadow: 'none', border: 'none' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: 16, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="logo-icon" style={{ width: 44, height: 44, borderRadius: 8 }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  {companySettings.name}
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>CEO MANAGEMENT & COMPLIANCE REPORT</p>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#475569' }}>
              <div><strong>Report Date:</strong> 29 September 2026</div>
              <div><strong>Scope:</strong> Full Operations & Finance Audit</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 20, fontSize: '0.85rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>1. Executive Summary</h3>
            <p style={{ color: '#334155', lineHeight: 1.5 }}>
              Total active client base stands at <strong>128 hospitals & clinics</strong> with <strong>186 total managed licenses</strong>. Current completion rate is <strong>49% (92 approved)</strong>, <strong>31% in progress (58)</strong>, and <strong>14% not started (26)</strong>. Total receivable revenue is <strong>₹8,45,000</strong> with <strong>₹6,20,000 collected</strong> and <strong>₹2,25,000 pending collection</strong>.
            </p>
          </div>

          {/* Metrics Overview Table */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>2. Operational Key Metrics</h3>
          <table className="data-table" style={{ border: '1px solid #cbd5e1', marginBottom: 20, fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th>Metric Category</th>
                <th style={{ textAlign: 'right' }}>Current Count</th>
                <th style={{ textAlign: 'right' }}>Target / Total</th>
                <th>Status / Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Total Client Base</td><td style={{ textAlign: 'right', fontWeight: 700 }}>128</td><td style={{ textAlign: 'right' }}>150 Target</td><td style={{ color: '#10b981', fontWeight: 700 }}>+14 this month</td></tr>
              <tr><td>Active Licenses Managed</td><td style={{ textAlign: 'right', fontWeight: 700 }}>186</td><td style={{ textAlign: 'right' }}>200 Target</td><td style={{ color: '#10b981', fontWeight: 700 }}>+12 this month</td></tr>
              <tr><td>Completed Licenses</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#10b981' }}>92</td><td style={{ textAlign: 'right' }}>186 Total</td><td>49% Completion</td></tr>
              <tr><td>Pending Client Documents</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#ef4444' }}>37</td><td style={{ textAlign: 'right' }}>1,240 Docs Total</td><td>Follow-up Required</td></tr>
              <tr><td>Upcoming Renewals (3 Months)</td><td style={{ textAlign: 'right', fontWeight: 700, color: '#ea580c' }}>12</td><td style={{ textAlign: 'right' }}>30 Days Window</td><td>Urgent Reminders Sent</td></tr>
              <tr><td>Total Billed Revenue</td><td style={{ textAlign: 'right', fontWeight: 700 }}>₹8,45,000</td><td style={{ textAlign: 'right' }}>-</td><td style={{ color: '#10b981', fontWeight: 700 }}>₹6,20,000 Collected</td></tr>
            </tbody>
          </table>

          {/* Action Items Required */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>3. Urgent Action Items Required</h3>
          <ol style={{ paddingLeft: 20, fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
            <li><strong>ABC Hospital:</strong> Collect CEA Ownership Proof (Assigned: Mr. Kumar, Due: 30 Sep 2026)</li>
            <li><strong>Medicare Hospital:</strong> Submit PCPNDT Query Response to DMO Appropriate Authority (Assigned: Mr. Suresh)</li>
            <li><strong>City Care Hospital:</strong> Finalize TNPCB Consent to Operate application (Assigned: Mr. Ramesh)</li>
          </ol>

          {/* Footer Signature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 40, borderTop: '1px solid #cbd5e1', paddingTop: 16 }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Prepared by: SHA Compliance Management System<br />
              Confidential & Executive Use Only
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #0f172a', width: 160, height: 30 }}></div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginTop: 4 }}>Chief Executive Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
