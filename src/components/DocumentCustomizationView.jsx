import React, { useState } from 'react';
import { Settings, Eye, EyeOff, Copy, Trash2, Plus, ChevronUp, ChevronDown, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DocumentCustomizationView = ({ documentType = 'Quotation' }) => {
  const [activeTab, setActiveTab] = useState('columns');
  const [customization, setCustomization] = useState({
    name: `${documentType} Template`,
    showLogo: true,
    showCompanyDetails: true,
    showItemNumber: true,
    showDescription: true,
    showQuantity: true,
    showRate: true,
    showAmount: true,
    showTax: true,
    showSubtotal: true,
    showTerms: true,
    showSignature: true,
    headerColor: '#0f172a',
    accentColor: '#2563eb',
    currencySymbol: '₹',
    pageSize: 'A4',
    orientation: 'Portrait',
    columns: [
      { id: 'itemNo', label: 'Item No', visible: true, order: 1 },
      { id: 'description', label: 'Description', visible: true, order: 2 },
      { id: 'quantity', label: 'Qty', visible: true, order: 3 },
      { id: 'rate', label: 'Rate', visible: true, order: 4 },
      { id: 'amount', label: 'Amount', visible: true, order: 5 },
      { id: 'tax', label: 'Tax', visible: true, order: 6 }
    ]
  });

  const handleToggleColumn = (columnId) => {
    setCustomization(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    }));
  };

  const handleLabelChange = (columnId, newLabel) => {
    setCustomization(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId ? { ...col, label: newLabel } : col
      )
    }));
  };

  const handleMoveColumn = (columnId, direction) => {
    const index = customization.columns.findIndex(c => c.id === columnId);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === customization.columns.length - 1)) {
      return;
    }

    const newColumns = [...customization.columns];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newColumns[index], newColumns[targetIndex]] = [newColumns[targetIndex], newColumns[index]];

    setCustomization(prev => ({
      ...prev,
      columns: newColumns.map((col, idx) => ({ ...col, order: idx + 1 }))
    }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Settings size={24} style={{ marginRight: 10 }} /> Customize {documentType}</h1>
          <p className="page-subtitle">Customize columns, labels, colors, and layout for your {documentType.toLowerCase()}s.</p>
        </div>
        <button className="btn btn-primary">
          <Save size={16} /> Save Template
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 24 }}>
        {/* Sidebar Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'columns', label: 'Columns & Layout', icon: '📋' },
            { id: 'labels', label: 'Labels & Text', icon: '✏️' },
            { id: 'styling', label: 'Styling', icon: '🎨' },
            { id: 'page', label: 'Page Setup', icon: '📄' },
            { id: 'terms', label: 'Terms & Footer', icon: '📝' },
            { id: 'preview', label: 'Preview', icon: '👁️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === tab.id ? '#2563eb' : '#f1f5f9',
                color: activeTab === tab.id ? 'white' : '#0f172a',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 600 : 500,
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ marginRight: 8 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="card" style={{ padding: 24 }}>
          {/* Columns Tab */}
          {activeTab === 'columns' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Customize Columns</h3>

              <div style={{ marginBottom: 20, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                <p style={{ fontSize: '0.85rem', color: '#166534', margin: 0 }}>
                  ✓ Drag columns to reorder • Click eye icon to show/hide • Change column titles
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {customization.columns.map((col, idx) => (
                  <div
                    key={col.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 12,
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      background: col.visible ? '#ffffff' : '#f8fafc'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleMoveColumn(col.id, 'up')}
                        disabled={idx === 0}
                        style={{
                          padding: 6,
                          border: 'none',
                          background: '#f1f5f9',
                          borderRadius: 4,
                          cursor: idx === 0 ? 'not-allowed' : 'pointer',
                          opacity: idx === 0 ? 0.5 : 1
                        }}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => handleMoveColumn(col.id, 'down')}
                        disabled={idx === customization.columns.length - 1}
                        style={{
                          padding: 6,
                          border: 'none',
                          background: '#f1f5f9',
                          borderRadius: 4,
                          cursor: idx === customization.columns.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: idx === customization.columns.length - 1 ? 0.5 : 1
                        }}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleColumn(col.id)}
                      style={{
                        padding: 6,
                        border: 'none',
                        background: col.visible ? '#f0fdf4' : '#fef2f2',
                        borderRadius: 4,
                        cursor: 'pointer',
                        color: col.visible ? '#16a34a' : '#dc2626'
                      }}
                    >
                      {col.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>

                    <input
                      type="text"
                      value={col.label}
                      onChange={(e) => handleLabelChange(col.id, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: 6,
                        fontWeight: 600,
                        opacity: col.visible ? 1 : 0.6
                      }}
                    />

                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      #{col.order}
                    </span>
                  </div>
                ))}
              </div>

              <button
                style={{
                  marginTop: 16,
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.875rem'
                }}
              >
                <Plus size={16} /> Add Custom Column
              </button>
            </div>
          )}

          {/* Labels Tab */}
          {activeTab === 'labels' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Customize Labels</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { key: 'quotationTitle', label: 'Quotation Title' },
                  { key: 'invoiceTitle', label: 'Invoice Title' },
                  { key: 'billTo', label: 'Bill To Label' },
                  { key: 'description', label: 'Description Label' },
                  { key: 'quantity', label: 'Quantity Label' },
                  { key: 'total', label: 'Total Label' }
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={field.key}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: 6
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Styling Tab */}
          {activeTab === 'styling' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Styling & Colors</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                    Header Color
                  </label>
                  <input
                    type="color"
                    defaultValue={customization.headerColor}
                    style={{ width: '100%', height: 40, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                    Accent Color
                  </label>
                  <input
                    type="color"
                    defaultValue={customization.accentColor}
                    style={{ width: '100%', height: 40, border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Page Setup Tab */}
          {activeTab === 'page' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Page Setup</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                    Page Size
                  </label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                    <option>A4</option>
                    <option>Letter</option>
                    <option>A3</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                    Orientation
                  </label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6 }}>
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Terms Tab */}
          {activeTab === 'terms' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Terms & Footer</h3>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>
                Terms & Conditions
              </label>
              <textarea
                defaultValue="1. Payment terms: Net 30 days\n2. This is a confidential quotation\n3. Prices are valid for 30 days"
                style={{
                  width: '100%',
                  minHeight: 120,
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div>
              <h3 style={{ marginBottom: 20, fontSize: '1.1rem', fontWeight: 700 }}>Preview</h3>
              <div style={{
                padding: 24,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                minHeight: 400
              }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <h2 style={{ margin: 0, fontSize: '1.8rem', color: customization.headerColor }}>
                    {documentType}
                  </h2>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${customization.accentColor}` }}>
                      {customization.columns.filter(c => c.visible).map(col => (
                        <th
                          key={col.id}
                          style={{
                            padding: 12,
                            textAlign: 'left',
                            fontWeight: 600,
                            color: customization.headerColor
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      {customization.columns.filter(c => c.visible).map(col => (
                        <td key={col.id} style={{ padding: 12, color: '#64748b' }}>
                          Sample data
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCustomizationView;
