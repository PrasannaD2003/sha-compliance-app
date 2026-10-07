import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddClientModal = () => {
  const { isAddClientModalOpen, setIsAddClientModalOpen, addClient } = useApp();

  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [city, setCity] = useState('Chennai');
  const [state, setState] = useState('Tamil Nadu');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  console.log('AddClientModal rendered - isAddClientModalOpen:', isAddClientModalOpen);

  if (!isAddClientModalOpen) {
    console.log('Modal is closed, returning null');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setMessage({ type: 'error', text: '❌ Hospital/Company Name is required!' });
      return;
    }

    if (!phone.trim()) {
      setMessage({ type: 'error', text: '❌ Phone/Mobile is required!' });
      return;
    }

    if (!email.trim()) {
      setMessage({ type: 'error', text: '❌ Email Address is required!' });
      return;
    }

    if (!email.includes('@')) {
      setMessage({ type: 'error', text: '❌ Please enter a valid email address!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await addClient({
        name,
        contactPerson,
        phone,
        email,
        gstin: gstin || '33ABCDE1234F1Z5',
        city,
        state,
        address: address || `${city}, ${state}`
      });

      if (result) {
        setMessage({ type: 'success', text: `✅ Client "${name}" added successfully!` });
        console.log('✅ Client added:', result);

        setTimeout(() => {
          setIsAddClientModalOpen(false);
          setName('');
          setContactPerson('');
          setPhone('');
          setEmail('');
          setGstin('');
          setAddress('');
          setMessage({ type: '', text: '' });
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage({ type: 'error', text: `❌ Error: ${error.message}` });
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ display: isAddClientModalOpen ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Add New Client</h3>
          <button
            className="icon-button"
            onClick={() => setIsAddClientModalOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Hospital / Company Name *</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="e.g. Apollo Speciality Hospital"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Mr. Ramesh / Dr. Priya"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone / Mobile *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="admin@hospital.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">GSTIN Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="33ABCDE1234F1Z5"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Street address, Pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Message Display */}
            {message.text && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: message.type === 'error' ? '#fee2e2' : '#dcfce7',
                border: `1px solid ${message.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
                color: message.type === 'error' ? '#991b1b' : '#166534',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {message.type === 'error' ? (
                  <AlertCircle size={18} />
                ) : (
                  <CheckCircle size={18} />
                )}
                {message.text}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddClientModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? '⏳ Saving...' : '💾 Save Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
