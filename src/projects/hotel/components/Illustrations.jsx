import { useId } from 'react'
import { HOTEL_COLORS as C } from '../palette.js'

// Ilustraciones del hotel (400×300), estilo plano y sobrio con la paleta del hotel.
// Son el respaldo de cada imagen mientras no haya fotos reales (ver HotelImage.jsx).

// ─── Piezas compartidas ──────────────────────────────────────
function Moon({ x, y, r, bg = C.navy }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.2} fill={C.gold} opacity="0.12" />
      <circle cx={x} cy={y} r={r} fill={C.goldLight} />
      <circle cx={x + r * 0.45} cy={y - r * 0.3} r={r * 0.85} fill={bg} />
    </g>
  )
}

function Stars({ points }) {
  return points.map(([x, y, s = 1]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={s} fill={C.white} opacity="0.75" />)
}

// Ventana trapezoidal inca con vista nocturna
function IncaWindow({ x, y, w, h, uid, view = 'moon' }) {
  const inset = w * 0.14
  const outer = `${x + inset},${y} ${x + w - inset},${y} ${x + w},${y + h} ${x},${y + h}`
  const pad = 7
  const inner = `${x + inset + pad * 0.6},${y + pad} ${x + w - inset - pad * 0.6},${y + pad} ${x + w - pad},${y + h - pad} ${x + pad},${y + h - pad}`
  const clip = `ventana-${uid}`
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <polygon points={inner} />
        </clipPath>
      </defs>
      <polygon points={outer} fill={C.stone3} />
      <g clipPath={`url(#${clip})`}>
        <rect x={x} y={y} width={w} height={h} fill={C.navy} />
        <Stars points={[[x + w * 0.25, y + h * 0.25], [x + w * 0.7, y + h * 0.18, 0.8], [x + w * 0.5, y + h * 0.42, 0.7]]} />
        {view === 'moon' && <Moon x={x + w * 0.62} y={y + h * 0.3} r={w * 0.1} />}
        <path
          d={`M${x} ${y + h * 0.78} L${x + w * 0.3} ${y + h * 0.5} L${x + w * 0.5} ${y + h * 0.66} L${x + w * 0.75} ${y + h * 0.44} L${x + w} ${y + h * 0.7} V${y + h} H${x} Z`}
          fill={C.navy3}
        />
        {view === 'roofs' && <Roofs x={x - 10} y={y + h * 0.72} w={w + 20} />}
      </g>
    </g>
  )
}

// Techos de teja de San Blas (una fila de casitas con ventanas encendidas)
function Roofs({ x, y, w, scale = 1, lit = true }) {
  const houses = []
  const step = 46 * scale
  for (let i = 0, px = x; px < x + w; i++, px += step) {
    const hw = step - 2
    const hh = (24 + ((i * 7) % 14)) * scale
    houses.push(
      <g key={i}>
        <rect x={px} y={y + 10 * scale} width={hw} height={hh + 30 * scale} fill={i % 2 ? C.stone2 : C.stone} />
        <polygon points={`${px - 3 * scale},${y + 12 * scale} ${px + hw / 2},${y - 6 * scale} ${px + hw + 3 * scale},${y + 12 * scale}`} fill={i % 3 === 0 ? C.tileDark : C.tile} />
        {lit && (i % 2 === 0 || i % 5 === 1) && <rect x={px + hw * 0.38} y={y + 20 * scale} width={hw * 0.22} height={9 * scale} fill={C.goldLight} />}
      </g>,
    )
  }
  return <g>{houses}</g>
}

function Lamp({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y + 6} r="26" fill={C.goldLight} opacity="0.22" />
      <rect x={x - 2} y={y + 10} width="4" height="22" fill={C.woodDark} />
      <polygon points={`${x - 10},${y + 12} ${x + 10},${y + 12} ${x + 7},${y - 2} ${x - 7},${y - 2}`} fill={C.goldLight} />
    </g>
  )
}

function Bed({ x, y, w, duvet = C.navy2 }) {
  return (
    <g>
      <rect x={x} y={y + 34} width={w} height="26" rx="3" fill={C.woodDark} />
      <rect x={x + 3} y={y + 14} width={w - 6} height="30" rx="5" fill={C.white} />
      <rect x={x + 3} y={y + 26} width={w - 6} height="30" rx="4" fill={duvet} />
      <rect x={x + 3} y={y + 32} width={w - 6} height="5" fill={C.gold} opacity="0.85" />
      {w > 90 ? (
        <>
          <rect x={x + 10} y={y + 6} width={w / 2 - 16} height="16" rx="6" fill={C.stone} />
          <rect x={x + w / 2 + 6} y={y + 6} width={w / 2 - 16} height="16" rx="6" fill={C.stone} />
        </>
      ) : (
        <rect x={x + 10} y={y + 6} width={w - 20} height="16" rx="6" fill={C.stone} />
      )}
    </g>
  )
}

function Nightstand({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="30" height="34" rx="2" fill={C.wood} />
      <rect x={x + 4} y={y + 6} width="22" height="3" fill={C.woodDark} opacity="0.6" />
      <Lamp x={x + 15} y={y - 34} />
    </g>
  )
}

function Plant({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C-4 -26 -18 -34 -22 -40 C-8 -36 -2 -24 0 -12 C2 -28 10 -40 20 -46 C12 -32 6 -18 2 0Z" fill={C.green} />
      <path d="M-12 0 H12 L9 22 H-9 Z" fill={C.tile} />
    </g>
  )
}

function Floor() {
  return (
    <g>
      <rect x="0" y="222" width="400" height="78" fill={C.stone3} />
      {[250, 280].map((y) => (
        <path key={y} d={`M0 ${y} H400`} stroke={C.stone2} strokeWidth="1.5" opacity="0.7" />
      ))}
    </g>
  )
}

// ─── Habitaciones ───────────────────────────────────────────
function RoomScene({ variant }) {
  const uid = useId().replace(/:/g, '')
  return (
    <>
      <rect width="400" height="300" fill={C.stone} />
      <rect x="0" y="0" width="400" height="10" fill={C.stone2} />
      <Floor />
      <ellipse cx="190" cy="262" rx="130" ry="20" fill={C.stone2} />
      <ellipse cx="190" cy="262" rx="112" ry="14" fill="none" stroke={C.gold} strokeWidth="1.2" opacity="0.7" />

      {variant === 'single' && (
        <>
          <IncaWindow x={250} y={52} w={84} h={110} uid={uid} />
          <path d="M70 222 V120 a52 52 0 0 1 104 0 V222 Z" fill={C.navy} />
          <Bed x={78} y={172} w={88} duvet={C.navy3} />
          <Nightstand x={186} y={198} />
        </>
      )}

      {variant === 'queen' && (
        <>
          <IncaWindow x={292} y={52} w={76} h={104} uid={uid} />
          <path d="M70 222 V112 a80 70 0 0 1 160 0 V222 Z" fill={C.navy} />
          <Bed x={78} y={168} w={144} />
          <Nightstand x={30} y={198} />
          <Nightstand x={238} y={198} />
        </>
      )}

      {variant === 'twin' && (
        <>
          <IncaWindow x={150} y={34} w={140} h={120} uid={uid} view="roofs" />
          <Bed x={40} y={172} w={92} duvet={C.navy3} />
          <Bed x={268} y={172} w={92} duvet={C.navy3} />
          <rect x={172} y={198} width="56" height="24" rx="3" fill={C.wood} />
          <Plant x={200} y={198} s={0.7} />
        </>
      )}

      {variant === 'suite' && (
        <>
          <IncaWindow x={24} y={48} w={70} h={100} uid={`${uid}a`} />
          <IncaWindow x={312} y={48} w={70} h={100} uid={`${uid}b`} view="roofs" />
          <path d="M112 222 V96 a88 64 0 0 1 176 0 V222 Z" fill={C.navy} />
          <path d="M120 108 a80 56 0 0 1 160 0" fill="none" stroke={C.gold} strokeWidth="2" />
          <Bed x={118} y={164} w={164} />
          <Lamp x={104} y={150} />
          <g>
            <rect x="314" y="190" width="58" height="34" rx="8" fill={C.navy3} />
            <rect x="306" y="178" width="16" height="46" rx="6" fill={C.navy2} />
            <rect x="364" y="178" width="16" height="46" rx="6" fill={C.navy2} />
            <rect x="320" y="184" width="46" height="14" rx="5" fill={C.goldLight} opacity="0.9" />
          </g>
          <Plant x={40} y={222} s={0.9} />
        </>
      )}
    </>
  )
}

// ─── Ambientes ──────────────────────────────────────────────
function Terrace() {
  const uid = useId().replace(/:/g, '')
  return (
    <>
      <defs>
        <linearGradient id={`atardecer-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy} />
          <stop offset="0.55" stopColor={C.navy3} />
          <stop offset="1" stopColor="#B88E5A" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#atardecer-${uid})`} />
      <Moon x={310} y={56} r={13} bg="#22324F" />
      <Stars points={[[60, 40], [120, 70, 0.8], [210, 30], [360, 110, 0.8]]} />
      <path d="M0 160 L70 104 L130 140 L200 92 L270 136 L330 110 L400 146 V200 H0 Z" fill={C.navy2} />
      <Roofs x={-10} y={170} w={420} scale={0.85} />
      <rect x="0" y="228" width="400" height="72" fill={C.woodDark} />
      <path d="M0 224 H400" stroke={C.wood} strokeWidth="6" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 20} y="224" width="4" height="40" fill={C.wood} />
      ))}
      <path d="M0 22 Q100 52 200 26 T400 30" fill="none" stroke={C.stone3} strokeWidth="1" opacity="0.6" />
      {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 ? 40 : 36} r="3" fill={C.goldLight} />
      ))}
      <g>
        <rect x="160" y="246" width="80" height="8" rx="3" fill={C.stone2} />
        <rect x="196" y="254" width="8" height="40" fill={C.stone3} />
        <rect x="178" y="236" width="14" height="10" rx="2" fill={C.white} />
        <rect x="208" y="236" width="14" height="10" rx="2" fill={C.white} />
        <path d="M110 300 V250 a10 10 0 0 1 10 -10 h18 V300" fill={C.navy3} />
        <path d="M290 300 V250 a10 10 0 0 0 -10 -10 h-18 V300" fill={C.navy3} />
      </g>
    </>
  )
}

function Breakfast() {
  return (
    <>
      <rect width="400" height="300" fill={C.wood} />
      {[40, 100, 160, 220, 280].map((y) => (
        <path key={y} d={`M0 ${y} H400`} stroke={C.woodDark} strokeWidth="1.2" opacity="0.45" />
      ))}
      <rect x="40" y="32" width="320" height="236" rx="10" fill={C.stone} />
      <rect x="40" y="32" width="320" height="10" fill={C.gold} opacity="0.7" />
      <rect x="40" y="258" width="320" height="10" fill={C.gold} opacity="0.7" />
      {/* Pan chuta */}
      <circle cx="120" cy="110" r="44" fill={C.white} />
      <circle cx="120" cy="110" r="32" fill="#D7B07A" />
      <circle cx="120" cy="110" r="22" fill="#C99A5E" />
      <path d="M104 104 q16 -10 32 0" stroke="#B48247" strokeWidth="2" fill="none" />
      {/* Frutas */}
      <circle cx="270" cy="100" r="42" fill={C.white} />
      <circle cx="256" cy="92" r="12" fill={C.gold} />
      <circle cx="282" cy="88" r="10" fill={C.tile} />
      <circle cx="278" cy="114" r="11" fill={C.green} />
      <circle cx="256" cy="116" r="8" fill="#B5486B" />
      {/* Café */}
      <circle cx="120" cy="208" r="30" fill={C.white} />
      <circle cx="120" cy="208" r="20" fill={C.stone2} />
      <circle cx="120" cy="208" r="15" fill={C.woodDark} />
      <rect x="148" y="203" width="14" height="8" rx="4" fill={C.white} />
      {/* Quinua */}
      <circle cx="210" cy="200" r="34" fill={C.white} />
      <circle cx="210" cy="200" r="25" fill="#EBDDBE" />
      {[[200, 192], [214, 188], [222, 202], [206, 208], [196, 202], [214, 214]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#CDB98C" />
      ))}
      {/* Jugo */}
      <circle cx="296" cy="206" r="22" fill={C.goldLight} stroke={C.white} strokeWidth="5" />
      <rect x="320" y="150" width="20" height="96" rx="4" fill={C.white} />
      <rect x="320" y="158" width="20" height="5" fill={C.gold} />
    </>
  )
}

function Patio() {
  return (
    <>
      <rect width="400" height="300" fill="#DDE3E8" />
      <rect x="0" y="40" width="400" height="200" fill={C.white} />
      {/* Balcón de madera */}
      <rect x="0" y="40" width="400" height="16" fill={C.woodDark} />
      <rect x="0" y="100" width="400" height="10" fill={C.woodDark} />
      {Array.from({ length: 34 }, (_, i) => (
        <rect key={i} x={6 + i * 12} y="56" width="4" height="44" fill={C.wood} />
      ))}
      {/* Arcos */}
      {[20, 116, 212, 308].map((x) => (
        <g key={x}>
          <path d={`M${x} 240 V156 a36 36 0 0 1 72 0 V240 Z`} fill={C.navy2} />
          <rect x={x - 12} y="110" width="12" height="130" fill={C.stone2} />
        </g>
      ))}
      <rect x="388" y="110" width="12" height="130" fill={C.stone2} />
      {/* Piso empedrado y pileta */}
      <rect x="0" y="240" width="400" height="60" fill={C.stone3} />
      {Array.from({ length: 20 }, (_, i) => (
        <ellipse key={i} cx={(i * 47) % 400} cy={252 + ((i * 13) % 40)} rx="12" ry="5" fill={C.stone2} opacity="0.8" />
      ))}
      <ellipse cx="200" cy="262" rx="62" ry="16" fill={C.stone} stroke={C.stone2} strokeWidth="4" />
      <ellipse cx="200" cy="260" rx="48" ry="10" fill="#9FB4C4" />
      <rect x="194" y="218" width="12" height="40" fill={C.stone} />
      <ellipse cx="200" cy="218" rx="20" ry="6" fill={C.stone} />
      <Plant x={60} y={270} s={0.9} />
      <Plant x={340} y={270} s={0.9} />
    </>
  )
}

function Reception() {
  return (
    <>
      <rect width="400" height="300" fill={C.stone} />
      <Floor />
      <path d="M140 222 V96 a60 60 0 0 1 120 0 V222 Z" fill={C.navy} />
      <Moon x={222} y={100} r={11} />
      {/* Lámpara colgante */}
      <path d="M200 0 V40" stroke={C.woodDark} strokeWidth="2" />
      <circle cx="200" cy="54" r="30" fill={C.goldLight} opacity="0.25" />
      <path d="M184 52 a16 12 0 0 1 32 0 Z" fill={C.gold} />
      {/* Tablero de llaves */}
      <rect x="30" y="80" width="80" height="70" rx="4" fill={C.wood} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}-${c}`} cx={44 + c * 17} cy={96 + r * 20} r="3" fill={C.goldLight} />),
      )}
      {/* Mostrador */}
      <rect x="90" y="176" width="220" height="70" rx="4" fill={C.woodDark} />
      <rect x="84" y="170" width="232" height="10" rx="3" fill={C.wood} />
      <rect x="100" y="196" width="200" height="4" fill={C.gold} opacity="0.7" />
      <path d="M150 170 a10 9 0 0 1 20 0 Z" fill={C.gold} />
      <rect x="159" y="157" width="2" height="5" fill={C.gold} />
      <rect x="250" y="150" width="26" height="20" rx="2" fill={C.white} />
      <Plant x={350} y={222} s={1} />
    </>
  )
}

function NightView() {
  return (
    <>
      <rect width="400" height="300" fill={C.navy} />
      <Stars points={[[40, 30], [90, 60, 0.8], [150, 22], [200, 50, 0.7], [250, 28], [330, 70, 0.8], [370, 26], [60, 90, 0.6]]} />
      <Moon x={290} y={70} r={26} />
      <path d="M0 170 L60 120 L110 150 L180 100 L250 146 L320 112 L400 150 V220 H0 Z" fill={C.navy2} />
      <path d="M0 196 L80 160 L150 186 L230 150 L300 182 L400 160 V230 H0 Z" fill={C.navy3} opacity="0.7" />
      <Roofs x={-20} y={200} w={440} scale={0.7} />
      <Roofs x={-40} y={238} w={480} scale={0.9} />
    </>
  )
}

function Transfer() {
  return (
    <>
      <rect width="400" height="300" fill="#DCE2E6" />
      <circle cx="320" cy="64" r="26" fill={C.goldLight} />
      <path d="M0 170 L70 100 L120 140 L190 70 L260 140 L320 96 L400 150 V300 H0 Z" fill={C.navy3} opacity="0.55" />
      <path d="M180 82 L190 70 L200 84 L194 82 L189 87 Z" fill={C.white} />
      <path d="M0 210 Q100 170 200 200 T400 190 V300 H0 Z" fill={C.green} />
      <path d="M-20 300 C80 260 140 250 210 236 S340 214 420 220" fill="none" stroke={C.stone3} strokeWidth="34" />
      <path d="M-20 300 C80 260 140 250 210 236 S340 214 420 220" fill="none" stroke={C.white} strokeWidth="2" strokeDasharray="12 10" />
      {/* Camioneta */}
      <g transform="translate(150 196)">
        <rect x="0" y="0" width="100" height="40" rx="10" fill={C.navy} />
        <path d="M70 0 H86 a14 14 0 0 1 14 14 V22 H70 Z" fill={C.navy2} />
        <rect x="10" y="7" width="22" height="13" rx="3" fill={C.stone} />
        <rect x="38" y="7" width="22" height="13" rx="3" fill={C.stone} />
        <rect x="74" y="6" width="18" height="14" rx="3" fill={C.stone} />
        <rect x="0" y="26" width="100" height="4" fill={C.gold} />
        <circle cx="24" cy="42" r="9" fill={C.woodDark} />
        <circle cx="78" cy="42" r="9" fill={C.woodDark} />
        <circle cx="24" cy="42" r="3.5" fill={C.stone3} />
        <circle cx="78" cy="42" r="3.5" fill={C.stone3} />
      </g>
    </>
  )
}

function Tea() {
  return (
    <>
      <rect width="400" height="300" fill={C.navy} />
      <circle cx="200" cy="170" r="130" fill={C.gold} opacity="0.08" />
      <ellipse cx="200" cy="232" rx="110" ry="22" fill={C.stone2} />
      <ellipse cx="200" cy="226" rx="96" ry="16" fill={C.stone} />
      <path d="M130 140 H270 V176 a52 52 0 0 1 -52 52 H182 a52 52 0 0 1 -52 -52 Z" fill={C.white} />
      <path d="M270 156 a24 22 0 0 1 0 44" fill="none" stroke={C.white} strokeWidth="10" />
      <ellipse cx="200" cy="140" rx="70" ry="12" fill="#B5A659" />
      <rect x="130" y="150" width="140" height="4" fill={C.gold} opacity="0.8" />
      <ellipse cx="184" cy="138" rx="16" ry="5" fill={C.green} transform="rotate(-18 184 138)" />
      <ellipse cx="216" cy="140" rx="14" ry="4.5" fill="#5D6D4D" transform="rotate(22 216 140)" />
      {[170, 200, 230].map((x) => (
        <path key={x} d={`M${x} 118 q-10 -16 0 -32 q10 -16 0 -32`} fill="none" stroke={C.stone3} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      ))}
      <ellipse cx="96" cy="250" rx="20" ry="7" fill={C.green} transform="rotate(-25 96 250)" />
      <ellipse cx="312" cy="252" rx="18" ry="6" fill="#5D6D4D" transform="rotate(20 312 252)" />
    </>
  )
}

const SCENES = {
  'room-single': () => <RoomScene variant="single" />,
  'room-queen': () => <RoomScene variant="queen" />,
  'room-twin': () => <RoomScene variant="twin" />,
  'room-suite': () => <RoomScene variant="suite" />,
  terrace: Terrace,
  breakfast: Breakfast,
  patio: Patio,
  reception: Reception,
  night: NightView,
  transfer: Transfer,
  tea: Tea,
}

export default function Illustration({ name, title, className = '' }) {
  const Scene = SCENES[name] ?? NightView
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <Scene />
    </svg>
  )
}

export { Moon, Roofs, Stars }
