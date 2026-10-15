import QIcon from './QIcon.jsx'

// Cantidad con botones − y + (min: con 0 se quita del carrito)
export default function Stepper({ value, onChange, min = 1, max = 20, label, size = 'md' }) {
  return (
    <div className={`qstep qstep--${size}`} role="group" aria-label={label}>
      <button type="button" className="qstep__btn" aria-label={`Quitar uno: ${label}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min && min > 0}>
        <QIcon name="minus" strokeWidth={2.5} />
      </button>
      <span className="qstep__value" aria-live="polite">
        {value}
      </span>
      <button type="button" className="qstep__btn" aria-label={`Agregar uno: ${label}`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <QIcon name="plus" strokeWidth={2.5} />
      </button>
    </div>
  )
}
