import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UploadDocumentModal = () => {
  const {
    isUploadDocModalOpen,
    setIsUploadDocModalOpen,
    activeUploadTarget,
    uploadClientDocument
  } = useApp();

  const [fileName, setFileName] = useState('');
  const [remarks, setRemarks] = useState('');

  if (!isUploadDocModalOpen || !activeUploadTarget) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadClientDocument({
      clientLicenseId: activeUploadTarget.clientLicenseId,
      docId: activeUploadTarget.docId,
      fileName: fileName || `${activeUploadTarget.docName.replace(/\s+/g, '_')}.pdf`,
      remarks: remarks || 'Uploaded and verified'
    });

    setIsUploadDocModalOpen(false);
    setFileName('');
    setRemarks('');
  };

  return (
    <div className="modal-overlay" style={{ display: isUploadDocModalOpen && activeUploadTarget ? 'flex' : 'none' }}>
      <div className="modal-content" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Upload Document: {activeUploadTarget.docName}
          </h3>
          <button className="icon-button" onClick={() => setIsUploadDocModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Select File to Upload *</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFileName(e.target.files[0]?.name || '')}
              />
            </div>

            <div className="form-group">
              <label className="form-label">File Name Reference</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. BuildingPlan_2026.pdf"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Remarks / Notes</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Verified by DMO Officer"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsUploadDocModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              <Upload size={16} /> Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
