import './Phone.css'

/**
 * Celular dibujado solo con CSS: marco, bordes redondeados, muesca y barra de estado.
 * Lo usan la carta, el chatbot, las apps de FLOX Apps y la demo Puma Fit.
 * - statusTone: color de fondo de la barra de estado (el de la cabecera de la app)
 * - statusText: 'light' (letras blancas) | 'dark' (letras oscuras, para apps claras)
 * - size: 'sm' (decorativo) | 'md' (por defecto) | 'lg' (demo grande)
 * - bareOnMobile: en pantallas angostas la app ocupa la pantalla, sin el marco del teléfono
 * - decorative: solo ilustración (se oculta a los lectores de pantalla)
 */
export default function Phone({
  statusTone = '#000',
  statusText = 'light',
  size = 'md',
  bareOnMobile = false,
  decorative = false,
  label,
  className = '',
  children,
}) {
  const classes = ['phone', `phone--${size}`, bareOnMobile && 'phone--bare-mobile', className].filter(Boolean).join(' ')
  const a11y = decorative ? { 'aria-hidden': true } : { role: 'group', 'aria-label': label }

  return (
    <div className={classes} {...a11y}>
      <span className="phone__button phone__button--power" aria-hidden="true" />
      <span className="phone__button phone__button--volume" aria-hidden="true" />
      <div
        className="phone__screen"
        style={{ '--status-bg': statusTone, '--status-fg': statusText === 'dark' ? '#111' : '#fff' }}
      >
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
