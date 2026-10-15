// Logo de Stock Andino: una caja con una montaña en su cara frontal
export default function StockLogo({ size = 36, className = '', title }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d="M24 4 42 13v22L24 44 6 35V13Z" fill="#0E4C5A" />
      <path d="M24 4 42 13 24 22 6 13Z" fill="#1B6F80" />
      <path d="M24 22v22L6 35V13Z" fill="#0A3A45" />
      <path d="M9 33.5 15 23l3.5 5 2.5-3.5 3 4.6v6.6Z" fill="#F2A93B" />
      <path d="m15 23 1.6 2.6-1.6-.6-1.4 1Z" fill="#fff" />
      <path d="M24 22 42 13" stroke="#5FB3C2" strokeWidth="1.2" />
    </svg>
  )
}
