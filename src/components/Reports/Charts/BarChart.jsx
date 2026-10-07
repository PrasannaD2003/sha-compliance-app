import React from 'react';

export const BarChart = ({ data }) => {
  const maxVal = 40;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', fontSize: '0.725rem', fontWeight: 600 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: '#2563eb', borderRadius: 2 }} /> Applications</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: '#10b981', borderRadius: 2 }} /> Approved</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: '#f59e0b', borderRadius: 2 }} /> Pending</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, background: '#ef4444', borderRadius: 2 }} /> Rejected</span>
      </div>

      <div
        style={{
          height: 200,
          background: '#f8fafc',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'flex-end',
          justify: 'space-around',
          padding: '20px 10px 10px 10px'
        }}
      >
        {data.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 140 }}>
              <div
                style={{
                  width: 12,
                  height: `${(item.applications / maxVal) * 100}%`,
                  background: '#2563eb',
                  borderRadius: '3px 3px 0 0'
                }}
                title={`Applications: ${item.applications}`}
              />
              <div
                style={{
                  width: 12,
                  height: `${(item.approved / maxVal) * 100}%`,
                  background: '#10b981',
                  borderRadius: '3px 3px 0 0'
                }}
                title={`Approved: ${item.approved}`}
              />
              <div
                style={{
                  width: 12,
                  height: `${(item.pending / maxVal) * 100}%`,
                  background: '#f59e0b',
                  borderRadius: '3px 3px 0 0'
                }}
                title={`Pending: ${item.pending}`}
              />
              <div
                style={{
                  width: 12,
                  height: `${(item.rejected / maxVal) * 100}%`,
                  background: '#ef4444',
                  borderRadius: '3px 3px 0 0'
                }}
                title={`Rejected: ${item.rejected}`}
              />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
