import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/formatters';

export const LicenseStatusReportView = () => {
  const { clientLicenses, setSelectedClientId, setActiveTab } = useApp();

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId);
    setActiveTab('client-profile');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Full Healthcare License Status Audit</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>License ID</th>
                <th>License Name</th>
                <th>Client</th>
                <th>Governing Authority</th>
                <th>Application Date</th>
                <th>Target Approval</th>
                <th>Responsible Person</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clientLicenses.map((lic) => (
                <tr key={lic.id}>
                  <td style={{ fontWeight: 600, color: '#64748b' }}>{lic.id}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{lic.licenseName}</td>
                  <td style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }} onClick={() => handleClientClick(lic.clientId)}>
                    ABC Multispeciality Hospital
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>{lic.governingAuthority}</td>
                  <td>{formatDate(lic.applicationDate)}</td>
                  <td>{formatDate(lic.targetApprovalDate)}</td>
                  <td>{lic.responsiblePerson}</td>
                  <td>
                    <span className={`badge badge-${lic.stage === 'Completed' ? 'paid' : lic.stage === 'In Progress' ? 'sent' : 'draft'}`}>
                      {lic.status}
                    </span>
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
