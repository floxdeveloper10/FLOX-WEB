// Logo de Andes Ruta Travel: un sendero en zigzag que sube hacia una montaña.
// tone: 'dark' (sobre arena/blanco) | 'light' (sobre verde o carbón)
export default function AgenciaLogo({ tone = 'dark', className = '' }) {
  const ink = tone === 'light' ? '#FFFFFF' : '#1E1E1E'
  return (
    <span className={`alogo ${className}`.trim()}>
      <svg viewBox="0 0 48 48" className="alogo__mark" aria-hidden="true" focusable="false">
        <circle cx="35" cy="11" r="5" fill="#F2B33D" />
        <path d="M2 44 L20 12 L28 26 L33 18 L46 44 Z" fill="#2F5D50" />
        <path d="M17 17.5 L20 12 L23.2 17.8 L20.5 16.6 Z" fill="#F4EBDD" />
        {/* Sendero en zigzag subiendo hacia la cumbre */}
        <path d="M12 44 L24 38 L15 33 L23 28 L18.5 23" fill="none" stroke="#C2502E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="alogo__text" style={{ color: ink }}>
        <span className="alogo__name">Andes Ruta</span>
        <span className="alogo__sub">Travel · Cusco</span>
      </span>
    </span>
  )
}
