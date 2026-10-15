import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DishArt from '../../../components/demo/menu/DishArt.jsx'
import QIcon from '../components/QIcon.jsx'
import Inicio from './Inicio.jsx'
import PlatoDetalle from './PlatoDetalle.jsx'
import Carrito from './Carrito.jsx'
import Seguimiento from './Seguimiento.jsx'
import MisPedidos from './MisPedidos.jsx'
import { usePedidosContext } from '../pedidosState.js'

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'carrito', label: 'Carrito', icon: 'cart' },
  { id: 'pedidos', label: 'Mis pedidos', icon: 'receipt' },
]
// Orden para saber hacia dónde deslizar: el detalle y el seguimiento entran desde la derecha
const RANK = { inicio: 0, carrito: 1, pedidos: 2, plato: 5, seguimiento: 6 }
const viewKey = (v) => `${v.name}-${v.id ?? ''}`

const slide = {
  enter: (dir) => ({ x: `${dir * 100}%` }),
  center: { x: 0 },
  exit: (dir) => ({ x: `${dir * -35}%`, opacity: 0.4 }),
}

/**
 * App del cliente de Qhapaq Pedidos. La pantalla actual (view) la controla la página,
 * para resaltar las notas laterales. view: { name, id? }
 */
export default function ClienteApp({ view, onViewChange }) {
  const { cart } = usePedidosContext()
  const rootRef = useRef(null)
  const [flying, setFlying] = useState(null)

  // Dirección del deslizamiento según la pantalla de destino
  const key = viewKey(view)
  const [prevKey, setPrevKey] = useState(key)
  const [prevName, setPrevName] = useState(view.name)
  const [dir, setDir] = useState(1)
  if (key !== prevKey) {
    setDir(RANK[view.name] >= RANK[prevName] ? 1 : -1)
    setPrevKey(key)
    setPrevName(view.name)
  }

  const go = useCallback((name, id) => onViewChange({ name, id }), [onViewChange])

  // El plato "vuela" desde su ilustración hasta el ícono del carrito
  const fly = useCallback((art, fromEl) => {
    const root = rootRef.current
    const target = root?.querySelector('[data-cart-target]')
    if (!root || !fromEl || !target) return
    const r = root.getBoundingClientRect()
    const a = fromEl.getBoundingClientRect()
    const b = target.getBoundingClientRect()
    setFlying({
      id: Date.now(),
      art,
      from: { x: a.left - r.left + a.width / 2 - 36, y: a.top - r.top + a.height / 2 - 36 },
      to: { x: b.left - r.left + b.width / 2 - 36, y: b.top - r.top + b.height / 2 - 36 },
    })
  }, [])

  const count = cart.reduce((n, it) => n + it.qty, 0)
  const activeTab = TABS.some((t) => t.id === view.name) ? view.name : view.name === 'seguimiento' ? 'pedidos' : 'inicio'

  let screen
  if (view.name === 'plato') screen = <PlatoDetalle dishId={view.id} go={go} fly={fly} />
  else if (view.name === 'carrito') screen = <Carrito go={go} />
  else if (view.name === 'seguimiento') screen = <Seguimiento orderId={view.id} go={go} />
  else if (view.name === 'pedidos') screen = <MisPedidos go={go} />
  else screen = <Inicio go={go} fly={fly} />

  return (
    <div ref={rootRef} className="qapp qapp--cliente">
      <div className="qapp__screens">
        <AnimatePresence initial={false} custom={dir}>
          <motion.section
            key={key}
            className="qscreen"
            aria-label={TABS.find((t) => t.id === view.name)?.label ?? (view.name === 'plato' ? 'Detalle del plato' : 'Seguimiento del pedido')}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {screen}
          </motion.section>
        </AnimatePresence>
      </div>

      <nav className="qtabs" aria-label="Secciones de la app del cliente">
        {TABS.map((tab) => {
          const active = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              className={`qtabs__tab ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
              aria-label={tab.id === 'carrito' && count ? `${tab.label}, ${count} ${count === 1 ? 'plato' : 'platos'}` : tab.label}
              onClick={() => go(tab.id)}
            >
              <span className="qtabs__icon" {...(tab.id === 'carrito' ? { 'data-cart-target': true } : {})}>
                <QIcon name={tab.icon} />
                {tab.id === 'carrito' && count > 0 && (
                  <motion.span key={count} className="qtabs__badge" initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 600, damping: 18 }}>
                    {count}
                  </motion.span>
                )}
              </span>
              <span aria-hidden="true">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      <AnimatePresence>
        {flying && (
          <motion.div
            key={flying.id}
            className="qfly"
            aria-hidden="true"
            initial={{ x: flying.from.x, y: flying.from.y, scale: 1, opacity: 1 }}
            animate={{ x: [flying.from.x, (flying.from.x + flying.to.x) / 2, flying.to.x], y: [flying.from.y, flying.from.y - 60, flying.to.y], scale: [1, 0.8, 0.3], opacity: [1, 1, 0.7] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeIn' }}
            onAnimationComplete={() => setFlying(null)}
          >
            <DishArt art={flying.art} size={72} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
