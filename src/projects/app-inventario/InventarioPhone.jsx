import { useState } from 'react'
import Phone from '../../components/demo/Phone.jsx'
import InventarioApp from './InventarioApp.jsx'
import useInventario from './useInventario.js'

// Stock Andino como app de teléfono, para incrustar en /apps.
// Comparte el inventario guardado con la demo completa.
export default function InventarioPhone({ label = 'App Stock Andino (demo interactiva)' }) {
  const inv = useInventario()
  const [screen, setScreen] = useState({ name: 'panel' })

  return (
    <Phone statusTone="#0E4C5A" label={label}>
      <InventarioApp inv={inv} screen={screen} onScreenChange={setScreen} />
    </Phone>
  )
}
