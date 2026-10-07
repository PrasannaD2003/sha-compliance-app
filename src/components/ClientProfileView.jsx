import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Edit,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  Send,
  Eye,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, formatDateFull } from '../utils/formatters';
import { AddEditClientDocumentModal } from './Modals/AddEditClientDocumentModal';
import { PortalCredentialsModal } from './Modals/PortalCredentialsModal';
import BranchesView from './BranchesView';

export const ClientProfileView = () => {
  const {
    clients,
    selectedClientId,
    setSelectedClientId,
    setActiveTab,
    selectedClientSubTab,
    setSelectedClientSubTab,
    clientLicenses,
    selectedClientLicenseId,
    setSelectedClientLicenseId,
    quotations,
    invoices,
    payments,
    documentRequests,
    setIsAddLicenseModalOpen,
    setIsUploadDocModalOpen,
    setIsRequestDocModalOpen,
    setActiveUploadTarget,
    setActiveRequestTarget,
    updateLicenseStatus,
    deleteClientDocumentItem
  } = useApp();

  const client = clients.find((c) => c.id === selectedClientId) || clients[0];
  const thisClientLicenses = clientLicenses.filter((l) => l.clientId === client.id);
  const selectedLicense = thisClientLicenses.find((l) => l.id === selectedClientLicenseId) || thisClientLicenses[0];

  const [documentSearch, setDocumentSearch] = useState('');
  const [documentFilter, setDocumentFilter] = useState('All Status');
  const [newNoteText, setNewNoteText] = useState('');
  const [clientNotes, setClientNotes] = useState([
    { id: 1, text: 'Client requested expedited handling for CEA license due to DMO audit on 25 Nov 2026.', author: 'Rajesh Kumar (Manager)', date: '2026-09-20' },
    { id: 2, text: 'Fire NOC equipment inspection report received from vendor.', author: 'Priya Sharma (Staff)', date: '2026-09-24' }
  ]);

  // Client Document Modal state
  const [isClientDocModalOpen, setIsClientDocModalOpen] = useState(false);
  const [editingClientDoc, setEditingClientDoc] = useState(null);

  // Portal Credentials state
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [editingPortal, setEditingPortal] = useState(null);
  const [portalCredentials, setPortalCredentials] = useState([
    {
      id: 1,
      portalName: 'Clinical Establishment Tamil Nadu (TNSWP)',
      portalUrl: 'https://tnswp.tn.gov.in',
      username: 'abchospital123',
      password: 'encrypte****',
      loginType: 'User ID & Password',
      remarks: 'Official login for CEA application and renewal',
      registeredEmail: 'admin@abchospital.com',
      registeredMobile: '9876543210'
    }
  ]);

  if (!client) {
    return (
      <div className="page-container">
        <p>Client not found.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('clients')}>
          Back to Clients
        </button>
      </div>
    );
  }

  // Summary Metrics
  const totalLicensesCount = thisClientLicenses.length;
  const completedLicensesCount = thisClientLicenses.filter((l) => l.stage === 'Completed' || l.status === 'Approved').length;
  const inProgressLicensesCount = thisClientLicenses.filter((l) => l.stage === 'In Progress').length;
  const notStartedLicensesCount = thisClientLicenses.filter((l) => l.stage === 'Not Started').length;

  // Documents calculation for selected license
  const licenseDocs = selectedLicense?.documents || [];
  const submittedDocs = licenseDocs.filter((d) => d.status === 'Submitted' || d.status === 'Approved');
  const inReviewDocs = licenseDocs.filter((d) => d.status === 'Under Review');
  const pendingDocs = licenseDocs.filter((d) => d.status === 'Pending from Client' || d.status === 'Requested' || d.status === 'Not Started');
  const totalDocsCount = licenseDocs.length;
  const submittedDocsCount = submittedDocs.length;
  const progressPercent = totalDocsCount > 0 ? Math.round((submittedDocsCount / totalDocsCount) * 100) : 0;

  const totalClientPendingDocsCount = thisClientLicenses.reduce(
    (acc, lic) => acc + (lic.documents || []).filter((d) => d.status !== 'Submitted' && d.status !== 'Approved').length,
    0
  );

  const filteredDocs = licenseDocs.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase()) || doc.description.toLowerCase().includes(documentSearch.toLowerCase());
    const matchesFilter = documentFilter === 'All Status' || doc.status === documentFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenUpload = (doc) => {
    setActiveUploadTarget({
      clientLicenseId: selectedLicense.id,
      docId: doc.id,
      docName: doc.name
    });
    setIsUploadDocModalOpen(true);
  };

  const handleOpenRequest = (doc) => {
    setActiveRequestTarget({
      clientLicenseId: selectedLicense.id,
      docId: doc.id,
      docName: doc.name
    });
    setIsRequestDocModalOpen(true);
  };

  const handleCreateClientDoc = () => {
    setEditingClientDoc(null);
    setIsClientDocModalOpen(true);
  };

  const handleEditClientDoc = (doc) => {
    setEditingClientDoc(doc);
    setIsClientDocModalOpen(true);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText) return;
    setClientNotes([
      { id: Date.now(), text: newNoteText, author: 'Admin User', date: new Date().toISOString().split('T')[0] },
      ...clientNotes
    ]);
    setNewNoteText('');
  };

  const subTabs = [
    'Overview',
    'Branches',
    'Licenses & Documents',
    'Quotations',
    'Proforma Invoices',
    'Invoices',
    'Payments',
    'Reports',
    'Notes',
    'Activity'
  ];

  return (
    <div className="page-container">
      {/* Top Breadcrumb & Return button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          Clients &gt; <strong style={{ color: '#0f172a' }}>{client.name}</strong> &gt; {selectedLicense?.licenseName || 'CEA License'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => setActiveTab('clients')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            <ArrowLeft size={16} /> Back to Clients
          </button>
          <button className="btn btn-primary" onClick={() => setIsAddLicenseModalOpen(true)}>
            <Plus size={16} /> + Add New License
          </button>
        </div>
      </div>

      {/* Client Header Card */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div className="logo-icon" style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, #2563eb, #0284c7)' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                  {client.name}
                </h1>
                <span className="badge badge-accepted" style={{ fontSize: '0.75rem' }}>Active Client</span>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 6, fontSize: '0.825rem', color: '#475569', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} /> {client.contactPerson}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={14} /> {client.phone}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={14} /> {client.email}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={14} /> {client.address}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              <Edit size={14} /> Edit Client
            </button>
            <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setIsAddLicenseModalOpen(true)}>
              <Plus size={14} /> Add License
            </button>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => setActiveTab('create-quotation')}>
              <FileText size={14} /> Create Quotation
            </button>
          </div>
        </div>

        {/* 9 Sub-Tabs Navigation */}
        <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #e2e8f0', marginTop: 20, overflowX: 'auto' }}>
          {subTabs.map((tab) => {
            const isActive = selectedClientSubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedClientSubTab(tab)}
                style={{
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#2563eb' : '#64748b',
                  borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                  background: 'transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB CONTENT RENDERER */}

      {/* 1. OVERVIEW TAB */}
      {/* 2. BRANCHES TAB */}
      {selectedClientSubTab === 'Branches' && (
        <BranchesView clientId={client.id || client._id} />
      )}

      {selectedClientSubTab === 'Overview' && (
        <div>
          <div className="stats-grid">
            <div className="stat-card">
              <div>
                <div className="stat-title">TOTAL LICENSES</div>
                <div className="stat-value">{totalLicensesCount}</div>
              </div>
              <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><ShieldCheck size={22} /></div>
            </div>
            <div className="stat-card">
              <div>
                <div className="stat-title">COMPLETED</div>
                <div className="stat-value" style={{ color: '#16a34a' }}>{completedLicensesCount}</div>
              </div>
              <div className="stat-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><CheckCircle2 size={22} /></div>
            </div>
            <div className="stat-card">
              <div>
                <div className="stat-title">IN PROGRESS</div>
                <div className="stat-value" style={{ color: '#ea580c' }}>{inProgressLicensesCount}</div>
              </div>
              <div className="stat-icon" style={{ background: '#fff7ed', color: '#ea580c' }}><Clock size={22} /></div>
            </div>
            <div className="stat-card">
              <div>
                <div className="stat-title">PENDING DOCUMENTS</div>
                <div className="stat-value" style={{ color: '#dc2626' }}>{totalClientPendingDocsCount}</div>
              </div>
              <div className="stat-icon" style={{ background: '#fef2f2', color: '#dc2626' }}><AlertTriangle size={22} /></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Active Healthcare Licenses</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {thisClientLicenses.map((lic) => (
                  <div key={lic.id} style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{lic.licenseName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>
                        Status: <strong style={{ color: '#2563eb' }}>{lic.status}</strong> | Renewal: {formatDate(lic.renewalDate)}
                      </div>
                    </div>
                    <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => { setSelectedClientLicenseId(lic.id); setSelectedClientSubTab('Licenses & Documents'); }}>
                      View Checklist
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14, color: '#dc2626' }}>Pending Client Documents</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {documentRequests.map((req) => (
                  <div key={req.id} style={{ background: '#fff7ed', padding: 12, borderRadius: 8, border: '1px solid #ffedd5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#9a3412', fontSize: '0.85rem' }}>{req.docName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#c2410c' }}>Due: {formatDate(req.dueDate)}</div>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleOpenRequest({ clientLicenseId: req.clientLicenseId, docId: req.docId, docName: req.docName })}>
                      <Send size={12} /> Request Document
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LICENSES & DOCUMENTS TAB */}
      {selectedClientSubTab === 'Licenses & Documents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* License Status Cards Carousel Header */}
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 4 }}>
            {thisClientLicenses.map((lic) => {
              const isSelected = selectedLicense?.id === lic.id;
              const sCount = (lic.documents || []).filter((d) => d.status === 'Submitted' || d.status === 'Approved').length;
              const tCount = lic.documents?.length || 0;

              return (
                <div
                  key={lic.id}
                  onClick={() => setSelectedClientLicenseId(lic.id)}
                  style={{
                    minWidth: 200,
                    background: isSelected ? '#ffffff' : '#f8fafc',
                    border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    borderRadius: 12,
                    padding: '14px 16px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <ShieldCheck size={20} style={{ color: isSelected ? '#2563eb' : '#64748b' }} />
                    <span className={`badge badge-${lic.stage === 'Completed' ? 'paid' : lic.stage === 'In Progress' ? 'sent' : 'draft'}`}>
                      {lic.stage}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.2, height: 32 }}>
                    {lic.licenseName}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#64748b', marginTop: 8 }}>
                    <span>Progress</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{sCount} / {tCount}</span>
                  </div>
                </div>
              );
            })}

            <div
              onClick={() => setIsAddLicenseModalOpen(true)}
              style={{
                minWidth: 140,
                border: '2px dashed #cbd5e1',
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: 'center',
                gap: 6,
                cursor: 'pointer',
                color: '#2563eb',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
            >
              <Plus size={20} /> Add License
            </div>
          </div>

          {/* Selected License Main Workspace */}
          {selectedLicense && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Selected License Stage Card */}
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div className="logo-icon" style={{ width: 44, height: 44, borderRadius: 10, background: '#eff6ff', color: '#2563eb' }}>
                        <ShieldCheck size={26} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                            {selectedLicense.licenseName}
                          </h2>
                          <span className="badge badge-sent">{selectedLicense.stage}</span>
                        </div>
                        <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: 2 }}>
                          {selectedLicense.description}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.775rem' }}>
                        <Edit size={14} /> Edit License
                      </button>
                      <button className="btn btn-outline" style={{ padding: '6px 10px', fontSize: '0.775rem' }}>
                        <Download size={14} /> Download Checklist
                      </button>
                      <button className="btn btn-success" style={{ padding: '6px 10px', fontSize: '0.775rem' }} onClick={() => updateLicenseStatus(selectedLicense.id, 'Approved')}>
                        <CheckCircle2 size={14} /> Mark as Completed
                      </button>
                    </div>
                  </div>

                  {/* Dates & Status Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 16 }}>
                    <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Application Date</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginTop: 2 }}>{formatDate(selectedLicense.applicationDate)}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Expected Submission</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginTop: 2 }}>{formatDate(selectedLicense.expectedSubmission)}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Target Approval Date</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginTop: 2 }}>{formatDate(selectedLicense.targetApprovalDate)}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Status</div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2563eb', marginTop: 2 }}>{selectedLicense.status}</div>
                    </div>
                  </div>

                  {/* In Charges Section */}
                  <div style={{ background: '#ffe6e6', border: '2px solid #dc3545', borderRadius: 8, padding: 16, marginTop: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#721c24', fontWeight: 700, marginBottom: 8 }}>OFFICE INCHARGE</div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a', marginBottom: 3 }}>Mr. Prasanna</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 3 }}>9876543210</div>
                        <div style={{ fontSize: '0.8rem', color: '#2563eb' }}>prasanna@sha.com</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#721c24', fontWeight: 700, marginBottom: 8 }}>APPLY BY</div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a', marginBottom: 3 }}>Mr. Kumar (SHA)</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 3 }}>9812345678</div>
                        <div style={{ fontSize: '0.8rem', color: '#2563eb' }}>kumar@sha.com</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#721c24', fontWeight: 700, marginBottom: 8 }}>CLIENT INCHARGE</div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a', marginBottom: 3 }}>{client.contact}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 3 }}>{client.phone}</div>
                        <div style={{ fontSize: '0.8rem', color: '#2563eb' }}>{client.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Document Progress Bar & Counter Cards */}
                  <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                      <span>{submittedDocsCount} of {totalDocsCount} documents completed ({progressPercent}%)</span>
                    </div>
                    <div style={{ width: '100%', height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 16 }}>
                    <div style={{ background: '#f0fdf4', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 14, background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{submittedDocsCount}</div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857' }}>Submitted</span>
                    </div>
                    <div style={{ background: '#fefce8', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 14, background: '#ca8a04', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{inReviewDocs.length}</div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a16207' }}>In Review</span>
                    </div>
                    <div style={{ background: '#fef2f2', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 14, background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{pendingDocs.length}</div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b91c1c' }}>Pending</span>
                    </div>
                  </div>
                </div>

                {/* Required Documents Table */}
                <div className="card">
                  <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
                    <h3 className="card-title">Required Documents Checklist ({totalDocsCount})</h3>

                    <div style={{ display: 'flex', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
                      <input
                        type="text"
                        className="form-control"
                        style={{ maxWidth: 180, padding: '5px 10px', fontSize: '0.8rem' }}
                        placeholder="Search document..."
                        value={documentSearch}
                        onChange={(e) => setDocumentSearch(e.target.value)}
                      />
                      <select
                        className="form-control"
                        style={{ width: 130, padding: '5px 10px', fontSize: '0.8rem' }}
                        value={documentFilter}
                        onChange={(e) => setDocumentFilter(e.target.value)}
                      >
                        <option value="All Status">All Status</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Pending from Client">Pending</option>
                        <option value="Requested">Requested</option>
                      </select>
                      <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '0.775rem' }} onClick={handleCreateClientDoc}>
                        <Plus size={14} /> Add Document
                      </button>
                    </div>
                  </div>

                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th style={{ width: 35 }}>S.No</th>
                          <th>Document Name</th>
                          <th>Description</th>
                          <th style={{ textAlign: 'center', width: 75 }}>Mandatory</th>
                          <th style={{ textAlign: 'center', width: 110 }}>Status</th>
                          <th>Uploaded File</th>
                          <th>Remarks</th>
                          <th style={{ textAlign: 'center', width: 110 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocs.map((doc, idx) => {
                          const isSub = doc.status === 'Submitted' || doc.status === 'Approved';
                          return (
                            <tr key={doc.id || idx}>
                              <td>{idx + 1}</td>
                              <td style={{ fontWeight: 700, color: '#0f172a' }}>{doc.name}</td>
                              <td style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.description}</td>
                              <td style={{ textAlign: 'center' }}>
                                {doc.mandatory ? (
                                  <span className="badge badge-overdue" style={{ fontSize: '0.65rem' }}>Yes</span>
                                ) : (
                                  <span className="badge badge-draft" style={{ fontSize: '0.65rem' }}>No</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <span className={`badge badge-${isSub ? 'paid' : doc.status === 'Requested' ? 'sent' : 'overdue'}`}>
                                  {doc.status}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.775rem' }}>
                                {doc.fileName ? (
                                  <a href="#" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <FileText size={14} /> {doc.fileName}
                                  </a>
                                ) : (
                                  <span style={{ color: '#94a3b8' }}>-</span>
                                )}
                              </td>
                              <td style={{ fontSize: '0.75rem', color: isSub ? '#64748b' : '#dc2626' }}>
                                {doc.remarks}
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                                  {isSub ? (
                                    <>
                                      <button className="icon-button" title="View File" onClick={() => alert(`Viewing document: ${doc.fileName}`)}>
                                        <Eye size={14} />
                                      </button>
                                      <button className="icon-button" title="Replace File" onClick={() => handleOpenUpload(doc)}>
                                        <Upload size={14} />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button className="btn btn-outline" style={{ padding: '2px 5px', fontSize: '0.675rem' }} onClick={() => handleOpenUpload(doc)}>
                                        Upload
                                      </button>
                                      <button className="btn btn-primary" style={{ padding: '2px 5px', fontSize: '0.675rem' }} onClick={() => handleOpenRequest(doc)}>
                                        Request
                                      </button>
                                    </>
                                  )}
                                  <button className="icon-button" title="Edit Item Details" onClick={() => handleEditClientDoc(doc)}>
                                    <Edit size={13} />
                                  </button>
                                  <button className="icon-button" title="Remove Document" onClick={() => deleteClientDocumentItem(selectedLicense.id, doc.id)}>
                                    <Trash2 size={13} style={{ color: '#ef4444' }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pending Documents Highlight Cards */}
                {pendingDocs.length > 0 && (
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dc2626', marginBottom: 14 }}>
                      Pending Documents Action Cards ({pendingDocs.length})
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                      {pendingDocs.map((pDoc) => (
                        <div key={pDoc.id} style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#9a3412' }}>{pDoc.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#c2410c', marginTop: 4 }}>
                              Status: <strong>{pDoc.status}</strong>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#7c2d12', marginTop: 4 }}>
                              Remarks: {pDoc.remarks}
                            </div>
                          </div>
                          <button className="btn btn-primary" style={{ marginTop: 12, width: '100%', justifyContent: 'center', fontSize: '0.75rem' }} onClick={() => handleOpenRequest(pDoc)}>
                            <Send size={12} /> Request Document
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portal Credentials Section */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Portal Credentials</h3>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => {
                        setEditingPortal(null);
                        setIsPortalModalOpen(true);
                      }}
                    >
                      <Plus size={15} /> Add Portal
                    </button>
                  </div>

                  {portalCredentials.length > 0 ? (
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Portal Name</th>
                            <th>Portal URL</th>
                            <th>Username</th>
                            <th>Login Type</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portalCredentials.map((portal) => (
                            <tr key={portal.id}>
                              <td style={{ fontWeight: 600, color: '#0f172a' }}>{portal.portalName}</td>
                              <td>
                                <a href={portal.portalUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem' }}>
                                  {portal.portalUrl}
                                </a>
                              </td>
                              <td style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{portal.username}</td>
                              <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{portal.loginType}</td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                  <button
                                    className="icon-button"
                                    title="View Details"
                                    onClick={() => {
                                      setEditingPortal(portal);
                                      setIsPortalModalOpen(true);
                                    }}
                                  >
                                    <Eye size={16} style={{ color: '#2563eb' }} />
                                  </button>
                                  <button
                                    className="icon-button"
                                    title="Edit"
                                    onClick={() => {
                                      setEditingPortal(portal);
                                      setIsPortalModalOpen(true);
                                    }}
                                  >
                                    <Edit size={16} style={{ color: '#64748b' }} />
                                  </button>
                                  <button
                                    className="icon-button"
                                    title="Delete"
                                    onClick={() => {
                                      if (window.confirm('Delete this portal credential?')) {
                                        setPortalCredentials(portalCredentials.filter(p => p.id !== portal.id));
                                      }
                                    }}
                                  >
                                    <Trash2 size={16} style={{ color: '#ef4444' }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                      <p style={{ fontSize: '0.875rem', marginBottom: 8 }}>No portal credentials added yet</p>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                        onClick={() => {
                          setEditingPortal(null);
                          setIsPortalModalOpen(true);
                        }}
                      >
                        <Plus size={14} /> Add First Portal
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Info Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Client Information Card */}
                <div className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Client Information</h3>
                    <button className="icon-button"><Edit size={14} /></button>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontWeight: 800, color: '#0f172a' }}>{client.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><User size={14} className="text-slate-400" /> {client.contactPerson}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} className="text-slate-400" /> {client.phone}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} className="text-slate-400" /> {client.email}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} className="text-slate-400" /> {client.address}</div>
                    <div style={{ fontWeight: 600, color: '#0f172a', marginTop: 4 }}>GSTIN: {client.gstin}</div>
                  </div>
                </div>

                {/* License Details Card */}
                <div className="card" style={{ padding: 18 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>License Information</h3>
                  <div style={{ fontSize: '0.775rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 8, lineHeight: 1.4 }}>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>License Name</div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedLicense.licenseName}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Governing Authority</div>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{selectedLicense.governingAuthority}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Typical Timeline</div>
                      <div style={{ fontWeight: 600 }}>{selectedLicense.timeline}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Validity</div>
                      <div style={{ fontWeight: 600 }}>{selectedLicense.validity}</div>
                    </div>
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 6 }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Government Fee</div>
                      <div style={{ fontWeight: 700 }}>{formatCurrency(selectedLicense.govtFee)} (Approx.)</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Consultancy Fee</div>
                      <div style={{ fontWeight: 700, color: '#2563eb' }}>{formatCurrency(selectedLicense.consultancyFee)}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="card" style={{ padding: 18 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Quick Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.775rem' }} onClick={() => pendingDocs[0] && handleOpenUpload(pendingDocs[0])}>
                      <Upload size={14} /> Upload Pending Documents
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.775rem' }} onClick={() => pendingDocs[0] && handleOpenRequest(pendingDocs[0])}>
                      <Send size={14} /> Request Documents from Client
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.775rem' }}>
                      <FileText size={14} /> View Complete Checklist
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.775rem', color: '#dc2626', borderColor: '#fca5a5' }} onClick={() => updateLicenseStatus(selectedLicense.id, 'Closed')}>
                      <Trash2 size={14} /> Close License
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Other Sub-Tabs */}
      {selectedClientSubTab === 'Quotations' && (
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Client Quotations</h3>
          <table className="data-table">
            <thead>
              <tr><th>Quotation No</th><th>Date</th><th>Valid Until</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id}>
                  <td style={{ fontWeight: 600, color: '#2563eb' }}>{q.quotationNo || q.id}</td>
                  <td>{formatDate(q.date)}</td>
                  <td>{formatDate(q.validUntil)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(q.grandTotal)}</td>
                  <td><span className={`badge badge-${(q.status || 'draft').toLowerCase()}`}>{q.status || 'Draft'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedClientSubTab === 'Invoices' && (
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Tax Invoices</h3>
          <table className="data-table">
            <thead>
              <tr><th>Invoice No</th><th>Date</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600, color: '#2563eb' }}>{inv.invoiceNo || inv.id}</td>
                  <td>{formatDate(inv.date)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(inv.grandTotal)}</td>
                  <td style={{ color: '#16a34a' }}>{formatCurrency(inv.amountReceived || 0)}</td>
                  <td style={{ color: '#ef4444' }}>{formatCurrency(inv.balanceAmount ?? inv.grandTotal)}</td>
                  <td><span className="badge badge-paid">{inv.status || 'Unpaid'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedClientSubTab === 'Notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Add Client Note</h3>
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                className="form-control"
                placeholder="Type internal note for client..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>Client Notes History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {clientNotes.map((note) => (
                <div key={note.id} style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 500 }}>{note.text}</p>
                  <div style={{ fontSize: '0.725rem', color: '#64748b', marginTop: 4 }}>
                    Added by <strong>{note.author}</strong> on {formatDate(note.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Document Customization Modal */}
      <AddEditClientDocumentModal
        isOpen={isClientDocModalOpen}
        onClose={() => setIsClientDocModalOpen(false)}
        clientLicenseId={selectedLicense?.id}
        editingDoc={editingClientDoc}
      />

      {/* Portal Credentials Modal */}
      <PortalCredentialsModal
        isOpen={isPortalModalOpen}
        onClose={() => {
          setIsPortalModalOpen(false);
          setEditingPortal(null);
        }}
        credentials={editingPortal}
        onSave={(credential) => {
          if (editingPortal) {
            setPortalCredentials(portalCredentials.map(c => c.id === editingPortal.id ? { ...credential, id: c.id } : c));
          } else {
            setPortalCredentials([...portalCredentials, { ...credential, id: Date.now() }]);
          }
        }}
      />
    </div>
  );
};
