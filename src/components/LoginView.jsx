import React, { useState, useEffect } from 'react';
import { ShieldCheck, UserCheck, Lock, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import { useAuth, initialUsers } from '../context/AuthContext';

export const LoginView = () => {
  const { login, useBackend, loading, error } = useAuth();
  const [selectedRole, setSelectedRole] = useState('CEO');
  const [email, setEmail] = useState('ceo@shacompliance.com');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const match = initialUsers.find((u) => u.role === role);
    if (match) {
      setEmail(match.email);
      setPassword('password123');
    }
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      if (useBackend) {
        // Backend authentication
        await login(email, password);
      } else {
        // Local demo authentication
        login(selectedRole);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: 36,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: 'white'
        }}
      >
        {/* Header Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)',
              marginBottom: 12
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: '#ffffff',
              letterSpacing: -0.5
            }}
          >
            SHA COMPLIANCE
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4 }}>
            Healthcare License & Compliance Portal
          </p>
        </div>

        {/* Mode Indicator */}
        <div style={{
          background: useBackend ? '#fef3c7' : '#f0fdf4',
          border: useBackend ? '1px solid #fcd34d' : '1px solid #bbf7d0',
          borderRadius: 8,
          padding: '10px 12px',
          marginBottom: 20,
          fontSize: '0.75rem',
          fontWeight: 600,
          color: useBackend ? '#92400e' : '#166534'
        }}>
          {useBackend ? '🔒 Backend Authentication' : '🎭 Demo Mode (Local)'}
        </div>

        {/* Error Message */}
        {loginError && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            borderRadius: 8,
            padding: '12px',
            marginBottom: 16,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <AlertCircle size={16} />
            {loginError}
          </div>
        )}

        {/* Quick Demo Role Cards (when not using backend) */}
        {!useBackend && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 }}>
              Select Login Account / Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {initialUsers.map((u) => {
                const active = selectedRole === u.role;
                return (
                  <button
                    key={u.role}
                    type="button"
                    onClick={() => handleRoleSelect(u.role)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: 8,
                      border: active ? '2px solid #2563eb' : '1px solid #334155',
                      background: active ? '#1e40af' : '#0f172a',
                      color: active ? '#ffffff' : '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <UserCheck size={16} style={{ color: active ? '#60a5fa' : '#64748b' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{u.role}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>
              {useBackend ? 'Email Address' : 'Work Email'}
            </label>
            <input
              type="email"
              required
              disabled={!useBackend && isLoading}
              className="form-control"
              style={{
                background: '#0f172a',
                border: '1px solid #334155',
                color: 'white',
                padding: '10px 14px',
                opacity: !useBackend && isLoading ? 0.6 : 1
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={useBackend ? 'ceo@shacompliance.com' : ''}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                disabled={isLoading}
                className="form-control"
                style={{
                  background: '#0f172a',
                  border: '1px solid #334155',
                  color: 'white',
                  padding: '10px 14px',
                  opacity: isLoading ? 0.6 : 1
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
              />
              <Lock size={16} style={{ position: 'absolute', right: 12, top: 12, color: '#64748b' }} />
            </div>
          </div>

          {useBackend && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb' }} /> Remember me
              </label>
              <span style={{ color: '#38bdf8', cursor: 'pointer' }}>Forgot Password?</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              justifyContent: 'center',
              fontSize: '0.95rem',
              fontWeight: 700,
              marginTop: 8,
              borderRadius: 8,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            {isLoading && <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />}
            {useBackend ? 'Sign In' : `Sign In as ${selectedRole}`}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Demo Credentials Help */}
        {useBackend && (
          <div style={{
            marginTop: 20,
            padding: 12,
            background: '#1e293b',
            borderRadius: 8,
            borderLeft: '3px solid #2563eb',
            fontSize: '0.75rem',
            color: '#94a3b8',
            lineHeight: '1.6'
          }}>
            <div style={{ fontWeight: 600, marginBottom: 8, color: '#cbd5e1' }}>Demo Credentials:</div>
            <div>👤 ceo@shacompliance.com (CEO)</div>
            <div>👤 manager@shacompliance.com (Manager)</div>
            <div>👤 staff@shacompliance.com (Staff)</div>
            <div style={{ marginTop: 8, color: '#64748b' }}>🔑 Password: password123</div>
          </div>
        )}
      </div>
    </div>
  );
};
