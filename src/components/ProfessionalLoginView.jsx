import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfessionalLoginView = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('CEO');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const roles = [
    { name: 'CEO', icon: '👑', color: '#2563eb' },
    { name: 'Manager', icon: '📊', color: '#10b981' },
    { name: 'Staff', icon: '📋', color: '#f59e0b' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    login(selectedRole);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f8fafc' }}>
      {/* Left Section - Info */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 40px',
          color: 'white',
          overflowY: 'auto'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}
            >
              <ShieldCheck size={28} color="white" />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>SHA Compliance</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Healthcare License & Compliance</p>
            </div>
          </div>

          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.3 }}>
            Complete Healthcare License & Compliance Solution
          </h2>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '40px 0 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {[
              { icon: '✓', text: 'License Management' },
              { icon: '✓', text: 'Document Management' },
              { icon: '✓', text: 'Compliance Tracking' },
              { icon: '✓', text: 'Renewal Alerts' },
              { icon: '✓', text: 'Financial Management' },
              { icon: '✓', text: 'Role-Based Access' }
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    background: '#10b981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  ✓
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', fontSize: '12px', opacity: 0.6 }}>
          <p>🔒 Secure Access | Confidential | Reliable</p>
          <p>© 2026 SHA Compliance Management System</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px 0' }}>Welcome Back</h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Sign in to your account to continue</p>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '12px', textTransform: 'uppercase' }}>
              Select Your Role
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {roles.map(role => (
                <button
                  key={role.name}
                  onClick={() => setSelectedRole(role.name)}
                  style={{
                    padding: '16px 12px',
                    border: selectedRole === role.name ? `2px solid ${role.color}` : '2px solid #e2e8f0',
                    borderRadius: '8px',
                    background: selectedRole === role.name ? `${role.color}15` : '#f8fafc',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: selectedRole === role.name ? role.color : '#64748b'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{role.icon}</span>
                  {role.name}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#cbd5e1' }} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  defaultValue={selectedRole === 'CEO' ? 'ceo@shacompliance.com' : selectedRole === 'Manager' ? 'manager@shacompliance.com' : 'staff@shacompliance.com'}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  readOnly
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#cbd5e1' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  defaultValue="password123"
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ cursor: 'pointer' }} />
                Remember me
              </label>
              <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '8px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              Sign In as {selectedRole}
            </button>
          </form>

          <div style={{ textAlign: 'center', margin: '24px 0', color: '#cbd5e1', fontSize: '13px' }}>
            or
          </div>

          <button
            style={{
              width: '100%',
              padding: '12px',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            Sign in with Google
          </button>

          <div style={{ marginTop: '32px', padding: '16px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #2563eb', fontSize: '12px', color: '#0c4a6e' }}>
            <p style={{ margin: 0, fontWeight: 600, marginBottom: '4px' }}>Demo Credentials:</p>
            <p style={{ margin: '4px 0' }}>👑 CEO: ceo@shacompliance.com</p>
            <p style={{ margin: '4px 0' }}>📊 Manager: manager@shacompliance.com</p>
            <p style={{ margin: '4px 0' }}>📋 Staff: staff@shacompliance.com</p>
            <p style={{ margin: '8px 0 0 0' }}>Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
