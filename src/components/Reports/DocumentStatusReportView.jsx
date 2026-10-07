import React from 'react';
import { pendingDocumentsReportData } from '../../data/reportsData';
import { formatDate } from '../../utils/formatters';
import { DonutChart } from './Charts/DonutChart';

export const DocumentStatusReportView = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 className="card-title" style={{ marginBottom: 14 }}>Collection Breakdown</h3>
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

        <div className="card">
          <div className="card-header"><h3 className="card-title">Pending Document Audit Report</h3></div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Document</th>
                  <th>License</th>
                  <th>Assigned Person</th>
                  <th>Requested Date</th>
                  <th>Due Date</th>
                  <th>Days Pending</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingDocumentsReportData.map((doc) => (
                  <tr key={doc.id}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{doc.client}</td>
                    <td style={{ fontWeight: 700, color: '#dc2626' }}>{doc.document}</td>
                    <td><span className="badge badge-sent">{doc.license}</span></td>
                    <td>{doc.assignedTo}</td>
                    <td>{formatDate(doc.requestedDate)}</td>
                    <td>{formatDate(doc.dueDate)}</td>
                    <td style={{ fontWeight: 700, color: '#dc2626' }}>{doc.daysPending} Days</td>
                    <td><span className="badge badge-overdue">{doc.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
