// Selector de dos opciones (ES/EN, US$/S/). tone: 'light' (sobre azul) | 'dark' (sobre claro)
export default function Toggle({ label, options, value, onChange, tone = 'light' }) {
  return (
    <div className={`h-toggle ${tone === 'dark' ? 'h-toggle--dark' : ''}`} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className="h-toggle__btn"
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
