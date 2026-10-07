import React from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const QuotationsView = () => {
  const {
    quotations,
    setActiveTab,
    setSelectedId,
    setEditingQuotation,
    deleteQuotation
  } = useApp();

  const handleCreateNew = () => {
    setEditingQuotation(null);
    setActiveTab('create-quotation');
  };

  const handleView = (qId) => {
    setSelectedId(qId);
    setActiveTab('quotation-preview');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quotations</h1>
          <p className="page-subtitle">Manage client quotations and pricing proposals.</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          <Plus size={16} /> + New Quotation
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
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
              {quotations.map((q) => (
                <tr key={q.id}>
                  <td
                    style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}
                    onClick={() => handleView(q.id)}
                  >
                    {q.quotationNo || q.id}
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{q.clientName}</td>
                  <td>{formatDate(q.date)}</td>
                  <td>{formatDate(q.validUntil)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(q.grandTotal)}</td>
                  <td>
                    <span className={`badge badge-${(q.status || 'draft').toLowerCase()}`}>
                      {q.status || 'Draft'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <button className="icon-button" title="View" onClick={() => handleView(q.id)}>
                        <Eye size={15} />
                      </button>
                      <button
                        className="icon-button"
                        title="Edit"
                        onClick={() => {
                          setEditingQuotation(q);
                          setActiveTab('create-quotation');
                        }}
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        className="icon-button"
                        title="Delete"
                        onClick={() => deleteQuotation(q.id)}
                      >
                        <Trash2 size={15} style={{ color: '#ef4444' }} />
                      </button>
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
