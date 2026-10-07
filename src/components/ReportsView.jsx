import React, { useState } from 'react';
import { TrendingUp, DollarSign, ShieldCheck, Download, Printer, Share2, FileSpreadsheet, FileText, CheckCircle2, Clock, AlertCircle, FileCheck, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { CEODashboardView } from './Reports/CEODashboardView';

export const ReportsView = ({ activeReportTab = 'ceo-dashboard' }) => {
  const { invoices, payments, quotations, setActiveTab } = useApp();
  const [showPdfModal, setShowPdfModal] = useState(false);

  const totalBilled = invoices.reduce((acc, i) => acc + (i.grandTotal || 0), 0);
  const totalCollected = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const totalTaxCGST = Math.round(
    invoices.reduce((acc, i) => acc + (i.cgst || i.grandTotal * 0.045 || 0), 0)
  );
  const totalTaxSGST = totalTaxCGST;

  const handleSelectReportTab = (tabId) => {
    setActiveTab(tabId);
  };

  const renderReportContent = () => {
    switch (activeReportTab) {
      case 'ceo-dashboard':
      case 'reports':
        return (
          <CEODashboardView
            onSelectReportTab={handleSelectReportTab}
            onOpenPdfModal={() => setShowPdfModal(true)}
          />
        );

      case 'financial-report':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Financial & Tax Reports</h1>
                <p className="page-subtitle">Revenue analytics, GST liabilities and client ledger performance.</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">TOTAL BILLED</div>
                  <div className="stat-value">{formatCurrency(totalBilled || 845000)}</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <TrendingUp size={22} />
                </div>
              </div>

              <div className="stat-card">
                <div>
                  <div className="stat-title">TOTAL COLLECTED</div>
                  <div className="stat-value" style={{ color: '#16a34a' }}>
                    {formatCurrency(totalCollected || 620000)}
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <DollarSign size={22} />
                </div>
              </div>

              <div className="stat-card">
                <div>
                  <div className="stat-title">CGST LIABILITY (9%)</div>
                  <div className="stat-value" style={{ color: '#0f172a' }}>
                    {formatCurrency(totalTaxCGST || 36000)}
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                  <TrendingUp size={22} />
                </div>
              </div>

              <div className="stat-card">
                <div>
                  <div className="stat-title">SGST LIABILITY (9%)</div>
                  <div className="stat-value" style={{ color: '#0f172a' }}>
                    {formatCurrency(totalTaxSGST || 36000)}
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                  <ShieldCheck size={22} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>
                  Monthly Quotations vs Invoices
                </h3>
                <div
                  style={{
                    height: 220,
                    background: '#f8fafc',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    padding: '20px 10px 10px 10px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {[
                    { month: 'May', q: 40, i: 30 },
                    { month: 'Jun', q: 55, i: 45 },
                    { month: 'Jul', q: 70, i: 60 },
                    { month: 'Aug', q: 85, i: 75 },
                    { month: 'Sep', q: 100, i: 90 }
                  ].map((d) => (
                    <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 140 }}>
                        <div
                          style={{
                            width: 20,
                            height: `${d.q}%`,
                            background: '#2563eb',
                            borderRadius: '4px 4px 0 0'
                          }}
                          title={`Quotations: ${d.q}`}
                        />
                        <div
                          style={{
                            width: 20,
                            height: `${d.i}%`,
                            background: '#10b981',
                            borderRadius: '4px 4px 0 0'
                          }}
                          title={`Invoices: ${d.i}`}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Tax Summary Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Total Taxable Sales</span>
                    <span style={{ fontWeight: 700 }}>{formatCurrency(totalBilled * 0.84 || 700000)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Exempted Govt Fees</span>
                    <span style={{ fontWeight: 700 }}>{formatCurrency(totalBilled * 0.16 || 145000)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Output CGST (9%)</span>
                    <span style={{ fontWeight: 700, color: '#9333ea' }}>{formatCurrency(totalTaxCGST || 36000)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Output SGST (9%)</span>
                    <span style={{ fontWeight: 700, color: '#9333ea' }}>{formatCurrency(totalTaxSGST || 36000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'daily-followup':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Daily Follow-up Report</h1>
                <p className="page-subtitle">Track daily follow-ups, pending tasks, and client interactions.</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">TODAY'S FOLLOW-UPS</div>
                  <div className="stat-value">12</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <FileText size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">COMPLETED</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="stat-value">4</span>
                    <span className="stat-change up">↑ 33%</span>
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">PENDING</div>
                  <div className="stat-value">6</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
                  <Clock size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">OVERDUE</div>
                  <div className="stat-value">2</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                  <AlertCircle size={22} />
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Daily Follow-up Details</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Client</th>
                      <th>Follow-up Task</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>ABC Hospital</td>
                      <td>Collect CEA documents</td>
                      <td>Today</td>
                      <td><span className="badge badge-pending">Pending</span></td>
                      <td>Rajesh Kumar</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>XYZ Clinic</td>
                      <td>Submit Fire NOC application</td>
                      <td>Tomorrow</td>
                      <td><span className="badge badge-pending">Pending</span></td>
                      <td>Priya Sharma</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'license-status':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">License Status Report</h1>
                <p className="page-subtitle">Overview of all licenses by status and compliance stage.</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">TOTAL LICENSES</div>
                  <div className="stat-value">186</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <ShieldCheck size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">APPROVED</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="stat-value">92</span>
                    <span className="stat-change up">↑ 49%</span>
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">IN PROGRESS</div>
                  <div className="stat-value">58</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
                  <Clock size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">EXPIRED</div>
                  <div className="stat-value">8</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                  <AlertCircle size={22} />
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>License Breakdown by Type</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>License Type</th>
                      <th>Total</th>
                      <th>Approved</th>
                      <th>In Progress</th>
                      <th>Expired</th>
                      <th>Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Clinical Establishment Act (CEA)</strong></td>
                      <td>42</td>
                      <td>28</td>
                      <td>12</td>
                      <td>2</td>
                      <td><span style={{ color: '#16a34a', fontWeight: 600 }}>67%</span></td>
                    </tr>
                    <tr>
                      <td><strong>Fire NOC</strong></td>
                      <td>38</td>
                      <td>24</td>
                      <td>10</td>
                      <td>4</td>
                      <td><span style={{ color: '#16a34a', fontWeight: 600 }}>63%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'document-status':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Document Status Report</h1>
                <p className="page-subtitle">Track document collection and submission status.</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">TOTAL DOCUMENTS</div>
                  <div className="stat-value">1240</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <FileText size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">SUBMITTED</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="stat-value">912</span>
                    <span className="stat-change up">↑ 74%</span>
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">PENDING</div>
                  <div className="stat-value">212</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
                  <Clock size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">REJECTED</div>
                  <div className="stat-value">36</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                  <AlertCircle size={22} />
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Document Status Distribution</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ height: 200, background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px 10px', border: '1px solid #e2e8f0' }}>
                    {[
                      { label: 'Submitted', value: 74, color: '#10b981' },
                      { label: 'Pending', value: 17, color: '#ca8a04' },
                      { label: 'Rejected', value: 9, color: '#dc2626' }
                    ].map((d) => (
                      <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 40, height: `${d.value * 2}px`, background: d.color, borderRadius: 4 }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span>Submitted Documents</span>
                    <span style={{ fontWeight: 700 }}>912</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span>Pending Review</span>
                    <span style={{ fontWeight: 700 }}>212</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span>Rejected/Needs Resubmission</span>
                    <span style={{ fontWeight: 700 }}>36</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'renewal-report':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Renewal Report</h1>
                <p className="page-subtitle">Track license renewals and upcoming expiry dates.</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">DUE FOR RENEWAL</div>
                  <div className="stat-value">12</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
                  <AlertCircle size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">NEXT 30 DAYS</div>
                  <div className="stat-value">8</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
                  <Clock size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">NEXT 60 DAYS</div>
                  <div className="stat-value">15</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <FileCheck size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">COMPLETED</div>
                  <div className="stat-value">42</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Upcoming Renewals (Next 90 Days)</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>License</th>
                      <th>Current Expiry</th>
                      <th>Days Remaining</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>ABC Hospital</strong></td>
                      <td>CEA Registration</td>
                      <td>2026-10-15</td>
                      <td><span style={{ color: '#dc2626', fontWeight: 700 }}>15</span></td>
                      <td><span className="badge badge-pending">Due Soon</span></td>
                    </tr>
                    <tr>
                      <td><strong>XYZ Clinic</strong></td>
                      <td>Fire NOC</td>
                      <td>2026-11-20</td>
                      <td><span style={{ color: '#ca8a04', fontWeight: 700 }}>52</span></td>
                      <td><span className="badge badge-pending">In Process</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'monthly-report':
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Monthly Report</h1>
                <p className="page-subtitle">Summary of monthly activities and performance metrics.</p>
              </div>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div>
                  <div className="stat-title">NEW LICENSES</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="stat-value">24</span>
                    <span className="stat-change up">↑ 12%</span>
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                  <TrendingUp size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">COMPLETED</div>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <span className="stat-value">18</span>
                    <span className="stat-change up">↑ 8%</span>
                  </div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">REVENUE</div>
                  <div style={{ color: '#059669' }}>{formatCurrency(845000)}</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                  <DollarSign size={22} />
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-title">COLLECTION %</div>
                  <div className="stat-value">73%</div>
                </div>
                <div className="stat-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                  <Wallet size={22} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Monthly Activity Trend</h3>
                <div style={{ height: 220, background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px 10px', border: '1px solid #e2e8f0' }}>
                  {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                    <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 30, height: `${60 + i * 15}px`, background: '#2563eb', borderRadius: '4px 4px 0 0' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Month Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>New Clients Added</span>
                    <span style={{ fontWeight: 700 }}>8</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Licenses Approved</span>
                    <span style={{ fontWeight: 700 }}>18</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Documents Submitted</span>
                    <span style={{ fontWeight: 700 }}>156</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
                    <span>Invoices Generated</span>
                    <span style={{ fontWeight: 700 }}>42</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 8 }}>
                    <span>Collection Rate</span>
                    <span style={{ color: '#16a34a' }}>73%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'custom-report':
      default:
        return (
          <div className="page-container">
            <div className="page-header">
              <div>
                <h1 className="page-title">Custom Report</h1>
                <p className="page-subtitle">Create and customize your own reports based on specific criteria.</p>
              </div>
            </div>
            <div className="card" style={{ padding: 40, textAlign: 'center' }}>
              <FileSpreadsheet size={48} style={{ margin: '0 auto 16px', color: '#cbd5e1' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: '#1e293b' }}>
                Custom Report Builder
              </h3>
              <p style={{ color: '#64748b', marginBottom: 24 }}>
                Select filters and parameters to generate your custom report
              </p>
              <button className="btn btn-primary" style={{ margin: '0 auto' }}>
                Create Custom Report
              </button>
            </div>
          </div>
        );
    }
  };

  // Don't wrap CEO Dashboard since it handles its own layout
  if (activeReportTab === 'ceo-dashboard' || activeReportTab === 'reports') {
    return renderReportContent();
  }

  // Wrap other reports in page-container
  return <div className="page-container">{renderReportContent()}</div>;
};
