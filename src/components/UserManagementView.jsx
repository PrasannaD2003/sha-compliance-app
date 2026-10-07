import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Shield, Mail, Phone, Calendar } from 'lucide-react';
import { CreateUserModal } from './Modals/CreateUserModal';

export const UserManagementView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultUsers = [
    { id: 'USR-001', name: 'Admin User', email: 'admin@company.com', role: 'CEO', department: 'Management', designation: 'Executive', status: 'Active', lastLogin: '29 Sep 2026 10:20', password: 'password123' },
    { id: 'USR-002', name: 'CEO User', email: 'ceo@company.com', role: 'CEO', department: 'Management', designation: 'Executive', status: 'Active', lastLogin: '29 Sep 2026 08:15', password: 'password123' },
    { id: 'USR-003', name: 'Operations Manager', email: 'manager@company.com', role: 'Manager', department: 'Operations', designation: 'Senior Manager', status: 'Active', lastLogin: '28 Sep 2026 18:30', password: 'password123' },
    { id: 'USR-004', name: 'Mr. Kumar', email: 'staff1@company.com', role: 'Staff', department: 'License Team', designation: 'Assistant Manager', status: 'Active', lastLogin: '28 Sep 2026 11:10', password: 'password123' },
    { id: 'USR-005', name: 'Ms. Priya', email: 'staff2@company.com', role: 'Staff', department: 'Documentation', designation: 'Coordinator', status: 'Inactive', lastLogin: '25 Sep 2026 16:45', password: 'password123' }
  ];

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('sha_system_users');
    return stored ? JSON.parse(stored) : defaultUsers;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');

  const roleColors = {
    CEO: { bg: '#dbeafe', text: '#1e40af', icon: '👑' },
    Manager: { bg: '#dcfce7', text: '#15803d', icon: '📊' },
    Staff: { bg: '#fef3c7', text: '#b45309', icon: '📋' }
  };

  const statusColors = {
    Active: { bg: '#dcfce7', text: '#15803d' },
    Inactive: { bg: '#fee2e2', text: '#991b1b' }
  };

  const stats = [
    { label: 'Total Users', value: '12', icon: '👥', color: '#2563eb' },
    { label: 'Active Users', value: '10', icon: '✓', color: '#10b981' },
    { label: 'Inactive Users', value: '2', icon: '✗', color: '#ef4444' },
    { label: 'Admins', value: '1', icon: '👑', color: '#8b5cf6' },
    { label: 'Managers', value: '3', icon: '📊', color: '#06b6d4' },
    { label: 'Staff', value: '7', icon: '📋', color: '#f59e0b' }
  ];

  const filteredUsers = users.filter(user =>
    (filterRole === 'All Roles' || user.role === filterRole) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddUser = (formData) => {
    const newUser = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Active',
      lastLogin: 'Never',
      // Store module permissions with the user
      permissions: formData.permissions || {}
    };
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    // Save to localStorage for login
    localStorage.setItem('sha_system_users', JSON.stringify(updatedUsers));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    // Save to localStorage for login
    localStorage.setItem('sha_system_users', JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>User Management</h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Create users and control access to the system.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} /> Create User
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{stat.label}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#cbd5e1' }} />
          <input
            type="text"
            placeholder="Search name, email, role..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '140px'
          }}
        >
          <option>All Roles</option>
          <option>CEO</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>

        <select
          style={{
            padding: '10px 12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '140px'
          }}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          style={{
            padding: '10px 16px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            color: '#64748b'
          }}
        >
          Reset
        </button>
      </div>

      {/* Users Table */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>User ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Name</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Email / Username</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Designation</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Last Login</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: '1px solid #e2e8f0',
                  background: i % 2 === 0 ? 'white' : '#f8fafc',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.target.parentElement.style.background = '#f1f5f9'}
                onMouseLeave={e => e.target.parentElement.style.background = i % 2 === 0 ? 'white' : '#f8fafc'}
              >
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0f172a' }}>{user.id}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'white'
                      }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>{user.email}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: roleColors[user.role].bg,
                      color: roleColors[user.role].text,
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    {roleColors[user.role].icon} {user.role}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: 500 }}>{user.designation || 'N/A'}</td>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>{user.department}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      background: statusColors[user.status].bg,
                      color: statusColors[user.status].text,
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{user.lastLogin}</td>
                <td style={{ padding: '12px 16px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: '14px' }}>
                    <Eye size={16} />
                  </button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: '14px' }}>
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '14px' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', fontSize: '12px', color: '#64748b' }}>
        <p>Showing 1 to {filteredUsers.length} of {users.length} entries</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3, 4].map(n => (
            <button
              key={n}
              style={{
                width: '32px',
                height: '32px',
                border: n === 1 ? 'none' : '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                background: n === 1 ? '#2563eb' : 'white',
                color: n === 1 ? 'white' : '#64748b',
                fontWeight: n === 1 ? 600 : 500
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};
