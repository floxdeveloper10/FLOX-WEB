// Ilustraciones de los platos, hechas con formas simples en SVG (64×64).

function Plate() {
  return (
    <>
      <circle cx="32" cy="32" r="31" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="30.25" fill="none" stroke="#E8D9C5" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" fill="#F6EEE3" />
    </>
  )
}

function DrinkBase() {
  return <circle cx="32" cy="32" r="31" fill="#F6E3CC" />
}

function Mushroom({ x, y, s = 1, cap = '#8B5A2B' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-1.6" y="-1" width="3.2" height="6" rx="1.4" fill="#F3E3C3" />
      <path d="M-6 0 a6 5 0 0 1 12 0 Z" fill={cap} />
    </g>
  )
}

const KERNELS = [18, 22, 26, 30, 34, 38].flatMap((x) => [27.5, 31, 34.5].map((y) => [x, y]))

const ARTS = {
  choclo: (
    <>
      <Plate />
      <g transform="rotate(-28 32 30)">
        <path d="M44 31 l10 -6 -3 6 3 6 Z" fill="#8DB255" />
        <rect x="13" y="24" width="33" height="14" rx="7" fill="#F2C230" />
        {KERNELS.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#E0A21A" />
        ))}
      </g>
      <rect x="26" y="38" width="20" height="11" rx="2" fill="#FFF8DD" stroke="#E6D7A6" transform="rotate(10 36 43)" />
    </>
  ),
  rocoto: (
    <>
      <Plate />
      <circle cx="47" cy="46" r="5" fill="#F3D9A4" />
      <path d="M18 35 a14 13 0 0 1 28 0 c0 9 -6 14 -14 14 s-14 -5 -14 -14 Z" fill="#D7261E" />
      <ellipse cx="25" cy="40" rx="3" ry="5" fill="#fff" opacity="0.25" />
      <path d="M19 31 q5 -6 13 -5 q8 -1 13 5 q-6 3 -13 2 q-7 1 -13 -2 Z" fill="#F7D774" />
      <path d="M32 23 q1 -6 7 -8" stroke="#4E7A27" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
  kapchi: (
    <>
      <Plate />
      <circle cx="32" cy="33" r="18" fill="#F2D27A" />
      <circle cx="26" cy="27" r="5" fill="#F7E2A3" />
      <Mushroom x={27} y={33} />
      <Mushroom x={38} y={27} s={0.85} />
      <Mushroom x={37} y={40} s={0.9} />
      {[[21, 38], [44, 34], [31, 44], [33, 22]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#5E8C31" />
      ))}
    </>
  ),
  chiriuchu: (
    <>
      <Plate />
      <circle cx="23" cy="25" r="9" fill="#E8B04B" />
      <circle cx="23" cy="25" r="6" fill="#F0C46A" />
      <ellipse cx="39" cy="26" rx="11" ry="7" fill="#8B4A1F" transform="rotate(-15 39 26)" />
      <ellipse cx="36" cy="24" rx="4" ry="2" fill="#B5652E" />
      <ellipse cx="25" cy="41" rx="8" ry="6" fill="#E9C08A" />
      <rect x="35" y="37" width="9" height="8" rx="1.5" fill="#FFF3C4" />
      <path d="M14 33 q4 -3 7 0 t7 0" stroke="#3D5A2A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="43" r="4.5" fill="#D7261E" />
      <circle cx="47" cy="43" r="2" fill="#F7D774" />
      <rect x="31" y="46" width="11" height="3.5" rx="1.5" fill="#6B2E12" transform="rotate(-12 36 47)" />
    </>
  ),
  adobo: (
    <>
      <Plate />
      <circle cx="32" cy="32" r="21" fill="#7A2812" />
      <circle cx="32" cy="32" r="17.5" fill="#C2471B" />
      <rect x="22" y="25" width="8" height="7" rx="2" fill="#7E2E14" />
      <rect x="33" y="22" width="7" height="7" rx="2" fill="#8A3416" />
      <rect x="31" y="35" width="9" height="7" rx="2" fill="#7E2E14" />
      <rect x="21" y="35" width="7" height="6" rx="2" fill="#8A3416" />
      <circle cx="40" cy="31" r="3" fill="none" stroke="#FBEFE6" strokeWidth="1.2" opacity="0.8" />
      <circle cx="28" cy="33" r="2.4" fill="none" stroke="#FBEFE6" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="50" cy="50" rx="7" ry="5" fill="#E7B66F" />
    </>
  ),
  lechon: (
    <>
      <Plate />
      <rect x="13" y="19" width="27" height="19" rx="5" fill="#B8642A" />
      <path d="M17 22 v13 M22 22 v13 M27 22 v13 M32 22 v13" stroke="#8A4416" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M35 34 l14 -6 5 14 -14 6 Z" fill="#6B8E23" />
      <rect x="37" y="34" width="14" height="10" rx="3" fill="#E8C25A" transform="rotate(-22 44 39)" />
      <path d="M16 45 q5 -3 9 1 M19 49 q5 -3 10 0 M24 43 q4 -2 8 2" stroke="#8E3A7A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  trucha: (
    <>
      <Plate />
      <circle cx="22" cy="45" r="4.5" fill="#F3D9A4" />
      <circle cx="29" cy="48" r="4" fill="#E9C27E" />
      <circle cx="45" cy="45" r="5" fill="#7FB34E" />
      <path d="M44 28 l11 -8 v16 Z" fill="#B0742C" />
      <ellipse cx="30" cy="28" rx="16" ry="8.5" fill="#C98A3A" />
      <path d="M24 22 q3 6 0 12 M30 21 q3 7 0 14 M36 22 q3 6 0 12" stroke="#A86E2B" strokeWidth="1.3" fill="none" />
      <circle cx="18" cy="26" r="1.6" fill="#2B1A12" />
      <path d="M36 42 a7 7 0 0 1 12 -6 Z" fill="#F4D03F" />
    </>
  ),
  quinotto: (
    <>
      <Plate />
      <circle cx="32" cy="32" r="18" fill="#EBD9A8" />
      {[[24, 26], [30, 22], [38, 24], [42, 31], [25, 36], [33, 40], [40, 39], [28, 31]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#D4B776" />
      ))}
      <Mushroom x={30} y={32} cap="#A0703C" />
      <Mushroom x={39} y={36} s={0.8} cap="#A0703C" />
      <path d="M22 30 l3 -3 M24 40 l3 -2 M41 26 l-2 3" stroke="#4E8A2C" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  chicha: (
    <>
      <DrinkBase />
      <path d="M36 10 L33 30" stroke="#FFC21A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21 17 H43 L40 50 a3 3 0 0 1 -3 3 H27 a3 3 0 0 1 -3 -3 Z" fill="#5B1E5E" />
      <rect x="26" y="24" width="6" height="6" rx="1" fill="#fff" opacity="0.3" />
      <rect x="33" y="30" width="5" height="5" rx="1" fill="#fff" opacity="0.25" />
      <path d="M21 17 H43" stroke="#7A3A7E" strokeWidth="2" />
      <path d="M38 17 a6 6 0 0 1 10 -5" stroke="#F4D03F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ),
  mate: (
    <>
      <DrinkBase />
      <ellipse cx="32" cy="47" rx="21" ry="5.5" fill="#fff" stroke="#E0CDB5" />
      <path d="M44 30 a6 6 0 0 1 0 10" stroke="#fff" strokeWidth="3.5" fill="none" />
      <path d="M17 26 H45 V36 a11 11 0 0 1 -11 11 H28 a11 11 0 0 1 -11 -11 Z" fill="#fff" stroke="#E0CDB5" />
      <ellipse cx="31" cy="26" rx="14" ry="3.6" fill="#B5A642" />
      <ellipse cx="27" cy="26" rx="4" ry="1.6" fill="#4E7A27" transform="rotate(-20 27 26)" />
      <ellipse cx="35" cy="25.5" rx="3.6" ry="1.4" fill="#5E8C31" transform="rotate(25 35 25.5)" />
      <path d="M26 19 q-2 -3 0 -6 M32 18 q-2 -3 0 -6 M38 19 q-2 -3 0 -6" stroke="#C9B7A3" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  jora: (
    <>
      <DrinkBase />
      <rect x="22" y="14" width="20" height="39" rx="3" fill="#E8C46A" />
      <rect x="22" y="14" width="20" height="7" rx="3" fill="#FFF8E1" />
      <circle cx="28" cy="31" r="1.5" fill="#fff" opacity="0.6" />
      <circle cx="35" cy="38" r="1.2" fill="#fff" opacity="0.6" />
      <circle cx="30" cy="45" r="1" fill="#fff" opacity="0.6" />
      <rect x="25" y="22" width="3" height="27" rx="1.5" fill="#fff" opacity="0.25" />
    </>
  ),
  emoliente: (
    <>
      <DrinkBase />
      <path d="M41 26 a7 7 0 0 1 0 14" stroke="#C9B7A3" strokeWidth="3.5" fill="none" />
      <rect x="19" y="20" width="23" height="30" rx="4" fill="#8C6B1F" />
      <rect x="19" y="20" width="23" height="5" rx="2.5" fill="#A88530" />
      <circle cx="22" cy="20" r="6" fill="#F4D03F" stroke="#E2B917" strokeWidth="1.2" />
      <path d="M22 15 v10 M17 20 h10" stroke="#E2B917" strokeWidth="0.8" />
      <path d="M30 15 q-2 -3 0 -6 M36 15 q-2 -3 0 -6" stroke="#C9B7A3" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  picarones: (
    <>
      <Plate />
      {[[24, 26], [40, 28], [31, 41]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9.5" fill="#C67A2E" />
          <circle cx={x} cy={y} r="3.6" fill="#F6EEE3" />
        </g>
      ))}
      <path d="M15 31 q6 -6 12 0 t12 0 t12 0" stroke="#7A3E12" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.85" />
    </>
  ),
  mazamorra: (
    <>
      <Plate />
      <circle cx="32" cy="32" r="20" fill="#fff" stroke="#E0CDB5" />
      <circle cx="32" cy="32" r="16.5" fill="#5B1E5E" />
      <rect x="25" y="26" width="5" height="4" rx="1" fill="#F4A259" />
      <rect x="35" y="35" width="5" height="4" rx="1" fill="#F7D774" />
      <rect x="26" y="37" width="4" height="4" rx="1" fill="#F4A259" />
      {[[34, 26], [38, 30], [30, 33], [23, 33]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#C08A55" />
      ))}
      <rect x="36" y="21" width="12" height="3" rx="1.5" fill="#8B5A2B" transform="rotate(-30 42 22)" />
    </>
  ),
  arroz: (
    <>
      <Plate />
      <circle cx="32" cy="32" r="20" fill="#fff" stroke="#E0CDB5" />
      <circle cx="32" cy="32" r="16.5" fill="#F5E9D0" />
      {[[26, 27], [31, 24], [37, 27], [24, 34], [29, 31], [35, 33], [40, 36], [30, 39], [36, 40]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.8" ry="0.9" fill="#fff" />
      ))}
      {[[28, 28], [34, 30], [32, 36], [27, 36], [38, 32]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="#A0662B" />
      ))}
      <rect x="36" y="21" width="12" height="3" rx="1.5" fill="#8B5A2B" transform="rotate(-30 42 22)" />
    </>
  ),
}

export default function DishArt({ art, size = 64, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      {ARTS[art]}
    </svg>
  )
}
