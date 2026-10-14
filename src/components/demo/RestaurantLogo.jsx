// Logo de la Picantería Qhapaq (ficticia): una olla de barro con vapor bajo un sol.
export default function RestaurantLogo({ size = 40, className = '' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="20" cy="20" r="20" fill="#FFF1E0" />
      <circle cx="20" cy="13" r="5" fill="#F2A900" />
      <path d="M9 21h22l-2.5 9.5a3 3 0 0 1-2.9 2.3H14.4a3 3 0 0 1-2.9-2.3Z" fill="#A63A1C" />
      <rect x="7.5" y="19" width="25" height="3.4" rx="1.7" fill="#7A2812" />
      <path d="M15.5 26h9" stroke="#F2C9A0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
