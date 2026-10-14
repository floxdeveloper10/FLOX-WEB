// Íconos pequeños de la carta (24×24, de línea, heredan el color).
const PATHS = {
  // Categorías
  entradas: (
    <>
      <path d="M3.5 12h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M12 12c0-4.2 2.3-7 6.5-8-0.4 4.3-2.7 7.2-6.5 8Z" />
      <path d="M9.5 12c-.3-2.6-1.8-4.5-4.5-5 .2 2.7 1.6 4.4 4.5 5Z" />
    </>
  ),
  fondo: (
    <>
      <path d="M2.5 18.5h19" />
      <path d="M4.5 18.5a7.5 7.5 0 0 1 15 0" />
      <path d="M12 11V8.5M10.5 8.5h3" />
    </>
  ),
  bebidas: (
    <>
      <path d="M6.5 7h11l-1.6 13.2a1 1 0 0 1-1 .8H9.1a1 1 0 0 1-1-.8Z" />
      <path d="M13 7l2.2-4.5" />
      <path d="M7.2 12.5h9.6" />
    </>
  ),
  postres: (
    <>
      <path d="M5.5 12.5h13l-1.7 7.7a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8Z" />
      <path d="M5.5 12.5a6.5 6.5 0 0 1 13 0" />
      <path d="M12 6V3.5" />
    </>
  ),
  // Información
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.8-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 11 10 5 19 5c0 9-6 14-14 14Z" />
      <path d="M5 19l7-7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  bag: (
    <>
      <path d="M5 8h14l-1 12H6Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
}

export default function MenuIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`micon ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}

// Estrella rellena (calificación)
export function StarIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`micon ${className}`.trim()} aria-hidden="true" focusable="false">
      <path d="m12 2.8 2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17l-5.7 3.1 1.2-6.3L2.9 9.4l6.3-.8Z" fill="#F2A900" />
    </svg>
  )
}

// Ají (nivel de picante)
export function ChiliIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 16 16" className={`chili ${className}`.trim()} aria-hidden="true" focusable="false">
      <path d="M3.6 14.2C9 14.2 12.6 10.2 12.6 6.4c0-1-.6-1.8-1.5-1.8-.8 0-1.3.6-1.5 1.4-.6 3.1-2.9 5.6-6.2 6.4-.9.3-.7 1.8.2 1.8Z" fill="#D7261E" />
      <path d="M11.2 4.6c0-1.3.6-2.3 1.9-2.7" stroke="#4E7A27" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
