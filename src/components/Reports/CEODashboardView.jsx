import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  PhoneCall,
  MessageSquare,
  Eye,
  Check,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Download,
  Printer,
  Share2,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { DonutChart } from './Charts/DonutChart';
import { BarChart } from './Charts/BarChart';
import {
  initialDailyFollowups,
  monthlyProgressData,
  upcomingRenewalsData,
  licenseStatusByClientData,
  licenseWiseStatusData,
  pendingDocumentsReportData,
  actionRequiredData,
  todayActivityTimeline
} from '../../data/reportsData';

export const CEODashboardView = ({ onSelectReportTab, onOpenPdfModal }) => {
  const { setActiveTab, setSelectedClientId } = useApp();

  const [dateRange, setDateRange] = useState('Today');
  const [followupFilter, setFollowupFilter] = useState('All');
  const [followupsList, setFollowupsList] = useState(initialDailyFollowups);

  const filteredFollowups = followupsList.filter((f) => {
    if (followupFilter === 'All') return true;
    return f.type === followupFilter;
  });

  const handleCompleteFollowup = (id) => {
    setFollowupsList(
      followupsList.map((f) => (f.id === id ? { ...f, status: 'Completed' } : f))
    );
  };

  const handleNavToClient = (clientName) => {
    setSelectedClientId('CL-0001');
    setActiveTab('client-profile');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">CEO Dashboard</h1>
          <p className="page-subtitle">
            Complete executive overview of business, licenses, compliance and daily follow-ups.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Today: <strong>29 September 2026</strong>
          </div>

          <select
            className="form-control"
            style={{ width: 140, padding: '6px 10px', fontSize: '0.8rem' }}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Quarter">This Quarter</option>
            <option value="This Year">This Year</option>
            <option value="Custom">Custom Date Range</option>
          </select>

          <button className="btn btn-primary" onClick={onOpenPdfModal}>
            <Printer size={15} /> Generate CEO Report
          </button>
        </div>
      </div>

      {/* 17. CEO DAILY SUMMARY COMPACT BANNER (At Top) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: 'white',
          borderRadius: 12,
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: '#38bdf8' }}>
            TODAY – 29 SEPTEMBER 2026 EXECUTIVE SUMMARY
          </span>
          <span className="badge badge-accepted" style={{ fontSize: '0.7rem' }}>Live Operational Status</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
            fontSize: '0.825rem',
            alignItems: 'center',
            lineHeight: 1.6
          }}
        >
          <div><strong>12</strong> Follow-ups</div>
          <div style={{ color: '#4ade80' }}><strong>4</strong> Completed</div>
          <div style={{ color: '#fbbf24' }}><strong>6</strong> Pending</div>
          <div style={{ color: '#f87171' }}><strong>2</strong> Overdue</div>
          <span style={{ opacity: 0.3 }}>|</span>
          <div><strong>5</strong> Documents Received</div>
          <div><strong>3</strong> Applications Submitted</div>
          <div style={{ color: '#fbbf24' }}><strong>2</strong> Queries Raised</div>
          <div style={{ color: '#4ade80' }}><strong>1</strong> License Approved</div>
          <div style={{ color: '#f87171' }}><strong>2</strong> Renewals Due</div>
          <span style={{ opacity: 0.3 }}>|</span>
          <div style={{ color: '#38bdf8', fontWeight: 700 }}>₹50,000 Payment Received</div>
        </div>
      </div>

      {/* 18. CEO ALERTS PANEL */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}
          onClick={() => onSelectReportTab('document-status')}
        >
          🔴 3 documents overdue
        </div>
        <div
          style={{
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#9a3412',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}
          onClick={() => onSelectReportTab('renewal-report')}
        >
          🟠 2 license renewals due within 30 days
        </div>
        <div
          style={{
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            color: '#9a3412',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}
          onClick={() => onSelectReportTab('daily-followup')}
        >
          🟠 6 client follow-ups pending today
        </div>
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}
          onClick={() => onSelectReportTab('license-status')}
        >
          🔴 2 applications waiting for query response
        </div>
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer'
          }}
          onClick={() => onSelectReportTab('license-status')}
        >
          🟢 1 license approved today
        </div>
      </div>

      {/* 3. TOP 8 CLICKABLE KPI CARDS */}
      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('clients')}>
          <div>
            <div className="stat-title">TOTAL CLIENTS</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">128</span>
              <span className="stat-change up">+14 this month</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><Users size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('license-status')}>
          <div>
            <div className="stat-title">TOTAL LICENSES</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">186</span>
              <span className="stat-change up">+12 this month</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><ShieldCheck size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('license-status')}>
          <div>
            <div className="stat-title">COMPLETED</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value" style={{ color: '#16a34a' }}>92</span>
              <span className="stat-change up">49%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('license-status')}>
          <div>
            <div className="stat-title">IN PROGRESS</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value" style={{ color: '#ea580c' }}>58</span>
              <span className="stat-change up" style={{ background: '#ffedd5', color: '#c2410c' }}>31%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#fff7ed', color: '#ea580c' }}><Clock size={22} /></div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('license-status')}>
          <div>
            <div className="stat-title">NOT STARTED</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value" style={{ color: '#64748b' }}>26</span>
              <span className="stat-change" style={{ background: '#f1f5f9', color: '#475569' }}>14%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#f1f5f9', color: '#64748b' }}><FileText size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('document-status')}>
          <div>
            <div className="stat-title">PENDING DOCUMENTS</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value" style={{ color: '#dc2626' }}>37</span>
              <span className="stat-change" style={{ background: '#fef2f2', color: '#dc2626' }}>Needs Follow-up</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#fef2f2', color: '#dc2626' }}><AlertCircle size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('renewal-report')}>
          <div>
            <div className="stat-title">RENEWALS DUE</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value" style={{ color: '#ca8a04' }}>12</span>
              <span className="stat-change" style={{ background: '#fefce8', color: '#ca8a04' }}>Next 3 Months</span>
            </div>
          </div>
          <div className="stat-icon" style={{ background: '#fefce8', color: '#ca8a04' }}><Calendar size={22} /></div>
        </div>

        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => onSelectReportTab('financial-report')}>
          <div>
            <div className="stat-title">PENDING PAYMENTS</div>
            <div className="stat-value" style={{ color: '#dc2626' }}>{formatCurrency(221400)}</div>
          </div>
          <div className="stat-icon" style={{ background: '#fef2f2', color: '#dc2626' }}><DollarSign size={22} /></div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 24 }}>
        {/* 4. LICENSE STATUS OVERVIEW (Donut Chart) */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>License Status Overview</h3>
          <DonutChart
            data={[
              { label: 'Completed', value: 92, color: '#10b981' },
              { label: 'In Progress', value: 58, color: '#2563eb' },
              { label: 'Not Started', value: 26, color: '#94a3b8' },
              { label: 'Expired', value: 6, color: '#f59e0b' },
              { label: 'Rejected', value: 4, color: '#ef4444' }
            ]}
            totalText="Total Licenses"
            totalNumber={186}
          />
        </div>

        {/* 5. MONTHLY LICENSE PROGRESS (Bar Chart) */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Monthly License Progress (Apr - Sep)</h3>
          <BarChart data={monthlyProgressData} />
        </div>

        {/* 6. DOCUMENT COLLECTION STATUS (Donut Chart) */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Document Collection Status</h3>
          <DonutChart
            data={[
              { label: 'Submitted', value: 912, color: '#10b981' },
              { label: 'Pending', value: 212, color: '#ef4444' },
              { label: 'Under Review', value: 68, color: '#f59e0b' },
              { label: 'Rejected', value: 28, color: '#6b7280' },
              { label: 'Not Required', value: 20, color: '#cbd5e1' }
            ]}
            totalText="Total Documents"
            totalNumber={1240}
          />
        </div>
      </div>

      {/* 7. TODAY'S FOLLOW-UP SECTION */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 className="card-title">Today's Follow-up</h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>12 Follow-ups scheduled today</span>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Documents', 'Applications', 'Queries', 'Renewals'].map((t) => (
              <button
                key={t}
                className={`btn ${followupFilter === t ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => setFollowupFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Client</th>
                <th>Task / Follow-up</th>
                <th>License</th>
                <th>Due Date</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFollowups.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a', cursor: 'pointer' }} onClick={() => handleNavToClient(item.client)}>
                    {item.client}
                  </td>
                  <td>{item.task}</td>
                  <td><span className="badge badge-sent">{item.license}</span></td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td style={{ fontWeight: 600 }}>{item.assignedTo}</td>
                  <td>
                    <span className={`badge badge-${item.status === 'Completed' ? 'paid' : item.status === 'Overdue' ? 'overdue' : 'pending'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                      <button className="icon-button" title="Call Client"><PhoneCall size={14} /></button>
                      <button className="icon-button" title="Send WhatsApp Message"><MessageSquare size={14} /></button>
                      <button className="icon-button" title="Mark Complete" onClick={() => handleCompleteFollowup(item.id)}><Check size={14} style={{ color: '#10b981' }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TWO COLUMN SECTION: TODAY'S ACTIVITY & UPCOMING RENEWALS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24 }}>
        {/* 9. TODAY'S ACTIVITY TIMELINE */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Today's Activity Feed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {todayActivityTimeline.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, fontSize: '0.8rem', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                <span style={{ fontWeight: 700, color: '#2563eb', minWidth: 65 }}>{act.time}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{act.event}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{act.detail} | {act.person}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. UPCOMING LICENSE RENEWALS (NEXT 3 MONTHS) */}
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Upcoming Renewals – Next 3 Months</h3>
          <table className="data-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th>Client</th>
                <th>License</th>
                <th>Renewal Date</th>
                <th>Days Left</th>
                <th>Person</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingRenewalsData.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{r.client}</td>
                  <td>{r.license}</td>
                  <td>{formatDate(r.renewalDate)}</td>
                  <td style={{ fontWeight: 700, color: r.daysLeft <= 30 ? '#ef4444' : '#ea580c' }}>
                    {r.daysLeft} Days
                  </td>
                  <td>{r.person}</td>
                  <td>
                    <span className={`badge badge-${r.daysLeft <= 30 ? 'overdue' : 'pending'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 11 & 12. CLIENT-WISE & LICENSE-WISE BREAKDOWN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Client-wise Status Table */}
        <div className="card">
          <div className="card-header"><h3 className="card-title">License Status by Client</h3></div>
          <table className="data-table">
            <thead>
              <tr><th>Client</th><th style={{ textAlign: 'center' }}>Total</th><th style={{ textAlign: 'center' }}>Completed</th><th style={{ textAlign: 'center' }}>In Progress</th><th style={{ textAlign: 'center' }}>Overdue</th></tr>
            </thead>
            <tbody>
              {licenseStatusByClientData.map((row, idx) => (
                <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => handleNavToClient(row.client)}>
                  <td style={{ fontWeight: 700, color: '#2563eb' }}>{row.client}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.total}</td>
                  <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>{row.completed}</td>
                  <td style={{ textAlign: 'center', color: '#ea580c', fontWeight: 700 }}>{row.inProgress}</td>
                  <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{row.overdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* License-wise Status Table */}
        <div className="card">
          <div className="card-header"><h3 className="card-title">License-wise Status</h3></div>
          <table className="data-table">
            <thead>
              <tr><th>License Type</th><th style={{ textAlign: 'center' }}>Total</th><th style={{ textAlign: 'center' }}>Completed</th><th style={{ textAlign: 'center' }}>In Progress</th><th style={{ textAlign: 'center' }}>Overdue</th></tr>
            </thead>
            <tbody>
              {licenseWiseStatusData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.license}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{row.total}</td>
                  <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>{row.completed}</td>
                  <td style={{ textAlign: 'center', color: '#ea580c', fontWeight: 700 }}>{row.inProgress}</td>
                  <td style={{ textAlign: 'center', color: '#dc2626', fontWeight: 700 }}>{row.overdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 22. ACTION REQUIRED SECTION (At Bottom) */}
      <div className="card" style={{ padding: 20, borderTop: '3px solid #dc2626' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#dc2626', marginBottom: 14 }}>
          ⚡ ACTION REQUIRED (CEO HIGH PRIORITY ITEMS)
        </h3>
        <table className="data-table">
          <thead>
            <tr><th>Client</th><th>Issue / Required Action</th><th>Responsible Person</th><th>Due Date</th><th>Priority</th><th style={{ textAlign: 'center' }}>Action</th></tr>
          </thead>
          <tbody>
            {actionRequiredData.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{item.client}</td>
                <td style={{ fontWeight: 600, color: '#dc2626' }}>{item.issue}</td>
                <td>{item.person}</td>
                <td>{formatDate(item.dueDate)}</td>
                <td><span className="badge badge-overdue">{item.priority}</span></td>
                <td style={{ textAlign: 'center' }}>
                  <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.725rem' }} onClick={() => handleNavToClient(item.client)}>
                    <Eye size={12} /> View Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
