// Íconos de línea de la página FLOX Apps (24×24), heredan el color del texto.
const PATHS = {
  gym: (
    <>
      <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5" />
      <path d="M6.5 12h11" />
    </>
  ),
  food: (
    <>
      <path d="M3.5 14h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M12 10.5V9M8.5 7.5c0-1.5 1-1.5 1-3M14.5 7.5c0-1.5 1-1.5 1-3" />
      <path d="M2.5 14h19" />
    </>
  ),
  boxes: (
    <>
      <path d="M3.5 12.5h8v8h-8ZM12.5 12.5h8v8h-8ZM8 4.5h8v8H8Z" />
      <path d="M6.5 12.5v2.5M15.5 12.5v2.5M11 4.5V7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12.5H6Z" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.8 9l5.7 1.5-5.7 1.6L12 17.5l-1.8-5.4-5.7-1.6L10.2 9Z" />
      <path d="M18.5 16v4M16.5 18h4M5 4v3M3.5 5.5h3" />
    </>
  ),
  idea: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3.5Z" />
    </>
  ),
  design: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M9.5 6.5h5M9.5 9.5h5M9.5 12.5h3" />
      <path d="M11 18.5h2" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4.5 4 4.5 4M15.5 8l4.5 4-4.5 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15.5 8.5 12c1.5-4.5 4.5-7.5 11-8.5-1 6.5-4 9.5-7.5 12Z" />
      <path d="M8.5 12 5 11.5l2.5-3h4M12 15.5l.5 3.5 3-2.5v-4" />
      <path d="M6.5 17.5 4 20" />
      <circle cx="15" cy="9" r="1.4" />
    </>
  ),
  chevron: <path d="m6 9.5 6 6 6-6" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
}

export default function AppsIcon({ name, className = '', strokeWidth = 2 }) {
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
