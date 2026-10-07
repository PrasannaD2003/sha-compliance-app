import React from 'react';
import { Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const ProformaInvoicesView = () => {
  const { proformaInvoices, setActiveTab, setSelectedId } = useApp();

  const handleView = (id) => {
    setSelectedId(id);
    setActiveTab('proforma-preview');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Proforma Invoices</h1>
          <p className="page-subtitle">Track proforma invoices issued to clients.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Proforma No</th>
                <th>Quotation No</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Valid Until</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {proformaInvoices.map((p) => (
                <tr key={p.id}>
                  <td
                    style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}
                    onClick={() => handleView(p.id)}
                  >
                    {p.proformaNo || p.id}
                  </td>
                  <td>{p.quotationNo}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.clientName}</td>
                  <td>{formatDate(p.date)}</td>
                  <td>{formatDate(p.validUntil)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(p.grandTotal)}</td>
                  <td>
                    <span className="badge badge-issued">{p.status || 'Issued'}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="icon-button" title="View" onClick={() => handleView(p.id)}>
                      <Eye size={15} />
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
