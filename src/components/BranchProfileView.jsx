import React, { useState } from 'react';
import { ArrowLeft, Plus, Download, Edit2, Trash2, Upload, Eye, Copy } from 'lucide-react';
import { BranchDocumentViewerModal } from './Modals/BranchDocumentViewerModal';

const BranchProfileView = ({ branchId, onBack }) => {
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [showAddLicenseModal, setShowAddLicenseModal] = useState(false);
  const [formData, setFormData] = useState({
    license: '',
    applicationDate: '',
    expectedSubmission: '',
    responsibleExecutive: '',
    priority: 'High Priority'
  });
  const [licenseList, setLicenseList] = useState([
    {
      id: 1,
      name: 'Fire NOC',
      status: 'In Progress',
      progress: '1 / 8',
      applicationDate: '30 Sep 2026',
      expectedSubmission: '15 Oct 2026',
      targetApprovalDate: '30 Nov 2026',
      docsCompleted: 1,
      docsTotal: 8
    },
    {
      id: 2,
      name: 'Clinical Establishment Act (CEA)',
      status: 'In Progress',
      progress: '0 / 10',
      applicationDate: '1 Oct 2026',
      expectedSubmission: '15 Oct 2026',
      targetApprovalDate: '30 Nov 2026',
      docsCompleted: 0,
      docsTotal: 10
    }
  ]);
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [viewingDocIndex, setViewingDocIndex] = useState(null);
  const [showDocViewer, setShowDocViewer] = useState(false);
  const [branchDocuments, setBranchDocuments] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    // Fetch uploaded documents for this branch
    const fetchBranchDocuments = async () => {
      try {
        const token = localStorage.getItem('authToken') || 'demo-token-branch-documents';
        const response = await fetch(`http://localhost:5000/api/branches/${branchId}/documents`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        if (result.success && result.data) {
          setBranchDocuments(result.data);
        }
      } catch (error) {
        console.error('Error fetching branch documents:', error);
      }
    };

    if (branchId) {
      fetchBranchDocuments();
    }
  }, [branchId]);

  React.useEffect(() => {
    // Initialize requiredDocuments when license is selected
    if (selectedLicense) {
      const docs = getDocumentsForLicense(selectedLicense);
      setRequiredDocuments(docs);
    }
  }, [selectedLicense]);

  const getDocumentsForLicense = (license) => {
    const licenseData = licenseMaster.find(l => l.id === license.id);
    if (licenseData && licenseData.requiredDocuments.length > 0) {
      return licenseData.requiredDocuments.map((doc) => ({
        ...doc,
        status: 'Pending from Client',
        file: '',
        remarks: 'Pending from client'
      }));
    }
    return [];
  };

  const handleUploadDocument = async (docId) => {
    if (!fileInputRef.current?.files[0]) {
      alert('Please select a file');
      return;
    }

    try {
      setUploadingDoc(docId);
      const formData = new FormData();
      formData.append('document', fileInputRef.current.files[0]);

      const token = localStorage.getItem('authToken') || 'demo-token-license-documents';

      const response = await fetch(`http://localhost:5000/api/branches/${branchId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        const uploadedDoc = result.data;
        setBranchDocuments([...branchDocuments, uploadedDoc]);

        // Update requiredDocuments to mark file as uploaded
        setRequiredDocuments(prevDocs =>
          prevDocs.map(doc =>
            doc.id === docId
              ? { ...doc, file: uploadedDoc.fileName, status: 'Submitted', remarks: 'Uploaded and verified' }
              : doc
          )
        );

        alert('✅ Document uploaded successfully!');
        fileInputRef.current.value = '';
      } else {
        alert(`❌ Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Error uploading document: ${error.message}`);
    } finally {
      setUploadingDoc(null);
    }
  };

  const branch = {
    _id: branchId,
    branchName: 'Apollo Hospitals - Main Branch',
    branchCode: 'APH-BR-001',
    location: 'Greams Road, Chennai',
    contactPerson: 'Mr. Ramesh',
    phone: '9876543210',
    email: 'ramesh@apollo.com',
    status: 'Active'
  };

  const licenseMaster = [
    {
      id: 1,
      name: 'Fire NOC',
      authority: 'Tamil Nadu Fire & Rescue Services',
      timeline: '30-45 working days',
      validity: '1 Year',
      docs: 8,
      requiredDocuments: [
        { id: 1, name: 'Fire NOC Application', description: 'Prescribed Fire NOC application format', mandatory: 'Yes' },
        { id: 2, name: 'Approved Building Layout', description: 'Floor plans showing fire escape & hydrants', mandatory: 'Yes' },
        { id: 3, name: 'Building Stability Certificate', description: 'Structural engineer stability report', mandatory: 'Yes' },
        { id: 4, name: 'Fire Equipment Vendor Invoice', description: 'Extinguisher & hose reel test certificates', mandatory: 'Yes' },
        { id: 5, name: 'Electrical Safety Certificate', description: 'Licensed A-grade contractor certificate', mandatory: 'Yes' },
        { id: 6, name: 'Ownership / Rent Deed', description: 'Property deed or agreement', mandatory: 'Yes' },
        { id: 7, name: 'Applicant Identity Card', description: 'PAN & Aadhar card of Managing Director', mandatory: 'Yes' },
        { id: 8, name: 'Challan Receipt', description: 'Government fee payment challan', mandatory: 'Yes' },
      ]
    },
    {
      id: 2,
      name: 'Clinical Establishment Act (CEA)',
      authority: 'Tamil Nadu Health Department',
      timeline: '45-60 working days',
      validity: '5 Years',
      docs: 10,
      requiredDocuments: [
        { id: 1, name: 'CEA Application Form', description: 'Prescribed CEA application format', mandatory: 'Yes' },
        { id: 2, name: 'Building Plan Approval', description: 'Approved building layout & plans', mandatory: 'Yes' },
        { id: 3, name: 'Medical Equipment List', description: 'List of medical equipment & machinery', mandatory: 'Yes' },
        { id: 4, name: 'Staff Qualifications', description: 'Certificates of medical staff qualifications', mandatory: 'Yes' },
        { id: 5, name: 'Insurance Certificate', description: 'Hospital liability insurance certificate', mandatory: 'Yes' },
        { id: 6, name: 'Ownership Proof', description: 'Property ownership or lease agreement', mandatory: 'Yes' },
        { id: 7, name: 'NOC from Municipality', description: 'No Objection Certificate', mandatory: 'Yes' },
        { id: 8, name: 'Fire Safety Certificate', description: 'Fire safety compliance certificate', mandatory: 'Yes' },
        { id: 9, name: 'Laboratory Accreditation', description: 'NABB accreditation for laboratory', mandatory: 'No' },
        { id: 10, name: 'Affidavit', description: 'Notarized affidavit from owner', mandatory: 'Yes' },
      ]
    },
    {
      id: 3,
      name: 'Biomedical Waste Management',
      authority: 'Tamil Nadu Pollution Control Board',
      timeline: '15-20 working days',
      validity: '3 Years',
      docs: 6,
      requiredDocuments: [
        { id: 1, name: 'Application Form', description: 'BMW application with facility details', mandatory: 'Yes' },
        { id: 2, name: 'Facility Design Plan', description: 'Waste segregation & treatment facility design', mandatory: 'Yes' },
        { id: 3, name: 'Staff Training Certificate', description: 'BMW handling training certificates', mandatory: 'Yes' },
        { id: 4, name: 'Waste Quantity Report', description: 'Expected biomedical waste quantity', mandatory: 'Yes' },
        { id: 5, name: 'Site Plan', description: 'Facility location & site plan', mandatory: 'Yes' },
        { id: 6, name: 'Affidavit', description: 'Compliance affidavit', mandatory: 'Yes' },
      ]
    },
    { id: 4, name: 'PCPNDT License', authority: 'State Medical Council', timeline: '20-30 working days', validity: '5 Years', docs: 7, requiredDocuments: [] },
    { id: 5, name: 'Blood Bank License', authority: 'State Blood Transfusion Council', timeline: '30-45 working days', validity: '3 Years', docs: 9, requiredDocuments: [] },
    { id: 6, name: 'NABB Certificate', authority: 'National Accreditation Board', timeline: '60-90 working days', validity: '3 Years', docs: 12, requiredDocuments: [] },
    { id: 7, name: 'Building Approval License', authority: 'Municipal Corporation', timeline: '45-60 working days', validity: 'Perpetual', docs: 8, requiredDocuments: [] },
    { id: 8, name: 'Radiation Safety License', authority: 'Atomic Energy Regulatory Board', timeline: '60-90 working days', validity: '5 Years', docs: 10, requiredDocuments: [] },
    { id: 9, name: 'Pharmacy License', authority: 'State Pharmacy Council', timeline: '15-20 working days', validity: '3 Years', docs: 5, requiredDocuments: [] },
    { id: 10, name: 'GST Registration', authority: 'GST Department', timeline: '5-10 working days', validity: 'Perpetual', docs: 4, requiredDocuments: [] },
  ];

  const addLicense = () => {
    if (!formData.license || !formData.applicationDate || !formData.expectedSubmission) {
      alert('Please fill all required fields');
      return;
    }

    const selectedLicenseData = licenseMaster.find(l => l.id === parseInt(formData.license));
    const newLicense = {
      id: licenseList.length + 1,
      name: selectedLicenseData.name,
      status: 'Document Collection',
      progress: `0 / ${selectedLicenseData.docs}`,
      applicationDate: formData.applicationDate,
      expectedSubmission: formData.expectedSubmission,
      targetApprovalDate: '',
      docsCompleted: 0,
      docsTotal: selectedLicenseData.docs,
      authority: selectedLicenseData.authority,
      timeline: selectedLicenseData.timeline,
      validity: selectedLicenseData.validity,
      responsibleExecutive: formData.responsibleExecutive,
      priority: formData.priority
    };
    setLicenseList([...licenseList, newLicense]);
    setShowAddLicenseModal(false);
    setFormData({ license: '', applicationDate: '', expectedSubmission: '', responsibleExecutive: '', priority: 'High Priority' });
    alert(`${selectedLicenseData.name} added successfully!`);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <button
        onClick={onBack}
        style={{ marginBottom: '20px', padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={18} /> Back
      </button>

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
      />

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>{branch.branchName}</h1>
            <p style={{ margin: 0, color: '#666' }}>
              {branch.branchCode} • {branch.contactPerson} • {branch.phone} • {branch.email} • {branch.location}
            </p>
          </div>
          <button
            onClick={() => setShowAddLicenseModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            <Plus size={18} /> Add License
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
        {licenseList.map(license => (
          <div
            key={license.id}
            onClick={() => setSelectedLicense(license)}
            style={{
              background: selectedLicense?.id === license.id ? '#e3f2fd' : 'white',
              border: selectedLicense?.id === license.id ? '2px solid #007bff' : '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>{license.name}</h3>
            <span style={{ display: 'inline-block', background: '#fff3cd', color: '#856404', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '10px' }}>
              {license.status}
            </span>
            <p style={{ color: '#666', margin: '10px 0', fontSize: '0.9rem' }}>Progress</p>
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#007bff', margin: 0 }}>{license.progress}</p>
          </div>
        ))}
      </div>

      {selectedLicense && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 15px 0' }}>{selectedLicense.name}</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <div>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>APPLICATION DATE</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedLicense.applicationDate}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>EXPECTED SUBMISSION</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedLicense.expectedSubmission || '-'}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>TARGET APPROVAL</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedLicense.targetApprovalDate || '-'}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>STATUS</p>
                  <span style={{ display: 'inline-block', background: '#fff3cd', color: '#856404', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {selectedLicense.status}
                  </span>
                </div>
              </div>

              <div style={{ background: '#ffe6e6', border: '2px solid #dc3545', borderRadius: '8px', padding: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div>
                    <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>OFFICE INCHARGE</p>
                    <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>Mr. Prasanna</p>
                    <p style={{ margin: '0 0 3px 0', color: '#666' }}>9876543210</p>
                    <p style={{ margin: 0, color: '#007bff' }}>prasanna@sha.com</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>APPLY BY</p>
                    <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>Mr. Kumar (SHA)</p>
                    <p style={{ margin: '0 0 3px 0', color: '#666' }}>9812345678</p>
                    <p style={{ margin: 0, color: '#007bff' }}>kumar@sha.com</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>CLIENT INCHARGE</p>
                    <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>Mr. Ramesh</p>
                    <p style={{ margin: '0 0 3px 0', color: '#666' }}>9876543210</p>
                    <p style={{ margin: 0, color: '#007bff' }}>ramesh@apollo.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 12px 0' }}>License Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                  <div>
                    <p style={{ margin: '0 0 3px 0', color: '#666', fontWeight: 'bold' }}>License Name</p>
                    <p style={{ margin: 0 }}>{selectedLicense.name}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 3px 0', color: '#666', fontWeight: 'bold' }}>Governing Authority</p>
                    <p style={{ margin: 0 }}>{selectedLicense.authority || 'N/A'}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 3px 0', color: '#666', fontWeight: 'bold' }}>Typical Timeline</p>
                    <p style={{ margin: 0 }}>{selectedLicense.timeline || 'N/A'}</p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 3px 0', color: '#666', fontWeight: 'bold' }}>Validity</p>
                    <p style={{ margin: 0 }}>{selectedLicense.validity || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 12px 0' }}>Document Progress</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff', margin: '0 0 8px 0', textAlign: 'center' }}>
                  {selectedLicense.docsCompleted} of {selectedLicense.docsTotal}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', margin: '0 0 10px 0' }}>
                  {Math.round((selectedLicense.docsCompleted / selectedLicense.docsTotal) * 100)}% completed
                </p>
                <div style={{ width: '100%', height: '8px', background: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(selectedLicense.docsCompleted / selectedLicense.docsTotal) * 100}%`, height: '100%', background: '#28a745' }}></div>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            return (
              <>
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ margin: '0 0 15px 0' }}>Document Progress Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px' }}>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '6px' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '0.85rem', fontWeight: 'bold' }}>Total</p>
                      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>{requiredDocuments.length}</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#d4edda', borderRadius: '6px' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#155724', fontSize: '0.85rem', fontWeight: 'bold' }}>Submitted</p>
                      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>{requiredDocuments.filter(d => d.file).length}</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#fff3cd', borderRadius: '6px' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#856404', fontSize: '0.85rem', fontWeight: 'bold' }}>In Review</p>
                      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#ffc107' }}>0</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '15px', background: '#f8d7da', borderRadius: '6px' }}>
                      <p style={{ margin: '0 0 5px 0', color: '#721c24', fontSize: '0.85rem', fontWeight: 'bold' }}>Pending</p>
                      <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#dc3545' }}>{requiredDocuments.filter(d => !d.file).length}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ margin: '0 0 15px 0' }}>Required Documents Checklist ({requiredDocuments.length})</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>S.NO</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Document Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Description</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Mandatory</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Uploaded File</th>
                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Remarks</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requiredDocuments.map((doc, idx) => (
                        <tr key={doc.id} style={{ borderBottom: '1px solid #dee2e6', background: idx % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                          <td style={{ padding: '12px', fontSize: '0.9rem' }}>{idx + 1}</td>
                          <td style={{ padding: '12px', fontWeight: '600', fontSize: '0.9rem', color: '#0f172a' }}>{doc.name}</td>
                          <td style={{ padding: '12px', fontSize: '0.85rem', color: '#64748b' }}>{doc.description}</td>
                          <td style={{ padding: '12px', color: '#dc2626', fontWeight: '600', fontSize: '0.85rem' }}>{doc.mandatory}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ display: 'inline-block', background: doc.status === 'Submitted' ? '#d4edda' : '#fecaca', color: doc.status === 'Submitted' ? '#155724' : '#991b1b', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '500' }}>
                              {doc.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            {doc.file ? (
                              <a href="#" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500', fontSize: '0.9rem' }}>{doc.file}</a>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td style={{ padding: '12px', fontSize: '0.85rem', color: '#64748b' }}>
                            {doc.remarks || 'Pending from client'}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap' }}>
                              {doc.file ? (
                                <>
                                  <button
                                    onClick={() => {
                                      const uploadedDoc = branchDocuments.find(d => d.fileName === doc.file);
                                      if (uploadedDoc) {
                                        setViewingDocIndex(branchDocuments.indexOf(uploadedDoc));
                                        setShowDocViewer(true);
                                      }
                                    }}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                                    title="View document"
                                  >
                                    <Eye size={14} color="#2563eb" />
                                  </button>
                                  <button
                                    onClick={async () => {
                                      try {
                                        const uploadedDoc = branchDocuments.find(d => d.fileName === doc.file);
                                        if (!uploadedDoc) {
                                          alert('Document not found');
                                          return;
                                        }

                                        const base64Data = uploadedDoc.fileData;
                                        const fileType = uploadedDoc.fileType;

                                        if (!base64Data) {
                                          alert('No file data available');
                                          return;
                                        }

                                        const binaryString = atob(base64Data);
                                        const bytes = new Uint8Array(binaryString.length);
                                        for (let i = 0; i < binaryString.length; i++) {
                                          bytes[i] = binaryString.charCodeAt(i);
                                        }
                                        const blob = new Blob([bytes], { type: fileType });
                                        const blobUrl = URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = blobUrl;
                                        link.download = uploadedDoc.fileName || 'download';
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        URL.revokeObjectURL(blobUrl);
                                      } catch (error) {
                                        alert('Error downloading: ' + error.message);
                                      }
                                    }}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                                    title="Download document"
                                  >
                                    <Download size={14} color="#16a34a" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => {
                                      fileInputRef.current.onchange = () => handleUploadDocument(doc.id);
                                      fileInputRef.current.click();
                                    }}
                                    style={{ padding: '4px 10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                                    onMouseLeave={(e) => e.target.style.background = '#2563eb'}
                                  >
                                    Upload
                                  </button>
                                  <button
                                    style={{ padding: '4px 10px', background: '#fff', color: '#2563eb', border: '1.5px solid #2563eb', borderRadius: '3px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => { e.target.style.background = '#eff6ff'; }}
                                    onMouseLeave={(e) => { e.target.style.background = '#fff'; }}
                                  >
                                    Request
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => {
                                  const fileName = doc.file || doc.name;
                                  navigator.clipboard.writeText(fileName);
                                  alert('Copied!');
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                                title="Copy filename"
                              >
                                <Copy size={14} color="#7c3aed" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete this document?')) {
                                    try {
                                      const uploadedDoc = branchDocuments.find(d => d.fileName === doc.file);
                                      if (!uploadedDoc) {
                                        alert('Document not found');
                                        return;
                                      }

                                      const docIndex = branchDocuments.indexOf(uploadedDoc);
                                      const token = localStorage.getItem('authToken') || 'demo-token-license-documents';

                                      const response = await fetch(
                                        `http://localhost:5000/api/branches/${branchId}/documents/${docIndex}`,
                                        {
                                          method: 'DELETE',
                                          headers: { 'Authorization': `Bearer ${token}` }
                                        }
                                      );

                                      const result = await response.json();

                                      if (result.success) {
                                        setBranchDocuments(branchDocuments.filter((_, i) => i !== docIndex));
                                        setRequiredDocuments(prevDocs =>
                                          prevDocs.map(d =>
                                            d.id === doc.id
                                              ? { ...d, file: '', status: 'Pending from Client', remarks: 'Pending from client' }
                                              : d
                                          )
                                        );
                                        alert('✅ Document deleted successfully!');
                                      } else {
                                        alert(`❌ Delete failed: ${result.error}`);
                                      }
                                    } catch (error) {
                                      console.error('Delete error:', error);
                                      alert(`❌ Error deleting document: ${error.message}`);
                                    }
                                  }
                                }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                                title="Delete document"
                              >
                                <Trash2 size={14} color="#dc2626" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ margin: '0 0 15px 0' }}>Pending Documents Action Cards ({requiredDocuments.filter(d => !d.file).length})</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
                    {requiredDocuments.filter(d => !d.file).map(doc => (
                <div key={doc.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #f8d7da', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{doc.name}</h4>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#666' }}>
                    <span style={{ fontWeight: 'bold' }}>Status:</span> Pending from Client
                  </p>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#666' }}>
                    <span style={{ fontWeight: 'bold' }}>Remarks:</span> {doc.remarks}
                  </p>
                  <button style={{ width: '100%', padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                    Request Document
                  </button>
                  </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}

          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Portal Credentials</h3>
              <button style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                + Add Portal
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Portal Name</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Portal URL</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Username</th>
                  <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold', fontSize: '0.9rem' }}>Login Type</th>
                  <th style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '10px' }}>Clinical Establishment Tamil Nadu (TNSWP)</td>
                  <td style={{ padding: '10px' }}><a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>https://tnswp.tn.gov.in</a></td>
                  <td style={{ padding: '10px' }}>abchospital123</td>
                  <td style={{ padding: '10px' }}>User ID & Password</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}>Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {showAddLicenseModal && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div style={{ background: 'white', borderRadius: '8px', padding: '30px', maxWidth: 550, width: '90%', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>+ Add License to Branch</h2>
              <button onClick={() => setShowAddLicenseModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>Select Healthcare License *</label>
              <select
                value={formData.license}
                onChange={(e) => setFormData({...formData, license: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '0.9rem', fontWeight: '500' }}
              >
                <option value="">-- Select License --</option>
                {licenseMaster
                  .filter(lic => !licenseList.some(added => added.name === lic.name))
                  .map(license => (
                    <option key={license.id} value={license.id}>
                      {license.name} ({license.authority})
                    </option>
                  ))
                }
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>Application Date *</label>
                <input
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>Expected Submission *</label>
                <input
                  type="date"
                  value={formData.expectedSubmission}
                  onChange={(e) => setFormData({...formData, expectedSubmission: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>Responsible Executive</label>
                <input
                  type="text"
                  placeholder="Name of Executive"
                  value={formData.responsibleExecutive}
                  onChange={(e) => setFormData({...formData, responsibleExecutive: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                >
                  <option>High Priority</option>
                  <option>Medium Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button
                onClick={() => setShowAddLicenseModal(false)}
                style={{ padding: '12px', background: '#e9ecef', border: '1px solid #dee2e6', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
              >
                Cancel
              </button>
              <button
                onClick={addLicense}
                style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}
              >
                Add License & Load Checklist
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Branch Document Viewer Modal */}
      <BranchDocumentViewerModal
        isOpen={showDocViewer}
        document={viewingDocIndex !== null ? branchDocuments[viewingDocIndex] : null}
        docIndex={viewingDocIndex}
        branchId={branchId}
        onClose={() => setShowDocViewer(false)}
        onDelete={(docIndex) => {
          // Remove document from list
          const updatedDocs = branchDocuments.filter((_, idx) => idx !== docIndex);
          setBranchDocuments(updatedDocs);
          alert('✅ Document deleted!');
          setShowDocViewer(false);
        }}
      />
    </div>
  );
};

export default BranchProfileView;
