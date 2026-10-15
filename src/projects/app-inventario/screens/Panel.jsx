import IIcon from '../components/IIcon.jsx'
import { useInv } from '../invState.js'
import { soles, weekday } from '../format.js'

// Gráfico de barras: entradas vs salidas (unidades) de los últimos 7 días
function MovesChart({ days }) {
  const W = 320
  const H = 150
  const pad = { l: 26, r: 6, t: 10, b: 22 }
  const max = Math.max(10, ...days.flatMap((d) => [d.entradas, d.salidas]))
  const step = (W - pad.l - pad.r) / days.length
  const bw = Math.min(12, step / 3)
  const y = (v) => pad.t + (H - pad.t - pad.b) * (1 - v / max)
  const ticks = [0, Math.round(max / 2), max]
  const totalIn = days.reduce((n, d) => n + d.entradas, 0)
  const totalOut = days.reduce((n, d) => n + d.salidas, 0)

  return (
    <figure className="ichart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Últimos 7 días: ${totalIn} unidades entraron y ${totalOut} salieron`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="ichart__grid" />
            <text x={pad.l - 5} y={y(t) + 3} textAnchor="end" className="ichart__tick">
              {t}
            </text>
          </g>
        ))}
        {days.map((d, i) => {
          const cx = pad.l + step * i + step / 2
          return (
            <g key={d.iso}>
              <rect x={cx - bw - 1} y={y(d.entradas)} width={bw} height={Math.max(0, H - pad.b - y(d.entradas))} rx="2" className="ichart__in" />
              <rect x={cx + 1} y={y(d.salidas)} width={bw} height={Math.max(0, H - pad.b - y(d.salidas))} rx="2" className="ichart__out" />
              <text x={cx} y={H - 6} textAnchor="middle" className="ichart__tick">
                {i === days.length - 1 ? 'Hoy' : weekday(d.date)}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="ichart__legend">
        <span>
          <i className="ichart__dot ichart__dot--in" /> Entradas ({totalIn})
        </span>
        <span>
          <i className="ichart__dot ichart__dot--out" /> Salidas ({totalOut})
        </span>
      </figcaption>
    </figure>
  )
}

export default function Panel() {
  const { stats, go } = useInv()
  const maxTop = Math.max(1, ...stats.top.map((t) => t.qty))
  const cards = [
    { icon: 'money', label: 'Valor del inventario', value: soles(stats.totalValue), note: 'a precio de costo', to: 'reportes' },
    { icon: 'alert', label: 'Stock bajo', value: stats.lowCount, note: stats.criticalCount ? `${stats.criticalCount} en crítico` : 'ninguno en crítico', to: 'alertas', tone: stats.criticalCount ? 'danger' : stats.lowCount ? 'warn' : '' },
    { icon: 'clock', label: 'Por vencer (7 días)', value: stats.expiringCount, note: 'revisa y oferta', to: 'alertas', tone: stats.expiringCount ? 'warn' : '' },
    { icon: 'swap', label: 'Movimientos de hoy', value: stats.movesToday, note: 'entradas y salidas', to: 'movimiento' },
  ]

  return (
    <div className="iscreen__inner">
      <header className="ihead">
        <div>
          <p className="ihead__eyebrow">Minimarket Wayra · Cusco</p>
          <h2 className="ihead__title">Panel</h2>
        </div>
        <button type="button" className="ibtn ibtn--primary ibtn--sm" onClick={() => go('movimiento')}>
          <IIcon name="plus" />
          Registrar
        </button>
      </header>

      <ul className="istats">
        {cards.map((c) => (
          <li key={c.label}>
            <button type="button" className={`istat ${c.tone ? `istat--${c.tone}` : ''}`} onClick={() => go(c.to)}>
              <span className="istat__icon" aria-hidden="true">
                <IIcon name={c.icon} />
              </span>
              <span className="istat__label">{c.label}</span>
              <span className="istat__value">{c.value}</span>
              <span className="istat__note">{c.note}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="igrid2">
        <section className="icard" aria-labelledby="ichart-title">
          <h3 id="ichart-title" className="icard__title">
            Entradas vs salidas · 7 días
          </h3>
          <MovesChart days={stats.days} />
        </section>

        <section className="icard" aria-labelledby="itop-title">
          <h3 id="itop-title" className="icard__title">
            Top 5 más vendidos
          </h3>
          <ol className="itop">
            {stats.top.map((t, i) => (
              <li key={t.product.code}>
                <span className="itop__rank">{i + 1}</span>
                <span className="itop__name">{t.product.name}</span>
                <span className="itop__bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${t.qty / maxTop})` }} />
                </span>
                <span className="itop__qty">{t.qty} und</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
