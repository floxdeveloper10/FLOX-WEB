// Íconos de línea de Stock Andino (24×24), heredan el color del texto.
const PATHS = {
  panel: (
    <>
      <rect x="3.5" y="3.5" width="7" height="8" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
      <rect x="3.5" y="14.5" width="7" height="6" rx="1.5" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 20 7v10l-8 4-8-4V7Z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </>
  ),
  swap: (
    <>
      <path d="M7 4v13M3.5 13.5 7 17l3.5-3.5" />
      <path d="M17 20V7M13.5 10.5 17 7l3.5 3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  report: (
    <>
      <path d="M6 3h9l4 4v14H6Z" />
      <path d="M15 3v4h4M9 17v-3M12 17v-6M15 17v-4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M7.5 8v8M10 8v8M13 8v8M16.5 8v8" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 18.5h15" />
    </>
  ),
  arrowIn: (
    <>
      <path d="M12 4v12M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  arrowOut: (
    <>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  back: <path d="M14.5 6 8.5 12l6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  alert: (
    <>
      <path d="M12 3.5 21 19.5H3Z" />
      <path d="M12 10v4M12 17v.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  money: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.5 9.5v.01M17.5 14.5v.01" />
    </>
  ),
  chat: (
    <>
      <path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7Z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3ZM14 9.5h4l3 3.5v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  chevron: <path d="m9.5 6 6 6-6 6" />,
}

export default function IIcon({ name, className = '', strokeWidth = 2 }) {
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
      className={`iicon ${className}`.trim()}
    >
      {PATHS[name]}
    </svg>
  )
}
