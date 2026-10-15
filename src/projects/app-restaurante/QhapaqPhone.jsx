import { useEffect, useState } from 'react'
import Phone from '../../components/demo/Phone.jsx'
import useGoogleFonts from '../shared/useGoogleFonts.js'
import ClienteApp from './cliente/ClienteApp.jsx'
import usePedidos from './usePedidos.js'
import { PedidosContext } from './pedidosState.js'
import { unlockAudio } from './sound.js'
import './pedidos.css'

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap'

// App del cliente de Qhapaq Pedidos dentro de un celular, para incrustar en /apps.
// Comparte los pedidos con la demo completa (y con otras pestañas).
export default function QhapaqPhone({ label = 'App Qhapaq Pedidos (demo interactiva)' }) {
  useGoogleFonts('qhapaq-fonts', FONTS_URL)
  const pedidos = usePedidos({ sound: false })
  const [view, setView] = useState({ name: 'inicio' })

  useEffect(() => {
    const unlock = () => unlockAudio()
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  return (
    <PedidosContext.Provider value={pedidos}>
      <Phone statusTone="#FFF4E2" statusText="dark" label={label}>
        <ClienteApp view={view} onViewChange={setView} />
      </Phone>
    </PedidosContext.Provider>
  )
}
