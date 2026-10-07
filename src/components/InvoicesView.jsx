import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const InvoicesView = () => {
  const {
    invoices,
    setActiveTab,
    setSelectedId,
    setIsRecordPaymentModalOpen,
    setPaymentTargetInvoice
  } = useApp();

  const handleView = (id) => {
    setSelectedId(id);
    setActiveTab('invoice-preview');
  };

  const handleRecordPayment = (inv) => {
    setPaymentTargetInvoice(inv);
    setIsRecordPaymentModalOpen(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tax Invoices</h1>
          <p className="page-subtitle">Track billed invoices and client payments.</p>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Grand Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td
                    style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}
                    onClick={() => handleView(inv.id)}
                  >
                    {inv.invoiceNo || inv.id}
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{inv.clientName}</td>
                  <td>{formatDate(inv.date)}</td>
                  <td>{formatDate(inv.dueDate)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(inv.grandTotal)}</td>
                  <td style={{ color: '#16a34a', fontWeight: 600 }}>
                    {formatCurrency(inv.amountReceived || 0)}
                  </td>
                  <td style={{ color: '#ef4444', fontWeight: 600 }}>
                    {formatCurrency(inv.balanceAmount ?? inv.grandTotal)}
                  </td>
                  <td>
                    <span
                      className={`badge badge-${
                        inv.status === 'Paid'
                          ? 'paid'
                          : inv.status === 'Partially Paid'
                          ? 'partial'
                          : 'pending'
                      }`}
                    >
                      {inv.status || 'Unpaid'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <button className="icon-button" title="View" onClick={() => handleView(inv.id)}>
                        <Eye size={15} />
                      </button>
                      {inv.status !== 'Paid' && (
                        <button
                          className="btn btn-outline"
                          style={{ padding: '4px 8px', fontSize: '0.725rem' }}
                          onClick={() => handleRecordPayment(inv)}
                        >
                          <Plus size={12} /> Pay
                        </button>
                      )}
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
