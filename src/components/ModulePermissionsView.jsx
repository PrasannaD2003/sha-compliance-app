import React, { useState } from 'react';
import { Eye, EyeOff, Save } from 'lucide-react';

export const ModulePermissionsView = () => {
  const [selectedRole, setSelectedRole] = useState('CEO');
  const [saveMessage, setSaveMessage] = useState('');

  const modules = [
    { id: 'dashboard', label: 'Dashboard', category: 'Core' },
    { id: 'clients', label: 'Clients', category: 'Core' },
    { id: 'license-master', label: 'License Master', category: 'Core' },
    { id: 'quotations', label: 'Quotations', category: 'Finance' },
    { id: 'proforma', label: 'Proforma Invoices', category: 'Finance' },
    { id: 'invoices', label: 'Invoices', category: 'Finance' },
    { id: 'payments', label: 'Payments', category: 'Finance' },
    { id: 'services', label: 'Services', category: 'Operations' },
    { id: 'reports', label: 'Reports', category: 'Analytics' },
    { id: 'office-documents', label: 'Office Documents', category: 'Admin' },
    { id: 'user-credentials', label: 'User Credentials', category: 'Admin' },
    { id: 'employees', label: 'Employees', category: 'HR' },
    { id: 'user-management', label: 'User Management', category: 'Admin' },
    { id: 'settings', label: 'Settings', category: 'Admin' }
  ];

  const [modulePermissions, setModulePermissions] = useState(() => {
    const stored = localStorage.getItem('sha_module_permissions');
    return stored ? JSON.parse(stored) : {
      CEO: modules.reduce((acc, mod) => ({ ...acc, [mod.id]: true }), {}),
      Manager: {
        dashboard: true,
        clients: true,
        'license-master': true,
        quotations: true,
        proforma: true,
        invoices: true,
        payments: true,
        reports: true,
        'office-documents': false,
        'user-credentials': false,
        employees: false,
        'user-management': false,
        services: true,
        settings: false
      },
      Staff: {
        dashboard: false,
        clients: true,
        'license-master': true,
        quotations: false,
        proforma: false,
        invoices: false,
        payments: false,
        reports: false,
        'office-documents': false,
        'user-credentials': false,
        employees: false,
        'user-management': false,
        services: false,
        settings: false
      }
    };
  });

  const roles = ['CEO', 'Manager', 'Staff'];
  const categories = [...new Set(modules.map(m => m.category))].sort();

  const handleToggleModule = (moduleId) => {
    setModulePermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleId]: !prev[selectedRole][moduleId]
      }
    }));
  };

  const handleSavePermissions = () => {
    localStorage.setItem('sha_module_permissions', JSON.stringify(modulePermissions));
    setSaveMessage('✅ Module permissions saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSelectAll = () => {
    setModulePermissions(prev => ({
      ...prev,
      [selectedRole]: modules.reduce((acc, mod) => ({ ...acc, [mod.id]: true }), {})
    }));
  };

  const handleDeselectAll = () => {
    setModulePermissions(prev => ({
      ...prev,
      [selectedRole]: modules.reduce((acc, mod) => ({ ...acc, [mod.id]: false }), {})
    }));
  };

  const currentRolePermissions = modulePermissions[selectedRole] || {};
  const accessibleModules = Object.values(currentRolePermissions).filter(Boolean).length;

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>
          Module Permissions
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
          Control which sidebar modules are visible to each user role.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px' }}>
        {/* Role Selector */}
        <div style={{ height: 'fit-content' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#0f172a', textTransform: 'uppercase' }}>
            Select Role
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                style={{
                  padding: '12px 16px',
                  background: selectedRole === role ? '#2563eb' : 'white',
                  color: selectedRole === role ? 'white' : '#0f172a',
                  border: `1px solid ${selectedRole === role ? '#2563eb' : '#e2e8f0'}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '8px' }}>
              Access Summary
            </p>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#2563eb', marginBottom: '4px' }}>
              {accessibleModules}/{modules.length}
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>modules accessible</p>
          </div>
        </div>

        {/* Module Permissions */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                {selectedRole} Role Modules
              </h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                Configure which modules this role can access
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSelectAll}
                style={{
                  padding: '8px 16px',
                  background: '#f0fdf4',
                  color: '#15803d',
                  border: '1px solid #bbf7d0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                style={{
                  padding: '8px 16px',
                  background: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Modules by Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
            {categories.map(category => {
              const categoryModules = modules.filter(m => m.category === category);
              return (
                <div key={category}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                    {category}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {categoryModules.map(module => {
                      const hasAccess = currentRolePermissions[module.id];
                      return (
                        <label
                          key={module.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: hasAccess ? '#f0fdf4' : '#f8fafc',
                            border: `1px solid ${hasAccess ? '#bbf7d0' : '#e2e8f0'}`,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={hasAccess}
                            onChange={() => handleToggleModule(module.id)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#2563eb'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>
                              {module.label}
                            </p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {hasAccess ? (
                              <>
                                <Eye size={16} style={{ color: '#10b981' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>Visible</span>
                              </>
                            ) : (
                              <>
                                <EyeOff size={16} style={{ color: '#ef4444' }} />
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>Hidden</span>
                              </>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save Button & Message */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            {saveMessage && (
              <div style={{
                padding: '12px',
                background: '#dcfce7',
                border: '1px solid #bbf7d0',
                borderRadius: '6px',
                color: '#166534',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '16px'
              }}>
                {saveMessage}
              </div>
            )}
            <button
              onClick={handleSavePermissions}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={16} /> Save Module Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
