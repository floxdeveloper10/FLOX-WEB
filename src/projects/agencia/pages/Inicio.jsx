import { motion } from 'framer-motion'
import HeroMountains from '../components/home/HeroMountains.jsx'
import HeroSearch from '../components/home/HeroSearch.jsx'
import Stats from '../components/home/Stats.jsx'
import FeaturedCarousel from '../components/home/FeaturedCarousel.jsx'
import RegionMap from '../components/home/RegionMap.jsx'
import { CtaBanner, Testimonials, WhyUs } from '../components/home/HomeSections.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'

export default function Inicio() {
  const { t } = useAgencia()
  useAgenciaTitle(t.pageTitle.home)

  return (
    <>
      <section className="ahero" aria-labelledby="ahero-title">
        <HeroMountains />
        <div className="a-container ahero__content">
          <motion.div
            className="ahero__copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ahero__eyebrow">{t.hero.eyebrow}</p>
            <h1 id="ahero-title" className="ahero__title">
              {t.hero.title}
            </h1>
            <p className="ahero__lead">{t.hero.lead}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroSearch />
          </motion.div>
        </div>
      </section>
      <Stats />
      <FeaturedCarousel />
      <RegionMap />
      <WhyUs />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
