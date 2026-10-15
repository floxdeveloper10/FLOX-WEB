// Anillo circular de progreso (0 a 1). El contenido va al centro.
export default function ProgressRing({ value, size = 96, stroke = 9, className = '', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.min(1, Math.max(0, value))

  return (
    <div className={`gring ${className}`.trim()} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--g-track)" strokeWidth={stroke} />
        <circle
          className="gring__bar"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--g-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="gring__center">{children}</div>
    </div>
  )
}
