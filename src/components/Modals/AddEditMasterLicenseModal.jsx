import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddEditMasterLicenseModal = ({ isOpen, onClose, editingLicense }) => {
  const { saveMasterLicense } = useApp();

  const isEdit = Boolean(editingLicense);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hospital Registration');
  const [governingAuthority, setGoverningAuthority] = useState('');
  const [portal, setPortal] = useState('');
  const [licenseType, setLicenseType] = useState('Mandatory Healthcare License');
  const [validity, setValidity] = useState('5 Years');
  const [renewalFrequency, setRenewalFrequency] = useState('5 Years');
  const [govtFee, setGovtFee] = useState(10000);
  const [consultancyFee, setConsultancyFee] = useState(25000);
  const [processingTime, setProcessingTime] = useState('45 - 60 working days');

  // Dynamic Document Checklist items
  const [requiredDocuments, setRequiredDocuments] = useState([
    { id: 'doc-1', name: 'Application Form', description: 'Duly filled application form', mandatory: true, fileType: 'PDF', expiryRequired: false },
    { id: 'doc-2', name: 'Identity Proof of Applicant', description: 'Aadhar / PAN of authorised person', mandatory: true, fileType: 'PDF', expiryRequired: false }
  ]);

  useEffect(() => {
    if (editingLicense) {
      setName(editingLicense.name || '');
      setCategory(editingLicense.category || 'Hospital Registration');
      setGoverningAuthority(editingLicense.governingAuthority || '');
      setPortal(editingLicense.portal || '');
      setLicenseType(editingLicense.licenseType || 'Mandatory Healthcare License');
      setValidity(editingLicense.validity || '5 Years');
      setRenewalFrequency(editingLicense.renewalFrequency || '5 Years');
      setGovtFee(editingLicense.govtFee || 10000);
      setConsultancyFee(editingLicense.consultancyFee || 25000);
      setProcessingTime(editingLicense.processingTime || '45 working days');
      setRequiredDocuments(editingLicense.requiredDocuments || []);
    } else {
      setName('');
      setCategory('Hospital Registration');
      setGoverningAuthority('');
      setPortal('');
      setGovtFee(10000);
      setConsultancyFee(25000);
      setProcessingTime('30 - 45 working days');
      setRequiredDocuments([
        { id: 'doc-1', name: 'Application Form', description: 'Duly filled application form', mandatory: true, fileType: 'PDF', expiryRequired: false },
        { id: 'doc-2', name: 'Identity Proof of Applicant', description: 'Aadhar / PAN of authorised person', mandatory: true, fileType: 'PDF', expiryRequired: false }
      ]);
    }
  }, [editingLicense, isOpen]);

  if (!isOpen) return null;

  const handleAddDocRow = () => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: 'New Required Document',
      description: 'Document description',
      mandatory: true,
      fileType: 'PDF',
      expiryRequired: false
    };
    setRequiredDocuments([...requiredDocuments, newDoc]);
  };

  const handleDocChange = (index, field, value) => {
    const updated = [...requiredDocuments];
    updated[index][field] = value;
    setRequiredDocuments(updated);
  };

  const handleRemoveDocRow = (index) => {
    setRequiredDocuments(requiredDocuments.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const licenseObj = {
      id: editingLicense?.id || `LIC-${Date.now()}`,
      name,
      category,
      governingAuthority,
      portal,
      licenseType,
      validity,
      renewalFrequency,
      govtFee: Number(govtFee),
      consultancyFee: Number(consultancyFee),
      processingTime,
      requiredDocuments
    };

    saveMasterLicense(licenseObj);
    onClose();
  };

  return (
    <div className="modal-overlay no-print">
      <div className="modal-content" style={{ maxWidth: 720, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            {isEdit ? `Edit License Template: ${editingLicense.name}` : '+ Create New Master License Template'}
          </h3>
          <button className="icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1 }}>
          <div className="modal-body">
            {/* General Template Information */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb', marginBottom: 12 }}>
              1. General License Parameters
            </h4>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">License Title *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Clinical Establishment Act (CEA)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Hospital Registration">Hospital Registration</option>
                  <option value="Safety & Building Compliance">Safety & Building Compliance</option>
                  <option value="Environmental Compliance">Environmental Compliance</option>
                  <option value="Radiology & Ultrasound">Radiology & Ultrasound</option>
                  <option value="Radiation Safety">Radiation Safety</option>
                  <option value="Pharmacy & Medical Stores">Pharmacy & Medical Stores</option>
                  <option value="Food Safety & Hygiene">Food Safety & Hygiene</option>
                  <option value="Local Municipal Compliance">Local Municipal Compliance</option>
                  <option value="Accreditation">Accreditation (NABH/NABL)</option>
                  <option value="Specialized Licenses">Specialized Licenses</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Governing Authority *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Health & Family Welfare Department, Govt of Tamil Nadu"
                  value={governingAuthority}
                  onChange={(e) => setGoverningAuthority(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Application Portal URL</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. tncea.tn.gov.in"
                  value={portal}
                  onChange={(e) => setPortal(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Government Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={govtFee}
                  onChange={(e) => setGovtFee(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Consultancy Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={consultancyFee}
                  onChange={(e) => setConsultancyFee(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Typical Processing Time</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 45 - 60 working days"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Validity Period</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 5 Years / 1 Year"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                />
              </div>
            </div>

            {/* Document Checklist Builder */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb' }}>
                2. Master Required Document Checklist ({requiredDocuments.length} Items)
              </h4>
              <button
                type="button"
                className="btn btn-primary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={handleAddDocRow}
              >
                <Plus size={14} /> Add Document Item
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {requiredDocuments.map((doc, idx) => (
                <div
                  key={doc.id || idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#64748b' }}>#{idx + 1}</span>
                    <input
                      type="text"
                      className="form-control"
                      style={{ flex: 1, fontWeight: 700 }}
                      placeholder="Document Title (e.g. Building Plan Approval)"
                      value={doc.name}
                      onChange={(e) => handleDocChange(idx, 'name', e.target.value)}
                    />
                    <select
                      className="form-control"
                      style={{ width: 110 }}
                      value={doc.mandatory ? 'true' : 'false'}
                      onChange={(e) => handleDocChange(idx, 'mandatory', e.target.value === 'true')}
                    >
                      <option value="true">Mandatory</option>
                      <option value="false">Optional</option>
                    </select>
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleRemoveDocRow(idx)}
                    >
                      <Trash2 size={16} style={{ color: '#ef4444' }} />
                    </button>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    style={{ fontSize: '0.8rem' }}
                    placeholder="Document description / instructions for client"
                    value={doc.description}
                    onChange={(e) => handleDocChange(idx, 'description', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> Save Master License Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
