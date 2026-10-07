import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true';

export const initialUsers = [
  {
    id: 'USR-001',
    name: 'Admin User',
    email: 'ceo@shacompliance.com',
    role: 'CEO',
    roleLabel: 'CEO / Administrator',
    avatar: 'A',
    permissions: { canViewReports: true, canEditDocuments: true, canApprove: true, canManageUsers: true, canExport: true, canCustomize: true }
  },
  {
    id: 'USR-002',
    name: 'Rajesh Kumar',
    email: 'manager@shacompliance.com',
    role: 'Manager',
    roleLabel: 'Compliance Manager',
    avatar: 'R',
    permissions: { canViewReports: true, canEditDocuments: true, canApprove: true, canManageUsers: false, canExport: true, canCustomize: true }
  },
  {
    id: 'USR-003',
    name: 'Priya Sharma',
    email: 'staff@shacompliance.com',
    role: 'Staff',
    roleLabel: 'Documentation Executive',
    avatar: 'P',
    permissions: { canViewReports: true, canEditDocuments: true, canApprove: false, canManageUsers: false, canExport: true, canCustomize: false }
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sha_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('sha_auth_user');
    const token = localStorage.getItem('sha_auth_token');
    return (saved || token) ? true : false;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sha_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sha_auth_user');
    }
  }, [currentUser]);

  const login = async (emailOrRole, password = null) => {
    setLoading(true);
    setError(null);

    try {
      if (USE_BACKEND && password) {
        // Backend authentication
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailOrRole, password })
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        localStorage.setItem('sha_auth_token', data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Local authentication (demo mode)
        let matchedUser = null;

        // First, try to find by email in stored users
        if (password) {
          const storedUsers = JSON.parse(localStorage.getItem('sha_system_users') || '[]');
          matchedUser = storedUsers.find(u => u.email === emailOrRole && u.password === password);

          if (!matchedUser) {
            throw new Error('Invalid email or password');
          }
        } else {
          // Fall back to role-based login
          matchedUser = initialUsers.find(
            (u) => u.role.toLowerCase() === emailOrRole.toLowerCase()
          ) || initialUsers[0];
        }

        // Add permissions based on role
        const permissions = {
          CEO: { canViewReports: true, canEditDocuments: true, canApprove: true, canManageUsers: true, canExport: true, canCustomize: true },
          Manager: { canViewReports: true, canEditDocuments: true, canApprove: true, canManageUsers: false, canExport: true, canCustomize: true },
          Staff: { canViewReports: true, canEditDocuments: true, canApprove: false, canManageUsers: false, canExport: true, canCustomize: false }
        };

        // Keep module permissions if they exist, otherwise add default permissions
        if (!matchedUser.permissions || !matchedUser.permissions.Dashboard) {
          matchedUser.permissions = permissions[matchedUser.role] || permissions.Staff;
        }
        setCurrentUser(matchedUser);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sha_auth_user');
    localStorage.removeItem('sha_auth_token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const register = async (name, email, password, role = 'Staff') => {
    setLoading(true);
    setError(null);

    try {
      if (USE_BACKEND) {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const data = await response.json();
        localStorage.setItem('sha_auth_token', data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        register,
        loading,
        error,
        useBackend: USE_BACKEND
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
