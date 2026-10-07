import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

export const CreateUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    department: 'Operations',
    designation: 'Staff',
    password: '',
    permissions: {
      Dashboard: false,
      Clients: false,
      Licenses: false,
      Quotations: false,
      Invoices: false,
      Payments: false,
      Reports: false,
      UserManagement: false,
      Settings: false
    }
  });

  const designations = ['Executive', 'Senior Manager', 'Manager', 'Assistant Manager', 'Executive', 'Intern', 'Specialist', 'Coordinator', 'Officer'];

  const modulesList = ['Dashboard', 'Clients', 'Licenses', 'Quotations', 'Invoices', 'Payments', 'Reports', 'UserManagement', 'Settings'];

  const roleDefaultPermissions = {
    CEO: {
      Dashboard: true,
      Clients: true,
      Licenses: true,
      Quotations: true,
      Invoices: true,
      Payments: true,
      Reports: true,
      UserManagement: true,
      Settings: true
    },
    Manager: {
      Dashboard: true,
      Clients: true,
      Licenses: true,
      Quotations: true,
      Invoices: true,
      Payments: true,
      Reports: true,
      UserManagement: false,
      Settings: false
    },
    Staff: {
      Dashboard: false,
      Clients: true,
      Licenses: true,
      Quotations: false,
      Invoices: false,
      Payments: false,
      Reports: false,
      UserManagement: false,
      Settings: false
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('permission_')) {
      const module = name.replace('permission_', '');
      setFormData(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: checked
        }
      }));
    } else if (name === 'role') {
      // Auto-fill permissions based on selected role
      setFormData(prev => ({
        ...prev,
        [name]: value,
        permissions: roleDefaultPermissions[value] || prev.permissions
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      onAddUser(formData);
      setFormData({
        name: '',
        email: '',
        role: 'Staff',
        department: 'Operations',
        designation: 'Staff',
        password: '',
        permissions: {
          Dashboard: false,
          Clients: false,
          Licenses: false,
          Quotations: false,
          Invoices: false,
          Payments: false,
          Reports: false,
          UserManagement: false,
          Settings: false
        }
      });
      onClose();
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
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Create New User</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#cbd5e1'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option>CEO</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option>Management</option>
                <option>Operations</option>
                <option>Compliance</option>
                <option>Finance</option>
                <option>Support</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                {designations.map(des => (
                  <option key={des} value={des}>{des}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Module Access Permissions */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                Module Access Permissions
              </label>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                Auto-set based on role
              </span>
            </div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}>
              {modulesList.map(module => (
                <label key={module} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  padding: '8px',
                  borderRadius: '4px',
                  transition: 'background 0.2s',
                  background: formData.permissions[module] ? '#e3f2fd' : 'transparent'
                }}>
                  <input
                    type="checkbox"
                    name={`permission_${module}`}
                    checked={formData.permissions[module]}
                    onChange={handleChange}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }}
                  />
                  <span style={{ color: '#0f172a', fontWeight: formData.permissions[module] ? 600 : 500 }}>
                    {module}
                  </span>
                  {formData.permissions[module] && (
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>✓</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
