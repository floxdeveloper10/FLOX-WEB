import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import IIcon from './components/IIcon.jsx'
import StockLogo from './components/StockLogo.jsx'
import Panel from './screens/Panel.jsx'
import Productos from './screens/Productos.jsx'
import Ficha from './screens/Ficha.jsx'
import Movimiento from './screens/Movimiento.jsx'
import Alertas from './screens/Alertas.jsx'
import Reportes from './screens/Reportes.jsx'
import NuevoProducto from './screens/NuevoProducto.jsx'
import { InvContext } from './invState.js'
import { business } from './inventario.data.js'
import './inventario.css'

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'

// Menú: lateral en la tablet, barra inferior en el teléfono ("Agregar producto" solo en el lateral;
// en el teléfono está en Productos)
const NAV = [
  { id: 'panel', label: 'Panel', icon: 'panel' },
  { id: 'productos', label: 'Productos', icon: 'box' },
  { id: 'movimiento', label: 'Registrar', icon: 'swap' },
  { id: 'alertas', label: 'Alertas', icon: 'bell' },
  { id: 'reportes', label: 'Reportes', icon: 'report' },
  { id: 'nuevo', label: 'Agregar producto', icon: 'plus', sideOnly: true },
]
const SECTION_OF = { ficha: 'productos', nuevo: 'nuevo' }

/**
 * App Stock Andino. Se adapta al espacio que tiene (container queries):
 * en la tablet muestra el menú lateral; en el teléfono, la barra inferior.
 * screen: { name, ...parámetros } — lo controla la página para resaltar las notas.
 */
export default function InventarioApp({ inv, screen, onScreenChange }) {
  useGoogleFonts('stock-fonts', FONTS_URL)
  const [toastMsg, setToastMsg] = useState(null)

  useEffect(() => {
    if (!toastMsg) return undefined
    const timer = setTimeout(() => setToastMsg(null), 4200)
    return () => clearTimeout(timer)
  }, [toastMsg])

  const go = useCallback((name, params = {}) => onScreenChange({ name, ...params }), [onScreenChange])
  const toast = useCallback((t) => setToastMsg({ id: Date.now(), ...t }), [])
  const value = useMemo(() => ({ ...inv, go, toast, screen }), [inv, go, toast, screen])

  const section = SECTION_OF[screen.name] ?? screen.name
  const alertCount = inv.stats.alerts.length

  let content
  if (screen.name === 'productos') content = <Productos />
  else if (screen.name === 'ficha') content = <Ficha code={screen.code} />
  else if (screen.name === 'movimiento') content = <Movimiento preset={screen.code ? { code: screen.code, type: screen.type } : null} />
  else if (screen.name === 'alertas') content = <Alertas />
  else if (screen.name === 'reportes') content = <Reportes />
  else if (screen.name === 'nuevo') content = <NuevoProducto />
  else content = <Panel />

  const navButtons = (where) =>
    NAV.filter((item) => where === 'side' || !item.sideOnly).map((item) => {
      const active = item.id === section
      return (
        <button
          key={item.id}
          type="button"
          className={`inav__item ${active ? 'is-active' : ''}`}
          aria-current={active ? 'page' : undefined}
          aria-label={item.id === 'alertas' && alertCount ? `${item.label}, ${alertCount} productos` : item.label}
          onClick={() => go(item.id)}
        >
          <span className="inav__icon">
            <IIcon name={item.icon} />
            {item.id === 'alertas' && alertCount > 0 && (
              <motion.span key={alertCount} className="inav__badge" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 600, damping: 18 }}>
                {alertCount}
              </motion.span>
            )}
          </span>
          <span className="inav__label" aria-hidden="true">
            {item.label}
          </span>
        </button>
      )
    })

  return (
    <InvContext.Provider value={value}>
      <div className="iapp">
        <div className="iapp__layout">
          <nav className="inav inav--side" aria-label="Secciones de Stock Andino">
            <div className="inav__brand">
              <StockLogo size={34} />
              <span>
                <strong>{business.name}</strong>
                <small>{business.store}</small>
              </span>
            </div>
            {navButtons('side')}
          </nav>

          <div className="iapp__body">
            <div className="itop-bar">
              <StockLogo size={28} />
              <strong>{business.name}</strong>
            </div>
            <div className="iapp__screens">
              <AnimatePresence mode="wait" initial={false}>
                <motion.section
                  key={`${screen.name}-${screen.code ?? ''}`}
                  className="iscreen"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                >
                  {content}
                </motion.section>
              </AnimatePresence>
            </div>
            <nav className="inav inav--bottom" aria-label="Secciones de Stock Andino">
              {navButtons('bottom')}
            </nav>
          </div>
        </div>

        <div className="itoast-region" role="status" aria-live="polite">
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                key={toastMsg.id}
                className={`itoast itoast--${toastMsg.tone ?? 'ok'}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <IIcon name={toastMsg.tone === 'ok' ? 'check' : 'alert'} />
                <span className="itoast__text">{toastMsg.text}</span>
                {toastMsg.action && (
                  <button
                    type="button"
                    className="itoast__action"
                    onClick={() => {
                      go(toastMsg.action.to)
                      setToastMsg(null)
                    }}
                  >
                    {toastMsg.action.label}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </InvContext.Provider>
  )
}
