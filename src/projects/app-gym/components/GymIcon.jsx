// Íconos de línea de Puma Fit (24×24), heredan el color del texto.
const PATHS = {
  home: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v11h13V9" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8 14h2M14 14h2M8 17h2" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5" />
      <path d="M6.5 12h11" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M5 16l4.5-5 3.5 3 6-7" />
      <circle cx="19" cy="7" r="1.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15Z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  flame: <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.6-5.3 3.6-8.3.9 1.6 1.6 2.6 2.9 3.2.2-2.8 1.4-5 3.5-6.7-.2 3 2.9 5.8 2.9 9.6C18.4 18.3 15.9 21 12 21Z" />,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.8l-5.3 2.8 1.1-5.8-4.3-4.1 5.9-.8Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </>
  ),
  moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
  mountain: (
    <>
      <path d="M2.5 20 9 9l3.5 5.5L15 11l6.5 9Z" />
      <path d="m7.4 11.8 1.6 1.2 1.4-1.6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 6M17.5 14.4a5.5 5.5 0 0 1 3 5.1" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5Z" />,
  pause: <path d="M8 5.5v13M16 5.5v13" />,
  reset: (
    <>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 4v4h4" />
    </>
  ),
  chevron: <path d="m9.5 6 6 6-6 6" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  chat: (
    <>
      <path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7Z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4.5H6.5v15H14" />
      <path d="M10.5 12h10m-3.5-3.5L20.5 12 17 15.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.3-7-11.5a7 7 0 0 1 14 0c0 5.2-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
}

export default function GymIcon({ name, className = '', strokeWidth = 2 }) {
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
      className={`gicon ${className}`.trim()}
    >
      {PATHS[name]}
    </svg>
  )
}
