import React, { useState } from 'react';
import { Check, PhoneCall, MessageSquare, Plus, Clock } from 'lucide-react';
import { initialDailyFollowups } from '../../data/reportsData';
import { formatDate } from '../../utils/formatters';

export const DailyFollowUpReportView = () => {
  const [filter, setFilter] = useState('All');
  const [followups, setFollowups] = useState(initialDailyFollowups);

  const filtered = followups.filter((f) => {
    if (filter === 'All') return true;
    if (filter === 'Today\'s Tasks') return f.dueDate === '2026-09-29';
    return f.status === filter;
  });

  const handleMarkComplete = (id) => {
    setFollowups(followups.map((f) => (f.id === id ? { ...f, status: 'Completed' } : f)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div><div className="stat-title">TODAY'S TASKS</div><div className="stat-value">12</div></div>
          <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><Clock size={22} /></div>
        </div>
        <div className="stat-card">
          <div><div className="stat-title">COMPLETED</div><div className="stat-value" style={{ color: '#16a34a' }}>4</div></div>
          <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><Check size={22} /></div>
        </div>
        <div className="stat-card">
          <div><div className="stat-title">PENDING</div><div className="stat-value" style={{ color: '#ea580c' }}>6</div></div>
          <div className="stat-icon" style={{ background: '#fff7ed', color: '#ea580c' }}><Clock size={22} /></div>
        </div>
        <div className="stat-card">
          <div><div className="stat-title">OVERDUE</div><div className="stat-value" style={{ color: '#dc2626' }}>2</div></div>
          <div className="stat-icon" style={{ background: '#fef2f2', color: '#dc2626' }}><Clock size={22} /></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
          <h3 className="card-title">Daily Staff Follow-up Log</h3>

          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Today\'s Tasks', 'Pending', 'Completed', 'Overdue'].map((t) => (
              <button
                key={t}
                className={`btn ${filter === t ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => setFilter(t)}
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
                <th>Follow-up ID</th>
                <th>Client</th>
                <th>License</th>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Last Follow-up</th>
                <th>Next Follow-up</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600, color: '#64748b' }}>{row.followupId}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.client}</td>
                  <td><span className="badge badge-sent">{row.license}</span></td>
                  <td>{row.task}</td>
                  <td style={{ fontWeight: 600 }}>{row.assignedTo}</td>
                  <td>
                    <span className={`badge badge-${row.priority === 'High' ? 'overdue' : 'pending'}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td>{formatDate(row.dueDate)}</td>
                  <td>
                    <span className={`badge badge-${row.status === 'Completed' ? 'paid' : row.status === 'Overdue' ? 'overdue' : 'pending'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{formatDate(row.lastFollowup)}</td>
                  <td style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb' }}>{formatDate(row.nextFollowup)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                      <button className="icon-button" title="Call"><PhoneCall size={14} /></button>
                      <button className="icon-button" title="Message"><MessageSquare size={14} /></button>
                      <button className="icon-button" title="Complete" onClick={() => handleMarkComplete(row.id)}><Check size={14} style={{ color: '#10b981' }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
