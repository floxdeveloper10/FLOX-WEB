import { useEffect, useMemo, useState } from 'react'
import DemoBar from '../shared/DemoBar.jsx'
import SkipTarget from '../shared/SkipTarget.jsx'
import SideNotes from '../shared/SideNotes.jsx'
import DemoReset from '../shared/DemoReset.jsx'
import DemoCta from '../shared/DemoCta.jsx'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import Phone from '../../components/demo/Phone.jsx'
import RestaurantLogo from '../../components/demo/RestaurantLogo.jsx'
import ClienteApp from './cliente/ClienteApp.jsx'
import CocinaApp from './cocina/CocinaApp.jsx'
import usePedidos from './usePedidos.js'
import { PedidosContext } from './pedidosState.js'
import { clientNotes, kitchenNotes, pageText, promo } from './pedidos.data.js'
import { unlockAudio } from './sound.js'
import './pedidos.css'
import './pedidos-page.css'

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap'

// Demo Qhapaq Pedidos: app del cliente y app del restaurante conectadas.
// En escritorio se ven lado a lado; en el celular, un interruptor elige cuál ver.
export default function RestauranteSite() {
  useGoogleFonts('qhapaq-fonts', FONTS_URL)
  const pedidos = usePedidos()
  const [view, setView] = useState({ name: 'inicio' })
  const [kitchenTab, setKitchenTab] = useState('nuevos')
  const [side, setSide] = useState('cliente')

  // El sonido solo se permite después de que la persona toca la página
  useEffect(() => {
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const newCount = pedidos.orders.filter((o) => o.status === 'recibido').length
  const latestMine = useMemo(() => pedidos.orders.filter((o) => o.mine).sort((a, b) => b.createdAt - a.createdAt)[0], [pedidos.orders])

  const selectClient = (screen) => {
    setSide('cliente')
    if (screen === 'plato') setView({ name: 'plato', id: promo.art })
    else if (screen === 'seguimiento') setView(latestMine ? { name: 'seguimiento', id: latestMine.id } : { name: 'pedidos' })
    else setView({ name: screen })
  }
  const selectKitchen = (screen) => {
    setSide('cocina')
    setKitchenTab(screen)
  }

  const reset = () => {
    pedidos.reset()
    setView({ name: 'inicio' })
    setKitchenTab('nuevos')
  }

  return (
    <PedidosContext.Provider value={pedidos}>
      <div className="qpage" data-side={side}>
        <DemoBar kind="app" message="Hola FLOX, vi la demo de Qhapaq Pedidos y quiero una app así para mi restaurante" />

        <SkipTarget />
        <div className="qpage__main">
          <header className="qpage__intro">
            <RestaurantLogo size={52} className="qpage__logo" />
            <p className="qpage__eyebrow">{pageText.eyebrow}</p>
            <h1 className="qpage__title">{pageText.title}</h1>
            <p className="qpage__lead">{pageText.lead}</p>
          </header>

          <div className="qpage__switch" role="group" aria-label="Elige qué app ver">
            <button type="button" aria-pressed={side === 'cliente'} onClick={() => setSide('cliente')}>
              Ver como cliente
            </button>
            <button type="button" aria-pressed={side === 'cocina'} onClick={() => setSide('cocina')}>
              Ver como restaurante
              {newCount > 0 && (
                <span className="qpage__switch-badge" aria-label={`${newCount} pedidos nuevos`}>
                  {newCount}
                </span>
              )}
            </button>
          </div>

          <div className="qpage__stage">
            <SideNotes notes={clientNotes} current={view.name} onSelect={selectClient} className="qpage__notes qpage__notes--client" />

            <div className="qpage__device qpage__device--cliente">
              <p className="qpage__label">{pageText.clientLabel}</p>
              <Phone bareOnMobile statusTone="#FFF4E2" statusText="dark" label={`${pageText.clientLabel} (demo interactiva)`}>
                <ClienteApp view={view} onViewChange={setView} />
              </Phone>
            </div>

            <div className="qpage__device qpage__device--cocina">
              <p className="qpage__label">{pageText.kitchenLabel}</p>
              <Phone bareOnMobile statusTone="#3B2418" label={`${pageText.kitchenLabel} (demo interactiva)`}>
                <CocinaApp tab={kitchenTab} onTabChange={setKitchenTab} />
              </Phone>
            </div>

            <div className="qpage__notes qpage__notes--kitchen">
              <SideNotes notes={kitchenNotes} current={kitchenTab} onSelect={selectKitchen} />
              <DemoReset onReset={reset} />
            </div>
          </div>

          <DemoCta
            id="qpage-cta"
            title={pageText.ctaTitle}
            text={pageText.ctaText}
            button={pageText.ctaButton}
            message={pageText.ctaMessage}
          />
        </div>
      </div>
    </PedidosContext.Provider>
  )
}
