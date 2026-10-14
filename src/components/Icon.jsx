// Íconos de línea propios (24×24), heredan el color del texto.
const PATHS = {
  // Globo terráqueo: carta en varios idiomas
  idiomas: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  // Burbuja de chat con reloj: responder a tiempo
  chat: (
    <>
      <path d="M4 4h16v12H10l-6 4.5Z" />
      <circle cx="12" cy="10" r="3.4" />
      <path d="M12 8.4V10l1.1 1.1" />
    </>
  ),
  // Pin de mapa: aparecer en Google Maps
  mapa: (
    <>
      <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  flecha: <path d="M5 12h14m-5-5 5 5-5 5" />,
}

export default function Icon({ name, className = '', strokeWidth = 2 }) {
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
      className={`icon ${className}`.trim()}
    >
      {PATHS[name]}
    </svg>
  )
}
