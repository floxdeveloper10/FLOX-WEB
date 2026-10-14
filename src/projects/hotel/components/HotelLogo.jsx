// Logo del Hotel Killa Wasi: luna creciente sobre un arco inca (trapezoidal),
// con el nombre en Cormorant Garamond. `tone`: 'light' (sobre azul noche) | 'dark' (sobre piedra/blanco)
export default function HotelLogo({ tone = 'light', withText = true, className = '' }) {
  const ink = tone === 'light' ? '#FFFFFF' : '#1B2A41'
  return (
    <span className={`hlogo ${className}`.trim()}>
      <svg viewBox="0 0 48 48" className="hlogo__mark" aria-hidden="true" focusable="false">
        {/* Arco inca: puerta trapezoidal de doble jamba */}
        <path d="M13 44 L17 16 H31 L35 44" fill="none" stroke={ink} strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M19.5 44 L22 24 H26 L28.5 44" fill="none" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" opacity="0.7" />
        <path d="M8 44 H40" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
        {/* Luna creciente dorada */}
        <path d="M28.5 3.5 A8 8 0 1 0 31 13.5 A6.2 6.2 0 1 1 28.5 3.5 Z" fill="#C9A54C" />
      </svg>
      {withText && (
        <span className="hlogo__text" style={{ color: ink }}>
          <span className="hlogo__name">Killa Wasi</span>
          <span className="hlogo__sub">Hotel · Cusco</span>
        </span>
      )}
    </span>
  )
}
