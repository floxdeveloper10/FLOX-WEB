import { motion } from 'framer-motion'
import HotelImage from './HotelImage.jsx'
import { useHotel } from '../hotelState.js'
import { experiences } from '../hotel.data.js'
import './Experiences.css'

export default function Experiences() {
  const { t, lang } = useHotel()

  return (
    <section id="experiencias" className="h-section hexp" aria-labelledby="hexp-title">
      <div className="h-container">
        <header className="h-heading">
          <p className="h-eyebrow">{t.experiences.eyebrow}</p>
          <h2 id="hexp-title" className="h-title">
            {t.experiences.title}
          </h2>
        </header>

        <ul className="hexp__list">
          {experiences.map((item, i) => (
            <motion.li
              key={item.id}
              className="hexp__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hexp__media">
                <HotelImage image={item.image} lang={lang} className="hexp__img" />
              </div>
              <span className="hexp__number" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="hexp__title">{item.title[lang]}</h3>
              <p className="hexp__text">{item.text[lang]}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
