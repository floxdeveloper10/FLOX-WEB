import { useCallback, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import DemoBar from '../shared/DemoBar.jsx'
import SkipTarget from '../shared/SkipTarget.jsx'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import HotelNav from './components/HotelNav.jsx'
import HotelHero from './components/HotelHero.jsx'
import Rooms from './components/Rooms.jsx'
import BookingPanel from './components/BookingPanel.jsx'
import Experiences from './components/Experiences.jsx'
import Gallery from './components/Gallery.jsx'
import Location from './components/Location.jsx'
import HotelFooter from './components/HotelFooter.jsx'
import { HotelContext } from './hotelState.js'
import { rooms, text } from './hotel.data.js'
import { addDays, formatPrice, todayISO } from './utils.js'
import './hotel.css'

// Fuentes del hotel (se cargan solo al entrar aquí)
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap'

// Web del Hotel Killa Wasi: proyecto demo con identidad propia, distinta de FLOX.
export default function HotelSite() {
  useGoogleFonts('hotel-fonts', FONTS_URL)
  const reduceMotion = useReducedMotion()
  const [lang, setLang] = useState('es')
  const [currency, setCurrency] = useState('USD')
  // Fechas de ejemplo: dentro de dos semanas, 3 noches
  const [search, setSearch] = useState(() => {
    const checkIn = addDays(todayISO(), 14)
    return { checkIn, checkOut: addDays(checkIn, 3), guests: 2 }
  })
  const [searched, setSearched] = useState(false)
  const [bookingRoomId, setBookingRoomId] = useState(null)
  const bookingTrigger = useRef(null)

  const t = text[lang]

  // Baja a una sección dejando espacio para la barra de FLOX y el menú del hotel
  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id)
      if (!el) return
      const nav = document.querySelector('.hnav')
      const offset = (nav?.getBoundingClientRect().bottom ?? 0) - 1
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
    },
    [reduceMotion],
  )

  const openBooking = useCallback((roomId, trigger) => {
    bookingTrigger.current = trigger ?? document.activeElement
    setBookingRoomId(roomId)
  }, [])

  const closeBooking = useCallback(() => {
    setBookingRoomId(null)
    requestAnimationFrame(() => bookingTrigger.current?.focus?.({ preventScroll: true }))
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      currency,
      setCurrency,
      t,
      price: (usd, cur = currency) => formatPrice(usd, cur, t.locale),
      search,
      setSearch,
      searched,
      setSearched,
      scrollToSection,
      openBooking,
      reduceMotion,
    }),
    [lang, currency, t, search, searched, scrollToSection, openBooking, reduceMotion],
  )

  const bookingRoom = rooms.find((r) => r.id === bookingRoomId)

  return (
    <HotelContext.Provider value={value}>
      <div className="hotel" lang={lang}>
        <DemoBar message="Hola FLOX, vi la demo del Hotel Killa Wasi y quiero una web así para mi negocio" />
        <HotelNav />
        <SkipTarget />
        <HotelHero />
        <Rooms />
        <Experiences />
        <Gallery />
        <Location />
        <HotelFooter />
        <BookingPanel room={bookingRoom} onClose={closeBooking} />
      </div>
    </HotelContext.Provider>
  )
}
