// Íconos de línea del hotel (24×24, heredan el color).
const PATHS = {
  bed: (
    <>
      <path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="1.6" />
    </>
  ),
  queen: (
    <>
      <path d="M3 19V7M21 19v-5M3 15h18" />
      <path d="M3 12h4.5a1.5 1.5 0 0 1 1.5 1.5V15M9.5 12H14a1.5 1.5 0 0 1 1.5 1.5V15" />
      <path d="M21 14a3 3 0 0 0-3-3h-1" />
    </>
  ),
  twin: (
    <>
      <path d="M2 18V9M2 15h8v3M10 15v-2a2 2 0 0 0-2-2H5v4" />
      <path d="M14 18V9M14 15h8v3M22 15v-2a2 2 0 0 0-2-2h-3v4" />
    </>
  ),
  king: (
    <>
      <path d="M2.5 19V6.5M21.5 19V6.5M2.5 15h19" />
      <path d="M2.5 9.5h19" opacity="0.6" />
      <path d="M5 15v-2.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V15M12 15v-2.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V15" />
    </>
  ),
  shower: (
    <>
      <path d="M5 21V6a3 3 0 0 1 6 0v1" />
      <path d="M8 7h7" />
      <path d="M10 11v.01M13 11v.01M16 11v.01M11.5 14v.01M14.5 14v.01M13 17v.01" />
    </>
  ),
  tub: (
    <>
      <path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
      <path d="M6 12V5.5A2.5 2.5 0 0 1 8.5 3 2.5 2.5 0 0 1 11 5.5M7 19l-1 2M17 19l1 2" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0" />
      <path d="M12 19.5v.01" />
    </>
  ),
  heating: (
    <>
      <path d="M8 21c-2-2.5-2-4.5 0-7s2-4.5 0-7" />
      <path d="M12 21c-2-2.5-2-4.5 0-7s2-4.5 0-7M16 21c-2-2.5-2-4.5 0-7s2-4.5 0-7" />
    </>
  ),
  view: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  balcony: (
    <>
      <path d="M6 12V5a6 6 0 0 1 12 0v7" />
      <path d="M3 12h18M5 12v9M9 12v9M12 12v9M15 12v9M19 12v9M3 21h18" />
    </>
  ),
  guests: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.3a3 3 0 0 1 0 5.4M18 14.2A5.5 5.5 0 0 1 21 19" />
    </>
  ),
  size: (
    <>
      <path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M10.5 21l2-6-2.5-2.5 1-5 3.5 3.5h3M8 12l1.5-4.5M13 15l2.5 6" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v-4l2-5h12l2 5v4Z" />
      <path d="M4 12h16M4 16v2.5M20 16v2.5" />
      <circle cx="8" cy="14" r="0.6" />
      <circle cx="16" cy="14" r="0.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  // Redes (ficticias en la demo)
  facebook: <path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8H17.6V3a24 24 0 0 0-2.7-.2C12.3 2.8 10.5 4.4 10.5 7.4v2.1h-3V13h3v8" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7v.01" />
    </>
  ),
  tripadvisor: (
    <>
      <circle cx="7" cy="13.5" r="3.5" />
      <circle cx="17" cy="13.5" r="3.5" />
      <path d="M3 9.5h18M7 13.5v.01M17 13.5v.01M10.5 13.5 12 16l1.5-2.5M5 9.5a9 9 0 0 1 14 0" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  prev: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 5l7 7-7 7" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
}

export default function HotelIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`hicon ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
