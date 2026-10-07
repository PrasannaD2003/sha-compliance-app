import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Download, Upload, X } from 'lucide-react';
import BranchProfileView from './BranchProfileView';

const BranchesView = ({ clientId }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [viewingBranchId, setViewingBranchId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [formData, setFormData] = useState({
    branchCode: '',
    branchName: '',
    location: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchBranches();
  }, [clientId]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/branches/client/${clientId}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setBranches(data.data);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async (branchId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/branches/${branchId}/documents`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const getAuthHeaders = () => {
    let token = localStorage.getItem('sha_auth_token');

    if (!token) {
      // If no token exists, create a temporary one for demo/testing
      token = 'demo-token-' + Date.now();
      localStorage.setItem('sha_auth_token', token);
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const handleAddBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/branches', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...formData, clientId })
      });
      const data = await response.json();
      if (data.success) {
        alert('Branch created successfully!');
        setBranches([data.data, ...branches]);
        setFormData({
          branchCode: '',
          branchName: '',
          location: '',
          address: '',
          contactPerson: '',
          phone: '',
          email: ''
        });
        setShowAddModal(false);
      } else {
        alert('Error: ' + (data.error || 'Failed to create branch'));
      }
    } catch (error) {
      console.error('Error adding branch:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleUploadDocument = async (e, branchId) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      const token = localStorage.getItem('sha_auth_token');
      const response = await fetch(`http://localhost:5000/api/branches/${branchId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        fetchDocuments(branchId);
        alert('Document uploaded successfully!');
      } else {
        alert('Error: ' + (data.error || 'Failed to upload document'));
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Error uploading document: ' + error.message);
    }
  };

  const handleDeleteBranch = async (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/branches/${branchId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
          setBranches(branches.filter(b => b._id !== branchId));
          alert('Branch deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('Error deleting branch');
      }
    }
  };

  const handleDownloadDocument = (branchId, docIndex) => {
    const token = localStorage.getItem('sha_auth_token');
    window.location.href = `http://localhost:5000/api/branches/${branchId}/documents/${docIndex}/download?token=${token}`;
  };

  const handleDeleteDocument = async (branchId, docIndex) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/branches/${branchId}/documents/${docIndex}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        const data = await response.json();
        if (data.success) {
          fetchDocuments(branchId);
          alert('Document deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error deleting document');
      }
    }
  };

  // If viewing a branch, show the branch profile
  if (viewingBranchId) {
    return <BranchProfileView branchId={viewingBranchId} onBack={() => setViewingBranchId(null)} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Hospital Branches ({branches.length})</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search branches..."
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e2e8f0', width: 200 }}
          />
          <select style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e2e8f0' }}>
            <option>All Locations</option>
          </select>
          <button
            onClick={() => {
              setFormData({ branchCode: '', branchName: '', location: '', address: '', contactPerson: '', phone: '', email: '' });
              setShowAddModal(true);
            }}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={18} /> Add Branch
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Loading branches...</div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          {branches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
              No branches found. Click "Add Branch" to create one.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Branch Code</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Branch Name</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Location</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Contact Person</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Phone</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Email</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Total</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Completed</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>In Progress</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Not Started</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Pending Docs</th>
                  <th style={{ padding: 12, textAlign: 'left', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, idx) => (
                  <tr
                    key={branch._id}
                    onClick={() => setViewingBranchId(branch._id)}
                    style={{
                      borderBottom: idx !== branches.length - 1 ? '1px solid #e2e8f0' : 'none',
                      background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#fff' : '#f8fafc'}
                  >
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>{branch.branchCode}</td>
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#0f172a' }}>{branch.branchName}</td>
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#64748b' }}>{branch.location}</td>
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#64748b' }}>{branch.contactPerson || '-'}</td>
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#64748b' }}>{branch.phone || '-'}</td>
                    <td style={{ padding: 12, fontSize: '0.9rem', color: '#2563eb' }}>{branch.email || '-'}</td>
                    <td style={{ padding: 12, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>{branch.totalLicenses}</td>
                    <td style={{ padding: 12, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#16a34a' }}>{branch.completedLicenses}</td>
                    <td style={{ padding: 12, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#b45309' }}>{branch.inProgressLicenses}</td>
                    <td style={{ padding: 12, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#dc2626' }}>{branch.notStartedLicenses}</td>
                    <td style={{ padding: 12, textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>{branch.pendingDocuments || 0}</td>
                    <td style={{ padding: 12, textAlign: 'left' }}>
                      <span style={{ display: 'inline-block', padding: '4px 8px', background: '#dcfce7', color: '#16a34a', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600 }}>
                        {branch.status}
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <button
                          onClick={() => {
                            console.log('Opening branch:', branch._id);
                            setViewingBranchId(branch._id);
                          }}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}
                          title="View branch details"
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => handleDeleteBranch(branch._id)}
                          className="btn btn-outline"
                          style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#dc2626' }}
                          title="Delete branch"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ADD BRANCH MODAL */}
      {showAddModal && (
        <div className="modal modal-open" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="modal-content card" style={{ width: '100%', maxWidth: 600, padding: 0, position: 'relative' }}>
            <button
              onClick={() => setShowAddModal(false)}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={24} color="#64748b" />
            </button>

            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20 }}>Add New Branch</h2>

              <form onSubmit={handleAddBranch}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Branch Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., APH-BR-001"
                      required
                      value={formData.branchCode}
                      onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Branch Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Apollo Main Branch"
                      required
                      value={formData.branchName}
                      onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Chennai"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Contact Person</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="branch@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Save Branch
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS MODAL */}
      {showUploadModal && selectedBranch && (
        <div className="modal modal-open" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="modal-content card" style={{ width: '100%', maxWidth: 600, padding: 0, position: 'relative', maxHeight: '80vh', overflowY: 'auto' }}>
            <button
              onClick={() => {
                setShowUploadModal(false);
                setSelectedBranch(null);
                setDocuments([]);
              }}
              style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={24} color="#64748b" />
            </button>

            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>{selectedBranch.branchName}</h2>
              <p style={{ color: '#64748b', marginBottom: 20, fontSize: '0.9rem' }}>Manage branch documents</p>

              <div style={{ background: '#f0f9ff', border: '2px dashed #0ea5e9', borderRadius: 8, padding: 20, marginBottom: 20, textAlign: 'center', cursor: 'pointer', position: 'relative' }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  id="file-upload"
                  onChange={(e) => handleUploadDocument(e, selectedBranch._id)}
                  style={{ display: 'none' }}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <Upload size={32} style={{ margin: '0 auto 12px', color: '#0ea5e9' }} />
                  <p style={{ fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>Drop files here or click to upload</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>PDF, Images, Word, Excel (Max 10MB)</p>
                </label>
              </div>

              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>Documents ({documents.length})</h3>
                {documents.length === 0 ? (
                  <div style={{ padding: 20, background: '#f8fafc', borderRadius: 8, textAlign: 'center', color: '#64748b' }}>
                    <p>No documents yet</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {documents.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', padding: 12, borderRadius: 6, background: '#f8fafc' }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4, color: '#0f172a' }}>{doc.fileName}</p>
                          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            {(doc.fileSize / 1024).toFixed(2)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            onClick={() => handleDownloadDocument(selectedBranch._id, idx)}
                            className="btn btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6 }}
                          >
                            <Download size={16} /> Download
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(selectedBranch._id, idx)}
                            className="btn btn-outline"
                            style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#dc2626' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedBranch(null);
                  setDocuments([]);
                }}
                className="btn btn-outline"
                style={{ width: '100%', marginTop: 20 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchesView;
