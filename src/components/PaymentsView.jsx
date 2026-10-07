import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export const PaymentsView = () => {
  const { payments } = useApp();

  const totalCollected = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments Log</h1>
          <p className="page-subtitle">Track payment receipts and transaction records.</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL COLLECTED</div>
            <div className="stat-value" style={{ color: '#16a34a' }}>
              {formatCurrency(totalCollected)}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <div className="stat-title">PAYMENT TRANSACTIONS</div>
            <div className="stat-value">{payments.length}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <CreditCard size={22} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Invoice No</th>
                <th>Client Name</th>
                <th>Date</th>
                <th>Amount Received</th>
                <th>Method</th>
                <th>Ref / Transaction No</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: '#64748b' }}>{p.id}</td>
                  <td style={{ fontWeight: 600, color: '#2563eb' }}>{p.invoiceNo}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.clientName}</td>
                  <td>{formatDate(p.date)}</td>
                  <td style={{ fontWeight: 700, color: '#16a34a' }}>{formatCurrency(p.amount)}</td>
                  <td>
                    <span className="badge badge-paid" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                      {p.method}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.refNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
