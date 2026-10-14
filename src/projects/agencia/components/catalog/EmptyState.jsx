import { useAgencia } from '../../agenciaState.js'

// Estado vacío amable: una llama mirando un sendero que no lleva a ningún tour
export default function EmptyState({ onClear }) {
  const { t } = useAgencia()
  return (
    <div className="aempty" role="status">
      <svg viewBox="0 0 240 160" className="aempty__art" aria-hidden="true" focusable="false">
        <circle cx="186" cy="38" r="16" fill="#F2B33D" />
        <path d="M0 120 L60 60 L100 96 L150 40 L240 120 V160 H0 Z" fill="#C88A6A" opacity="0.6" />
        <path d="M0 136 C60 120 140 128 240 116 V160 H0 Z" fill="#2F5D50" />
        <path d="M150 160 C140 146 170 136 156 124 C146 116 168 108 160 100" fill="none" stroke="#F4EBDD" strokeWidth="5" strokeDasharray="2 8" strokeLinecap="round" />
        {/* Llama */}
        <g transform="translate(64 84)">
          <ellipse cx="18" cy="34" rx="22" ry="12" fill="#FFFFFF" />
          <rect x="30" y="6" width="9" height="30" rx="4.5" fill="#FFFFFF" />
          <ellipse cx="38" cy="6" rx="8" ry="6" fill="#FFFFFF" />
          <path d="M33 -1 L34 -8 L37 -1 M39 -1 L41 -8 L42 -1" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="41" cy="5" r="1.4" fill="#1E1E1E" />
          <rect x="2" y="40" width="5" height="16" fill="#FFFFFF" />
          <rect x="28" y="40" width="5" height="16" fill="#FFFFFF" />
          <rect x="22" y="26" width="16" height="5" fill="#C2502E" />
        </g>
        <text x="120" y="28" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="28" fill="#C2502E">
          ?
        </text>
      </svg>
      <h2 className="aempty__title">{t.catalog.emptyTitle}</h2>
      <p className="aempty__text">{t.catalog.emptyText}</p>
      <button type="button" className="a-btn a-btn--primary" onClick={onClear}>
        {t.catalog.clear}
      </button>
    </div>
  )
}
