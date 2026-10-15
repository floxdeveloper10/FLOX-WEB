import { useId, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IIcon from '../components/IIcon.jsx'
import Scanner from '../components/Scanner.jsx'
import { reasons } from '../inventario.data.js'
import { STATUS_LABEL, productStatus } from '../useInventario.js'
import { useInv } from '../invState.js'

// Registrar una entrada o salida. El stock se actualiza y todas las cifras se recalculan.
export default function Movimiento({ preset }) {
  const { products, addMovement, toast, go } = useInv()
  const [type, setType] = useState(preset?.type ?? 'salida')
  const [code, setCode] = useState(preset?.code ?? '')
  const [qty, setQty] = useState('')
  const [reason, setReason] = useState(reasons[preset?.type ?? 'salida'][0])
  const [error, setError] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(null)
  const id = useId()

  const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name, 'es'))
  const product = products.find((p) => p.code === code)
  const n = Number(qty)
  const valid = Number.isInteger(n) && n > 0
  const after = product && valid ? (type === 'entrada' ? product.stock + n : product.stock - n) : null
  const afterStatus = product && after !== null && after >= 0 ? productStatus({ ...product, stock: after }).main : null

  const changeType = (t) => {
    setType(t)
    setReason(reasons[t][0])
    setError(null)
  }

  const save = (event) => {
    event.preventDefault()
    const result = addMovement({ code, type, qty: n, reason })
    if (!result.ok) {
      setError(result.error)
      document.getElementById(result.error.startsWith('Elige') ? `${id}-prod` : `${id}-qty`)?.focus()
      return
    }
    const st = productStatus(result.product).main
    toast({
      tone: st === 'critico' ? 'danger' : st === 'bajo' ? 'warn' : 'ok',
      text: `${type === 'entrada' ? 'Entrada' : 'Salida'} registrada: ${result.product.name}. Quedan ${result.product.stock} und${st === 'critico' ? ' · stock crítico' : st === 'bajo' ? ' · stock bajo' : ''}.`,
      action: st === 'critico' || st === 'bajo' ? { label: 'Ver alertas', to: 'alertas' } : null,
    })
    setQty('')
    setError(null)
    setScanned(null)
  }

  return (
    <div className="iscreen__inner">
      <header className="ihead">
        <div>
          <p className="ihead__eyebrow">Entradas y salidas</p>
          <h2 className="ihead__title">Registrar movimiento</h2>
        </div>
      </header>

      <form className="icard iform" onSubmit={save} noValidate>
        <fieldset className="iseg">
          <legend className="i-hidden">Tipo de movimiento</legend>
          {['entrada', 'salida'].map((t) => (
            <label key={t} className={`iseg__opt iseg__opt--${t} ${type === t ? 'is-on' : ''}`}>
              <input type="radio" name={`${id}-tipo`} value={t} checked={type === t} onChange={() => changeType(t)} />
              <IIcon name={t === 'entrada' ? 'arrowIn' : 'arrowOut'} />
              {t === 'entrada' ? 'Entrada' : 'Salida'}
            </label>
          ))}
        </fieldset>

        <div className="ifield">
          <label className="ifield__label" htmlFor={`${id}-prod`}>
            Producto
          </label>
          <div className="ifield__row">
            <select
              id={`${id}-prod`}
              className="iinput"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError(null)
                setScanned(null)
              }}
              aria-invalid={error?.startsWith('Elige') || undefined}
            >
              <option value="">Elige un producto…</option>
              {sorted.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} ({p.stock} und)
                </option>
              ))}
            </select>
            <button type="button" className="ibtn ibtn--ghost iscan-btn" onClick={() => setScanning(true)}>
              <IIcon name="scan" />
              Escanear código
            </button>
          </div>
          {scanned && (
            <p className="ifield__ok" role="status">
              <IIcon name="check" strokeWidth={3} />
              Código {scanned.code} detectado
            </p>
          )}
        </div>

        <div className="iform__row">
          <div className="ifield">
            <label className="ifield__label" htmlFor={`${id}-qty`}>
              Cantidad (und)
            </label>
            <input
              id={`${id}-qty`}
              className="iinput"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={qty}
              onChange={(e) => {
                setQty(e.target.value)
                setError(null)
              }}
              aria-invalid={(error && !error.startsWith('Elige')) || undefined}
              aria-describedby={`${id}-preview`}
            />
          </div>
          <div className="ifield">
            <label className="ifield__label" htmlFor={`${id}-reason`}>
              Motivo
            </label>
            <select id={`${id}-reason`} className="iinput" value={reason} onChange={(e) => setReason(e.target.value)}>
              {reasons[type].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <p id={`${id}-preview`} className="ipreview">
          {product ? (
            <>
              Stock actual: <strong>{product.stock}</strong>
              {after !== null && after >= 0 && (
                <>
                  {' '}
                  → <strong>{after}</strong>
                  {afterStatus !== 'ok' && afterStatus !== 'vence' && <span className={`itag itag--${afterStatus}`}>{STATUS_LABEL[afterStatus]}</span>}
                </>
              )}
            </>
          ) : (
            'Elige un producto o escanea su código.'
          )}
        </p>

        {error && (
          <p className="ierror" role="alert">
            {error}
          </p>
        )}

        <div className="iform__actions">
          <button type="button" className="ibtn ibtn--ghost" onClick={() => go('productos')}>
            Ver productos
          </button>
          <button type="submit" className={`ibtn ${type === 'entrada' ? 'ibtn--in' : 'ibtn--out'}`}>
            <IIcon name="check" strokeWidth={2.5} />
            Guardar {type}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {scanning && (
          <Scanner
            products={products}
            onClose={() => setScanning(false)}
            onDetect={(p) => {
              setCode(p.code)
              setScanned(p)
              setScanning(false)
              setError(null)
              requestAnimationFrame(() => document.getElementById(`${id}-qty`)?.focus())
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
