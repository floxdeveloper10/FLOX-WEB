import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import DemoBar from '../shared/DemoBar.jsx'
import SkipTarget from '../shared/SkipTarget.jsx'
import { resetPage } from '../../layout/resetPage.js'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import { local, session } from '../shared/safeStorage.js'
import AgenciaNav from './components/AgenciaNav.jsx'
import AgenciaFooter from './components/AgenciaFooter.jsx'
import FavoritesPanel from './components/FavoritesPanel.jsx'
import CartPanel from './components/CartPanel.jsx'
import Toast from './components/Toast.jsx'
import Inicio from './pages/Inicio.jsx'
import Tours from './pages/Tours.jsx'
import TourDetalle from './pages/TourDetalle.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Reserva from './pages/Reserva.jsx'
import ReservaConfirmada from './pages/ReservaConfirmada.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import { AgenciaContext } from './agenciaState.js'
import { text } from './agencia.text.js'
import { tours } from './agencia.data.js'
import { BASE, formatPrice, newKey } from './utils.js'
import './styles/agencia.css'
import './styles/nav.css'
import './styles/footer.css'
import { trackDemoOnce } from '../../lib/analytics.js'
import './styles/home.css'
import './styles/catalog.css'
import './styles/favorites.css'
import './styles/pages.css'
import './styles/detail.css'
import './styles/cart.css'
import './styles/checkout.css'
import './styles/print.css'

// Fuentes de la agencia (se cargan solo al entrar aquí)
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wght@800&family=Inter:wght@400;500;600;700&display=swap'

const PREFS_KEY = 'andes-ruta:preferencias' // idioma y moneda (durante la visita)
const FAVORITES_KEY = 'andes-ruta:favoritos' // favoritos (se guardan en el navegador)
const CART_KEY = 'andes-ruta:carrito' // carrito (se guarda en el navegador)
const validIds = new Set(tours.map((t) => t.id))

// Solo se cargan reservas del carrito con datos válidos
function loadCart() {
  const saved = local.get(CART_KEY, [])
  if (!Array.isArray(saved)) return []
  return saved.filter(
    (item) =>
      item &&
      typeof item.key === 'string' &&
      validIds.has(item.tourId) &&
      /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
      item.travelers?.adults >= 1 &&
      Array.isArray(item.extras),
  )
}

const pageMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

// Web de Andes Ruta Travel: proyecto demo con varias páginas e identidad propia.
export default function AgenciaSite() {
  useGoogleFonts('agencia-fonts', FONTS_URL)
  const liveLocation = useLocation()
  // Al salir de la agencia, FLOX la desvanece unos milisegundos: durante ese tiempo se
  // conserva la última dirección propia para que sus rutas internas no fallen.
  const [location, setLocation] = useState(liveLocation)
  if (liveLocation !== location && liveLocation.pathname.startsWith(BASE)) setLocation(liveLocation)
  const reduceMotion = useReducedMotion()
  const [prefs, setPrefs] = useState(() => {
    const saved = session.get(PREFS_KEY, {})
    return {
      lang: saved.lang === 'en' ? 'en' : 'es',
      currency: saved.currency === 'PEN' ? 'PEN' : 'USD',
    }
  })
  const [favorites, setFavorites] = useState(() => {
    const saved = local.get(FAVORITES_KEY, [])
    return Array.isArray(saved) ? saved.filter((id) => validIds.has(id)) : []
  })
  const [cart, setCart] = useState(loadCart)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const panelTrigger = useRef(null)

  useEffect(() => session.set(PREFS_KEY, prefs), [prefs])
  useEffect(() => local.set(FAVORITES_KEY, favorites), [favorites])
  useEffect(() => local.set(CART_KEY, cart), [cart])

  const { lang, currency } = prefs
  const t = text[lang]

  const toggleFavorite = useCallback(
    (id) => setFavorites((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    [],
  )

  // Paneles laterales: al cerrar, el foco vuelve al botón que los abrió
  const openFavorites = useCallback((trigger) => {
    panelTrigger.current = trigger ?? document.activeElement
    setFavoritesOpen(true)
  }, [])
  const openCart = useCallback((trigger) => {
    panelTrigger.current = trigger ?? document.activeElement
    setCartOpen(true)
  }, [])
  const closePanel = useCallback(() => {
    setFavoritesOpen(false)
    setCartOpen(false)
    requestAnimationFrame(() => panelTrigger.current?.focus?.({ preventScroll: true }))
  }, [])

  // Carrito: cada reserva guarda tour, fecha, viajeros y extras (el precio se calcula al mostrarla)
  const addToCart = useCallback((booking) => {
    trackDemoOnce('agencia', 'anadir-al-carrito')
    const key = newKey()
    setCart((items) => [...items, { key, ...booking }])
    return key
  }, [])
  const updateCartItem = useCallback((key, booking) => {
    setCart((items) => items.map((item) => (item.key === key ? { ...item, ...booking } : item)))
  }, [])
  const removeFromCart = useCallback((key) => setCart((items) => items.filter((item) => item.key !== key)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const showToast = useCallback((next) => setToast({ id: Date.now(), ...next }), [])
  const hideToast = useCallback(() => setToast(null), [])

  const value = useMemo(
    () => ({
      lang,
      currency,
      setLang: (l) => setPrefs((p) => ({ ...p, lang: l })),
      setCurrency: (c) => setPrefs((p) => ({ ...p, currency: c })),
      t,
      price: (usd, cur = currency) => formatPrice(usd, cur, t.locale),
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
      openFavorites,
      cart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      openCart,
      closeCart: closePanel,
      showToast,
      reduceMotion,
    }),
    [lang, currency, t, favorites, toggleFavorite, openFavorites, cart, addToCart, updateCartItem, removeFromCart, clearCart, openCart, closePanel, showToast, reduceMotion],
  )

  return (
    <AgenciaContext.Provider value={value}>
      <div className="agencia" lang={lang} data-origen="demo-agencia">
        <DemoBar message="Hola FLOX, vi la demo de Andes Ruta Travel y quiero una web así para mi agencia" />
        <AgenciaNav />
        <SkipTarget />
        {/* Cada página interna entra con un fundido; al cambiar de página se vuelve arriba */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={resetPage}>
          <motion.div key={location.pathname} className="ag-page" {...pageMotion}>
            <Routes location={location}>
              <Route index element={<Inicio />} />
              <Route path="tours" element={<Tours />} />
              <Route path="tours/:id" element={<TourDetalle />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="reserva" element={<Reserva />} />
              <Route path="reserva/confirmada" element={<ReservaConfirmada />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <AgenciaFooter />
        <FavoritesPanel open={favoritesOpen} onClose={closePanel} />
        <CartPanel open={cartOpen} onClose={closePanel} />
        <Toast toast={toast} onClose={hideToast} />
      </div>
    </AgenciaContext.Provider>
  )
}
