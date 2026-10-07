import React, { useState } from 'react';
import { Plus, Download, Trash2, Eye, Upload, Calendar, FileText, Folder, FolderPlus, ArrowLeft } from 'lucide-react';
import { DocumentViewerModal } from './Modals/DocumentViewerModal';

export const OfficeDocumentsView = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'GST Certificate',
      category: 'Tax Documents',
      uploadDate: '2026-01-15',
      fileSize: '2.4 MB',
      fileName: 'GST_Certificate_2024.pdf',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Company Registration Certificate',
      category: 'Legal Documents',
      uploadDate: '2026-01-10',
      fileSize: '1.8 MB',
      fileName: 'Company_Reg_Cert.pdf',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Business Agreement',
      category: 'Agreements',
      uploadDate: '2025-12-20',
      fileSize: '3.2 MB',
      fileName: 'Business_Agreement_2024.pdf',
      status: 'Active'
    }
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: 'Tax Documents', icon: '📁', color: '#fbbf24' },
    { id: 2, name: 'Legal Documents', icon: '📁', color: '#34d399' },
    { id: 3, name: 'Agreements', icon: '📁', color: '#a78bfa' }
  ]);

  const [currentFolder, setCurrentFolder] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'Tax Documents',
    uploadDate: new Date().toISOString().split('T')[0],
    file: null,
    fileName: ''
  });

  const categories = [
    'Tax Documents',
    'Legal Documents',
    'Agreements',
    'Licenses',
    'Insurance',
    'Bank Documents',
    'Other'
  ];

  React.useEffect(() => {
    // Fetch documents from backend on component load
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('authToken') || 'demo-token-office-documents';
        const response = await fetch('http://localhost:5000/api/office-documents', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();

        if (result.success && result.data) {
          setDocuments(result.data);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  const handleAddDocument = async () => {
    if (newDoc.name && newDoc.file) {
      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', newDoc.file);
        formData.append('name', newDoc.name);
        formData.append('category', newDoc.category);
        formData.append('uploadDate', newDoc.uploadDate);

        // Get auth token from localStorage
        const token = localStorage.getItem('authToken') || 'demo-token-office-documents';

        // Send to backend API
        const response = await fetch('http://localhost:5000/api/office-documents/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Add to local state after successful backend upload
          const fileSizeInMB = (newDoc.file.size / (1024 * 1024)).toFixed(2);
          const doc = {
            _id: result.data?._id,
            id: documents.length + 1,
            name: newDoc.name,
            category: newDoc.category,
            uploadDate: newDoc.uploadDate,
            fileSize: `${fileSizeInMB} MB`,
            fileName: newDoc.file.name,
            status: 'Active',
            filePath: result.data?.filePath
          };
          setDocuments([doc, ...documents]);
          setNewDoc({
            name: '',
            category: 'Tax Documents',
            uploadDate: new Date().toISOString().split('T')[0],
            file: null,
            fileName: ''
          });
          setShowAddModal(false);
          alert('✅ Document uploaded successfully to server!');
        } else {
          alert(`❌ Upload failed: ${result.error}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert(`❌ Error uploading document: ${error.message}`);
      }
    } else {
      alert('Please fill in all required fields and select a file');
    }
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Math.max(...folders.map(f => f.id), 0) + 1,
        name: newFolderName,
        icon: '📁',
        color: ['#fbbf24', '#34d399', '#a78bfa', '#60a5fa', '#f87171'][Math.floor(Math.random() * 5)]
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowFolderModal(false);
    }
  };

  const handleDownload = (doc) => {
    // Simulate download - in production, this would create a blob and trigger download
    const link = document.createElement('a');
    link.href = '#';
    link.download = doc.fileName;
    link.click();
    alert(`Downloaded: ${doc.fileName}`);
  };

  const filteredDocuments = currentFolder
    ? documents.filter(doc => doc.category === currentFolder.name)
    : documents;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Office Documents</h1>
          <p className="page-subtitle">Manage company documents, agreements, GST certificates, and legal files.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Upload Document
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <div className="stat-title">TOTAL DOCUMENTS</div>
            <div className="stat-value">{documents.length}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <FileText size={22} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-title">TAX DOCUMENTS</div>
            <div className="stat-value">
              {documents.filter(d => d.category === 'Tax Documents').length}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#ca8a04' }}>
            <FileText size={22} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-title">LEGAL DOCUMENTS</div>
            <div className="stat-value">
              {documents.filter(d => d.category === 'Legal Documents').length}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            <FileText size={22} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-title">AGREEMENTS</div>
            <div className="stat-value">
              {documents.filter(d => d.category === 'Agreements').length}
            </div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
            <FileText size={22} />
          </div>
        </div>
      </div>

      {/* Folders Section */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {currentFolder && (
              <button
                className="icon-button"
                onClick={() => setCurrentFolder(null)}
                title="Back to all folders"
              >
                <ArrowLeft size={18} style={{ color: '#2563eb' }} />
              </button>
            )}
            <h3 className="card-title">{currentFolder ? currentFolder.name : 'Document Folders'}</h3>
          </div>
          <button
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', padding: '8px 14px' }}
            onClick={() => setShowFolderModal(true)}
          >
            <FolderPlus size={16} /> New Folder
          </button>
        </div>

        {!currentFolder && (
          <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
            {folders.map(folder => (
              <div
                key={folder.id}
                onClick={() => setCurrentFolder(folder)}
                style={{
                  padding: '16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${folder.color}20`;
                  e.currentTarget.style.borderColor = folder.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ fontSize: '32px' }}>{folder.icon}</div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', textAlign: 'center' }}>
                  {folder.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {documents.filter(d => d.category === folder.name).length} files
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documents Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{currentFolder ? `Documents in ${currentFolder.name}` : 'All Office Documents'}</h3>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>File Name</th>
                <th>Upload Date</th>
                <th>File Size</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{doc.name}</td>
                    <td>
                      <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {doc.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{doc.fileName}</td>
                    <td style={{ fontSize: '0.875rem', color: '#64748b' }}>{doc.uploadDate}</td>
                    <td style={{ fontSize: '0.875rem' }}>{doc.fileSize}</td>
                    <td>
                      <span className="badge badge-active">{doc.status}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button
                          className="icon-button"
                          title="View"
                          onClick={() => {
                            setViewingDoc(doc);
                            setShowViewer(true);
                          }}
                        >
                          <Eye size={16} style={{ color: '#2563eb' }} />
                        </button>
                        <button
                          className="icon-button"
                          title="Download"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download size={16} style={{ color: '#16a34a' }} />
                        </button>
                        <button
                          className="icon-button"
                          title="Delete"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 size={16} style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    {currentFolder ? `No documents in ${currentFolder.name}` : 'No documents found. Upload your first document!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            maxWidth: 500,
            width: '90%'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Upload Office Document</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Document Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  placeholder="e.g., GST Certificate"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-control"
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={newDoc.uploadDate}
                  onChange={(e) => setNewDoc({ ...newDoc, uploadDate: e.target.value })}
                />
              </div>

              <div
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: 8,
                  padding: 24,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: newDoc.file ? '#f0fdf4' : '#fafafa'
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.backgroundColor = newDoc.file ? '#f0fdf4' : '#fafafa';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    setNewDoc({ ...newDoc, file: files[0], fileName: files[0].name });
                  }
                }}
              >
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setNewDoc({ ...newDoc, file: e.target.files[0], fileName: e.target.files[0].name });
                    }
                  }}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <Upload size={32} style={{ margin: '0 auto 12px', color: newDoc.file ? '#16a34a' : '#2563eb' }} />
                  <p style={{ fontSize: '0.875rem', color: '#0f172a', fontWeight: 600, marginBottom: 4 }}>
                    {newDoc.file ? '✓ File selected' : 'Click to upload or drag and drop'}
                  </p>
                  {newDoc.file ? (
                    <p style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                      {newDoc.fileName}
                    </p>
                  ) : (
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewDoc({
                    name: '',
                    category: 'Tax Documents',
                    uploadDate: new Date().toISOString().split('T')[0],
                    file: null,
                    fileName: ''
                  });
                }}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#64748b'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddDocument}
                disabled={!newDoc.name || !newDoc.file}
                style={{
                  padding: '10px 16px',
                  background: newDoc.name && newDoc.file ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#cbd5e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  cursor: newDoc.name && newDoc.file ? 'pointer' : 'not-allowed',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={16} /> {newDoc.file ? 'Upload Document' : 'Select File'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showFolderModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            maxWidth: 400,
            width: '90%'
          }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Create New Folder</h2>

            <div className="form-group">
              <label className="form-label">Folder Name *</label>
              <input
                type="text"
                className="form-control"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g., Important Documents"
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowFolderModal(false);
                  setNewFolderName('');
                }}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="btn btn-primary"
              >
                <FolderPlus size={16} /> Create Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={showViewer}
        document={viewingDoc}
        onClose={() => setShowViewer(false)}
        onDelete={() => {
          if (viewingDoc) {
            handleDeleteDocument(viewingDoc.id);
          }
        }}
      />
    </div>
  );
};
