import { useState } from 'react'
import IIcon from '../components/IIcon.jsx'
import { categories } from '../inventario.data.js'
import { useInv } from '../invState.js'
import { downloadCsv, inventoryCsv } from '../csv.js'
import { soles } from '../format.js'

// Resumen por categoría y descarga del inventario en CSV (para Excel)
export default function Reportes() {
  const { products, stats, today, toast } = useInv()
  const [last, setLast] = useState(null)

  const rows = categories.map((c) => {
    const items = products.filter((p) => p.category === c.id)
    const cost = items.reduce((s, p) => s + p.stock * p.cost, 0)
    const sale = items.reduce((s, p) => s + p.stock * p.price, 0)
    return {
      ...c,
      count: items.length,
      units: items.reduce((s, p) => s + p.stock, 0),
      alerts: items.filter((p) => stats.statuses[p.code].main !== 'ok').length,
      cost,
      sale,
    }
  })
  const total = rows.reduce(
    (t, r) => ({ count: t.count + r.count, units: t.units + r.units, alerts: t.alerts + r.alerts, cost: t.cost + r.cost, sale: t.sale + r.sale }),
    { count: 0, units: 0, alerts: 0, cost: 0, sale: 0 },
  )
  const maxCost = Math.max(1, ...rows.map((r) => r.cost))

  const download = () => {
    try {
      const name = downloadCsv(inventoryCsv(products, stats.statuses), today)
      setLast(name)
      toast({ tone: 'ok', text: `Reporte descargado: ${name}` })
    } catch {
      toast({ tone: 'danger', text: 'No se pudo generar el archivo en este navegador.' })
    }
  }

  return (
    <div className="iscreen__inner">
      <header className="ihead">
        <div>
          <p className="ihead__eyebrow">Inventario actual</p>
          <h2 className="ihead__title">Reportes</h2>
        </div>
      </header>

      <section className="icard" aria-labelledby="irep-title">
        <h3 id="irep-title" className="icard__title">
          Resumen por categoría
        </h3>
        <div className="itable-wrap">
          <table className="itable">
            <thead>
              <tr>
                <th scope="col">Categoría</th>
                <th scope="col" className="is-num itable__opt">
                  Productos
                </th>
                <th scope="col" className="is-num">
                  Unidades
                </th>
                <th scope="col" className="is-num itable__opt">
                  Con alerta
                </th>
                <th scope="col" className="is-num">
                  Valor a costo
                </th>
                <th scope="col" className="is-num itable__opt">
                  Valor de venta
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <th scope="row">
                    {r.label}
                    <span className="itable__bar" aria-hidden="true">
                      <span style={{ transform: `scaleX(${r.cost / maxCost})` }} />
                    </span>
                  </th>
                  <td className="is-num itable__opt">{r.count}</td>
                  <td className="is-num">{r.units}</td>
                  <td className="is-num itable__opt">{r.alerts}</td>
                  <td className="is-num">{soles(r.cost)}</td>
                  <td className="is-num itable__opt">{soles(r.sale)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td className="is-num itable__opt">{total.count}</td>
                <td className="is-num">{total.units}</td>
                <td className="is-num itable__opt">{total.alerts}</td>
                <td className="is-num">{soles(total.cost)}</td>
                <td className="is-num itable__opt">{soles(total.sale)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="imuted">Ganancia posible si se vende todo el stock: {soles(total.sale - total.cost)}</p>
      </section>

      <section className="icard idownload" aria-labelledby="icsv-title">
        <span className="idownload__icon" aria-hidden="true">
          <IIcon name="report" />
        </span>
        <div>
          <h3 id="icsv-title" className="icard__title">
            Inventario completo en Excel
          </h3>
          <p className="imuted">
            Archivo CSV con los {products.length} productos: código, stock, mínimo, estado, costo, precio, valor, proveedor y vencimiento.
          </p>
          {last && <p className="ifield__ok">Último archivo: {last}</p>}
        </div>
        <button type="button" className="ibtn ibtn--primary" onClick={download}>
          <IIcon name="download" />
          Descargar reporte (CSV)
        </button>
      </section>
    </div>
  )
}
