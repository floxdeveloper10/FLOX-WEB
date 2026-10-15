import './Tablet.css'

/**
 * Tablet en horizontal dibujada con CSS: marco, cámara y barra de estado.
 * - statusTone / statusText: color de la barra de estado ('light' = letras blancas)
 * - bareOnMobile: en pantallas angostas la app ocupa la pantalla, sin el marco
 */
export default function Tablet({ statusTone = '#000', statusText = 'light', bareOnMobile = false, label, className = '', children }) {
  const classes = ['tablet', bareOnMobile && 'tablet--bare-mobile', className].filter(Boolean).join(' ')
  return (
    <div className={classes} role="group" aria-label={label}>
      <span className="tablet__camera" aria-hidden="true" />
      <div className="tablet__screen" style={{ '--status-bg': statusTone, '--status-fg': statusText === 'dark' ? '#111' : '#fff' }}>
        <div className="tablet__status" aria-hidden="true">
          <span>9:41</span>
          <span>mié. 15 oct.</span>
          <span className="tablet__status-icons">
            <span>Wi-Fi</span>
            <i className="tablet__battery" />
          </span>
        </div>
        <div className="tablet__app">{children}</div>
      </div>
    </div>
  )
}
