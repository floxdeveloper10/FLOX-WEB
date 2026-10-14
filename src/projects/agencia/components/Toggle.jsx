// Selector de dos opciones (ES/EN, USD/PEN)
export default function Toggle({ label, options, value, onChange, className = '' }) {
  return (
    <div className={`a-toggle ${className}`.trim()} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="a-toggle__btn"
          aria-pressed={value === o.id}
          aria-label={o.name}
          lang={o.lang}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
