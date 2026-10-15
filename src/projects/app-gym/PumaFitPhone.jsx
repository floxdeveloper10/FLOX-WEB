import { useState } from 'react'
import Phone from '../../components/demo/Phone.jsx'
import PumaFitApp from './PumaFitApp.jsx'
import useGymStore from './useGymStore.js'

// Puma Fit dentro de un celular, lista para incrustar en otra página (/apps).
// Comparte el estado guardado con la demo completa.
export default function PumaFitPhone({ label = 'App Puma Fit (demo interactiva)' }) {
  const gym = useGymStore()
  const [tab, setTab] = useState('inicio')
  const statusTone = !gym.entered || gym.theme === 'dark' ? '#0F0F10' : '#F2F3EE'

  return (
    <Phone statusTone={statusTone} statusText={statusTone === '#0F0F10' ? 'light' : 'dark'} label={label}>
      <PumaFitApp gym={gym} tab={tab} onTabChange={setTab} />
    </Phone>
  )
}
