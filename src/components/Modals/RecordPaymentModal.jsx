import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const RecordPaymentModal = () => {
  const {
    isRecordPaymentModalOpen,
    setIsRecordPaymentModalOpen,
    paymentTargetInvoice,
    recordPayment,
    invoices
  } = useApp();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [refNo, setRefNo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (paymentTargetInvoice) {
      setSelectedInvoiceId(paymentTargetInvoice.id);
      setAmount(paymentTargetInvoice.balanceAmount ?? paymentTargetInvoice.grandTotal);
    } else if (invoices.length > 0) {
      setSelectedInvoiceId(invoices[0].id);
      setAmount(invoices[0].balanceAmount ?? invoices[0].grandTotal);
    }
  }, [paymentTargetInvoice, invoices, isRecordPaymentModalOpen]);

  if (!isRecordPaymentModalOpen) return null;

  const currentInvoice = invoices.find((i) => i.id === selectedInvoiceId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedInvoiceId || !amount) return;

    recordPayment({
      invoiceId: selectedInvoiceId,
      amount: Number(amount),
      method,
      refNo: refNo || `REF-${Math.floor(Math.random() * 900000) + 100000}`,
      date
    });

    setIsRecordPaymentModalOpen(false);
    setRefNo('');
  };

  return (
    <div className="modal-overlay" style={{ display: isRecordPaymentModalOpen ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            + Record Payment Receipt
          </h3>
          <button className="icon-button" onClick={() => setIsRecordPaymentModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Select Invoice *</label>
              <select
                className="form-control"
                value={selectedInvoiceId}
                onChange={(e) => {
                  setSelectedInvoiceId(e.target.value);
                  const inv = invoices.find((i) => i.id === e.target.value);
                  if (inv) setAmount(inv.balanceAmount ?? inv.grandTotal);
                }}
              >
                {invoices.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.invoiceNo || inv.id} - {inv.clientName} (Bal: {formatCurrency(inv.balanceAmount ?? inv.grandTotal)})
                  </option>
                ))}
              </select>
            </div>

            {currentInvoice && (
              <div
                style={{
                  background: '#f8fafc',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 16,
                  fontSize: '0.825rem',
                  display: 'flex',
                  justify: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#64748b' }}>Grand Total</div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {formatCurrency(currentInvoice.grandTotal)}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#64748b' }}>Paid So Far</div>
                  <div style={{ fontWeight: 700, color: '#16a34a' }}>
                    {formatCurrency(currentInvoice.amountReceived || 0)}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#64748b' }}>Outstanding Balance</div>
                  <div style={{ fontWeight: 700, color: '#ef4444' }}>
                    {formatCurrency(currentInvoice.balanceAmount ?? currentInvoice.grandTotal)}
                  </div>
                </div>
              </div>
            )}

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Amount Received (₹) *</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-control"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="UPI">UPI Payment</option>
                  <option value="Bank Transfer">Bank Transfer / NEFT / RTGS</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Ref / Transaction ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. UPI123456 / CHQ98765"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsRecordPaymentModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Record Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
