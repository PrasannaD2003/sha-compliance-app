import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialClients,
  initialQuotations,
  initialProformaInvoices,
  initialInvoices,
  initialPayments,
  initialServices,
  initialCompanySettings
} from '../data/mockData';
import { masterLicensesList } from '../data/licenseMasterData';

const AppContext = createContext();
const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('sha_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const apiCall = async (endpoint, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: getAuthHeaders(),
    };
    if (data) options.body = JSON.stringify(data);

    const token = localStorage.getItem('sha_auth_token');
    console.log(`[API] ${method} ${endpoint} - Token: ${token ? 'Present' : 'Missing'}`);

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const result = await response.json();
    console.log(`[API] Success:`, endpoint, result);
    return result;
  } catch (error) {
    console.error(`[API] Failed: ${endpoint}`, error);
    return null;
  }
};

export const AppProvider = ({ children }) => {
  // Navigation & State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedId, setSelectedId] = useState('QTN-2026-0004');
  const [selectedClientId, setSelectedClientId] = useState('CL-0001');
  const [selectedClientSubTab, setSelectedClientSubTab] = useState('Licenses & Documents');
  const [selectedClientLicenseId, setSelectedClientLicenseId] = useState('CLIC-CEA-001');
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [isAddLicenseModalOpen, setIsAddLicenseModalOpen] = useState(false);
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [isRequestDocModalOpen, setIsRequestDocModalOpen] = useState(false);

  const [paymentTargetInvoice, setPaymentTargetInvoice] = useState(null);
  const [activeUploadTarget, setActiveUploadTarget] = useState(null);
  const [activeRequestTarget, setActiveRequestTarget] = useState(null);

  // Persistent Data States
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('sha_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [masterLicenses, setMasterLicenses] = useState(() => {
    const saved = localStorage.getItem('sha_master_licenses');
    return saved ? JSON.parse(saved) : masterLicensesList;
  });

  const initialClientLicenses = [
    {
      id: 'CLIC-CEA-001',
      clientId: 'CL-0001',
      licenseMasterId: 'LIC-CEA',
      licenseName: 'Clinical Establishment Act (CEA)',
      description: 'Registration under Tamil Nadu Clinical Establishments (Regulation) Act, 2018',
      status: 'Document Collection',
      stage: 'In Progress',
      applicationDate: '2026-09-10',
      expectedSubmission: '2026-09-25',
      targetApprovalDate: '2026-11-25',
      renewalDate: '2031-09-10',
      responsiblePerson: 'Rajesh Kumar (Manager)',
      priority: 'High',
      govtFee: 10000,
      consultancyFee: 25000,
      governingAuthority: 'Health & Family Welfare Department, Govt of Tamil Nadu',
      validity: '5 Years',
      timeline: '45 - 60 working days',
      documents: [
        { id: 'doc-1', name: 'Application Form', description: 'Duly filled CEA application form', mandatory: true, status: 'Submitted', fileName: 'CEA_Form.pdf', remarks: '-' },
        { id: 'doc-2', name: 'Identity Proof of Applicant', description: 'Aadhar / PAN of authorised person', mandatory: true, status: 'Submitted', fileName: 'Aadhar.pdf', remarks: '-' },
        { id: 'doc-3', name: 'Photo of Authorised Person', description: 'Passport size photo', mandatory: true, status: 'Submitted', fileName: 'Photo.jpg', remarks: '-' },
        { id: 'doc-4', name: 'Address Proof of Establishment', description: 'EB Bill / Rent Agreement / Sale Deed', mandatory: true, status: 'Pending from Client', fileName: null, remarks: 'Pending from client' },
        { id: 'doc-5', name: 'Ownership Proof', description: 'Ownership or lease agreement', mandatory: true, status: 'Submitted', fileName: 'Ownership.pdf', remarks: '-' },
        { id: 'doc-6', name: 'Building Plan Approval', description: 'CMDA / DTCP approved plan', mandatory: true, status: 'Pending from Client', fileName: null, remarks: 'Need updated plan' },
        { id: 'doc-7', name: 'NOC from Local Body', description: 'Corporation / Municipality NOC', mandatory: true, status: 'Submitted', fileName: 'NOC.pdf', remarks: '-' },
        { id: 'doc-8', name: 'List of Medical Equipment', description: 'Equipment list with specifications', mandatory: false, status: 'Submitted', fileName: 'EquipmentList.xlsx', remarks: '-' },
        { id: 'doc-9', name: 'Layout Plan', description: 'Internal layout plan of the establishment', mandatory: true, status: 'Pending from Client', fileName: null, remarks: 'Client to share layout' },
        { id: 'doc-10', name: 'Affidavit', description: 'Affidavit in prescribed format', mandatory: true, status: 'Submitted', fileName: 'Affidavit.pdf', remarks: '-' }
      ]
    },
    {
      id: 'CLIC-FIRE-002',
      clientId: 'CL-0001',
      licenseMasterId: 'LIC-FIRE',
      licenseName: 'Fire NOC',
      description: 'Tamil Nadu Fire Safety Clearance Certificate',
      status: 'Document Collection',
      stage: 'In Progress',
      applicationDate: '2026-09-15',
      expectedSubmission: '2026-10-05',
      targetApprovalDate: '2026-11-15',
      renewalDate: '2027-09-15',
      responsiblePerson: 'Priya Sharma (Staff)',
      priority: 'High',
      govtFee: 15000,
      consultancyFee: 20000,
      governingAuthority: 'Tamil Nadu Fire & Rescue Services Department',
      validity: '1 Year',
      timeline: '30 - 45 working days',
      documents: [
        { id: 'fire-1', name: 'Fire NOC Application', description: 'Prescribed Fire NOC application format', mandatory: true, status: 'Submitted', fileName: 'Fire_App.pdf', remarks: '-' },
        { id: 'fire-2', name: 'Approved Building Layout', description: 'Floor plans showing fire escape & hydrants', mandatory: true, status: 'Submitted', fileName: 'Building_Layout.pdf', remarks: '-' },
        { id: 'fire-3', name: 'Building Stability Certificate', description: 'Structural engineer stability report', mandatory: true, status: 'Pending from Client', fileName: null, remarks: 'Pending structural engineer signature' },
        { id: 'fire-4', name: 'Fire Equipment Vendor Invoice', description: 'Extinguisher & hose reel test certificates', mandatory: true, status: 'Pending from Client', fileName: null, remarks: 'Invoice requested from vendor' },
        { id: 'fire-5', name: 'Electrical Safety Certificate', description: 'Licensed A-grade contractor certificate', mandatory: true, status: 'Submitted', fileName: 'Electrical_Cert.pdf', remarks: '-' },
        { id: 'fire-6', name: 'Ownership / Rent Deed', description: 'Property deed or agreement', mandatory: true, status: 'Submitted', fileName: 'Rent_Deed.pdf', remarks: '-' },
        { id: 'fire-7', name: 'Applicant Identity Card', description: 'PAN & Aadhar card of Director', mandatory: true, status: 'Submitted', fileName: 'Director_ID.pdf', remarks: '-' },
        { id: 'fire-8', name: 'Challan Receipt', description: 'Government fee payment challan', mandatory: true, status: 'Submitted', fileName: 'Challan.pdf', remarks: '-' }
      ]
    },
    {
      id: 'CLIC-BMW-003',
      clientId: 'CL-0001',
      licenseMasterId: 'LIC-BMW',
      licenseName: 'Biomedical Waste Authorization',
      description: 'TNPCB Biomedical Waste Rules 2016 Authorization',
      status: 'Approved',
      stage: 'Completed',
      applicationDate: '2026-06-01',
      expectedSubmission: '2026-06-15',
      targetApprovalDate: '2026-07-20',
      renewalDate: '2029-06-01',
      responsiblePerson: 'Rajesh Kumar (Manager)',
      priority: 'Normal',
      govtFee: 5000,
      consultancyFee: 10000,
      governingAuthority: 'Tamil Nadu Pollution Control Board',
      validity: '3 Years',
      timeline: '20 - 30 working days',
      documents: [
        { id: 'bmw-1', name: 'Form II Application', description: 'Application form', mandatory: true, status: 'Submitted', fileName: 'Form2_App.pdf', remarks: '-' },
        { id: 'bmw-2', name: 'CBMWTF Agreement Copy', description: 'Common facility agreement', mandatory: true, status: 'Submitted', fileName: 'CBMWTF_Agreement.pdf', remarks: '-' },
        { id: 'bmw-3', name: 'Bed Count Certificate', description: 'Sanctioned beds cert', mandatory: true, status: 'Submitted', fileName: 'Bed_Cert.pdf', remarks: '-' },
        { id: 'bmw-4', name: 'BMW Logbook Copy', description: 'Daily logbook sample', mandatory: true, status: 'Submitted', fileName: 'Logbook.pdf', remarks: '-' },
        { id: 'bmw-5', name: 'Water & Electricity Bills', description: 'Utility bills', mandatory: true, status: 'Submitted', fileName: 'Utility_Bills.pdf', remarks: '-' },
        { id: 'bmw-6', name: 'Site Plan', description: 'Location map & waste room', mandatory: true, status: 'Submitted', fileName: 'Site_Plan.pdf', remarks: '-' },
        { id: 'bmw-7', name: 'Authorization Fee Receipt', description: 'Online receipt', mandatory: true, status: 'Submitted', fileName: 'TNPCB_Receipt.pdf', remarks: '-' },
        { id: 'bmw-8', name: 'Staff Immunization Record', description: 'Vaccine records', mandatory: true, status: 'Submitted', fileName: 'Immunization.pdf', remarks: '-' }
      ]
    },
    {
      id: 'CLIC-PCPNDT-004',
      clientId: 'CL-0001',
      licenseMasterId: 'LIC-PCPNDT',
      licenseName: 'PCPNDT License',
      description: 'Ultrasound Scanner Registration under PCPNDT Act',
      status: 'Not Started',
      stage: 'Not Started',
      applicationDate: '2026-10-01',
      expectedSubmission: '2026-10-20',
      targetApprovalDate: '2026-12-15',
      renewalDate: '2031-10-01',
      responsiblePerson: 'Priya Sharma (Staff)',
      priority: 'Medium',
      govtFee: 25000,
      consultancyFee: 30000,
      governingAuthority: 'District Appropriate Authority',
      validity: '5 Years',
      timeline: '60 working days',
      documents: [
        { id: 'pc-1', name: 'Form A Application', description: 'PCPNDT registration application form', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-2', name: 'Sonologist Qualification', description: 'MD Radiology certificate', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-3', name: 'Medical Council Registration', description: 'TN Council registration', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-4', name: 'Machine Sale Invoice', description: 'Ultrasound purchase bill', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-5', name: 'Premises Layout Plan', description: 'Ultrasound room layout', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-6', name: 'Affidavit under PCPNDT Act', description: 'Non-sex determination undertaking', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pc-7', name: 'Registration Fee Demand Draft', description: 'DD receipt', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' }
      ]
    },
    {
      id: 'CLIC-TNPCB-005',
      clientId: 'CL-0001',
      licenseMasterId: 'LIC-TNPCB',
      licenseName: 'TNPCB Consent (CTE & CTO)',
      description: 'Consent to Establish & Operate under Water & Air Acts',
      status: 'Not Started',
      stage: 'Not Started',
      applicationDate: '2026-10-10',
      expectedSubmission: '2026-10-30',
      targetApprovalDate: '2026-12-30',
      renewalDate: '2031-10-10',
      responsiblePerson: 'Rajesh Kumar (Manager)',
      priority: 'Medium',
      govtFee: 20000,
      consultancyFee: 30000,
      governingAuthority: 'Tamil Nadu Pollution Control Board',
      validity: '5 Years',
      timeline: '45 working days',
      documents: [
        { id: 'pcb-1', name: 'OCMMS Online Application', description: 'CTE / CTO form', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pcb-2', name: 'ETP & STP Design Report', description: 'Treatment plant layout', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pcb-3', name: 'Water Balance Diagram', description: 'Water consumption chart', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pcb-4', name: 'Land Availability Deed', description: 'Patta / Lease deed', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pcb-5', name: 'DG Set Acoustic Certificate', description: 'Generator noise cert', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' },
        { id: 'pcb-6', name: 'Gross Fixed Assets Cert', description: 'CA cost certificate', mandatory: true, status: 'Not Started', fileName: null, remarks: '-' }
      ]
    }
  ];

  const [clientLicenses, setClientLicenses] = useState(() => {
    const saved = localStorage.getItem('sha_client_licenses');
    return saved ? JSON.parse(saved) : initialClientLicenses;
  });

  const [documentRequests, setDocumentRequests] = useState(() => {
    const saved = localStorage.getItem('sha_doc_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'REQ-101',
        clientLicenseId: 'CLIC-CEA-001',
        docId: 'doc-4',
        docName: 'Address Proof of Establishment',
        recipient: 'Mr. Ramesh',
        email: 'admin@abchospital.com',
        requestedDate: '2026-09-20',
        dueDate: '2026-09-30',
        status: 'Requested',
        whyRequired: 'Mandatory proof for CEA registration inspection by District Medical Officer.'
      }
    ];
  });

  const [quotations, setQuotations] = useState(() => {
    const saved = localStorage.getItem('sha_quotations');
    return saved ? JSON.parse(saved) : initialQuotations;
  });

  const [proformaInvoices, setProformaInvoices] = useState(() => {
    const saved = localStorage.getItem('sha_proforma');
    return saved ? JSON.parse(saved) : initialProformaInvoices;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('sha_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('sha_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('sha_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [companySettings, setCompanySettings] = useState(() => {
    const saved = localStorage.getItem('sha_settings');
    return saved ? JSON.parse(saved) : initialCompanySettings;
  });

  // Fetch all data from APIs on mount
  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem('sha_auth_token');
      console.log('[FETCH] useEffect mounted, Token:', token ? 'YES' : 'NO');

      if (!token) {
        console.log('[FETCH] ❌ No token - using local data');
        return;
      }

      try {
        console.log('[FETCH] 📡 Starting API calls...');

        const results = await Promise.allSettled([
          apiCall('/clients'),
          apiCall('/quotations'),
          apiCall('/invoices'),
          apiCall('/proforma-invoices'),
          apiCall('/payments'),
          apiCall('/licenses')
        ]);

        console.log('[FETCH] Results:', results.map((r, i) => ({
          endpoint: ['/clients', '/quotations', '/invoices', '/proforma-invoices', '/payments', '/licenses'][i],
          status: r.status,
          data: r.value?.data?.length || 0
        })));

        const [clientsRes, quotationsRes, invoicesRes, proformasRes, paymentsRes, licensesRes] = results.map(r => r.value);

        if (clientsRes?.data && clientsRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting clients:', clientsRes.data.length);
          setClients(clientsRes.data);
        } else console.log('[FETCH] No clients data');

        if (quotationsRes?.data && quotationsRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting quotations:', quotationsRes.data.length);
          setQuotations(quotationsRes.data);
        } else console.log('[FETCH] No quotations data');

        if (invoicesRes?.data && invoicesRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting invoices:', invoicesRes.data.length);
          setInvoices(invoicesRes.data);
        } else console.log('[FETCH] No invoices data');

        if (proformasRes?.data && proformasRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting proformas:', proformasRes.data.length);
          setProformaInvoices(proformasRes.data);
        } else console.log('[FETCH] No proformas data');

        if (paymentsRes?.data && paymentsRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting payments:', paymentsRes.data.length);
          setPayments(paymentsRes.data);
        } else console.log('[FETCH] No payments data');

        if (licensesRes?.data && licensesRes.data.length > 0) {
          console.log('[FETCH] ✓ Setting licenses:', licensesRes.data.length);
          setClientLicenses(licensesRes.data);
        } else console.log('[FETCH] No licenses data');
      } catch (error) {
        console.error('[FETCH] ❌ Error:', error);
      }
    };

    fetchAllData();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sha_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('sha_master_licenses', JSON.stringify(masterLicenses));
  }, [masterLicenses]);

  useEffect(() => {
    localStorage.setItem('sha_client_licenses', JSON.stringify(clientLicenses));
  }, [clientLicenses]);

  useEffect(() => {
    localStorage.setItem('sha_doc_requests', JSON.stringify(documentRequests));
  }, [documentRequests]);

  useEffect(() => {
    localStorage.setItem('sha_quotations', JSON.stringify(quotations));
  }, [quotations]);

  useEffect(() => {
    localStorage.setItem('sha_proforma', JSON.stringify(proformaInvoices));
  }, [proformaInvoices]);

  useEffect(() => {
    localStorage.setItem('sha_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('sha_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('sha_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('sha_settings', JSON.stringify(companySettings));
  }, [companySettings]);

  // Master License CRUD
  const saveMasterLicense = (licenseObj) => {
    const index = masterLicenses.findIndex((m) => m.id === licenseObj.id);
    if (index >= 0) {
      setMasterLicenses(masterLicenses.map((m, i) => i === index ? licenseObj : m));
    } else {
      setMasterLicenses([licenseObj, ...masterLicenses]);
    }
  };

  const deleteMasterLicense = (id) => {
    setMasterLicenses(masterLicenses.filter((m) => m.id !== id));
  };

  // Client Document CRUD
  const addClientDocumentItem = (clientLicenseId, docItem) => {
    const newDoc = {
      id: `doc-custom-${Date.now()}`,
      fileName: null,
      ...docItem
    };

    setClientLicenses(clientLicenses.map((lic) => {
      if (lic.id === clientLicenseId) {
        return {
          ...lic,
          documents: [...(lic.documents || []), newDoc]
        };
      }
      return lic;
    }));
  };

  const editClientDocumentItem = (clientLicenseId, docId, updatedDocItem) => {
    setClientLicenses(clientLicenses.map((lic) => {
      if (lic.id === clientLicenseId) {
        return {
          ...lic,
          documents: (lic.documents || []).map((d) => d.id === docId ? { ...d, ...updatedDocItem } : d)
        };
      }
      return lic;
    }));
  };

  const deleteClientDocumentItem = (clientLicenseId, docId) => {
    setClientLicenses(clientLicenses.map((lic) => {
      if (lic.id === clientLicenseId) {
        return {
          ...lic,
          documents: (lic.documents || []).filter((d) => d.id !== docId)
        };
      }
      return lic;
    }));
  };

  const addClient = async (clientData) => {
    const newClient = {
      id: `CL-${String(clients.length + 1).padStart(4, '0')}`,
      outstanding: 0,
      activeLicenses: 0,
      pendingDocuments: 0,
      status: 'Active',
      ...clientData
    };

    try {
      if (localStorage.getItem('sha_auth_token')) {
        const result = await apiCall('/clients', 'POST', newClient);
        if (result?.data) {
          // Use backend's _id as the primary id for MongoDB compatibility
          const client = {
            id: result.data._id || result.data.id || newClient.id,
            _id: result.data._id,
            ...result.data
          };
          setClients([client, ...clients]);
          console.log('✅ Client added via API:', client);
          return client;
        } else {
          throw new Error('No data returned from API');
        }
      } else {
        // For local mode, use generated ID
        setClients([newClient, ...clients]);
        console.log('✅ Client added locally:', newClient);
        return newClient;
      }
    } catch (error) {
      console.error('❌ Error adding client:', error);
      // Fallback: add locally even if API fails
      setClients([newClient, ...clients]);
      return newClient;
    }
  };

  const addLicenseToClient = (licData) => {
    const master = masterLicenses.find((m) => m.id === licData.licenseMasterId || m.name === licData.licenseName);
    const docs = master ? master.requiredDocuments.map(d => ({ ...d, status: 'Pending from Client', fileName: null, remarks: 'Pending from client' })) : [];

    const newId = `CLIC-${String(clientLicenses.length + 1).padStart(3, '0')}`;
    const newLic = {
      id: newId,
      clientId: licData.clientId || selectedClientId,
      licenseMasterId: master?.id || 'LIC-CEA',
      licenseName: master?.name || licData.licenseName,
      description: master?.category || 'Healthcare License',
      status: 'Document Collection',
      stage: 'In Progress',
      applicationDate: licData.applicationDate || new Date().toISOString().split('T')[0],
      expectedSubmission: licData.expectedSubmission || '2026-10-15',
      targetApprovalDate: '2026-11-30',
      renewalDate: licData.renewalDate || '2031-10-15',
      responsiblePerson: licData.responsiblePerson || 'Rajesh Kumar (Manager)',
      priority: licData.priority || 'High',
      govtFee: master?.govtFee || 10000,
      consultancyFee: master?.consultancyFee || 25000,
      governingAuthority: master?.governingAuthority || 'Govt Authority',
      validity: master?.validity || '5 Years',
      timeline: master?.processingTime || '45 working days',
      documents: docs
    };

    setClientLicenses([newLic, ...clientLicenses]);
    setSelectedClientLicenseId(newId);
  };

  const uploadClientDocument = ({ clientLicenseId, docId, fileName, remarks }) => {
    setClientLicenses(clientLicenses.map(lic => {
      if (lic.id === clientLicenseId) {
        const updatedDocs = lic.documents.map(d => {
          if (d.id === docId) {
            return {
              ...d,
              status: 'Submitted',
              fileName: fileName || `${d.name.replace(/\s+/g, '_')}.pdf`,
              remarks: remarks || '-'
            };
          }
          return d;
        });

        const submittedCount = updatedDocs.filter(d => d.status === 'Submitted' || d.status === 'Approved').length;
        const total = updatedDocs.length;
        let newStage = lic.stage;
        if (submittedCount === total) newStage = 'Completed';
        else if (submittedCount > 0) newStage = 'In Progress';

        return {
          ...lic,
          documents: updatedDocs,
          stage: newStage
        };
      }
      return lic;
    }));
  };

  const sendDocumentRequest = ({ clientLicenseId, docId, recipientEmail, message, dueDate }) => {
    const lic = clientLicenses.find(l => l.id === clientLicenseId);
    const doc = lic?.documents.find(d => d.id === docId);

    setClientLicenses(clientLicenses.map(l => {
      if (l.id === clientLicenseId) {
        return {
          ...l,
          documents: l.documents.map(d => d.id === docId ? { ...d, status: 'Requested', remarks: `Requested on ${new Date().toLocaleDateString()}` } : d)
        };
      }
      return l;
    }));

    const newReq = {
      id: `REQ-${Date.now()}`,
      clientLicenseId,
      docId,
      docName: doc?.name || 'Document',
      recipient: 'Client Manager',
      email: recipientEmail,
      requestedDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '2026-10-15',
      status: 'Requested',
      whyRequired: message || 'Mandatory requirement for licensing inspection.'
    };
    setDocumentRequests([newReq, ...documentRequests]);
  };

  const updateLicenseStatus = (clientLicenseId, newStatus) => {
    setClientLicenses(clientLicenses.map(l => l.id === clientLicenseId ? { ...l, status: newStatus, stage: newStatus === 'Approved' ? 'Completed' : 'In Progress' } : l));
  };

  const deleteQuotation = async (id) => {
    if (localStorage.getItem('sha_auth_token')) {
      await apiCall(`/quotations/${id}`, 'DELETE');
    }
    setQuotations(quotations.filter(q => q.id !== id && q._id !== id));
  };

  const saveQuotation = async (quotationData) => {
    if (localStorage.getItem('sha_auth_token')) {
      const isNew = !quotationData._id;
      const result = await apiCall(
        isNew ? '/quotations' : `/quotations/${quotationData._id}`,
        isNew ? 'POST' : 'PUT',
        quotationData
      );
      if (result?.data) {
        if (isNew) {
          setQuotations([result.data, ...quotations]);
        } else {
          setQuotations(quotations.map(q => q._id === quotationData._id ? result.data : q));
        }
      }
    } else {
      const existingIndex = quotations.findIndex(q => q.id === quotationData.id);
      let updated;
      if (existingIndex >= 0) {
        updated = quotations.map((q, idx) => idx === existingIndex ? quotationData : q);
      } else {
        updated = [quotationData, ...quotations];
      }
      setQuotations(updated);
    }
  };

  const saveProformaInvoice = async (proformaData) => {
    if (localStorage.getItem('sha_auth_token')) {
      const isNew = !proformaData._id;
      const result = await apiCall(
        isNew ? '/proforma-invoices' : `/proforma-invoices/${proformaData._id}`,
        isNew ? 'POST' : 'PUT',
        proformaData
      );
      if (result?.data) {
        if (isNew) {
          setProformaInvoices([result.data, ...proformaInvoices]);
        } else {
          setProformaInvoices(proformaInvoices.map(p => p._id === proformaData._id ? result.data : p));
        }
      }
    } else {
      const existingIndex = proformaInvoices.findIndex(p => p.id === proformaData.id);
      let updated;
      if (existingIndex >= 0) {
        updated = proformaInvoices.map((p, idx) => idx === existingIndex ? proformaData : p);
      } else {
        updated = [proformaData, ...proformaInvoices];
      }
      setProformaInvoices(updated);
    }
  };

  const saveInvoice = async (invoiceData) => {
    if (localStorage.getItem('sha_auth_token')) {
      const isNew = !invoiceData._id;
      const result = await apiCall(
        isNew ? '/invoices' : `/invoices/${invoiceData._id}`,
        isNew ? 'POST' : 'PUT',
        invoiceData
      );
      if (result?.data) {
        if (isNew) {
          setInvoices([result.data, ...invoices]);
        } else {
          setInvoices(invoices.map(i => i._id === invoiceData._id ? result.data : i));
        }
      }
    } else {
      const existingIndex = invoices.findIndex(i => i.id === invoiceData.id);
      let updated;
      if (existingIndex >= 0) {
        updated = invoices.map((i, idx) => idx === existingIndex ? invoiceData : i);
      } else {
        updated = [invoiceData, ...invoices];
      }
      setInvoices(updated);

      if (invoiceData.clientId) {
        setClients(clients.map(c =>
          c.id === invoiceData.clientId
            ? { ...c, outstanding: c.outstanding + invoiceData.grandTotal }
            : c
        ));
      }
    }
  };

  const convertToProforma = (quotation) => {
    const nextNo = `PI-2026-${String(proformaInvoices.length + 1).padStart(4, '0')}`;
    const newProforma = {
      ...quotation,
      id: nextNo,
      proformaNo: nextNo,
      quotationNo: quotation.quotationNo || quotation.id,
      date: new Date().toISOString().split('T')[0],
      status: 'Issued'
    };

    setProformaInvoices([newProforma, ...proformaInvoices]);
    setQuotations(quotations.map(q => q.id === quotation.id ? { ...q, status: 'Accepted' } : q));
    setSelectedId(nextNo);
    setActiveTab('proforma-preview');
  };

  const convertToInvoice = (proforma) => {
    const nextNo = `INV-2026-${String(invoices.length + 1).padStart(4, '0')}`;
    const newInvoice = {
      ...proforma,
      id: nextNo,
      invoiceNo: nextNo,
      proformaNo: proforma.proformaNo || proforma.id,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amountReceived: 0,
      balanceAmount: proforma.grandTotal,
      status: 'Unpaid'
    };

    setInvoices([newInvoice, ...invoices]);
    if (proforma.clientId) {
      setClients(clients.map(c => c.id === proforma.clientId ? { ...c, outstanding: c.outstanding + proforma.grandTotal } : c));
    }
    setSelectedId(nextNo);
    setActiveTab('invoice-preview');
  };

  const recordPayment = async ({ invoiceId, amount, method, refNo, date }) => {
    const inv = invoices.find(i => i.id === invoiceId || i.invoiceNo === invoiceId || i._id === invoiceId);
    if (!inv) return;

    if (localStorage.getItem('sha_auth_token')) {
      const paymentData = {
        invoiceId: inv._id || inv.id,
        amount: Number(amount),
        method: method || 'UPI',
        refNo: refNo || 'REF' + Math.floor(Math.random() * 1000000),
        date: date || new Date().toISOString().split('T')[0]
      };

      const result = await apiCall(`/invoices/${inv._id || inv.id}/payments`, 'POST', paymentData);
      if (result?.data) {
        setPayments([result.data, ...payments]);
      }
    } else {
      const numericAmount = Number(amount);
      const newAmountReceived = (inv.amountReceived || 0) + numericAmount;
      const newBalance = Math.max(0, (inv.grandTotal || 0) - newAmountReceived);
      let newStatus = 'Partially Paid';
      if (newBalance <= 0) newStatus = 'Paid';

      setInvoices(invoices.map(i => i.id === inv.id ? { ...i, amountReceived: newAmountReceived, balanceAmount: newBalance, status: newStatus } : i));

      const payId = `PAY-${String(payments.length + 1001)}`;
      const newPayment = {
        id: payId,
        invoiceNo: inv.invoiceNo || inv.id,
        clientName: inv.clientName,
        date: date || new Date().toISOString().split('T')[0],
        amount: numericAmount,
        method: method || 'UPI',
        refNo: refNo || 'REF' + Math.floor(Math.random() * 1000000)
      };
      setPayments([newPayment, ...payments]);
    }
  };

  const addService = (srvData) => {
    const newId = `SRV-${String(services.length + 1).padStart(3, '0')}`;
    setServices([...services, { id: newId, ...srvData }]);
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedId,
        setSelectedId,
        selectedClientId,
        setSelectedClientId,
        selectedClientSubTab,
        setSelectedClientSubTab,
        selectedClientLicenseId,
        setSelectedClientLicenseId,
        editingQuotation,
        setEditingQuotation,
        searchQuery,
        setSearchQuery,
        clients,
        addClient,
        masterLicenses,
        setMasterLicenses,
        saveMasterLicense,
        deleteMasterLicense,
        clientLicenses,
        addLicenseToClient,
        addClientDocumentItem,
        editClientDocumentItem,
        deleteClientDocumentItem,
        uploadClientDocument,
        sendDocumentRequest,
        updateLicenseStatus,
        documentRequests,
        quotations,
        saveQuotation,
        deleteQuotation,
        proformaInvoices,
        saveProformaInvoice,
        convertToProforma,
        invoices,
        saveInvoice,
        convertToInvoice,
        payments,
        recordPayment,
        services,
        addService,
        deleteService,
        companySettings,
        setCompanySettings,
        isAddClientModalOpen,
        setIsAddClientModalOpen,
        isRecordPaymentModalOpen,
        setIsRecordPaymentModalOpen,
        isAddLicenseModalOpen,
        setIsAddLicenseModalOpen,
        isUploadDocModalOpen,
        setIsUploadDocModalOpen,
        isRequestDocModalOpen,
        setIsRequestDocModalOpen,
        paymentTargetInvoice,
        setPaymentTargetInvoice,
        activeUploadTarget,
        setActiveUploadTarget,
        activeRequestTarget,
        setActiveRequestTarget
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
