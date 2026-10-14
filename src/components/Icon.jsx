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
  // Pin sobre montañas: somos de Cusco y te visitamos
  visita: (
    <>
      <path d="M2.5 21l5.5-8 3.5 4.5 2.5-3 7.5 6.5Z" />
      <path d="M15 10.5s-3.5-3.1-3.5-5.6a3.5 3.5 0 0 1 7 0c0 2.5-3.5 5.6-3.5 5.6Z" />
      <circle cx="15" cy="4.9" r="0.6" />
    </>
  ),
  // Burbuja con texto simple: sin términos técnicos
  simple: (
    <>
      <path d="M4 4.5h16v11H11l-5 4v-4H4Z" />
      <path d="M8 8.5h8M8 11.5h5" />
    </>
  ),
  // Salvavidas: soporte
  soporte: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="m5.6 5.6 3.7 3.7M14.7 14.7l3.7 3.7M18.4 5.6l-3.7 3.7M9.3 14.7l-3.7 3.7" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  // Valores (Nosotros)
  cercania: (
    <>
      <circle cx="8" cy="7.5" r="3" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M2.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M13.5 15.2a4.5 4.5 0 0 1 8 3.3" />
    </>
  ),
  simplicidad: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 8.5 13.2 11l2.3 1-2.3 1L12 15.5 10.8 13l-2.3-1 2.3-1Z" />
    </>
  ),
  resultados: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M5 16l4.5-4.5 3.5 3L19.5 8" />
      <path d="M15 8h4.5v4.5" />
    </>
  ),
  andino: (
    <>
      <path d="M9.5 3h5v3h3v3h3v6h-3v3h-3v3h-5v-3h-3v-3h-3V9h3V6h3Z" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
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
