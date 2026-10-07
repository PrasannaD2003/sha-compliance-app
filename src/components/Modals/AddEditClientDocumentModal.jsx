import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddEditClientDocumentModal = ({ isOpen, onClose, clientLicenseId, editingDoc }) => {
  const { addClientDocumentItem, editClientDocumentItem } = useApp();

  const isEdit = Boolean(editingDoc);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mandatory, setMandatory] = useState(true);
  const [status, setStatus] = useState('Pending from Client');
  const [remarks, setRemarks] = useState('Pending from client');

  useEffect(() => {
    if (editingDoc) {
      setName(editingDoc.name || '');
      setDescription(editingDoc.description || '');
      setMandatory(editingDoc.mandatory ?? true);
      setStatus(editingDoc.status || 'Pending from Client');
      setRemarks(editingDoc.remarks || '');
    } else {
      setName('');
      setDescription('');
      setMandatory(true);
      setStatus('Pending from Client');
      setRemarks('Pending from client');
    }
  }, [editingDoc, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (isEdit) {
      editClientDocumentItem(clientLicenseId, editingDoc.id, {
        name,
        description,
        mandatory,
        status,
        remarks
      });
    } else {
      addClientDocumentItem(clientLicenseId, {
        name,
        description,
        mandatory,
        status,
        remarks
      });
    }

    onClose();
  };

  return (
    <div className="modal-overlay no-print">
      <div className="modal-content" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            {isEdit ? `Edit Document: ${editingDoc.name}` : '+ Add Custom Document to Checklist'}
          </h3>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Document Name *</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="e.g. Radiation Safety Officer Certificate"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description / Instructions</label>
              <input
                type="text"
                className="form-control"
                placeholder="Details of required document"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Mandatory Status</label>
                <select
                  className="form-control"
                  value={mandatory ? 'true' : 'false'}
                  onChange={(e) => setMandatory(e.target.value === 'true')}
                >
                  <option value="true">Mandatory Document</option>
                  <option value="false">Optional Document</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Collection Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending from Client">Pending from Client</option>
                  <option value="Requested">Requested</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Remarks / Client Note</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Client promised by Monday"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> Save Document Checklist Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
