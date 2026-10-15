import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import DemoBar from '../shared/DemoBar.jsx'
import Phone from '../../components/demo/Phone.jsx'
import WhatsAppIcon from '../../components/WhatsAppIcon.jsx'
import { whatsappLink } from '../../data/site.js'
import PumaFitApp from './PumaFitApp.jsx'
import PumaLogo from './components/PumaLogo.jsx'
import SideNotes from './components/SideNotes.jsx'
import GymIcon from './components/GymIcon.jsx'
import useGymStore from './useGymStore.js'
import { notes, pageText } from './gym.data.js'
import './gym-page.css'

// Demo Puma Fit: en escritorio, el celular al centro con notas a los lados;
// en el celular, la app ocupa casi toda la pantalla (sin el marco del teléfono).
export default function GymSite() {
  const gym = useGymStore()
  const [tab, setTab] = useState('inicio')
  const [resetMsg, setResetMsg] = useState('')
  const current = gym.entered ? tab : 'bienvenida'

  const { enter, logout, reset } = gym
  const selectScreen = useCallback(
    (screen) => {
      if (screen === 'bienvenida') logout()
      else {
        enter()
        setTab(screen)
      }
    },
    [enter, logout],
  )

  const resetDemo = () => {
    reset()
    setTab('inicio')
    setResetMsg(pageText.resetDone)
    setTimeout(() => setResetMsg(''), 2500)
  }

  const statusTone = !gym.entered || gym.theme === 'dark' ? '#0F0F10' : '#F2F3EE'
  const left = notes.slice(0, 3)
  const right = notes.slice(3)

  return (
    <div className="gympage">
      <DemoBar message="Hola FLOX, vi la demo de la app Puma Fit y quiero una app así para mi negocio" />

      <div className="gympage__main">
        <header className="gympage__intro">
          <PumaLogo className="gympage__logo" />
          <p className="gympage__eyebrow">{pageText.eyebrow}</p>
          <h1 className="gympage__title">{pageText.title}</h1>
          <p className="gympage__lead">{pageText.lead}</p>
        </header>

        <div className="gympage__stage">
          <SideNotes notes={left} current={current} onSelect={selectScreen} className="gympage__notes gympage__notes--left" />

          <div className="gympage__device">
            <Phone
              size="lg"
              bareOnMobile
              statusTone={statusTone}
              statusText={statusTone === '#0F0F10' ? 'light' : 'dark'}
              label="App Puma Fit (demo interactiva)"
            >
              <PumaFitApp gym={gym} tab={tab} onTabChange={setTab} />
            </Phone>
          </div>

          <div className="gympage__notes gympage__notes--right">
            <SideNotes notes={right} current={current} onSelect={selectScreen} />
            <div className="gympage__reset">
              <button type="button" className="gympage__reset-btn" onClick={resetDemo}>
                <GymIcon name="reset" />
                {pageText.reset}
              </button>
              <span className="gympage__reset-msg" role="status">
                {resetMsg}
              </span>
            </div>
          </div>
        </div>

        <section className="gympage__cta" aria-labelledby="gympage-cta">
          <h2 id="gympage-cta" className="gympage__cta-title">
            {pageText.ctaTitle}
          </h2>
          <p className="gympage__cta-text">{pageText.ctaText}</p>
          <div className="gympage__cta-actions">
            <a className="gympage__btn" href={whatsappLink(pageText.ctaMessage)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {pageText.ctaButton}
            </a>
            <Link className="gympage__link" to="/apps">
              {pageText.moreApps}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
