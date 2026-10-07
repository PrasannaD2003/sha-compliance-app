import React, { useState } from 'react';
import { X, Download, Eye, Trash2, Copy, FileText, AlertCircle } from 'lucide-react';

export const DocumentViewerModal = ({ isOpen, document, onClose, onDelete }) => {
  if (!isOpen || !document) return null;

  const getFileTypeColor = (fileName) => {
    if (!fileName) return '#64748b';
    if (fileName.endsWith('.pdf')) return '#dc2626';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return '#2563eb';
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return '#16a34a';
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) return '#9333ea';
    return '#64748b';
  };

  const getFileTypeLabel = (fileName) => {
    if (!fileName) return 'Unknown';
    const ext = fileName.split('.').pop().toUpperCase();
    return ext;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 0,
        maxWidth: 600,
        width: '90%',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 24,
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          zIndex: 10
        }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
              {document.name || 'Document Viewer'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {document.description || 'View document details and manage access'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <X size={24} style={{ color: '#64748b' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {/* File Preview Card */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: 12,
            padding: 40,
            textAlign: 'center',
            marginBottom: 24
          }}>
            {document.fileName ? (
              <>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  background: getFileTypeColor(document.fileName),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white'
                }}>
                  <FileText size={32} />
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                  {document.fileName}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8 }}>
                  File Type: <strong>{getFileTypeLabel(document.fileName)}</strong>
                </p>
                {document.fileSize && (
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    File Size: <strong>{document.fileSize}</strong>
                  </p>
                )}
              </>
            ) : (
              <>
                <AlertCircle size={48} style={{ margin: '0 auto 16px', color: '#ca8a04' }} />
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#92400e' }}>
                  No File Uploaded
                </p>
                <p style={{ fontSize: '0.8rem', color: '#c2410c', marginTop: 4 }}>
                  This document hasn't been uploaded yet
                </p>
              </>
            )}
          </div>

          {/* Document Details */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 12, color: '#0f172a' }}>
              Document Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Document Name:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                  {document.name || 'N/A'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Description:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                  {document.description || 'N/A'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Mandatory:</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
                  {document.mandatory ? 'Yes' : 'No'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: 10 }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Status:</span>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: document.status === 'Submitted' || document.status === 'Approved' ? '#16a34a' : '#ca8a04'
                }}>
                  {document.status || 'N/A'}
                </span>
              </div>
              {document.remarks && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Remarks:</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', textAlign: 'right', maxWidth: '50%' }}>
                    {document.remarks}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {document.fileName && (
                <>
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem('authToken') || 'demo-token-office-documents';
                        const response = await fetch(`http://localhost:5000/api/office-documents/${document._id}/view`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const result = await response.json();

                        if (result.success) {
                          const base64Data = result.data.fileData;
                          const fileType = result.data.fileType;

                          // Decode base64 in browser using atob
                          const binaryString = atob(base64Data);
                          const bytes = new Uint8Array(binaryString.length);
                          for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                          }

                          const blob = new Blob([bytes], { type: fileType });
                          const blobUrl = URL.createObjectURL(blob);
                          window.open(blobUrl, '_blank');
                        } else {
                          alert('Error: ' + result.error);
                        }
                      } catch (error) {
                        alert('Error viewing document: ' + error.message);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 6,
                      backgroundColor: '#f0f9ff',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.2s',
                      color: '#2563eb'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dbeafe';
                      e.currentTarget.style.borderColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f9ff';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem('authToken') || 'demo-token-office-documents';
                        const response = await fetch(`http://localhost:5000/api/office-documents/${document._id}/download`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });

                        if (response.ok) {
                          const blob = await response.blob();
                          const blobUrl = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = blobUrl;
                          link.download = document.fileName || 'download';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(blobUrl);
                        } else {
                          const error = await response.json();
                          alert('Error: ' + error.error);
                        }
                      } catch (error) {
                        alert('Error downloading document: ' + error.message);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 6,
                      backgroundColor: '#f0fdf4',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.2s',
                      color: '#16a34a'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dcfce7';
                      e.currentTarget.style.borderColor = '#16a34a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <Download size={16} /> Download
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(document.fileName);
                      alert('Filename copied to clipboard!');
                    }}
                    title="Copy filename"
                    style={{
                      padding: '12px 16px',
                      border: '1px solid #e2e8f0',
                      borderRadius: 6,
                      backgroundColor: '#faf5ff',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      transition: 'all 0.2s',
                      color: '#7c3aed'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3e8ff';
                      e.currentTarget.style.borderColor = '#7c3aed';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#faf5ff';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <Copy size={16} /> Copy
                  </button>
                </>
              )}
            </div>

            {onDelete && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this document?')) {
                    onDelete();
                    onClose();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #fecaca',
                  borderRadius: 6,
                  backgroundColor: '#fef2f2',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: '#dc2626',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#fee2e2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#fef2f2'}
              >
                <Trash2 size={16} /> Delete Document
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: 6,
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
