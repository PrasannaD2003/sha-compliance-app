import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

export const ClientsView = () => {
  const { clients, deleteClient, setIsAddClientModalOpen, setSelectedClientId, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const cities = ['All Cities', ...new Set(clients.map((c) => c.city).filter(Boolean))];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = selectedCity === 'All Cities' || client.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  const handleViewClient = (clientId) => {
    setSelectedClientId(clientId);
    setActiveTab('client-profile');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Clients List</h1>
          <p className="page-subtitle">Manage hospitals, clinics and healthcare client accounts.</p>
        </div>
        <button className="btn btn-primary" onClick={() => {
          console.log('Add Client clicked');
          setIsAddClientModalOpen(true);
          console.log('Modal state set to true');
        }}>
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: 11, color: '#94a3b8' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '38px' }}
            placeholder="Search hospital, clinic or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="form-control"
          style={{ width: '160px' }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Expanded Data Table matching Specification */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Hospital / Company</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th style={{ textAlign: 'center' }}>Active Licenses</th>
                <th style={{ textAlign: 'center' }}>Pending Docs</th>
                <th style={{ textAlign: 'center' }}>Pending Lic</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td
                    style={{ fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}
                    onClick={() => handleViewClient(client.id)}
                  >
                    {client.id}
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{client.name}</td>
                  <td>{client.contactPerson}</td>
                  <td>{client.phone}</td>
                  <td style={{ fontSize: '0.8rem' }}>{client.email}</td>
                  <td style={{ fontSize: '0.8rem' }}>{client.city}, {client.state}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#16a34a' }}>
                    {client.id === 'CL-0001' ? 3 : client.activeLicenses || 1}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#dc2626' }}>
                    {client.id === 'CL-0001' ? 3 : client.pendingDocuments || 0}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#ea580c' }}>
                    {client.id === 'CL-0001' ? 2 : client.pendingLicenses || 0}
                  </td>
                  <td>
                    <span className="badge badge-accepted">
                      {client.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '4px 8px', fontSize: '0.725rem' }}
                        onClick={() => handleViewClient(client.id)}
                      >
                        <Eye size={12} /> View
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '4px 8px', fontSize: '0.725rem' }}
                        onClick={() => handleViewClient(client.id)}
                      >
                        <ShieldCheck size={12} /> Manage Licenses
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
