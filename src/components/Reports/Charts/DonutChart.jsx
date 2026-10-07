import React from 'react';

export const DonutChart = ({ data, totalText, totalNumber }) => {
  const totalValue = data.reduce((acc, d) => acc + d.value, 0);
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 160, height: 160 }}>
        <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
          {data.map((slice, i) => {
            const startPercent = cumulativePercent;
            const slicePercent = slice.value / totalValue;
            cumulativePercent += slicePercent;
            const endPercent = cumulativePercent;

            const [startX, startY] = getCoordinatesForPercent(startPercent);
            const [endX, endY] = getCoordinatesForPercent(endPercent);
            const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`
            ].join(' ');

            return <path key={i} d={pathData} fill={slice.color} />;
          })}
          {/* Inner Donut Hole */}
          <circle cx="0" cy="0" r="0.65" fill="#ffffff" />
        </svg>

        {/* Center Label */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
            {totalNumber !== undefined ? totalNumber : totalValue}
          </span>
          <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>
            {totalText || 'Total'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.775rem' }}>
        {data.map((item, i) => {
          const pct = Math.round((item.value / totalValue) * 100);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
              <span style={{ color: '#475569', minWidth: 100 }}>{item.label}</span>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.value}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.725rem' }}>({pct}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
