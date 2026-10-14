import { useId } from 'react'

// Franja de tejido andino (rombos y zigzag) en los colores del restaurante.
export function TextileBand({ className = '' }) {
  const id = `textil-${useId().replace(/:/g, '')}`
  return (
    <svg className={`textile ${className}`.trim()} height="12" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#7A2812" />
          <path d="M0 6 L6 0 L12 6 L6 12 Z" fill="#F2A900" />
          <path d="M12 6 L18 0 L24 6 L18 12 Z" fill="#2F7D6D" />
          <path d="M4 6 L6 4 L8 6 L6 8 Z" fill="#7A2812" />
          <path d="M16 6 L18 4 L20 6 L18 8 Z" fill="#FFF1E0" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  )
}

// Portada ilustrada: cielo al atardecer, sol, montañas con nieve y andenes.
export default function MenuCover() {
  const id = useId().replace(/:/g, '')
  return (
    <div className="menu__cover" aria-hidden="true">
      <svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice" className="menu__cover-art" focusable="false">
        <defs>
          <linearGradient id={`cielo-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E9774A" />
            <stop offset="0.6" stopColor="#F4A259" />
            <stop offset="1" stopColor="#F9C784" />
          </linearGradient>
        </defs>
        <rect width="280" height="130" fill={`url(#cielo-${id})`} />
        <circle cx="200" cy="58" r="30" fill="#FFD166" opacity="0.35" />
        <circle cx="200" cy="58" r="20" fill="#FFD166" />
        <path d="M0 96 L46 46 L70 70 L104 30 L140 78 L170 52 L214 96 Z" fill="#8A3A20" />
        <path d="M94 42 L104 30 L114 44 L108 41 L103 46 L99 41 Z" fill="#FFF6EC" />
        <path d="M38 55 L46 46 L54 55 L49 53 L45 57 Z" fill="#FFF6EC" />
        <path d="M130 100 L196 40 L238 80 L262 62 L300 100 Z" fill="#6E2A15" />
        <path d="M188 48 L196 40 L205 49 L199 47 L195 51 Z" fill="#FFF6EC" />
        <path d="M0 104 Q70 84 140 98 T280 92 V130 H0 Z" fill="#5E7C3A" />
        <path d="M0 112 Q70 94 140 108 T280 102" fill="none" stroke="#4C6A2E" strokeWidth="2" />
        <path d="M0 120 Q70 104 140 118 T280 112" fill="none" stroke="#4C6A2E" strokeWidth="2" />
        <path d="M20 28 q6 -4 12 0 M34 20 q5 -3 10 0" stroke="#7A2812" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
      </svg>
      <TextileBand className="menu__cover-band" />
    </div>
  )
}
