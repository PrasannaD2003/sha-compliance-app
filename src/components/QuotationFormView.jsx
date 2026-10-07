import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Download, Plus, Trash2, Settings, X, Eye as EyeIcon, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, numberToWords } from '../utils/formatters';

export const QuotationFormView = () => {
  const {
    setActiveTab,
    setSelectedId,
    clients,
    services,
    editingQuotation,
    saveQuotation,
    companySettings
  } = useApp();

  const isEdit = Boolean(editingQuotation);

  // Form states
  const [quotationNo, setQuotationNo] = useState(
    editingQuotation?.quotationNo || `QTN-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`
  );
  const [date, setDate] = useState(editingQuotation?.date || new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState(
    editingQuotation?.validUntil ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState(editingQuotation?.status || 'Draft');

  // Client states
  const [selectedClientId, setSelectedClientId] = useState(
    editingQuotation?.clientId || clients[0]?.id || ''
  );
  const [clientData, setClientData] = useState({
    name: editingQuotation?.clientName || clients[0]?.name || '',
    contactPerson: editingQuotation?.contactPerson || clients[0]?.contactPerson || '',
    phone: editingQuotation?.phone || clients[0]?.phone || '',
    email: editingQuotation?.email || clients[0]?.email || '',
    gstin: editingQuotation?.gstin || clients[0]?.gstin || '',
    address: editingQuotation?.address || clients[0]?.address || ''
  });

  // Services Items State
  const [items, setItems] = useState(
    editingQuotation?.items || [
      {
        id: 1,
        serviceName: 'Fire NOC Consultancy',
        description: 'Fire safety documentation and application support',
        qty: 1,
        govtFee: 15000,
        consultancyFee: 20000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 2,
        serviceName: 'Clinical Establishment Act (CEA)',
        description: 'CEA registration documentation and application support',
        qty: 1,
        govtFee: 10000,
        consultancyFee: 25000,
        gstRate: 18,
        total: 41300
      },
      {
        id: 3,
        serviceName: 'Biomedical Waste Authorization',
        description: 'Documentation and compliance support',
        qty: 1,
        govtFee: 5000,
        consultancyFee: 10000,
        gstRate: 18,
        total: 17700
      }
    ]
  );

  const [discount, setDiscount] = useState(editingQuotation?.discount ?? 5000);
  const [paymentTerms, setPaymentTerms] = useState(
    editingQuotation?.paymentTerms || '50% Advance / 50% Completion'
  );

  // Column customization state
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [columnLabels, setColumnLabels] = useState({
    serviceName: 'Service / License',
    description: 'Description',
    qty: 'Qty',
    govtFee: 'Government Fee',
    consultancyFee: 'Consultancy Fee',
    gstRate: 'GST',
    total: 'Total'
  });
  const [visibleColumns, setVisibleColumns] = useState({
    serviceName: true,
    description: true,
    qty: true,
    govtFee: true,
    consultancyFee: true,
    gstRate: true,
    total: true
  });

  // When client dropdown changes, sync client details
  useEffect(() => {
    const selected = clients.find((c) => c.id === selectedClientId);
    if (selected) {
      setClientData({
        name: selected.name,
        contactPerson: selected.contactPerson,
        phone: selected.phone,
        email: selected.email,
        gstin: selected.gstin,
        address: selected.address
      });
    }
  }, [selectedClientId, clients]);

  // Recalculate totals dynamically
  const govtSubtotal = items.reduce((acc, item) => acc + (Number(item.govtFee) || 0) * (Number(item.qty) || 1), 0);
  const consultancySubtotal = items.reduce(
    (acc, item) => acc + (Number(item.consultancyFee) || 0) * (Number(item.qty) || 1),
    0
  );
  const subtotal = govtSubtotal + consultancySubtotal;
  const taxableAmount = Math.max(0, consultancySubtotal - discount);
  const cgst = Math.round(taxableAmount * 0.09);
  const sgst = Math.round(taxableAmount * 0.09);
  const grandTotal = govtSubtotal + taxableAmount + cgst + sgst;
  const amountInWordsText = numberToWords(grandTotal);

  // Item handler functions
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // Auto update when service selection changes
    if (field === 'serviceName') {
      const match = services.find((s) => s.name === value);
      if (match) {
        newItems[index].description = match.description;
        newItems[index].govtFee = match.govtFee;
        newItems[index].consultancyFee = match.consultancyFee;
        newItems[index].gstRate = match.gstRate;
      }
    }

    // Recalculate row total
    const qty = Number(newItems[index].qty) || 1;
    const gFee = Number(newItems[index].govtFee) || 0;
    const cFee = Number(newItems[index].consultancyFee) || 0;
    const gstPct = Number(newItems[index].gstRate) || 18;
    const cTax = cFee * (gstPct / 100);
    newItems[index].total = Math.round((gFee + cFee + cTax) * qty);

    setItems(newItems);
  };

  const handleAddService = () => {
    const defaultSrv = services[0] || {
      name: 'General Compliance',
      description: 'Consultancy support',
      govtFee: 5000,
      consultancyFee: 10000,
      gstRate: 18
    };

    const newRow = {
      id: Date.now(),
      serviceName: defaultSrv.name,
      description: defaultSrv.description,
      qty: 1,
      govtFee: defaultSrv.govtFee,
      consultancyFee: defaultSrv.consultancyFee,
      gstRate: defaultSrv.gstRate,
      total: Math.round(defaultSrv.govtFee + defaultSrv.consultancyFee * 1.18)
    };
    setItems([...items, newRow]);
  };

  const handleRemoveService = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleSave = (newStatus = status) => {
    const quotationObj = {
      id: quotationNo,
      quotationNo,
      clientId: selectedClientId,
      clientName: clientData.name,
      contactPerson: clientData.contactPerson,
      phone: clientData.phone,
      email: clientData.email,
      gstin: clientData.gstin,
      address: clientData.address,
      date,
      validUntil,
      status: newStatus,
      items,
      govtSubtotal,
      consultancySubtotal,
      subtotal,
      discount,
      taxableAmount,
      cgst,
      sgst,
      grandTotal,
      amountInWords: amountInWordsText,
      paymentTerms
    };

    saveQuotation(quotationObj);
    setSelectedId(quotationNo);
    setActiveTab('quotation-preview');
  };

  return (
    <div className="page-container">
      {/* Top Header Actions */}
      <div className="page-header" style={{ marginBottom: 16 }}>
        <button
          className="btn btn-outline"
          onClick={() => setActiveTab('quotations')}
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => handleSave('Draft')}>
            <Save size={16} /> Save Draft
          </button>
          <button className="btn btn-primary" onClick={() => handleSave('Sent')}>
            <Eye size={16} /> Preview
          </button>
          <button className="btn btn-secondary" onClick={() => handleSave('Sent')}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>

      <h1 className="page-title" style={{ marginBottom: 20 }}>
        {isEdit ? `Edit Quotation (${quotationNo})` : 'Create New Quotation'}
      </h1>

      {/* Form Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Section 1: Quotation Details */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>
            Quotation Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Quotation Number</label>
              <input
                type="text"
                className="form-control"
                value={quotationNo}
                onChange={(e) => setQuotationNo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                className="form-control"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Accepted">Accepted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Client Details */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>
            Client Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Client *</label>
              <select
                className="form-control"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input
                type="text"
                className="form-control"
                value={clientData.contactPerson}
                onChange={(e) => setClientData({ ...clientData, contactPerson: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                className="form-control"
                value={clientData.phone}
                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={clientData.email}
                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Service Details */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Service Details</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => setShowCustomizeModal(true)}
              >
                <Settings size={15} /> Customize Table
              </button>
              <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleAddService}>
                <Plus size={15} /> Add Service
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>S.No</th>
                  {visibleColumns.serviceName && <th style={{ width: 220 }}>{columnLabels.serviceName}</th>}
                  {visibleColumns.description && <th>Description</th>}
                  {visibleColumns.qty && <th style={{ width: 60 }}>{columnLabels.qty}</th>}
                  {visibleColumns.govtFee && <th style={{ width: 120 }}>{columnLabels.govtFee}</th>}
                  {visibleColumns.consultancyFee && <th style={{ width: 130 }}>{columnLabels.consultancyFee}</th>}
                  {visibleColumns.gstRate && <th style={{ width: 80 }}>{columnLabels.gstRate}</th>}
                  {visibleColumns.total && <th style={{ width: 110 }}>{columnLabels.total}</th>}
                  <th style={{ width: 50, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    {visibleColumns.serviceName && (
                      <td>
                        <select
                          className="form-control"
                          style={{ padding: '6px' }}
                          value={item.serviceName}
                          onChange={(e) => handleItemChange(index, 'serviceName', e.target.value)}
                        >
                          {services.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    )}
                    {visibleColumns.description && (
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          style={{ padding: '6px' }}
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        />
                      </td>
                    )}
                    {visibleColumns.qty && (
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          style={{ padding: '6px', textAlign: 'center' }}
                          value={item.qty}
                          onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        />
                      </td>
                    )}
                    {visibleColumns.govtFee && (
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          style={{ padding: '6px' }}
                          value={item.govtFee}
                          onChange={(e) => handleItemChange(index, 'govtFee', e.target.value)}
                        />
                      </td>
                    )}
                    {visibleColumns.consultancyFee && (
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          style={{ padding: '6px' }}
                          value={item.consultancyFee}
                          onChange={(e) => handleItemChange(index, 'consultancyFee', e.target.value)}
                        />
                      </td>
                    )}
                    {visibleColumns.gstRate && (
                      <td>
                        <select
                          className="form-control"
                          style={{ padding: '6px' }}
                          value={item.gstRate}
                          onChange={(e) => handleItemChange(index, 'gstRate', e.target.value)}
                        >
                          <option value={18}>18%</option>
                          <option value={12}>12%</option>
                          <option value={5}>5%</option>
                          <option value={0}>0%</option>
                        </select>
                      </td>
                    )}
                    {visibleColumns.total && (
                      <td style={{ fontWeight: 700 }}>{formatCurrency(item.total)}</td>
                    )}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="icon-button"
                        onClick={() => handleRemoveService(index)}
                        title="Delete"
                      >
                        <Trash2 size={16} style={{ color: '#ef4444' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Summary & Terms Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Price Summary */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>
              Price Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-slate-500">Government Fees</span>
                <span>{formatCurrency(govtSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-slate-500">Consultancy Fees</span>
                <span>{formatCurrency(consultancySubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-slate-500">Discount</span>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: 120, padding: '4px 8px', textAlign: 'right' }}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>Taxable Amount</span>
                <span>{formatCurrency(taxableAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-slate-500">CGST (9%)</span>
                <span>{formatCurrency(cgst)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-slate-500">SGST (9%)</span>
                <span>{formatCurrency(sgst)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  borderTop: '2px solid #e2e8f0',
                  paddingTop: 12,
                  color: '#2563eb'
                }}
              >
                <span>Grand Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              <div style={{ marginTop: 12, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                  Amount in Words
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a', marginTop: 4 }}>
                  {amountInWordsText}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms & Conditions */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>
              Payment Terms & Conditions
            </h3>
            <div className="form-group">
              <label className="form-label">Payment Terms</label>
              <input
                type="text"
                className="form-control"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Terms & Conditions</label>
              <ol style={{ paddingLeft: 20, fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
                {companySettings.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Table Modal */}
      {showCustomizeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            maxWidth: 500,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Customize Table Columns</h2>
              <button
                onClick={() => setShowCustomizeModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Column Visibility Section */}
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
                  Show/Hide Columns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.entries(columnLabels).map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={visibleColumns[key]}
                        onChange={() => setVisibleColumns({ ...visibleColumns, [key]: !visibleColumns[key] })}
                        style={{ cursor: 'pointer', width: 18, height: 18 }}
                      />
                      <span style={{ fontSize: '0.875rem', color: '#1e293b' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Column Label Customization Section */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
                  Edit Column Labels
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Object.entries(columnLabels).map(([key, label]) => (
                    <div key={key}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                        {key === 'serviceName' ? 'Service/License' : key === 'consultancyFee' ? 'Consultancy Fee' : key === 'govtFee' ? 'Gov Fee' : key === 'gstRate' ? 'GST' : key}
                      </label>
                      <input
                        type="text"
                        value={label}
                        onChange={(e) => setColumnLabels({ ...columnLabels, [key]: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: 6,
                          fontSize: '0.875rem',
                          marginTop: 4
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowCustomizeModal(false)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
