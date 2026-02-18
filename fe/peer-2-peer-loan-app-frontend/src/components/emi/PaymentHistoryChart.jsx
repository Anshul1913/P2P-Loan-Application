const PaymentHistoryChart = ({ series = [] }) => {
  // fallback demo if empty
  const data = series.length ? series : [
    { month: 'May', value: 1200 }, { month: 'Jun', value: 1400 }, { month: 'Jul', value: 1200 },
    { month: 'Aug', value: 1500 }, { month: 'Sep', value: 1800 }
  ];

  const max = Math.max(...data.map(d => d.value)) || 1;
  const w = 320, h = 120, padding = 12;
  const stepX = (w - padding*2) / (data.length - 1 || 1);

  const points = data.map((d, i) => {
    const x = padding + i * stepX;
    const y = padding + (1 - d.value / max) * (h - padding*2);
    return [x, y];
  });

  const pathD = points.map((p, i) => `${i===0?'M':'L'} ${p[0]} ${p[1]}`).join(' ');

  return (
    <div className="bg-white rounded-lg p-4 shadow panel">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Payment History</h3>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="mt-3">
        {/* grid lines */}
        <g stroke="#EEF2FF">
          <line x1={padding} x2={w-padding} y1={h/2} y2={h/2} />
        </g>

        {/* line */}
        <path d={pathD} fill="none" stroke="#7B61FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#5B3DF4" />
        ))}
      </svg>
    </div>
  );
}
export default PaymentHistoryChart;