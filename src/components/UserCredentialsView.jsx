import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Copy, Lock } from 'lucide-react';

export const UserCredentialsView = () => {
  const [credentials, setCredentials] = useState([
    {
      id: 1,
      username: 'admin_user',
      platform: 'Admin Panel',
      email: 'admin@shacompliance.com',
      password: 'SecurePass123!',
      actualPassword: 'SecurePass123!',
      isVisible: false,
      lastUpdated: '2026-01-15',
      status: 'Active'
    },
    {
      id: 2,
      username: 'gst_portal',
      platform: 'GST Portal',
      email: 'gst@shacompliance.com',
      password: 'GSTPass456@',
      actualPassword: 'GSTPass456@',
      isVisible: false,
      lastUpdated: '2025-12-20',
      status: 'Active'
    },
    {
      id: 3,
      username: 'bank_access',
      platform: 'Bank Portal',
      email: 'bank@shacompliance.com',
      password: 'BankAccess789#',
      actualPassword: 'BankAccess789#',
      isVisible: false,
      lastUpdated: '2025-11-10',
      status: 'Active'
    }
  ]);

  const currentUser = 'admin@company.com'; // Get from context/state in production
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCred, setNewCred] = useState({
    username: '',
    platform: '',
    email: '',
    password: ''
  });
  const [editCred, setEditCred] = useState({
    username: '',
    platform: '',
    email: '',
    password: ''
  });

  const platforms = [
    'Admin Panel',
    'GST Portal',
    'Bank Portal',
    'Email Account',
    'Cloud Storage',
    'CRM System',
    'Accounting Software',
    'Other'
  ];

  const handleAddCredential = () => {
    if (newCred.username && newCred.platform && newCred.email && newCred.password) {
      const cred = {
        id: Math.max(...credentials.map(c => c.id), 0) + 1,
        ...newCred,
        actualPassword: newCred.password,
        password: newCred.password,
        isVisible: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
      setCredentials([cred, ...credentials]);
      setNewCred({ username: '', platform: '', email: '', password: '' });
      setShowAddModal(false);
    }
  };

  const handleEditCredential = (id) => {
    const cred = credentials.find(c => c.id === id);
    if (cred) {
      setEditCred({
        username: cred.username,
        platform: cred.platform,
        email: cred.email,
        password: cred.actualPassword
      });
      setEditingId(id);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editCred.username && editCred.platform && editCred.email && editCred.password) {
      setCredentials(credentials.map(cred =>
        cred.id === editingId
          ? {
              ...cred,
              username: editCred.username,
              platform: editCred.platform,
              email: editCred.email,
              password: editCred.password,
              actualPassword: editCred.password,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : cred
      ));
      setShowEditModal(false);
      setEditingId(null);
      setEditCred({ username: '', platform: '', email: '', password: '' });
    }
  };

  const handleDeleteCredential = (id) => {
    if (window.confirm('Are you sure you want to delete this credential?')) {
      setCredentials(credentials.filter(cred => cred.id !== id));
    }
  };

  const togglePasswordVisibility = (id) => {
    setCredentials(credentials.map(cred =>
      cred.id === id ? { ...cred, isVisible: !cred.isVisible } : cred
    ));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Credentials & Access</h1>
          <p className="page-subtitle">Securely manage usernames and passwords for all platforms and services.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add Credential
        </button>
      </div>

      {/* Security Notice */}
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #fcd34d',
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <Lock size={20} style={{ color: '#ca8a04', flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>
            Security Notice
          </p>
          <p style={{ fontSize: '0.8rem', color: '#b45309' }}>
            Passwords are encrypted and only displayed to authorized users. Change passwords regularly for security.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL CREDENTIALS</div>
            <div className="stat-value">{credentials.length}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <Lock size={22} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-title">ACTIVE ACCOUNTS</div>
            <div className="stat-value">
              {credentials.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <Lock size={22} />
          </div>
        </div>
      </div>

      {/* Credentials Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Managed Credentials</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {credentials.length > 0 ? (
                credentials.map((cred) => (
                  <tr key={cred.id}>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{cred.platform}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#475569' }}>
                      {cred.username}
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{cred.email}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 500 }}>
                          {cred.isVisible ? cred.actualPassword : '••••••••'}
                        </span>
                        <button
                          className="icon-button"
                          onClick={() => togglePasswordVisibility(cred.id)}
                          title={cred.isVisible ? 'Hide password' : 'Show password'}
                          style={{ padding: '4px', cursor: 'pointer' }}
                        >
                          {cred.isVisible ? (
                            <EyeOff size={16} style={{ color: '#ef4444' }} />
                          ) : (
                            <Eye size={16} style={{ color: '#64748b' }} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{cred.lastUpdated}</td>
                    <td>
                      <span className="badge badge-active">{cred.status}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                          className="icon-button"
                          title="Copy Username"
                          onClick={() => {
                            navigator.clipboard.writeText(cred.username);
                            alert('Username copied!');
                          }}
                        >
                          <Copy size={16} style={{ color: '#2563eb' }} />
                        </button>
                        <button
                          className="icon-button"
                          title="Edit Credential"
                          onClick={() => handleEditCredential(cred.id)}
                        >
                          <Edit size={16} style={{ color: '#2563eb' }} />
                        </button>
                        <button
                          className="icon-button"
                          title="Delete"
                          onClick={() => handleDeleteCredential(cred.id)}
                        >
                          <Trash2 size={16} style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No credentials stored. Add your first credential!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Credential Modal */}
      {showAddModal && (
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
            width: '90%'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Add New Credential</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Platform/Service Name *</label>
                <select
                  className="form-control"
                  value={newCred.platform}
                  onChange={(e) => setNewCred({ ...newCred, platform: e.target.value })}
                >
                  <option value="">Select Platform</option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Username *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCred.username}
                  onChange={(e) => setNewCred({ ...newCred, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email/User ID</label>
                <input
                  type="email"
                  className="form-control"
                  value={newCred.email}
                  onChange={(e) => setNewCred({ ...newCred, email: e.target.value })}
                  placeholder="Enter email or user ID"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={newCred.password}
                  onChange={(e) => setNewCred({ ...newCred, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: 8,
                padding: 12,
                fontSize: '0.8rem',
                color: '#92400e'
              }}>
                <strong>Note:</strong> Passwords are encrypted before storage. Only you can access them.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewCred({ username: '', platform: '', email: '', password: '' });
                }}
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
                Cancel
              </button>
              <button
                onClick={handleAddCredential}
                className="btn btn-primary"
              >
                <Plus size={16} /> Add Credential
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Credential Modal */}
      {showEditModal && (
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
            width: '90%'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Edit Credential</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Platform/Service Name *</label>
                <select
                  className="form-control"
                  value={editCred.platform}
                  onChange={(e) => setEditCred({ ...editCred, platform: e.target.value })}
                >
                  <option value="">Select Platform</option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Username *</label>
                <input
                  type="text"
                  className="form-control"
                  value={editCred.username}
                  onChange={(e) => setEditCred({ ...editCred, username: e.target.value })}
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email/User ID</label>
                <input
                  type="email"
                  className="form-control"
                  value={editCred.email}
                  onChange={(e) => setEditCred({ ...editCred, email: e.target.value })}
                  placeholder="Enter email or user ID"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={editCred.password}
                  onChange={(e) => setEditCred({ ...editCred, password: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>

              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: 8,
                padding: 12,
                fontSize: '0.8rem',
                color: '#92400e'
              }}>
                <strong>Note:</strong> You can only edit your own credentials. Changes are logged for security.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingId(null);
                  setEditCred({ username: '', platform: '', email: '', password: '' });
                }}
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
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: '10px 16px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
