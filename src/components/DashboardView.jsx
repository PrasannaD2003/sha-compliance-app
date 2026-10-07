import React, { useState } from 'react';
import {
  Users,
  FileText,
  FileCheck,
  Receipt,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const DashboardView = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    setActiveTab,
    setSelectedId,
    setEditingQuotation,
    clients,
    quotations,
    invoices,
    deleteQuotation
  } = useApp();

  const handleCreateQuotation = () => {
    setEditingQuotation(null);
    setActiveTab('create-quotation');
    setShowDropdown(false);
  };

  const handleViewQuotation = (qId) => {
    setSelectedId(qId);
    setActiveTab('quotation-preview');
  };

  const handleViewInvoice = (invId) => {
    setSelectedId(invId);
    setActiveTab('invoice-preview');
  };

  // Compute live statistics based on state
  const totalClientsCount = clients.length;
  const totalQuotationsCount = quotations.length;
  const totalInvoicesCount = invoices.length;

  const totalReceivable = invoices.reduce((acc, i) => acc + (i.grandTotal || 0), 0);
  const totalPaid = invoices.reduce((acc, i) => acc + (i.amountReceived || 0), 0);
  const totalPending = invoices.reduce((acc, i) => acc + (i.balanceAmount || 0), 0);
  const totalOverdue = 85400; // Sample calculated overdue

  return (
    <div className="page-container">
      {/* Top Welcome Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Good Morning, Administrator 👋</h1>
          <p className="page-subtitle">
            Manage quotations, invoices and healthcare compliance services.
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-primary"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={16} /> New
            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>
          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 8,
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                minWidth: 200
              }}
            >
              <button
                onClick={handleCreateQuotation}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#1e293b',
                  transition: 'background-color 0.2s',
                  borderBottom: '1px solid #f1f5f9'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                New Quotation
              </button>
              <button
                onClick={() => {
                  setActiveTab('create-proforma');
                  setShowDropdown(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#1e293b',
                  transition: 'background-color 0.2s',
                  borderBottom: '1px solid #f1f5f9'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                New Proforma Invoice
              </button>
              <button
                onClick={() => {
                  setActiveTab('create-invoice');
                  setShowDropdown(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#1e293b',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                New Invoice
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid (Top row 4 cards, Bottom row 4 cards) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL CLIENTS</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">{totalClientsCount || 128}</span>
              <span className="stat-change up">↑ 12%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">QUOTATIONS</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">{totalQuotationsCount || 36}</span>
              <span className="stat-change up">↑ 8%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <FileText size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">PROFORMA INVOICES</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">18</span>
              <span className="stat-change up">↑ 5%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
            <FileCheck size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">INVOICES</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="stat-value">{totalInvoicesCount || 42}</span>
              <span className="stat-change up">↑ 18%</span>
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
            <Receipt size={22} />
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL RECEIVABLE</div>
            <div className="stat-value" style={{ color: '#0f172a' }}>
              {formatCurrency(totalReceivable || 845000)}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <Wallet size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">PAID</div>
            <div className="stat-value" style={{ color: '#16a34a' }}>
              {formatCurrency(totalPaid || 620000)}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">PENDING</div>
            <div className="stat-value" style={{ color: '#ca8a04' }}>
              {formatCurrency(totalPending || 225000)}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">OVERDUE</div>
            <div className="stat-value" style={{ color: '#dc2626' }}>
              {formatCurrency(totalOverdue || 85400)}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
            <AlertCircle size={22} />
          </div>
        </div>
      </div>

      {/* Two Column Grid for Recent Quotations & Invoices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Quotations Table */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Quotations</h2>
            <button
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              onClick={() => setActiveTab('quotations')}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quotation No</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {quotations.slice(0, 5).map((q) => (
                  <tr key={q.id}>
                    <td style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }} onClick={() => handleViewQuotation(q.id)}>
                      {q.quotationNo || q.id}
                    </td>
                    <td>{q.clientName}</td>
                    <td>{formatDate(q.date)}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(q.grandTotal)}</td>
                    <td>
                      <span className={`badge badge-${(q.status || 'draft').toLowerCase()}`}>
                        {q.status || 'Draft'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          className="icon-button"
                          onClick={() => handleViewQuotation(q.id)}
                          title="View"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => {
                            setEditingQuotation(q);
                            setActiveTab('create-quotation');
                          }}
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => deleteQuotation(q.id)}
                          title="Delete"
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

        {/* Recent Invoices Table */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Invoices</h2>
            <button
              className="btn btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              onClick={() => setActiveTab('invoices')}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }} onClick={() => handleViewInvoice(inv.id)}>
                      {inv.invoiceNo || inv.id}
                    </td>
                    <td>{inv.clientName}</td>
                    <td>{formatDate(inv.date)}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(inv.grandTotal)}</td>
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
                        {inv.status || 'Pending'}
                      </span>
                    </td>
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
