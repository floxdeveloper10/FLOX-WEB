// Barra de nivel de stock: llena hasta el doble del mínimo; el color depende del estado
export default function StockBar({ stock, min, status, label }) {
  const ratio = Math.min(1, stock / Math.max(1, min * 2))
  return (
    <span className={`ibar ibar--${status}`} role="img" aria-label={label ?? `Stock ${stock} de ${min} mínimo`}>
      <span className="ibar__fill" style={{ transform: `scaleX(${ratio})` }} />
      <span className="ibar__min" style={{ left: '50%' }} aria-hidden="true" />
    </span>
  )
}
