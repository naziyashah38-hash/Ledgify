export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* blue rounded background */}
      <rect width="64" height="64" rx="14" fill="#1e3a8a" />

      {/* lighter blue accent circle */}
      <circle cx="32" cy="30" r="17" fill="#3b5bdb" opacity="0.55" />

      {/* expense line chart (downward = expenses) */}
      <path
        d="M14 24 L24 30 L32 24 L44 40"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* chart end dot */}
      <circle cx="44" cy="40" r="3" fill="#93c5fd" />

      {/* rupee symbol */}
      <path
        d="M26 48 h14 M26 52 h10
           M27 42 h11
           M27 42 c6 0 8 -2 8 -5 s-2 -5 -8 -5 h-2 h8"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}