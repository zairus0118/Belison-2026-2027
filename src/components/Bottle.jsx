export default function Bottle({ c, s = 1 }) {
  return (
    <svg width={70 * s} height={110 * s} viewBox="0 0 70 110" aria-hidden="true">
      <rect x="26" y="2" width="18" height="14" rx="3" fill="#b9a27a" />
      <rect x="30" y="14" width="10" height="8" fill="#d8c9a8" />
      <rect x="6" y="22" width="58" height="84" rx="14" fill={c} stroke="rgba(0,0,0,.25)" />
      <rect x="14" y="46" width="42" height="30" rx="4" fill="rgba(255,255,255,.75)" />
      <rect x="12" y="30" width="6" height="60" rx="3" fill="rgba(255,255,255,.3)" />
    </svg>
  );
}
