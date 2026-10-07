import React, { useState } from 'react';
import { FileText, Download, Mail, Settings, Eye, Trash2, Plus, Filter } from 'lucide-react';

export const WeeklyComplianceReportView = () => {
  const [selectedClient, setSelectedClient] = useState('ABC Hospitals');
  const [dateRange, setDateRange] = useState('22 Sep 2026 - 28 Sep 2026');
  const [activeTab, setActiveTab] = useState('summary');

  const handleGenerateReport = () => alert('✅ Report Generated Successfully!');
  const handleCustomizeReport = () => alert('📝 Opening Customization Options...');
  const handleScheduleReport = () => alert('📅 Opening Schedule Dialog...');
  const handleSendReport = () => alert('📧 Sending Report to Client...');

  const clientData = {
    name: 'ABC Hospitals',
    logo: '🏥',
    branches: 8,
    licenses: 42,
    completed: 18,
    inProgress: 16,
    notStarted: 8,
    pendingDocs: 12,
    renewalsDue: 5,
    openQueries: 4,
    status: 'Active Client',
    phone: '+91 98765 43210',
    email: 'compliance@abchospitals.com',
    website: 'www.abchospitals.com'
  };

  const stats = [
    { label: 'Total Branches', value: clientData.branches, icon: '🏢', color: '#2563eb' },
    { label: 'Total Licenses', value: clientData.licenses, icon: '📋', color: '#8b5cf6' },
    { label: 'Completed', value: clientData.completed, icon: '✓', color: '#10b981', percent: '43%' },
    { label: 'In Progress', value: clientData.inProgress, icon: '⏳', color: '#f59e0b', percent: '38%' },
    { label: 'Not Started', value: clientData.notStarted, icon: '●', color: '#ef4444', percent: '19%' },
    { label: 'Pending Documents', value: clientData.pendingDocs, icon: '📄', color: '#06b6d4' },
    { label: 'Renewals Due (Next 3 Months)', value: clientData.renewalsDue, icon: '🔄', color: '#ec4899' },
    { label: 'Open Queries', value: clientData.openQueries, icon: '❓', color: '#8b5cf6' }
  ];

  const tabs = [
    'Summary', 'Branch Wise', 'License Status', 'Pending Documents',
    'Renewals', 'Applications', 'Queries', 'Follow-ups', 'Remarks', 'Email Preview', 'History'
  ];

  const branchData = [
    { code: 'APH-BR-001', name: 'Apollo Main Hospital', location: 'Chennai', licenses: 8, completed: 4, inProgress: 3, notStarted: 1, pendingDocs: 2, remarks: 'Fire NOC inspection scheduled on 10 Oct 2026' },
    { code: 'APH-BR-002', name: 'Apollo Specialty Hospital', location: 'Bangalore', licenses: 6, completed: 3, inProgress: 2, notStarted: 1, pendingDocs: 1, remarks: 'PCPNDT renewal documents under preparation' },
    { code: 'APH-BR-003', name: 'Apollo Cancer Centre', location: 'Hyderabad', licenses: 6, completed: 2, inProgress: 2, notStarted: 2, pendingDocs: 2, remarks: 'Waiting for updated DT layout plan from client' }
  ];

  const licenseStatus = [
    { name: 'Clinical Establishment Act', total: 8, completed: 4, inProgress: 3, notStarted: 1, renewalDue: 3 },
    { name: 'Fire NOC', total: 8, completed: 5, inProgress: 2, notStarted: 1, renewalDue: 2 },
    { name: 'Biomedical Waste Authorization', total: 8, completed: 6, inProgress: 1, notStarted: 0, renewalDue: 1 }
  ];

  return (
    <div style={{ padding: '32px', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>Weekly Compliance Report</h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Generate, customize and send weekly compliance status report to client.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleCustomizeReport} style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={18} /> Customize Report
            </button>
            <button onClick={handleScheduleReport} style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              📅 Schedule Report
            </button>
            <button onClick={handleSendReport} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} /> Send Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Client / Group</label>
            <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <option>ABC Hospitals</option>
              <option>XYZ Medical</option>
              <option>Health Care Plus</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Branches</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <option>All Branches (8)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Report Scope</label>
            <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <option>Group / Head Office</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>Date Range</label>
            <input type="text" value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }} />
          </div>
        </div>
      </div>

      {/* Client Card */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ fontSize: '64px' }}>{clientData.logo}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{clientData.name}</h2>
            <span style={{ padding: '4px 12px', background: '#dcfce7', color: '#15803d', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Active Client</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>
            <div>🏢 {clientData.branches} Branches</div>
            <div>📋 {clientData.licenses} Total Licenses</div>
            <div>📞 {clientData.phone}</div>
            <div>📧 {clientData.email}</div>
            <div>🌐 {clientData.website}</div>
          </div>
        </div>
        <button onClick={handleGenerateReport} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Generate
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{stat.label}</p>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</p>
            {stat.percent && <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>{stat.percent}</p>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', overflowX: 'auto' }}>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              style={{
                padding: '16px 20px',
                background: activeTab === tab.toLowerCase().replace(' ', '-') ? '#f0f9ff' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.toLowerCase().replace(' ', '-') ? 600 : 500,
                color: activeTab === tab.toLowerCase().replace(' ', '-') ? '#2563eb' : '#64748b',
                borderBottom: activeTab === tab.toLowerCase().replace(' ', '-') ? '2px solid #2563eb' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          {/* Summary Tab Content */}
          {activeTab === 'summary' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>1. Branch Wise Compliance Status</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>S.No</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Branch Code</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Branch Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Location</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Licenses</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Completed</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>In Progress</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Not Started</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Key Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {branchData.map((branch, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '12px 16px' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{branch.code}</td>
                      <td style={{ padding: '12px 16px' }}>{branch.name}</td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>{branch.location}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>{branch.licenses}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{branch.completed}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#f59e0b', fontWeight: 600 }}>{branch.inProgress}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{branch.notStarted}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{branch.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 style={{ margin: '32px 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>2. License Status (All Branches)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>License Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Total</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Completed</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>In Progress</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Not Started</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Renewal Due</th>
                  </tr>
                </thead>
                <tbody>
                  {licenseStatus.map((lic, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '12px 16px' }}>{lic.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>{lic.total}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{lic.completed}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#f59e0b', fontWeight: 600 }}>{lic.inProgress}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{lic.notStarted}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ec4899', fontWeight: 600 }}>{lic.renewalDue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Branch Wise Tab */}
          {activeTab === 'branch-wise' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Branch Wise Compliance Status</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Branch Code</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Branch Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Licenses</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Completed</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>In Progress</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Not Started</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Pending Docs</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {branchData.map((branch, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{branch.code}</td>
                      <td style={{ padding: '12px 16px' }}>{branch.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>{branch.licenses}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{branch.completed}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#f59e0b', fontWeight: 600 }}>{branch.inProgress}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{branch.notStarted}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>{branch.pendingDocs}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{branch.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* License Status Tab */}
          {activeTab === 'license-status' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>License Status (All Branches)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>License Name</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Total</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Completed</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>In Progress</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Not Started</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b' }}>Renewal Due</th>
                  </tr>
                </thead>
                <tbody>
                  {licenseStatus.map((lic, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '12px 16px' }}>{lic.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>{lic.total}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>{lic.completed}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#f59e0b', fontWeight: 600 }}>{lic.inProgress}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{lic.notStarted}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#ec4899', fontWeight: 600 }}>{lic.renewalDue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pending Documents Tab */}
          {activeTab === 'pending-documents' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Pending Documents</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>Total Pending: {clientData.pendingDocs} documents</p>
              <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '6px', padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>📄 Waiting for updated DT layout plan from Apollo Specialty Hospital</p>
              </div>
            </div>
          )}

          {/* Renewals Tab */}
          {activeTab === 'renewals' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Renewals Due (Next 3 Months)</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>Total: {clientData.renewalsDue} licenses due for renewal</p>
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '16px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#991b1b' }}>⚠️ Fire NOC renewal pending for all 8 branches - Deadline: 15 Nov 2026</p>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Active Applications</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>3 applications in progress</p>
              <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: '6px', padding: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1e40af', fontWeight: 600 }}>✓ Clinical Establishment Act Applications</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#1e40af' }}>Submitted to: State Health Department | Status: Under Review</p>
              </div>
            </div>
          )}

          {/* Queries Tab */}
          {activeTab === 'queries' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Open Queries</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>Total Open: {clientData.openQueries} queries</p>
              <div style={{ background: '#f3e8ff', border: '1px solid #e9d5ff', borderRadius: '6px', padding: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6b21a8', fontWeight: 600 }}>? Fire Safety Query</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b21a8' }}>Raised by: Apollo Main Hospital | Pending Response since: 5 Oct 2026</p>
              </div>
            </div>
          )}

          {/* Follow-ups Tab */}
          {activeTab === 'follow-ups' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Follow-ups Required</h3>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>2 follow-ups pending</p>
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#15803d', fontWeight: 600 }}>Follow-up with Apollo Bangalore</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#15803d' }}>Action: Submit updated PCPNDT renewal documents | Deadline: 10 Oct 2026</p>
              </div>
            </div>
          )}

          {/* Remarks Tab */}
          {activeTab === 'remarks' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Key Remarks</h3>
              <ul style={{ lineHeight: '1.8', color: '#64748b', fontSize: '14px' }}>
                <li>Overall compliance status is good at 43% completion rate</li>
                <li>Apollo Main Hospital progressing well with Fire NOC inspection scheduled</li>
                <li>PCPNDT renewal documents are being prepared for Apollo Specialty Hospital</li>
                <li>Apollo Cancer Centre awaiting DT layout plan from client for Biomedical Waste authorization</li>
                <li>No critical issues reported this week</li>
              </ul>
            </div>
          )}

          {/* Email Preview Tab */}
          {activeTab === 'email-preview' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Email Preview</h3>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '20px', fontFamily: 'monospace', fontSize: '13px', color: '#0f172a', lineHeight: '1.6' }}>
                <p><strong>To:</strong> compliance@abchospitals.com</p>
                <p><strong>Subject:</strong> Weekly Compliance Report - Week of 22-28 Sep 2026</p>
                <hr style={{ borderColor: '#e2e8f0', margin: '16px 0' }} />
                <p>Dear Client,</p>
                <p>Please find attached the weekly compliance report for ABC Hospitals for the week ending 28 Sep 2026.</p>
                <p><strong>Summary:</strong></p>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  <li>Total Licenses: 42 | Completed: 18 (43%)</li>
                  <li>In Progress: 16 | Not Started: 8</li>
                  <li>Pending Documents: 12</li>
                </ul>
                <p>Please review the attached report for detailed branch-wise and license-wise status.</p>
                <p>Best Regards,<br/>SHA Compliance Team</p>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Report History</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Date</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Report Type</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Status</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b' }}>Sent To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                    <td style={{ padding: '12px 16px' }}>28 Sep 2026</td>
                    <td style={{ padding: '12px 16px' }}>Weekly Report</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ padding: '4px 8px', background: '#dcfce7', color: '#15803d', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Sent</span></td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>compliance@abchospitals.com</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <td style={{ padding: '12px 16px' }}>21 Sep 2026</td>
                    <td style={{ padding: '12px 16px' }}>Weekly Report</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ padding: '4px 8px', background: '#dcfce7', color: '#15803d', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>Sent</span></td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>compliance@abchospitals.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
