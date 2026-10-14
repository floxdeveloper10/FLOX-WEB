import { forwardRef } from 'react'

// Botón de menú: tres líneas en SVG que se convierten en una X cuando está abierto.
const MenuButton = forwardRef(function MenuButton({ open, label, controls, onClick, className = '' }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={`menu-button ${open ? 'is-open' : ''} ${className}`.trim()}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={label}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path className="menu-button__line menu-button__line--top" d="M4 7h16" />
        <path className="menu-button__line menu-button__line--mid" d="M4 12h16" />
        <path className="menu-button__line menu-button__line--bot" d="M4 17h16" />
      </svg>
    </button>
  )
})

export default MenuButton
