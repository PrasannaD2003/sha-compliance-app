import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  FileCheck,
  Receipt,
  CreditCard,
  Briefcase,
  BarChart3,
  Settings,
  ShieldCheck,
  Award,
  LogOut,
  ChevronDown,
  Archive,
  Lock,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const { activeTab, setActiveTab, setEditingQuotation } = useApp();
  const { currentUser, logout } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Get user's module permissions
  const getUserPermissions = () => {
    if (!currentUser) return {};

    // Check if user has stored permissions
    if (currentUser.permissions) {
      return currentUser.permissions;
    }

    // Fallback to role-based permissions
    const roleDefaultPermissions = {
      CEO: {
        Dashboard: true,
        Clients: true,
        'License Master': true,
        Quotations: true,
        'Proforma Invoices': true,
        Invoices: true,
        Payments: true,
        Services: true,
        Reports: true,
        'Office Documents': true,
        'User Credentials': true,
        Employees: true,
        'User Management': true,
        'Module Permissions': true,
        Settings: true
      },
      Manager: {
        Dashboard: true,
        Clients: true,
        'License Master': true,
        Quotations: true,
        'Proforma Invoices': true,
        Invoices: true,
        Payments: true,
        Services: true,
        Reports: true,
        'Office Documents': false,
        'User Credentials': false,
        Employees: false,
        'User Management': false,
        'Module Permissions': false,
        Settings: false
      },
      Staff: {
        Dashboard: false,
        Clients: true,
        'License Master': true,
        Quotations: false,
        'Proforma Invoices': false,
        Invoices: false,
        Payments: false,
        Services: false,
        Reports: false,
        'Office Documents': false,
        'User Credentials': false,
        Employees: false,
        'User Management': false,
        'Module Permissions': false,
        Settings: false
      }
    };

    return roleDefaultPermissions[currentUser.role] || {};
  };

  const userPermissions = getUserPermissions();

  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permissionKey: 'Dashboard' },
    { id: 'clients', label: 'Clients', icon: Users, permissionKey: 'Clients' },
    { id: 'license-master', label: 'License Master', icon: Award, permissionKey: 'License Master' },
    { id: 'quotations', label: 'Quotations', icon: FileText, permissionKey: 'Quotations' },
    { id: 'proforma', label: 'Proforma Invoices', icon: FileCheck, permissionKey: 'Proforma Invoices' },
    { id: 'invoices', label: 'Invoices', icon: Receipt, permissionKey: 'Invoices' },
    { id: 'payments', label: 'Payments', icon: CreditCard, permissionKey: 'Payments' },
    { id: 'services', label: 'Services', icon: Briefcase, permissionKey: 'Services' },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      permissionKey: 'Reports',
      submenu: [
        { id: 'weekly-report', label: 'Weekly Compliance Report' },
        { id: 'ceo-dashboard', label: 'CEO Dashboard' },
        { id: 'daily-followup', label: 'Daily Follow-up' },
        { id: 'license-status', label: 'License Status' },
        { id: 'document-status', label: 'Document Status' },
        { id: 'renewal-report', label: 'Renewal Report' },
        { id: 'monthly-report', label: 'Monthly Report' },
        { id: 'financial-report', label: 'Financial Report' },
        { id: 'custom-report', label: 'Custom Report' }
      ]
    },
    { id: 'office-documents', label: 'Office Documents', icon: Archive, permissionKey: 'Office Documents' },
    { id: 'user-credentials', label: 'User Credentials', icon: Lock, permissionKey: 'User Credentials' },
    {
      id: 'employees',
      label: 'Employees',
      icon: Users,
      permissionKey: 'Employees',
      submenu: [
        { id: 'all-employees', label: 'All Employees' },
        { id: 'add-employee', label: 'Add Employee' },
        { id: 'departments', label: 'Departments' },
        { id: 'designations', label: 'Designations' }
      ]
    },
    { id: 'user-management', label: 'User Management', icon: Users, permissionKey: 'User Management' },
    { id: 'module-permissions', label: 'Module Permissions', icon: Eye, permissionKey: 'Module Permissions' },
    { id: 'settings', label: 'Settings', icon: Settings, permissionKey: 'Settings' }
  ];

  // Filter items based on user permissions
  const navItems = allNavItems.filter(item => {
    if (!item.permissionKey) return true; // Show items without permission key
    return userPermissions[item.permissionKey] !== false; // Show if not explicitly denied
  });

  const toggleMenu = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavClick = (id) => {
    if (id === 'reports') {
      setActiveTab('ceo-dashboard');
    } else {
      setActiveTab(id);
    }
    if (id === 'create-quotation') {
      setEditingQuotation(null);
    }
  };

  return (
    <aside className="sidebar no-print">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <ShieldCheck size={22} />
        </div>
        <div className="logo-text">
          <span className="logo-title">SHA</span>
          <span className="logo-sub">Compliance</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenus[item.id];
          const reportTabs = ['ceo-dashboard', 'daily-followup', 'license-status', 'document-status', 'renewal-report', 'monthly-report', 'financial-report', 'custom-report'];
          const isActive =
            activeTab === item.id ||
            (item.id === 'clients' && activeTab === 'client-profile') ||
            (item.id === 'quotations' && (activeTab === 'create-quotation' || activeTab === 'quotation-preview')) ||
            (item.id === 'proforma' && (activeTab === 'create-proforma' || activeTab === 'proforma-preview')) ||
            (item.id === 'invoices' && (activeTab === 'create-invoice' || activeTab === 'invoice-preview')) ||
            (item.id === 'reports' && reportTabs.includes(activeTab));

          return (
            <div key={item.id}>
              <button
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (item.submenu) {
                    toggleMenu(item.id);
                  } else {
                    handleNavClick(item.id);
                  }
                }}
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.submenu && (
                  <ChevronDown size={16} style={{ transform: isExpanded ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
                )}
              </button>

              {item.submenu && isExpanded && (
                <div className="submenu-container">
                  {item.submenu.map((sub, idx) => (
                    <button
                      key={sub.id}
                      className={`submenu-item ${activeTab === sub.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(sub.id)}
                    >
                      <div className="submenu-dot" />
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {currentUser && (
        <div className="sidebar-user">
          <div className="user-avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
            {currentUser.avatar}
          </div>
          <div className="sidebar-user-info" style={{ flex: 1 }}>
            <span className="sidebar-user-name">{currentUser.name}</span>
            <span className="sidebar-user-role">{currentUser.roleLabel}</span>
          </div>
          <button className="icon-button" onClick={logout} title="Sign Out" style={{ color: '#ef4444' }}>
            <LogOut size={16} />
          </button>
        </div>
      )}
    </aside>
  );
};
