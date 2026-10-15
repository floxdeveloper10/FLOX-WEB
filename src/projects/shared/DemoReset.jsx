import { useEffect, useState } from 'react'
import './DemoParts.css'

// Botón "Reiniciar demo" con un aviso breve que lo confirma (lectores de pantalla incluidos)
export default function DemoReset({ onReset, label = 'Reiniciar demo', done = 'Demo reiniciada' }) {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!msg) return undefined
    const timer = setTimeout(() => setMsg(''), 2500)
    return () => clearTimeout(timer)
  }, [msg])

  return (
    <div className="sreset">
      <button
        type="button"
        className="sreset__btn"
        onClick={() => {
          onReset()
          setMsg(done)
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
          <path d="M4.5 4v4h4" />
        </svg>
        {label}
      </button>
      <span className="sreset__msg" role="status">
        {msg}
      </span>
    </div>
  )
}
