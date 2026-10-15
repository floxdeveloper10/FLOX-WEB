// Íconos de línea de Qhapaq Pedidos (24×24), heredan el color del texto.
const PATHS = {
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v11h13V9" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2 11h11l2-8H6.5" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21Z" />
      <path d="M9 8h6M9 11.5h6M9 15h3" />
    </>
  ),
  pot: (
    <>
      <path d="M4 11h16l-1.6 7.2a2.5 2.5 0 0 1-2.4 1.8H8a2.5 2.5 0 0 1-2.4-1.8Z" />
      <path d="M2.5 11h19M9 7.5c0-1.5 1-1.5 1-3M14 7.5c0-1.5 1-1.5 1-3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17h5l3-6h3l1 6M10 11h4M15 7.5h2.5" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.5 4h13L20 9.5" />
      <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
      <path d="M5.5 11.5V20h13v-8.5M10 20v-4.5h4V20" />
    </>
  ),
  table: (
    <>
      <path d="M3 9h18M5.5 9v11M18.5 9v11M7 14h10" />
      <path d="M8 9V5.5M16 9V5.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  back: <path d="M14.5 6 8.5 12l6 6" />,
  chevron: <path d="m9.5 6 6 6-6 6" />,
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  mute: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  spark: <path d="M12 3.5 13.8 9l5.7 1.5-5.7 1.6L12 17.5l-1.8-5.4-5.7-1.6L10.2 9Z" />,
  note: (
    <>
      <path d="M5 4h14v11l-5 5H5Z" />
      <path d="M14 20v-5h5M8.5 9h7M8.5 12.5h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  repeat: (
    <>
      <path d="M4.5 12a7.5 7.5 0 0 1 13-5l2 2" />
      <path d="M19.5 4v5h-5" />
      <path d="M19.5 12a7.5 7.5 0 0 1-13 5l-2-2" />
      <path d="M4.5 20v-5h5" />
    </>
  ),
}

export default function QIcon({ name, className = '', strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`qicon ${className}`.trim()}
    >
      {PATHS[name]}
    </svg>
  )
}
