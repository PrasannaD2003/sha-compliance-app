import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';

export const ServicesView = () => {
  const { services, addService, deleteService } = useApp();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [govtFee, setGovtFee] = useState(10000);
  const [consultancyFee, setConsultancyFee] = useState(15000);
  const [gstRate, setGstRate] = useState(18);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addService({
      name,
      description,
      govtFee: Number(govtFee),
      consultancyFee: Number(consultancyFee),
      gstRate: Number(gstRate)
    });
    setName('');
    setDescription('');
    setShowAddForm(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Healthcare Services Catalog</h1>
          <p className="page-subtitle">Configure compliance licenses, govt fees and consultancy pricing.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus size={16} /> {showAddForm ? 'Cancel' : '+ Add New Service'}
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Add New Service</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Service Title *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AERB Registration & License"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Service description and scope"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Govt Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={govtFee}
                  onChange={(e) => setGovtFee(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Consultancy Fee (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={consultancyFee}
                  onChange={(e) => setConsultancyFee(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: 12 }}>
              Save Service
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Govt Fee</th>
                <th>Consultancy Fee</th>
                <th>GST Rate</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => (
                <tr key={srv.id}>
                  <td style={{ fontWeight: 600, color: '#64748b' }}>{srv.id}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{srv.name}</td>
                  <td style={{ fontSize: '0.8rem', color: '#475569' }}>{srv.description}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(srv.govtFee)}</td>
                  <td style={{ fontWeight: 600, color: '#2563eb' }}>
                    {formatCurrency(srv.consultancyFee)}
                  </td>
                  <td>{srv.gstRate}%</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="icon-button"
                      onClick={() => deleteService(srv.id)}
                      title="Delete service"
                    >
                      <Trash2 size={15} style={{ color: '#ef4444' }} />
                    </button>
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
