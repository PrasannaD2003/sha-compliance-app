import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddLicenseToClientModal = () => {
  const {
    isAddLicenseModalOpen,
    setIsAddLicenseModalOpen,
    masterLicenses,
    addLicenseToClient,
    selectedClientId
  } = useApp();

  const [selectedMasterId, setSelectedMasterId] = useState(masterLicenses[0]?.id || 'LIC-CEA');
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedSubmission, setExpectedSubmission] = useState('2026-10-15');
  const [renewalDate, setRenewalDate] = useState('2031-10-15');
  const [responsiblePerson, setResponsiblePerson] = useState('Rajesh Kumar (Manager)');
  const [priority, setPriority] = useState('High');

  if (!isAddLicenseModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const master = masterLicenses.find((m) => m.id === selectedMasterId);
    if (!master) return;

    addLicenseToClient({
      clientId: selectedClientId,
      licenseMasterId: master.id,
      licenseName: master.name,
      applicationDate,
      expectedSubmission,
      renewalDate,
      responsiblePerson,
      priority
    });

    setIsAddLicenseModalOpen(false);
  };

  return (
    <div className="modal-overlay" style={{ display: isAddLicenseModalOpen ? 'flex' : 'none' }}>
      <div className="modal-content" style={{ maxWidth: 520 }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            + Add License to Client
          </h3>
          <button className="icon-button" onClick={() => setIsAddLicenseModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Select Healthcare License *</label>
              <select
                className="form-control"
                value={selectedMasterId}
                onChange={(e) => setSelectedMasterId(e.target.value)}
              >
                {masterLicenses.map((lic) => (
                  <option key={lic.id} value={lic.id}>
                    {lic.name} ({lic.governingAuthority})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Application Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Expected Submission</label>
                <input
                  type="date"
                  className="form-control"
                  value={expectedSubmission}
                  onChange={(e) => setExpectedSubmission(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Responsible Executive</label>
                <input
                  type="text"
                  className="form-control"
                  value={responsiblePerson}
                  onChange={(e) => setResponsiblePerson(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-control"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsAddLicenseModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add License & Load Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
