import React from 'react';
import { upcomingRenewalsData } from '../../data/reportsData';
import { formatDate } from '../../utils/formatters';

export const RenewalReportView = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Upcoming Renewals Report (Next 3 Months)</h3></div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>License Title</th>
                <th>Renewal Date</th>
                <th>Days Remaining</th>
                <th>Responsible Person</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {upcomingRenewalsData.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.client}</td>
                  <td style={{ fontWeight: 600 }}>{row.license}</td>
                  <td>{formatDate(row.renewalDate)}</td>
                  <td style={{ fontWeight: 700, color: row.daysLeft <= 30 ? '#ef4444' : '#ea580c' }}>
                    {row.daysLeft} Days
                  </td>
                  <td>{row.person}</td>
                  <td>
                    <span className={`badge badge-${row.daysLeft <= 30 ? 'overdue' : 'pending'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.725rem' }}>
                      Start Renewal
                    </button>
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
