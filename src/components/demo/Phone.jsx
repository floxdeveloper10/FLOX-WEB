import './Phone.css'

// Celular dibujado solo con CSS: marco, bordes redondeados, muesca y barra de estado.
// statusTone: color de fondo de la barra de estado (el de la cabecera de la app).
export default function Phone({ statusTone = '#000', label, children }) {
  return (
    <div className="phone" role="group" aria-label={label}>
      <span className="phone__button phone__button--power" aria-hidden="true" />
      <span className="phone__button phone__button--volume" aria-hidden="true" />
      <div className="phone__screen" style={{ '--status-bg': statusTone }}>
        <div className="phone__status" aria-hidden="true">
          <span>9:41</span>
          <span className="phone__notch" />
          <span className="phone__status-icons">
            <i className="phone__signal" />
            <i className="phone__battery" />
          </span>
        </div>
        <div className="phone__app">{children}</div>
      </div>
    </div>
  )
}
