import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, ShieldCheck, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { AddEditMasterLicenseModal } from './Modals/AddEditMasterLicenseModal';

export const LicenseMasterView = () => {
  const { masterLicenses, deleteMasterLicense } = useApp();
  const [selectedLicense, setSelectedLicense] = useState(masterLicenses[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);

  const filtered = masterLicenses.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.governingAuthority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setEditingLicense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lic) => {
    setEditingLicense(lic);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">License Master Catalog</h1>
          <p className="page-subtitle">
            Master repository for healthcare licenses, governing authorities, fees and customizable document checklists.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          <Plus size={16} /> + Add New License Template
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
        {/* Table of Licenses */}
        <div className="card">
          <div className="card-header">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: 300 }}
              placeholder="Search master licenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>License Name</th>
                  <th>Category</th>
                  <th>Governing Authority</th>
                  <th style={{ textAlign: 'center' }}>Docs Count</th>
                  <th>Processing Time</th>
                  <th>Govt Fee</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lic) => (
                  <tr
                    key={lic.id}
                    style={{
                      backgroundColor: selectedLicense?.id === lic.id ? '#eff6ff' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedLicense(lic)}
                  >
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{lic.name}</td>
                    <td>
                      <span className="badge badge-sent">{lic.category}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>{lic.governingAuthority}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#2563eb' }}>
                      {lic.requiredDocuments?.length || 0}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{lic.processingTime}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(lic.govtFee)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <button
                          className="icon-button"
                          title="Edit Template & Checklist"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(lic);
                          }}
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          className="icon-button"
                          title="Delete Template"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMasterLicense(lic.id);
                          }}
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

        {/* Selected License Master Checklist Summary Side Panel */}
        {selectedLicense && (
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="logo-icon" style={{ width: 36, height: 36, borderRadius: 8 }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                    {selectedLicense.name}
                  </h3>
                  <p style={{ fontSize: '0.725rem', color: '#64748b' }}>
                    {selectedLicense.licenseType}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-outline"
                style={{ padding: '4px 8px', fontSize: '0.725rem' }}
                onClick={() => handleEdit(selectedLicense)}
              >
                <Edit size={12} /> Edit Template
              </button>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 16, lineHeight: 1.5 }}>
              <div><strong>Governing Authority:</strong> {selectedLicense.governingAuthority}</div>
              <div><strong>Application Portal:</strong> {selectedLicense.portal}</div>
              <div><strong>Validity:</strong> {selectedLicense.validity}</div>
              <div><strong>Govt Fee:</strong> {formatCurrency(selectedLicense.govtFee)}</div>
              <div><strong>Consultancy Fee:</strong> {formatCurrency(selectedLicense.consultancyFee)}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                Master Required Documents ({selectedLicense.requiredDocuments?.length || 0})
              </h4>
              <button
                className="btn btn-primary"
                style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                onClick={() => handleEdit(selectedLicense)}
              >
                <Plus size={12} /> Add Item
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 360, overflowY: 'auto' }}>
              {(selectedLicense.requiredDocuments || []).map((doc, idx) => (
                <div
                  key={doc.id || idx}
                  style={{
                    background: '#f8fafc',
                    padding: 10,
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    fontSize: '0.775rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>
                      {idx + 1}. {doc.name}
                    </span>
                    {doc.mandatory ? (
                      <span className="badge badge-overdue" style={{ fontSize: '0.65rem' }}>Mandatory</span>
                    ) : (
                      <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>Optional</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2 }}>
                    {doc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Component */}
      <AddEditMasterLicenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingLicense={editingLicense}
      />
    </div>
  );
};
