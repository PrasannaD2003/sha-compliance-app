import React, { useState } from 'react';
import { X, Eye, EyeOff, Save, Trash2 } from 'lucide-react';

export const PortalCredentialsModal = ({ isOpen, onClose, onSave, credentials = {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(credentials || {
    portalName: '',
    portalUrl: '',
    username: '',
    password: '',
    loginType: 'User ID & Password',
    remarks: '',
    securityQuestion: '',
    securityAnswer: '',
    registeredEmail: '',
    registeredMobile: ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    if (formData.portalName && formData.portalUrl && formData.username && formData.password) {
      onSave(formData);
      onClose();
    } else {
      alert('Please fill in all required fields');
    }
  };

  if (!isOpen) return null;

  return (
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
      zIndex: 1500
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        maxWidth: 700,
        width: '90%',
        maxHeight: '85vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {credentials?.id ? 'Edit Portal Credentials' : 'Add Portal Credentials'}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Portal Details Section */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
              Portal Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Portal Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.portalName}
                  onChange={(e) => handleChange('portalName', e.target.value)}
                  placeholder="e.g., Clinical Establishment TNSWP"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Portal URL *</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.portalUrl}
                  onChange={(e) => handleChange('portalUrl', e.target.value)}
                  placeholder="https://example.tn.gov.in"
                />
              </div>
            </div>
          </div>

          {/* Login Credentials Section */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
              Login Credentials
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Username *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Username or Email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Enter password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: '1px solid #e2e8f0',
                      borderRadius: 6,
                      cursor: 'pointer',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div className="form-group">
                <label className="form-label">Login Type</label>
                <select
                  className="form-control"
                  value={formData.loginType}
                  onChange={(e) => handleChange('loginType', e.target.value)}
                >
                  <option>User ID & Password</option>
                  <option>Email & Password</option>
                  <option>Mobile & OTP</option>
                  <option>Digital Certificate</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.remarks}
                  onChange={(e) => handleChange('remarks', e.target.value)}
                  placeholder="Optional remarks"
                />
              </div>
            </div>
          </div>

          {/* Security Details Section */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
              Security Details (Optional)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Security Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.securityQuestion}
                  onChange={(e) => handleChange('securityQuestion', e.target.value)}
                  placeholder="Security question"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Security Answer</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.securityAnswer}
                  onChange={(e) => handleChange('securityAnswer', e.target.value)}
                  placeholder="Security answer"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
              <div className="form-group">
                <label className="form-label">Registered Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.registeredEmail}
                  onChange={(e) => handleChange('registeredEmail', e.target.value)}
                  placeholder="Registered email address"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Registered Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.registeredMobile}
                  onChange={(e) => handleChange('registeredMobile', e.target.value)}
                  placeholder="Registered mobile number"
                />
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: 8,
            padding: 12
          }}>
            <p style={{ fontSize: '0.8rem', color: '#92400e', margin: 0 }}>
              <strong>Security Notice:</strong> All credentials are encrypted and securely stored. Only authorized users can view this information.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
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
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '10px 16px',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Save size={16} /> Save Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
