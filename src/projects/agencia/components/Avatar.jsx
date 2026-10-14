// Avatar ilustrado de un guía ficticio (no es una persona real): rostro simple,
// pelo y, si corresponde, chullo andino.
export default function Avatar({ avatar, className = '' }) {
  const { skin, hair, hat, bg } = avatar
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="60" fill={bg} />
      {/* Cuerpo con poncho */}
      <path d="M18 120 C22 92 40 82 60 82 C80 82 98 92 102 120 Z" fill="#2F5D50" />
      <path d="M40 92 L60 108 L80 92" fill="none" stroke="#F2B33D" strokeWidth="4" />
      <rect x="52" y="70" width="16" height="16" rx="6" fill={skin} />
      {/* Pelo detrás */}
      {!hat && <path d="M34 52 C34 30 48 22 60 22 C74 22 86 30 86 52 C86 46 80 36 60 36 C42 36 36 44 34 52 Z" fill={hair} />}
      {hat && <path d="M34 60 C30 74 36 84 42 86 L44 58 Z M86 60 C90 74 84 84 78 86 L76 58 Z" fill={hair} />}
      {/* Rostro */}
      <ellipse cx="60" cy="56" rx="24" ry="27" fill={skin} />
      <circle cx="51" cy="56" r="2.6" fill="#1E1E1E" />
      <circle cx="69" cy="56" r="2.6" fill="#1E1E1E" />
      <path d="M52 67 Q60 73 68 67" fill="none" stroke="#1E1E1E" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="46" cy="64" r="4" fill="#E06C5A" opacity="0.35" />
      <circle cx="74" cy="64" r="4" fill="#E06C5A" opacity="0.35" />
      {/* Chullo andino */}
      {hat && (
        <g>
          <path d="M34 50 C34 26 48 18 60 18 C72 18 86 26 86 50 Z" fill={hat} />
          <path d="M34 50 H86 V44 H34 Z" fill="#F2B33D" />
          <path d="M40 38 h8 l-4 -6 Z M56 32 h8 l-4 -6 Z M72 38 h8 l-4 -6 Z" fill="#F4EBDD" />
          <path d="M36 50 L32 76 M84 50 L88 76" stroke={hat} strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="78" r="4" fill="#F2B33D" />
          <circle cx="88" cy="78" r="4" fill="#F2B33D" />
          <circle cx="60" cy="15" r="5" fill="#F2B33D" />
        </g>
      )}
    </svg>
  )
}
