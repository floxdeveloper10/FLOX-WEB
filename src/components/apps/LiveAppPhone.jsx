import { Suspense, lazy, useRef } from 'react'
import { useInView } from 'framer-motion'
import Phone from '../demo/Phone.jsx'
import AppScreen from './AppScreens.jsx'

// Cada app real se descarga solo cuando su celular está por aparecer en pantalla.
// Mientras tanto se ve su pantalla dibujada. Se usa en /apps y en las páginas de rubro.
const LIVE = {
  'app-gym': lazy(() => import('../../projects/app-gym/PumaFitPhone.jsx')),
  'app-restaurante': lazy(() => import('../../projects/app-restaurante/QhapaqPhone.jsx')),
  'app-inventario': lazy(() => import('../../projects/app-inventario/InventarioPhone.jsx')),
}
const TONES = { 'app-gym': '#0F0F10', 'app-restaurante': '#FFF4E2', 'app-inventario': '#0E4C5A' }

export function StaticAppPhone({ app }) {
  return (
    <Phone decorative statusTone={TONES[app]} statusText={app === 'app-restaurante' ? 'dark' : 'light'}>
      <AppScreen app={app} className="apps-screen" />
    </Phone>
  )
}

export default function LiveAppPhone({ app }) {
  const ref = useRef(null)
  const near = useInView(ref, { once: true, margin: '400px 0px' })
  const App = LIVE[app]
  const placeholder = <StaticAppPhone app={app} />

  return (
    <div ref={ref}>
      {near && App ? (
        <Suspense fallback={placeholder}>
          <App />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  )
}
