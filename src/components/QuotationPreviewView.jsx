import React from 'react';
import { ArrowLeft, Edit, Printer, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDateFull } from '../utils/formatters';

export const QuotationPreviewView = () => {
  const {
    activeTab,
    setActiveTab,
    selectedId,
    quotations,
    companySettings,
    convertToProforma,
    setEditingQuotation
  } = useApp();

  const quotation = quotations.find((q) => q.id === selectedId) || quotations[0];

  if (!quotation) {
    return (
      <div className="page-container">
        <p>Quotation not found.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('quotations')}>
          Back to Quotations
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      {/* Top Header Actions */}
      <div className="page-header no-print">
        <button
          className="btn btn-outline"
          onClick={() => setActiveTab('quotations')}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-outline"
            onClick={() => {
              setEditingQuotation(quotation);
              setActiveTab('create-quotation');
            }}
          >
            <Edit size={16} /> Edit
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Printer size={16} /> Print
          </button>
          <button className="btn btn-outline" onClick={handlePrint}>
            <Download size={16} /> Download PDF
          </button>
          <button className="btn btn-secondary" onClick={() => convertToProforma(quotation)}>
            <ArrowRight size={16} /> Convert to Proforma Invoice
          </button>
        </div>
      </div>

      {/* Printable Paper View */}
      <div className="printable-paper">
        {/* Header Branding */}
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
                  fontSize: '1.25rem',
                  color: '#0f172a',
                  lineHeight: 1.1
                }}
              >
                {companySettings.name}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                {companySettings.subtitle}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>
                {companySettings.address} | Phone: {companySettings.phone} | Email: {companySettings.email} | {companySettings.website}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: '1.75rem',
                color: '#0f172a',
                letterSpacing: 1
              }}
            >
              QUOTATION
            </h1>
          </div>
        </div>

        {/* Bill To & Quotation Meta Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Bill To */}
          <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              BILL TO:
            </span>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginTop: 4 }}>
              {quotation.clientName}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569', marginTop: 2 }}>
              {quotation.contactPerson}
            </div>
            <div style={{ fontSize: '0.825rem', color: '#475569' }}>{quotation.address}</div>
            <div style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600, marginTop: 4 }}>
              GSTIN: {quotation.gstin}
            </div>
          </div>

          {/* Quotation Details Meta */}
          <div
            style={{
              background: '#f8fafc',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: '0.825rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, color: '#64748b' }}>Quotation No:</span>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>{quotation.quotationNo || quotation.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, color: '#64748b' }}>Date:</span>
              <span>{formatDateFull(quotation.date)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, color: '#64748b' }}>Valid Until:</span>
              <span>{formatDateFull(quotation.validUntil)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600, color: '#64748b' }}>Status:</span>
              <span className={`badge badge-${(quotation.status || 'draft').toLowerCase()}`}>
                {quotation.status || 'Draft'}
              </span>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <table
          className="data-table"
          style={{ border: '1px solid #e2e8f0', marginBottom: 24, fontSize: '0.8rem' }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ width: 40 }}>S.No</th>
              <th>Service / License</th>
              <th>Description</th>
              <th style={{ textAlign: 'center', width: 40 }}>Qty</th>
              <th style={{ textAlign: 'right' }}>Government Fee (₹)</th>
              <th style={{ textAlign: 'right' }}>Consultancy Fee (₹)</th>
              <th style={{ textAlign: 'center', width: 50 }}>GST</th>
              <th style={{ textAlign: 'right' }}>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {(quotation.items || []).map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td style={{ fontWeight: 700 }}>{item.serviceName}</td>
                <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.description}</td>
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

        {/* Totals & Words Block */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                Amount in Words:
              </span>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>
                {quotation.amountInWords || 'Rupees Ninety-Four Thousand Four Hundred Only'}
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                Payment Terms:
              </span>
              <div style={{ fontSize: '0.825rem', color: '#334155' }}>
                {quotation.paymentTerms || '50% Advance / 50% Completion'}
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: 16,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              fontSize: '0.825rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>
                {formatCurrency(quotation.subtotal || 85000)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discount</span>
              <span style={{ fontWeight: 600 }}>
                {formatCurrency(quotation.discount || 5000)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Taxable Amount</span>
              <span style={{ fontWeight: 600 }}>
                {formatCurrency(quotation.taxableAmount || 80000)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>CGST (9%)</span>
              <span style={{ fontWeight: 600 }}>
                {formatCurrency(quotation.cgst || 7200)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SGST (9%)</span>
              <span style={{ fontWeight: 600 }}>
                {formatCurrency(quotation.sgst || 7200)}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                fontWeight: 800,
                fontSize: '1.1rem',
                borderTop: '2px solid #cbd5e1',
                paddingTop: 8,
                color: '#0f172a'
              }}
            >
              <span>Grand Total</span>
              <span>{formatCurrency(quotation.grandTotal || 94400)}</span>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
            Terms & Conditions:
          </span>
          <ol
            style={{
              paddingLeft: 18,
              fontSize: '0.75rem',
              color: '#475569',
              lineHeight: 1.5,
              marginTop: 4
            }}
          >
            {companySettings.terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ol>
        </div>

        {/* Authorised Signatory Stamp Area */}
        <div
          style={{
            display: 'flex',
            justify: 'flex-end',
            marginTop: 40,
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ borderBottom: '1px solid #94a3b8', width: 180, height: 40 }}></div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginTop: 6 }}>
              For SHA COMPLIANCE & SERVICES
            </p>
            <p style={{ fontSize: '0.65rem', color: '#64748b' }}>Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  );
};
