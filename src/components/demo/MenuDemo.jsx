import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Phone from './Phone.jsx'
import RestaurantLogo from './RestaurantLogo.jsx'
import MenuCover, { TextileBand } from './menu/MenuCover.jsx'
import DishArt from './menu/DishArt.jsx'
import DishCard from './menu/DishCard.jsx'
import DishSheet from './menu/DishSheet.jsx'
import OrderSheet from './menu/OrderSheet.jsx'
import MenuIcon, { StarIcon } from './menu/MenuIcon.jsx'
import { allDishes, categories, chefPick, formatPrice, menuUi, restaurant } from '../../data/carta.js'
import { trackDemoOnce } from '../../lib/analytics.js'
import './MenuDemo.css'

const LANGS = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
]
const CURRENCIES = [
  { id: 'PEN', label: 'S/', name: 'Soles' },
  { id: 'USD', label: 'US$', name: 'Dólares / Dollars' },
]

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
}

function Toggle({ label, options, value, onChange }) {
  return (
    <div className="menu__toggle" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-label={`${o.label} (${o.name})`}
          aria-pressed={value === o.id}
          className="menu__toggle-btn"
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// Carta digital de la Picantería Qhapaq dentro de un celular: idioma, moneda,
// categorías, ficha de cada plato y pedido con botón para llamar al mozo.
export default function MenuDemo({ label }) {
  const [lang, setLang] = useState('es')
  const [currency, setCurrency] = useState('PEN')
  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [detailId, setDetailId] = useState(null)
  const [orderOpen, setOrderOpen] = useState(false)
  const [order, setOrder] = useState({})
  const scrollRef = useRef(null)
  const tabsRef = useRef(null)
  const uid = useId()

  const changeLang = (next) => {
    setLang(next)
    trackDemoOnce('carta', 'cambiar-idioma')
  }

  const category = categories.find((c) => c.id === categoryId)
  const detailDish = allDishes.find((d) => d.id === detailId)
  const price = (soles) => formatPrice(soles, currency)
  const count = Object.values(order).reduce((a, b) => a + b, 0)
  const total = allDishes.reduce((sum, d) => sum + d.price * (order[d.id] ?? 0), 0)
  const showOrder = orderOpen && count > 0
  const sheetOpen = Boolean(detailDish) || showOrder

  // Al cerrar una hoja, el foco vuelve al botón que la abrió. Se hace aquí (y no en la hoja)
  // porque la carta deja de estar "inert" recién cuando la hoja se cierra.
  const triggerRef = useRef(null)
  const remember = () => {
    triggerRef.current = document.activeElement
  }
  useEffect(() => {
    if (sheetOpen || !triggerRef.current) return
    const el = triggerRef.current
    triggerRef.current = null
    requestAnimationFrame(() => el.isConnected && el.focus({ preventScroll: true }))
  }, [sheetOpen])

  const tabId = (id) => `${uid}-tab-${id}`
  const panelId = `${uid}-panel`

  const changeQty = (id, delta) =>
    setOrder((current) => {
      const qty = Math.max(0, (current[id] ?? 0) + delta)
      const next = { ...current }
      if (qty) next[id] = qty
      else delete next[id]
      return next
    })

  // Cambios desde el resumen: si el pedido queda vacío, el panel se cierra
  const changeQtyInOrder = (id, delta) => {
    changeQty(id, delta)
    if (count + delta <= 0) setOrderOpen(false)
  }

  // Al cambiar de categoría, si ya bajaste, la lista vuelve a empezar bajo las pestañas
  const selectCategory = (id) => {
    setCategoryId(id)
    const scroller = scrollRef.current
    const tabsTop = tabsRef.current?.offsetTop ?? 0
    if (scroller && scroller.scrollTop > tabsTop) scroller.scrollTo({ top: tabsTop })
  }

  const onTabKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return
    const index = categories.findIndex((c) => c.id === categoryId)
    const next = categories[(index + step + categories.length) % categories.length]
    selectCategory(next.id)
    document.getElementById(tabId(next.id))?.focus({ preventScroll: true })
  }

  return (
    <MotionConfig reducedMotion="user">
      <Phone statusTone="#C9603A" label={label}>
        <div className={`menu ${count > 0 ? 'menu--has-order' : ''}`} lang={lang}>
          <div ref={scrollRef} className="menu__scroll" inert={sheetOpen}>
            <div className="menu__top">
              <MenuCover />
              <div className="menu__toggles">
                <Toggle label={menuUi.currencyLabel[lang]} options={CURRENCIES} value={currency} onChange={setCurrency} />
                <Toggle label={menuUi.languageLabel[lang]} options={LANGS} value={lang} onChange={changeLang} />
              </div>
            </div>

            {/* Al cambiar de idioma el contenido entra con un fundido corto */}
            <motion.div
              key={lang}
              className="menu__content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <header className="menu__info">
                <RestaurantLogo size={64} className="menu__logo" />
                <p className="menu__name">{restaurant.name}</p>
                <p className="menu__tagline">{restaurant.tagline[lang]}</p>
                <ul className="menu__meta">
                  <li>
                    <StarIcon />
                    <strong>{restaurant.rating}</strong>
                    <span className="visually-hidden">{menuUi.ratingLabel[lang]}</span>
                    <span>({restaurant.reviews})</span>
                  </li>
                  <li>
                    <MenuIcon name="clock" />
                    {restaurant.hours[lang]}
                  </li>
                  <li>
                    <MenuIcon name="pin" />
                    {restaurant.place}
                  </li>
                </ul>
              </header>

              <button type="button" className="menu__featured" onClick={() => {
                  remember()
                  setDetailId(chefPick.id)
                }} aria-haspopup="dialog">
                <span className="menu__featured-text">
                  <span className="menu__featured-label">
                    <StarIcon />
                    {menuUi.chefPick[lang]}
                  </span>
                  <span className="menu__featured-name">{chefPick.name[lang]}</span>
                  <span className="menu__featured-desc">{chefPick.description[lang]}</span>
                  <span className="menu__featured-price">{price(chefPick.price)}</span>
                </span>
                <DishArt art={chefPick.art} size={76} className="menu__featured-art" />
              </button>

              <div ref={tabsRef} className="menu__tabs" role="tablist" aria-label={menuUi.categoriesLabel[lang]}>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    id={tabId(c.id)}
                    type="button"
                    role="tab"
                    aria-selected={c.id === categoryId}
                    aria-controls={panelId}
                    tabIndex={c.id === categoryId ? 0 : -1}
                    className="menu__tab"
                    onClick={() => selectCategory(c.id)}
                    onKeyDown={onTabKeyDown}
                  >
                    <MenuIcon name={c.icon} />
                    <span>{c.label[lang]}</span>
                  </button>
                ))}
              </div>

              <section id={panelId} role="tabpanel" aria-labelledby={tabId(categoryId)} className="menu__panel">
                <div className="menu__panel-head">
                  <h4 className="menu__panel-title">{category.title[lang]}</h4>
                  <span className="menu__panel-count">{menuUi.options[lang](category.dishes.length)}</span>
                </div>

                <motion.ul key={categoryId} className="menu__dishes" variants={listVariants} initial="hidden" animate="show">
                  {category.dishes.map((dish) => (
                    <motion.li key={dish.id} variants={itemVariants}>
                      <DishCard
                        dish={dish}
                        lang={lang}
                        price={price(dish.price)}
                        qty={order[dish.id] ?? 0}
                        onOpen={() => {
                          remember()
                          setDetailId(dish.id)
                        }}
                        onAdd={() => changeQty(dish.id, 1)}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              </section>

              <footer className="menu__footer">
                <TextileBand />
                <p>{menuUi.footnote[lang]}</p>
                <p className="menu__powered">{menuUi.poweredBy[lang]}</p>
              </footer>
            </motion.div>
          </div>

          {/* Barra del pedido: aparece al agregar el primer plato */}
          <AnimatePresence>
            {count > 0 && !sheetOpen && (
              <motion.button
                type="button"
                className="menu__orderbar"
                onClick={() => {
                  remember()
                  setOrderOpen(true)
                }}
                aria-haspopup="dialog"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              >
                <span className="menu__orderbar-count">
                  <motion.span
                    key={count}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  >
                    {count}
                  </motion.span>
                </span>
                <span className="menu__orderbar-label">{menuUi.viewOrder[lang]}</span>
                <span className="menu__orderbar-total">{price(total)}</span>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {detailDish && (
              <DishSheet
                key={`dish-${detailDish.id}`}
                dish={detailDish}
                lang={lang}
                formatPrice={price}
                onAdd={(qty) => changeQty(detailDish.id, qty)}
                onClose={() => setDetailId(null)}
              />
            )}
            {showOrder && (
              <OrderSheet
                key="order"
                order={order}
                lang={lang}
                formatPrice={price}
                onChange={changeQtyInOrder}
                onClose={() => setOrderOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </Phone>
    </MotionConfig>
  )
}
