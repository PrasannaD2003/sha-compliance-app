import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RequestDocumentModal = () => {
  const {
    isRequestDocModalOpen,
    setIsRequestDocModalOpen,
    activeRequestTarget,
    sendDocumentRequest,
    clients,
    selectedClientId
  } = useApp();

  const client = clients.find((c) => c.id === selectedClientId) || clients[0];

  const [email, setEmail] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-05');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (client) {
      setEmail(client.email);
    }
    if (activeRequestTarget) {
      setMessage(
        `Please provide the '${activeRequestTarget.docName}' document to proceed with the license application.`
      );
    }
  }, [client, activeRequestTarget, isRequestDocModalOpen]);

  if (!isRequestDocModalOpen || !activeRequestTarget) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDocumentRequest({
      clientLicenseId: activeRequestTarget.clientLicenseId,
      docId: activeRequestTarget.docId,
      recipientEmail: email,
      message,
      dueDate
    });

    setIsRequestDocModalOpen(false);
  };

  return (
    <div className="modal-overlay" style={{ display: isRequestDocModalOpen && activeRequestTarget ? 'flex' : 'none' }}>
      <div className="modal-content" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Request Document from Client
          </h3>
          <button className="icon-button" onClick={() => setIsRequestDocModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Requested Document</label>
              <input
                type="text"
                className="form-control"
                disabled
                style={{ background: '#f1f5f9', fontWeight: 700 }}
                value={activeRequestTarget.docName}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Recipient Contact</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  value={client?.contactPerson || 'Mr. Ramesh'}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recipient Email *</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Message to Client</label>
              <textarea
                className="form-control"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsRequestDocModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={16} /> Send Document Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
