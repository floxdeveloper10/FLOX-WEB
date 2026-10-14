import { useId } from 'react'

// Ilustraciones de los tours (400×300), planas y con la paleta de la agencia.
// Son el respaldo de cada foto mientras no haya fotos reales (ver TourImage.jsx).
const P = {
  terra: '#C2502E',
  terraDark: '#9E3D20',
  green: '#2F5D50',
  greenDark: '#234840',
  greenLight: '#5E8A6E',
  sand: '#F4EBDD',
  sand2: '#E6D5BC',
  coal: '#1E1E1E',
  yellow: '#F2B33D',
  stone: '#B9AE9C',
  snow: '#FFFFFF',
  sky: '#CFE3DC',
  water: '#3FB6B0',
}

function Sky({ color, uid }) {
  return (
    <>
      <defs>
        <linearGradient id={`cielo-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#cielo-${uid})`} />
    </>
  )
}

function Sun({ x, y, r = 22 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 1.8} fill={P.yellow} opacity="0.18" />
      <circle cx={x} cy={y} r={r} fill={P.yellow} />
    </g>
  )
}

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#FFFFFF" opacity="0.92">
      <ellipse cx="0" cy="0" rx="34" ry="12" />
      <ellipse cx="-14" cy="-8" rx="16" ry="12" />
      <ellipse cx="12" cy="-10" rx="18" ry="14" />
    </g>
  )
}

// ─── Escenas ────────────────────────────────────────────────
function MachuPicchu({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <Cloud x={90} y={60} />
      <path d="M0 210 L60 150 L110 190 Z" fill={P.greenLight} opacity="0.6" />
      {/* Huayna Picchu */}
      <path d="M210 230 C230 120 250 70 268 62 C290 70 300 130 330 230 Z" fill={P.green} />
      <path d="M150 240 C200 210 360 200 400 214 V300 H0 V250 Z" fill={P.greenDark} />
      {/* Andenes y muros de piedra */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${40 + i * 10} ${236 + i * 14} H${260 - i * 6}`} stroke={P.greenLight} strokeWidth="5" strokeLinecap="round" />
      ))}
      {[[90, 214], [118, 210], [146, 214], [174, 208], [126, 194], [100, 196]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="22" height="14" fill={P.stone} />
          <path d={`M${x - 2} ${y} L${x + 11} ${y - 8} L${x + 24} ${y} Z`} fill={P.sand2} />
        </g>
      ))}
      <Cloud x={330} y={110} s={0.8} />
    </>
  )
}

function Vinicunca({ uid, c }) {
  const bands = [P.terra, P.yellow, '#3FB6B0', '#8C5BA3', '#D98A4A', P.terraDark]
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      {/* Nevado Ausangate al fondo */}
      <path d="M220 160 L300 60 L380 160 Z" fill="#DCE3EC" />
      <path d="M278 88 L300 60 L322 88 L310 82 L300 92 L290 82 Z" fill={P.snow} />
      <clipPath id={`montana-${uid}`}>
        <path d="M-10 260 C40 150 120 110 190 108 C250 110 310 170 410 250 V300 H-10 Z" />
      </clipPath>
      <g clipPath={`url(#montana-${uid})`}>
        {bands.map((color, i) => (
          <path
            key={color}
            d={`M-10 ${120 + i * 28} C80 ${100 + i * 30} 160 ${140 + i * 24} 410 ${100 + i * 34} V${150 + i * 34} C160 ${170 + i * 26} 80 ${130 + i * 30} -10 ${150 + i * 28} Z`}
            fill={color}
          />
        ))}
      </g>
      <path d="M0 270 C120 250 260 262 400 250 V300 H0 Z" fill={P.greenDark} />
      {/* Caminante */}
      <g transform="translate(118 236)">
        <circle cx="0" cy="-16" r="4" fill={P.coal} />
        <path d="M0 -12 V0 L-4 10 M0 0 L5 10 M0 -8 L6 -2 M-6 -4 L6 4" stroke={P.coal} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </>
  )
}

function Humantay({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      {/* Nevado Salkantay */}
      <path d="M60 190 L190 40 L330 190 Z" fill="#9FB3B8" />
      <path d="M150 88 L190 40 L232 92 L212 84 L196 100 L178 84 Z" fill={P.snow} />
      <path d="M0 200 L70 140 L120 200 Z M280 200 L350 130 L400 170 V200 Z" fill={P.greenLight} />
      {/* Laguna turquesa */}
      <path d="M0 200 H400 V300 H0 Z" fill={P.green} />
      <ellipse cx="200" cy="230" rx="150" ry="34" fill={P.water} />
      <ellipse cx="200" cy="226" rx="120" ry="20" fill="#7FD6D0" opacity="0.6" />
      <path d="M150 226 L190 210 L232 228 Z" fill="#9FB3B8" opacity="0.4" />
      <path d="M0 270 C100 256 300 262 400 254 V300 H0 Z" fill={P.greenDark} />
    </>
  )
}

function ValleSagrado({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <Sun x={320} y={60} r={18} />
      <path d="M0 170 L90 80 L170 150 L250 70 L400 170 V300 H0 Z" fill={P.greenLight} />
      <path d="M0 200 L120 120 L200 190 L300 110 L400 200 V300 H0 Z" fill={P.green} />
      {/* Andenes curvos de Pisac */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${200 + i * 6} ${150 + i * 14} Q300 ${130 + i * 16} ${380 - i * 4} ${170 + i * 12}`} fill="none" stroke="#7FA884" strokeWidth="4" />
      ))}
      {/* Río */}
      <path d="M-10 280 C80 250 150 266 220 246 S340 226 410 236" fill="none" stroke={P.water} strokeWidth="12" strokeLinecap="round" />
      <path d="M0 300 V262 C70 280 150 296 230 286 S340 274 400 280 V300 Z" fill={P.greenDark} />
    </>
  )
}

function CityTour({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <path d="M0 150 L80 100 L160 140 L250 90 L400 150 V200 H0 Z" fill={P.greenLight} opacity="0.7" />
      {/* Catedral */}
      <g transform="translate(110 96)">
        <rect x="0" y="40" width="180" height="110" fill={P.sand2} />
        <rect x="-10" y="10" width="40" height="140" fill={P.stone} />
        <rect x="150" y="10" width="40" height="140" fill={P.stone} />
        <path d="M-12 10 L10 -14 L32 10 Z M148 10 L170 -14 L192 10 Z" fill={P.terraDark} />
        <path d="M70 150 V100 a20 20 0 0 1 40 0 V150 Z" fill={P.greenDark} />
        <rect x="4" y="30" width="12" height="18" rx="6" fill={P.greenDark} />
        <rect x="164" y="30" width="12" height="18" rx="6" fill={P.greenDark} />
        <rect x="60" y="56" width="60" height="8" fill={P.terra} />
      </g>
      {/* Techos de teja */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x={i * 46 - 6} y={226} width="44" height="80" fill={i % 2 ? '#F1E4D1' : '#E9D7BE'} />
          <path d={`M${i * 46 - 10} 228 L${i * 46 + 16} 210 L${i * 46 + 42} 228 Z`} fill={i % 3 ? P.terra : P.terraDark} />
        </g>
      ))}
      <rect y="262" width="400" height="38" fill={P.stone} opacity="0.6" />
    </>
  )
}

function MarasMoray({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <path d="M0 120 L80 70 L170 110 L280 60 L400 110 V300 H0 Z" fill="#C9B79A" />
      {/* Moray: andenes circulares */}
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="120" cy="200" rx={96 - i * 18} ry={40 - i * 7} fill={i % 2 ? '#7FA884' : P.greenLight} stroke="#5D7D62" strokeWidth="1.5" />
      ))}
      {/* Maras: pozas de sal en la ladera */}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 5 }, (_, col) => (
          <rect
            key={`${r}-${col}`}
            x={238 + col * 30 + (r % 2) * 10}
            y={150 + r * 22}
            width="26"
            height="18"
            rx="2"
            fill={(r + col) % 3 === 0 ? '#F3D9CF' : (r + col) % 3 === 1 ? '#FFFFFF' : '#EBDCC7'}
            stroke="#C9A98A"
          />
        )),
      )}
    </>
  )
}

function CaminoInca({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <Sun x={300} y={70} r={20} />
      <path d="M0 160 L100 70 L190 140 L300 60 L400 140 V300 H0 Z" fill={P.greenLight} />
      <path d="M0 210 C80 170 160 190 240 170 S360 160 400 180 V300 H0 Z" fill={P.green} />
      {/* Sendero de piedra en zigzag */}
      <path d="M60 300 L180 262 L100 232 L230 206 L170 186 L268 166" fill="none" stroke={P.sand2} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 300 L180 262 L100 232 L230 206 L170 186 L268 166" fill="none" stroke={P.stone} strokeWidth="10" strokeDasharray="6 8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Inti Punku: puerta del sol */}
      <g transform="translate(262 120)">
        <rect x="0" y="0" width="56" height="48" fill={P.stone} />
        <path d="M18 48 L21 18 H35 L38 48 Z" fill={P.greenDark} />
      </g>
      {/* Bosque nublado */}
      {[[30, 220], [330, 230], [360, 214], [10, 250]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="18" fill={P.greenDark} />
          <circle cx={x + 14} cy={y + 6} r="14" fill={P.greenDark} />
        </g>
      ))}
      <Cloud x={120} y={110} s={0.9} />
    </>
  )
}

function ValleSur({ uid, c }) {
  return (
    <>
      <Sky color={c.sky} uid={uid} />
      <path d="M0 150 L100 90 L200 140 L300 80 L400 140 V300 H0 Z" fill={P.greenLight} />
      {/* Tipón: andenes con canales de agua */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={20 + i * 12} y={170 + i * 30} width={220 - i * 24} height="26" fill={i % 2 ? '#7FA884' : P.green} />
      ))}
      <path d="M130 170 V290" stroke={P.water} strokeWidth="6" />
      <path d="M130 196 q-10 8 -2 18 M130 226 q10 8 2 18" fill="none" stroke="#7FD6D0" strokeWidth="3" />
      {/* Iglesia de Andahuaylillas */}
      <g transform="translate(270 140)">
        <rect x="0" y="40" width="96" height="120" fill={P.sand} />
        <path d="M-6 40 L48 6 L102 40 Z" fill={P.terra} />
        <rect x="70" y="0" width="26" height="60" fill={P.sand2} />
        <path d="M66 0 L83 -16 L100 0 Z" fill={P.terraDark} />
        <path d="M34 160 V112 a14 14 0 0 1 28 0 V160 Z" fill={c.main} />
        <circle cx="48" cy="76" r="9" fill={P.yellow} />
      </g>
    </>
  )
}

const SCENES = {
  'machu-picchu': MachuPicchu,
  vinicunca: Vinicunca,
  humantay: Humantay,
  'valle-sagrado': ValleSagrado,
  'city-tour': CityTour,
  'maras-moray': MarasMoray,
  'camino-inca': CaminoInca,
  'valle-sur': ValleSur,
}

export default function TourIllustration({ name, colors, title, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const Scene = SCENES[name] ?? ValleSagrado
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <Scene uid={uid} c={colors} />
    </svg>
  )
}
