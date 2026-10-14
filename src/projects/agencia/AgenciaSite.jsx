import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import DemoBar from '../shared/DemoBar.jsx'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import { local, session } from '../shared/safeStorage.js'
import AgenciaNav from './components/AgenciaNav.jsx'
import AgenciaFooter from './components/AgenciaFooter.jsx'
import FavoritesPanel from './components/FavoritesPanel.jsx'
import Inicio from './pages/Inicio.jsx'
import Tours from './pages/Tours.jsx'
import TourDetalle from './pages/TourDetalle.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import { AgenciaContext } from './agenciaState.js'
import { text } from './agencia.text.js'
import { tours } from './agencia.data.js'
import { BASE, formatPrice } from './utils.js'
import './styles/agencia.css'
import './styles/nav.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/catalog.css'
import './styles/favorites.css'
import './styles/pages.css'

// Fuentes de la agencia (se cargan solo al entrar aquí)
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wght@800&family=Inter:wght@400;500;600;700&display=swap'

const PREFS_KEY = 'andes-ruta:preferencias' // idioma y moneda (durante la visita)
const FAVORITES_KEY = 'andes-ruta:favoritos' // favoritos (se guardan en el navegador)
const validIds = new Set(tours.map((t) => t.id))

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
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const favoritesTrigger = useRef(null)

  useEffect(() => session.set(PREFS_KEY, prefs), [prefs])
  useEffect(() => local.set(FAVORITES_KEY, favorites), [favorites])

  const { lang, currency } = prefs
  const t = text[lang]

  const toggleFavorite = useCallback(
    (id) => setFavorites((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    [],
  )

  const openFavorites = useCallback((trigger) => {
    favoritesTrigger.current = trigger ?? document.activeElement
    setFavoritesOpen(true)
  }, [])

  const closeFavorites = useCallback(() => {
    setFavoritesOpen(false)
    requestAnimationFrame(() => favoritesTrigger.current?.focus?.({ preventScroll: true }))
  }, [])

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
      reduceMotion,
    }),
    [lang, currency, t, favorites, toggleFavorite, openFavorites, reduceMotion],
  )

  return (
    <AgenciaContext.Provider value={value}>
      <div className="agencia" lang={lang}>
        <DemoBar message="Hola FLOX, vi la demo de Andes Ruta Travel y quiero una web así para mi agencia" />
        <AgenciaNav />
        {/* Cada página interna entra con un fundido; al cambiar de página se vuelve arriba */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <motion.div key={location.pathname} className="ag-page" {...pageMotion}>
            <Routes location={location}>
              <Route index element={<Inicio />} />
              <Route path="tours" element={<Tours />} />
              <Route path="tours/:id" element={<TourDetalle />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="*" element={<NoEncontrado />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <AgenciaFooter />
        <FavoritesPanel open={favoritesOpen} onClose={closeFavorites} />
      </div>
    </AgenciaContext.Provider>
  )
}
