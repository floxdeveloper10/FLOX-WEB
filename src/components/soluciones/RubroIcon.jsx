// Íconos de los rubros (24×24, de línea, heredan el color del texto)
const PATHS = {
  // Plato con cubiertos
  plato: (
    <>
      <circle cx="12.5" cy="12.5" r="6.5" />
      <circle cx="12.5" cy="12.5" r="3.2" />
      <path d="M3 3.5v6M3 6.5h1.6M4.6 3.5v6M3.8 9.5v11M21.5 3.5c-1.6 1-2 3-2 5h2v12" />
    </>
  ),
  // Cama
  cama: (
    <>
      <path d="M2.5 18.5V6M2.5 13.5h19v5M21.5 13.5v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="10.5" r="2" />
      <path d="M2.5 18.5v1.5M21.5 18.5v1.5" />
    </>
  ),
  // Mochila con montaña
  mochila: (
    <>
      <path d="M6 8.5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z" />
      <path d="M9.5 4.5V3h5v1.5" />
      <path d="m8.5 17 2.5-3.5 1.5 2 1.5-1.5 1.5 3" />
    </>
  ),
  // Bolsa de compras
  bolsa: (
    <>
      <path d="M5 8h14l-1 12.5H6Z" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </>
  ),
  // Pesa
  pesa: (
    <>
      <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5" />
      <path d="M6.5 12h11" />
    </>
  ),
  // Calendario con cruz (consultorios y servicios con cita)
  cita: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M12 12.5v5M9.5 15h5" />
    </>
  ),
}

export default function RubroIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
