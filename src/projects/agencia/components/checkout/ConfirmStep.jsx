import AgenciaIcon from '../AgenciaIcon.jsx'
import WhatsAppIcon from '../../../../components/WhatsAppIcon.jsx'
import { OrderItems, OrderTotal } from './OrderReview.jsx'
import { useAgencia } from '../../agenciaState.js'

// Paso 3 · Confirmación. Es una demo: NO hay pago real ni campos de tarjeta o banco.
export default function ConfirmStep({ items, onBack, onConfirm }) {
  const { t } = useAgencia()
  const c = t.checkout
  return (
    <div className="acheck__review">
      <div className="acheck__demo" role="note">
        <span className="acheck__demo-icon" aria-hidden="true">
          <AgenciaIcon name="escudo" />
        </span>
        <div>
          <p className="acheck__demo-title">{c.demoTitle}</p>
          <p>{c.demoText}</p>
          <p className="acheck__demo-note">{c.demoNote}</p>
        </div>
      </div>

      <section className="acheck__card" aria-labelledby="aconfirm-title">
        <h2 id="aconfirm-title" className="acheck__card-title">
          {c.confirmTitle}
        </h2>
        <OrderItems items={items} />
        <OrderTotal items={items} label={c.total} />
      </section>

      <div className="acheck__nav">
        <button type="button" className="a-btn a-btn--outline" onClick={onBack}>
          <AgenciaIcon name="back" />
          {c.back}
        </button>
        <button type="button" className="a-btn a-btn--whatsapp acheck__confirm" onClick={onConfirm}>
          <WhatsAppIcon />
          {c.confirm}
        </button>
      </div>
    </div>
  )
}
