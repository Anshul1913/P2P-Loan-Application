const ProgressRing = ({ size = 100, stroke = 8, progress = 0.6 }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * Math.max(0, Math.min(1, progress));
  const offset = c - dash;
  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7B61FF"/>
          <stop offset="100%" stopColor="#5B3DF4"/>
        </linearGradient>
      </defs>
      <g transform={`translate(${size/2},${size/2})`}>
        <circle r={r} cx="0" cy="0" stroke="#EEF2FF" strokeWidth={stroke} fill="none" />
        <circle r={r} cx="0" cy="0" stroke="url(#g1)" strokeWidth={stroke} fill="none"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${c-dash}`}
                transform="rotate(-90)" />
        <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="600" fill="#111827">
          {Math.round(progress*100)}%
        </text>
        <text x="0" y="28" textAnchor="middle" fontSize="12" fill="#6B7280">
          Remaining
        </text>
      </g>
    </svg>
  );
}
export default ProgressRing;