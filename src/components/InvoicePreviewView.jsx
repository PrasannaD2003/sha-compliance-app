import React from 'react';
import { ArrowLeft, Edit, Printer, Download, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDateFull, formatDate } from '../utils/formatters';

export const InvoicePreviewView = () => {
  const {
    setActiveTab,
    selectedId,
    invoices,
    payments,
    companySettings,
    setIsRecordPaymentModalOpen,
    setPaymentTargetInvoice
  } = useApp();

  const invoice = invoices.find((i) => i.id === selectedId) || invoices[0];

  if (!invoice) {
    return (
      <div className="page-container">
        <p>Invoice not found.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('invoices')}>
          Back to Invoices
        </button>
      </div>
    );
  }

  const invoicePayments = payments.filter((p) => p.invoiceNo === (invoice.invoiceNo || invoice.id));

  const handleOpenRecordPayment = () => {
    setPaymentTargetInvoice(invoice);
    setIsRecordPaymentModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      {/* Top Actions */}
      <div className="page-header no-print">
        <button
          className="btn btn-outline"
          onClick={() => setActiveTab('invoices')}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Edit size={16} /> Edit
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} /> Print
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Download size={16} /> Download PDF
          </button>
          <button className="btn btn-success" onClick={handleOpenRecordPayment}>
            <Plus size={16} /> + Record Payment
          </button>
        </div>
      </div>

      {/* Grid: Left Printable Invoice + Right Payment Side Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
        {/* Printable Tax Invoice Paper */}
        <div className="printable-paper" style={{ margin: 0 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid #0f172a',
              paddingBottom: 20,
              marginBottom: 24
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="logo-icon" style={{ width: 48, height: 48, borderRadius: 10 }}>
                <ShieldCheck size={30} />
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    color: '#0f172a',
                    lineHeight: 1.1
                  }}
                >
                  {companySettings.name}
                </h2>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  {companySettings.subtitle}
                </p>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>
                  {companySettings.address} | GSTIN: {companySettings.gstin}
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h1
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: '#0f172a',
                  letterSpacing: 0.5
                }}
              >
                TAX INVOICE
              </h1>
            </div>
          </div>

          {/* Bill To & Meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                BILL TO:
              </span>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a', marginTop: 4 }}>
                {invoice.clientName}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>{invoice.contactPerson}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>{invoice.address}</div>
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, marginTop: 4 }}>
                GSTIN: {invoice.gstin}
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: 14,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#64748b' }}>Invoice No:</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{invoice.invoiceNo || invoice.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#64748b' }}>Date:</span>
                <span>{formatDateFull(invoice.date)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#64748b' }}>Due Date:</span>
                <span>{formatDateFull(invoice.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <table
            className="data-table"
            style={{ border: '1px solid #e2e8f0', marginBottom: 20, fontSize: '0.775rem' }}
          >
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ width: 35 }}>S.No</th>
                <th>Service / License</th>
                <th>Description</th>
                <th style={{ textAlign: 'center', width: 35 }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Government Fee</th>
                <th style={{ textAlign: 'right' }}>Consultancy Fee</th>
                <th style={{ textAlign: 'center', width: 45 }}>GST</th>
                <th style={{ textAlign: 'right' }}>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {(invoice.items || []).map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 700 }}>{item.serviceName}</td>
                  <td style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.description}</td>
                  <td style={{ textAlign: 'center' }}>{item.qty || 1}</td>
                  <td style={{ textAlign: 'right' }}>{item.govtFee?.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right' }}>{item.consultancyFee?.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'center' }}>{item.gstRate || 18}%</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>
                    {item.total?.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bank Details & Totals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                BANK DETAILS FOR PAYMENT:
              </span>
              <div style={{ fontSize: '0.775rem', marginTop: 4, lineHeight: 1.5, color: '#334155' }}>
                <div><strong>Bank:</strong> {companySettings.bankName}</div>
                <div><strong>Account No:</strong> {companySettings.accountNo}</div>
                <div><strong>IFSC:</strong> {companySettings.ifsc}</div>
                <div><strong>Branch:</strong> {companySettings.branch}</div>
                <div><strong>UPI ID:</strong> {companySettings.upiId}</div>
              </div>
            </div>

            <div
              style={{
                background: '#f8fafc',
                padding: 14,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                fontSize: '0.8rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>{formatCurrency(invoice.subtotal || 85000)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Discount</span>
                <span>{formatCurrency(invoice.discount || 5000)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Taxable Amount</span>
                <span>{formatCurrency(invoice.taxableAmount || 80000)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>CGST (9%)</span>
                <span>{formatCurrency(invoice.cgst || 7200)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>SGST (9%)</span>
                <span>{formatCurrency(invoice.sgst || 7200)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  borderTop: '2px solid #cbd5e1',
                  paddingTop: 6,
                  color: '#0f172a'
                }}
              >
                <span>Grand Total</span>
                <span>{formatCurrency(invoice.grandTotal || 94400)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Panel: Payment Details & History */}
        <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Payment Summary Card */}
          <div className="card" style={{ padding: 20 }}>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: 16
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                Payment Details
              </h3>
              <span
                className={`badge badge-${
                  invoice.status === 'Paid'
                    ? 'paid'
                    : invoice.status === 'Partially Paid'
                    ? 'partial'
                    : 'pending'
                }`}
              >
                {invoice.status || 'Unpaid'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Invoice Amount</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(invoice.grandTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Amount Received</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>
                  {formatCurrency(invoice.amountReceived || 0)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Balance Amount</span>
                <span style={{ fontWeight: 700, color: '#ef4444' }}>
                  {formatCurrency(invoice.balanceAmount ?? invoice.grandTotal)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Payment Status</span>
                <span
                  style={{
                    fontWeight: 700,
                    color:
                      invoice.status === 'Paid'
                        ? '#16a34a'
                        : invoice.status === 'Partially Paid'
                        ? '#ea580c'
                        : '#dc2626'
                  }}
                >
                  {invoice.status || 'Unpaid'}
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 20, justifyContent: 'center' }}
              onClick={handleOpenRecordPayment}
            >
              <Plus size={16} /> + Record Payment
            </button>
          </div>

          {/* Payment History Card */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
              Payment History
            </h3>

            {invoicePayments.length === 0 ? (
              <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>No payment records found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {invoicePayments.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      fontSize: '0.825rem',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: 10
                    }}
                  >
                    <div style={{ color: '#10b981', marginTop: 2 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>
                          {formatCurrency(p.amount)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {formatDate(p.date)}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                        Method: <strong style={{ color: '#334155' }}>{p.method}</strong> | Ref:{' '}
                        {p.refNo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
