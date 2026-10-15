import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import TabBar from './components/TabBar.jsx'
import { TABS, tabId } from './tabs.js'
import Notification from './components/Notification.jsx'
import Bienvenida from './screens/Bienvenida.jsx'
import Inicio from './screens/Inicio.jsx'
import Clases from './screens/Clases.jsx'
import Rutina from './screens/Rutina.jsx'
import Progreso from './screens/Progreso.jsx'
import Perfil from './screens/Perfil.jsx'
import { GymContext } from './gymState.js'
import './gym.css'

// Fuentes de Puma Fit (se cargan solo donde aparece la app)
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap'

const SCREENS = { inicio: Inicio, clases: Clases, rutina: Rutina, progreso: Progreso, perfil: Perfil }

// Pantallas que se deslizan como en una app nativa: hacia la izquierda o la derecha
// según la pestaña a la que se va (con "reducir movimiento" solo cambian, sin deslizar).
const slide = {
  enter: (dir) => ({ x: `${dir * 100}%` }),
  center: { x: 0 },
  exit: (dir) => ({ x: `${dir * -100}%` }),
}
const slideTransition = { type: 'tween', duration: 0.34, ease: [0.32, 0.72, 0, 1] }

/**
 * La app Puma Fit. Recibe el estado (useGymStore) y la pestaña activa desde afuera,
 * para que la página de la demo pueda resaltar las notas de cada pantalla.
 */
export default function PumaFitApp({ gym, tab, onTabChange }) {
  useGoogleFonts('gym-fonts', FONTS_URL)
  const prefix = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const panelId = `${prefix}-panel`

  // Dirección del deslizamiento: hacia la derecha si la pestaña nueva está más a la derecha
  const [prevTab, setPrevTab] = useState(tab)
  const [dir, setDir] = useState(1)
  if (tab !== prevTab) {
    setDir(TABS.findIndex((t) => t.id === tab) > TABS.findIndex((t) => t.id === prevTab) ? 1 : -1)
    setPrevTab(tab)
  }

  // Notificación unos segundos después de entrar
  const [notice, setNotice] = useState(false)
  const [snack, setSnack] = useState(null)
  // Elemento raíz de la app: ahí se abren las hojas (sobre todas las pantallas)
  const [appEl, setAppEl] = useState(null)
  const { entered, nextClass } = gym

  useEffect(() => {
    if (!entered) return undefined
    const timer = setTimeout(() => setNotice(true), 3500)
    return () => clearTimeout(timer)
  }, [entered])

  useEffect(() => {
    if (!notice) return undefined
    const timer = setTimeout(() => setNotice(false), 6500)
    return () => clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (!snack) return undefined
    const timer = setTimeout(() => setSnack(null), 2400)
    return () => clearTimeout(timer)
  }, [snack])

  const go = useCallback((id) => onTabChange(id), [onTabChange])
  const toast = useCallback((text) => setSnack({ id: Date.now(), text }), [])
  const showNotice = useCallback(() => setNotice(true), [])

  // Al entrar, el foco pasa a la pantalla de inicio (sin mover la página)
  const enter = useCallback(() => {
    gym.enter()
    onTabChange('inicio')
    setTimeout(() => document.getElementById(panelId)?.focus({ preventScroll: true }), 450)
  }, [gym, onTabChange, panelId])

  const noticeContent = nextClass
    ? { title: `Tu clase de ${nextClass.name} empieza en 30 min`, text: `${nextClass.time} · ${nextClass.coach}. ¡No olvides tu toalla!` }
    : { title: 'Hay clases con cupos hoy', text: 'Reserva la tuya antes de que se llenen.' }

  const value = useMemo(() => ({ ...gym, enter, go, toast, showNotice, appEl }), [gym, enter, go, toast, showNotice, appEl])
  const Screen = SCREENS[tab] ?? Inicio

  return (
    <GymContext.Provider value={value}>
      <div ref={setAppEl} className={`gapp gapp--${gym.theme}`}>
        <AnimatePresence initial={false} mode="popLayout">
          {!entered ? (
            <motion.div
              key="bienvenida"
              className="gapp__welcome"
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.35 }}
            >
              <Bienvenida />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              className="gapp__main"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="gapp__screens">
                <AnimatePresence initial={false} custom={dir}>
                  <motion.section
                    key={tab}
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={tabId(prefix, tab)}
                    tabIndex={-1}
                    className="gscreen"
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                  >
                    <Screen />
                  </motion.section>
                </AnimatePresence>
              </div>
              <TabBar prefix={prefix} panelId={panelId} active={tab} onChange={go} />
            </motion.div>
          )}
        </AnimatePresence>

        {entered && (
          <Notification
            notice={notice ? noticeContent : null}
            onOpen={() => {
              setNotice(false)
              go('clases')
            }}
            onClose={() => setNotice(false)}
          />
        )}

        <div className="gsnack-region" role="status" aria-live="polite">
          <AnimatePresence>
            {snack && (
              <motion.p
                key={snack.id}
                className="gsnack"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                {snack.text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GymContext.Provider>
  )
}
