import { useId } from 'react'

// Escenas del viaje para las galerías de los tours (400×300), con la paleta de la agencia.
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
  water: '#3FB6B0',
  skin: '#B9784F',
}

function Person({ x, y, s = 1, shirt = P.terra, hat = null }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-9" y="-30" width="18" height="30" rx="7" fill={shirt} />
      <rect x="-7" y="-2" width="5" height="22" rx="2" fill={P.coal} />
      <rect x="2" y="-2" width="5" height="22" rx="2" fill={P.coal} />
      <circle cx="0" cy="-40" r="9" fill={P.skin} />
      {hat && <path d="M-11 -44 a11 9 0 0 1 22 0 Z" fill={hat} />}
      <rect x="-12" y="-26" width="6" height="16" rx="3" fill="#7A5A3A" />
    </g>
  )
}

function Hills({ sky }) {
  return (
    <>
      <rect width="400" height="300" fill={sky} />
      <path d="M0 170 L90 90 L170 150 L260 80 L400 170 V300 H0 Z" fill={P.greenLight} />
      <path d="M0 210 C100 180 300 190 400 200 V300 H0 Z" fill={P.green} />
    </>
  )
}

function Grupo() {
  return (
    <>
      <Hills sky="#DCEBE4" />
      <circle cx="320" cy="60" r="20" fill={P.yellow} />
      {/* Guía con banderín */}
      <g transform="translate(110 236)">
        <path d="M14 -76 V-10" stroke={P.coal} strokeWidth="3" />
        <path d="M14 -76 L44 -68 L14 -60 Z" fill={P.yellow} />
        <Person x={0} y={0} s={1.15} shirt={P.terra} hat={P.terraDark} />
      </g>
      <Person x={180} y={244} shirt="#3FB6B0" />
      <Person x={220} y={240} shirt={P.yellow} />
      <Person x={262} y={246} shirt="#8C5BA3" />
      <Person x={300} y={242} shirt={P.greenDark} />
    </>
  )
}

function Almuerzo() {
  return (
    <>
      <rect width="400" height="300" fill="#8C6A4A" />
      <rect x="30" y="40" width="340" height="220" rx="10" fill={P.sand} />
      <rect x="30" y="40" width="340" height="14" fill={P.terra} />
      <rect x="30" y="246" width="340" height="14" fill={P.terra} />
      {[[110, 120, '#D7A55A'], [210, 110, P.greenLight], [300, 130, P.terra], [150, 200, '#EAD7A8'], [260, 200, '#7A3B2A']].map(([x, y, c]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="38" fill="#FFFFFF" />
          <circle cx={x} cy={y} r="28" fill={c} />
        </g>
      ))}
      <circle cx="80" cy="205" r="18" fill="#FFFFFF" />
      <circle cx="80" cy="205" r="12" fill="#5B1E5E" />
    </>
  )
}

function Tren() {
  return (
    <>
      <rect width="400" height="300" fill="#DCEBE4" />
      <path d="M0 150 L80 60 L160 130 L250 50 L400 150 V300 H0 Z" fill={P.greenLight} />
      <path d="M0 200 C120 180 280 190 400 186 V300 H0 Z" fill={P.green} />
      <path d="M-10 280 C120 250 260 270 410 250" fill="none" stroke={P.water} strokeWidth="16" />
      <rect x="0" y="222" width="400" height="6" fill={P.coal} />
      <g transform="translate(70 172)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 96} 0)`}>
            <rect width="90" height="48" rx="8" fill={P.terra} />
            <rect x="0" y="34" width="90" height="6" fill={P.yellow} />
            {[0, 1, 2].map((w) => (
              <rect key={w} x={8 + w * 27} y="9" width="20" height="16" rx="3" fill="#CFE3EC" />
            ))}
          </g>
        ))}
        <path d="M0 10 a10 10 0 0 1 10 -10 h6 v48 h-16 Z" fill={P.terraDark} />
      </g>
    </>
  )
}

function Campamento() {
  const uid = useId().replace(/:/g, '')
  return (
    <>
      <defs>
        <linearGradient id={`noche-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E2A3A" />
          <stop offset="1" stopColor="#3A4E64" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#noche-${uid})`} />
      {[[40, 30], [90, 70], [150, 25], [220, 50], [290, 20], [350, 60], [120, 110], [320, 100]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#FFFFFF" />
      ))}
      <path d="M0 180 L100 100 L190 160 L290 90 L400 170 V300 H0 Z" fill="#26384C" />
      <path d="M0 230 C120 210 280 220 400 214 V300 H0 Z" fill={P.greenDark} />
      {[[110, P.yellow], [220, P.terra], [310, '#3FB6B0']].map(([x, c]) => (
        <g key={x} transform={`translate(${x} 250)`}>
          <path d="M-36 0 L0 -50 L36 0 Z" fill={c} />
          <path d="M0 -50 L0 0 L-10 0 Z" fill="#000" opacity="0.2" />
          <path d="M-6 0 L0 -18 L6 0 Z" fill="#1E1E1E" opacity="0.5" />
        </g>
      ))}
      <circle cx="166" cy="262" r="14" fill={P.yellow} opacity="0.35" />
      <path d="M160 268 l6 -14 l6 14 Z" fill="#F2B33D" />
    </>
  )
}

function Mercado() {
  return (
    <>
      <rect width="400" height="300" fill={P.sand} />
      <rect x="0" y="210" width="400" height="90" fill={P.stone} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${20 + i * 128} 70)`}>
          <path d="M0 30 L12 0 H108 L120 30 Z" fill={[P.terra, P.green, '#8C5BA3'][i]} />
          <path d="M0 30 h120 v6 H0 Z" fill={P.yellow} />
          <rect x="10" y="36" width="100" height="104" fill="#FFFFFF" opacity="0.6" />
          {/* Tejidos colgados */}
          {[0, 1, 2].map((j) => (
            <g key={j}>
              <rect x={16 + j * 32} y="44" width="26" height="60" fill={[P.terra, P.yellow, '#3FB6B0', '#8C5BA3'][(i + j) % 4]} />
              <path d={`M${16 + j * 32} 60 h26 M${16 + j * 32} 74 h26 M${16 + j * 32} 88 h26`} stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
            </g>
          ))}
        </g>
      ))}
      <Person x={90} y={256} shirt={P.green} hat={P.terra} />
      <Person x={300} y={260} shirt={P.yellow} />
    </>
  )
}

function Caballo() {
  return (
    <>
      <rect width="400" height="300" fill="#E4D9EC" />
      <path d="M0 200 C60 130 140 110 220 112 C290 116 340 160 400 200 V300 H0 Z" fill={P.terra} />
      <path d="M0 230 C60 170 140 160 220 162 C290 166 340 200 400 230 V300 H0 Z" fill={P.yellow} />
      <path d="M0 260 C100 230 300 240 400 252 V300 H0 Z" fill={P.greenDark} />
      {/* Caballo */}
      <g transform="translate(150 240)">
        <ellipse cx="40" cy="-30" rx="44" ry="20" fill="#7A4A2A" />
        <path d="M76 -40 L100 -78 L112 -72 L94 -34 Z" fill="#7A4A2A" />
        <ellipse cx="108" cy="-78" rx="14" ry="9" fill="#7A4A2A" />
        {[6, 22, 58, 72].map((x) => (
          <rect key={x} x={x} y="-14" width="7" height="34" fill="#5A3420" />
        ))}
        <path d="M-2 -36 q-14 10 -6 30" stroke="#3A2214" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="22" y="-52" width="36" height="12" rx="4" fill={P.terra} />
      </g>
      <Person x={290} y={252} shirt="#3FB6B0" hat={P.yellow} />
    </>
  )
}

function Bus() {
  return (
    <>
      <rect width="400" height="300" fill="#DCEBE4" />
      <path d="M0 180 C40 80 120 40 200 40 C280 40 360 90 400 180 V300 H0 Z" fill={P.greenLight} />
      <path d="M40 300 L220 250 L90 210 L250 170 L150 140 L230 110" fill="none" stroke={P.sand2} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(150 196)">
        <rect width="86" height="40" rx="8" fill={P.green} />
        <rect x="0" y="26" width="86" height="5" fill={P.yellow} />
        {[0, 1, 2, 3].map((w) => (
          <rect key={w} x={6 + w * 20} y="7" width="15" height="14" rx="2" fill="#CFE3EC" />
        ))}
        <circle cx="18" cy="42" r="7" fill={P.coal} />
        <circle cx="68" cy="42" r="7" fill={P.coal} />
      </g>
      <g transform="translate(250 92)">
        <rect width="70" height="30" fill={P.stone} />
        <path d="M-6 0 L35 -20 L76 0 Z" fill={P.terraDark} />
      </g>
    </>
  )
}

function Ofrenda() {
  return (
    <>
      <rect width="400" height="300" fill="#3A2A4A" />
      <circle cx="200" cy="160" r="130" fill={P.yellow} opacity="0.1" />
      <rect x="60" y="190" width="280" height="80" rx="10" fill={P.terraDark} />
      {/* Manta andina */}
      <rect x="90" y="150" width="220" height="80" rx="6" fill={P.terra} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M90 ${160 + i * 18} h220`} stroke={[P.yellow, '#3FB6B0', P.sand, '#8C5BA3'][i]} strokeWidth="4" />
      ))}
      {/* Hojas de coca, flores y velas */}
      {[[150, 180], [180, 172], [210, 186], [240, 176], [260, 194], [130, 200]].map(([x, y], i) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="12" ry="6" fill={i % 2 ? '#5E8A6E' : '#3F6B4E'} transform={`rotate(${i * 25} ${x} ${y})`} />
      ))}
      {[[200, 200, '#F2B33D'], [170, 206, '#E06C9F'], [230, 208, '#FFFFFF']].map(([x, y, c]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={c} />
      ))}
      {[110, 290].map((x) => (
        <g key={x}>
          <rect x={x - 6} y="110" width="12" height="44" rx="3" fill={P.sand} />
          <path d={`M${x} 92 q8 10 0 18 q-8 -8 0 -18 Z`} fill={P.yellow} />
        </g>
      ))}
    </>
  )
}

const SCENES = { grupo: Grupo, almuerzo: Almuerzo, tren: Tren, campamento: Campamento, mercado: Mercado, caballo: Caballo, bus: Bus, ofrenda: Ofrenda }

export default function TripScene({ name, title, className = '' }) {
  const Scene = SCENES[name] ?? Grupo
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <Scene />
    </svg>
  )
}
