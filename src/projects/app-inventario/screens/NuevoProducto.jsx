import { useId, useState } from 'react'
import IIcon from '../components/IIcon.jsx'
import { categories, suppliers } from '../inventario.data.js'
import { useInv } from '../invState.js'

const EMPTY = { code: '', name: '', category: 'abarrotes', supplier: suppliers[0], stock: '', min: '', cost: '', price: '', expires: '' }

const num = (v) => (v === '' ? NaN : Number(v))

// Validaciones: código único, precio mayor que el costo, stock mínimo ≥ 0
function validate(form, products) {
  const errors = {}
  const code = form.code.trim()
  if (!code) errors.code = 'Escribe el código del producto.'
  else if (!/^[0-9A-Za-z-]{3,20}$/.test(code)) errors.code = 'Usa de 3 a 20 letras, números o guiones.'
  else if (products.some((p) => p.code === code)) errors.code = 'Ese código ya existe: cada producto necesita uno distinto.'
  if (form.name.trim().length < 3) errors.name = 'Escribe el nombre (mínimo 3 letras).'
  const stock = num(form.stock)
  if (!Number.isInteger(stock) || stock < 0) errors.stock = 'El stock inicial debe ser un número entero, 0 o más.'
  const min = num(form.min)
  if (!Number.isInteger(min) || min < 0) errors.min = 'El stock mínimo debe ser un número entero mayor o igual a 0.'
  const cost = num(form.cost)
  if (!(cost > 0)) errors.cost = 'El costo debe ser mayor que 0.'
  const price = num(form.price)
  if (!(price > 0)) errors.price = 'Escribe el precio de venta.'
  else if (cost > 0 && price <= cost) errors.price = 'El precio de venta debe ser mayor que el costo.'
  return errors
}

const FIELDS = ['code', 'name', 'stock', 'min', 'cost', 'price']

export default function NuevoProducto() {
  const { products, addProduct, toast, go } = useInv()
  const [form, setForm] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const id = useId()
  const errors = validate(form, products)
  const show = (field) => (submitted || touched[field]) && errors[field]

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }))

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const first = FIELDS.find((f) => errors[f])
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }
    const product = {
      code: form.code.trim(),
      name: form.name.trim(),
      category: form.category,
      supplier: form.supplier,
      stock: Number(form.stock),
      min: Number(form.min),
      cost: Math.round(Number(form.cost) * 100) / 100,
      price: Math.round(Number(form.price) * 100) / 100,
      expires: form.expires || null,
    }
    addProduct(product)
    toast({ tone: 'ok', text: `Producto agregado: ${product.name}` })
    go('productos', { highlight: product.code })
  }

  const field = (name, label, props = {}) => (
    <div className="ifield">
      <label className="ifield__label" htmlFor={`${id}-${name}`}>
        {label}
      </label>
      <input
        id={`${id}-${name}`}
        className="iinput"
        value={form[name]}
        onChange={set(name)}
        onBlur={blur(name)}
        aria-invalid={Boolean(show(name)) || undefined}
        aria-describedby={show(name) ? `${id}-${name}-err` : undefined}
        {...props}
      />
      {show(name) && (
        <p id={`${id}-${name}-err`} className="ierror">
          {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="iscreen__inner">
      <header className="ihead ihead--back">
        <button type="button" className="iiconbtn" aria-label="Volver a productos" onClick={() => go('productos')}>
          <IIcon name="back" />
        </button>
        <div>
          <p className="ihead__eyebrow">Catálogo</p>
          <h2 className="ihead__title ihead__title--sm">Agregar producto</h2>
        </div>
      </header>

      <form className="icard iform" onSubmit={submit} noValidate>
        <div className="iform__row">
          {field('code', 'Código', { inputMode: 'numeric', placeholder: 'Ej.: 7750001000098', autoComplete: 'off' })}
          {field('name', 'Nombre', { placeholder: 'Ej.: Avena 900 g' })}
        </div>
        <div className="iform__row">
          <div className="ifield">
            <label className="ifield__label" htmlFor={`${id}-category`}>
              Categoría
            </label>
            <select id={`${id}-category`} className="iinput" value={form.category} onChange={set('category')}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ifield">
            <label className="ifield__label" htmlFor={`${id}-supplier`}>
              Proveedor
            </label>
            <select id={`${id}-supplier`} className="iinput" value={form.supplier} onChange={set('supplier')}>
              {suppliers.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="iform__row iform__row--4">
          {field('stock', 'Stock inicial', { type: 'number', min: 0, step: 1, inputMode: 'numeric' })}
          {field('min', 'Stock mínimo', { type: 'number', min: 0, step: 1, inputMode: 'numeric' })}
          {field('cost', 'Costo (S/)', { type: 'number', min: 0, step: '0.10', inputMode: 'decimal' })}
          {field('price', 'Precio de venta (S/)', { type: 'number', min: 0, step: '0.10', inputMode: 'decimal' })}
        </div>
        <div className="ifield">
          <label className="ifield__label" htmlFor={`${id}-expires`}>
            Vencimiento <span className="imuted">(opcional)</span>
          </label>
          <input id={`${id}-expires`} className="iinput" type="date" value={form.expires} onChange={set('expires')} />
        </div>

        {submitted && Object.keys(errors).length > 0 && (
          <p className="ierror" role="alert">
            Revisa los campos marcados.
          </p>
        )}

        <div className="iform__actions">
          <button type="button" className="ibtn ibtn--ghost" onClick={() => go('productos')}>
            Cancelar
          </button>
          <button type="submit" className="ibtn ibtn--primary">
            <IIcon name="check" strokeWidth={2.5} />
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  )
}
