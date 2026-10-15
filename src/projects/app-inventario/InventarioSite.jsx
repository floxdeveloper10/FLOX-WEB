import { useState } from 'react'
import DemoBar from '../shared/DemoBar.jsx'
import SkipTarget from '../shared/SkipTarget.jsx'
import SideNotes from '../shared/SideNotes.jsx'
import DemoReset from '../shared/DemoReset.jsx'
import DemoCta from '../shared/DemoCta.jsx'
import Tablet from '../../components/demo/Tablet.jsx'
import InventarioApp from './InventarioApp.jsx'
import StockLogo from './components/StockLogo.jsx'
import useInventario from './useInventario.js'
import { notes, pageText } from './inventario.data.js'
import './inventario-page.css'

// Pantalla de cada nota (la ficha cuenta como "Productos")
const NOTE_OF = { ficha: 'productos' }

// Demo Stock Andino: en escritorio, una tablet horizontal con notas al lado;
// en el celular, la app de teléfono a pantalla completa.
export default function InventarioSite() {
  const inv = useInventario()
  const [screen, setScreen] = useState({ name: 'panel' })

  const reset = () => {
    inv.reset()
    setScreen({ name: 'panel' })
  }

  return (
    <div className="ipage">
      <DemoBar kind="app" message="Hola FLOX, vi la demo de Stock Andino y quiero una app de inventario para mi negocio" />

      <SkipTarget />
      <div className="ipage__main">
        <header className="ipage__intro">
          <StockLogo size={52} className="ipage__logo" />
          <div>
            <p className="ipage__eyebrow">{pageText.eyebrow}</p>
            <h1 className="ipage__title">{pageText.title}</h1>
            <p className="ipage__lead">{pageText.lead}</p>
          </div>
        </header>

        <div className="ipage__stage">
          <div className="ipage__device">
            <Tablet bareOnMobile statusTone="#0A3A45" label={pageText.device}>
              <InventarioApp inv={inv} screen={screen} onScreenChange={setScreen} />
            </Tablet>
          </div>

          <div className="ipage__notes">
            <SideNotes notes={notes} current={NOTE_OF[screen.name] ?? screen.name} onSelect={(name) => setScreen({ name })} />
            <DemoReset onReset={reset} />
          </div>
        </div>

        <DemoCta id="ipage-cta" title={pageText.ctaTitle} text={pageText.ctaText} button={pageText.ctaButton} message={pageText.ctaMessage} />
      </div>
    </div>
  )
}
