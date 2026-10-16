import { useCallback, useState } from 'react'
import DemoBar from '../shared/DemoBar.jsx'
import SkipTarget from '../shared/SkipTarget.jsx'
import SideNotes from '../shared/SideNotes.jsx'
import DemoReset from '../shared/DemoReset.jsx'
import DemoCta from '../shared/DemoCta.jsx'
import Phone from '../../components/demo/Phone.jsx'
import PumaFitApp from './PumaFitApp.jsx'
import PumaLogo from './components/PumaLogo.jsx'
import useGymStore from './useGymStore.js'
import { notes, pageText } from './gym.data.js'
import './gym-page.css'

// Demo Puma Fit: en escritorio, el celular al centro con notas a los lados;
// en el celular, la app ocupa casi toda la pantalla (sin el marco del teléfono).
export default function GymSite() {
  const gym = useGymStore()
  const [tab, setTab] = useState('inicio')
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
  }

  const statusTone = !gym.entered || gym.theme === 'dark' ? '#0F0F10' : '#F2F3EE'
  const left = notes.slice(0, 3)
  const right = notes.slice(3)

  return (
    <div className="gympage" data-origen="demo-puma-fit">
      <DemoBar kind="app" message="Hola FLOX, vi la demo de la app Puma Fit y quiero una app así para mi negocio" />

      <SkipTarget />
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
            <DemoReset onReset={resetDemo} label={pageText.reset} done={pageText.resetDone} />
          </div>
        </div>

        <div className="gympage__cta">
          <DemoCta id="gympage-cta" title={pageText.ctaTitle} text={pageText.ctaText} button={pageText.ctaButton} message={pageText.ctaMessage} moreLabel={pageText.moreApps} />
        </div>
      </div>
    </div>
  )
}
