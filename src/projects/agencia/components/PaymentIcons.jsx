import { useAgencia } from '../agenciaState.js'

// Medios de pago dibujados de forma genérica (sin logos de marcas)
const ICONS = {
  card: (
    <>
      <rect x="2" y="6" width="44" height="28" rx="4" fill="#2F5D50" />
      <rect x="2" y="12" width="44" height="5" fill="#1E1E1E" opacity="0.5" />
      <rect x="7" y="23" width="9" height="6" rx="1.5" fill="#F2B33D" />
      <path d="M22 27h16" stroke="#F4EBDD" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  transfer: (
    <>
      <path d="M8 16h32M8 16l6-6M40 26H8M40 26l-6 6" fill="none" stroke="#C2502E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  wallet: (
    <>
      <rect x="14" y="3" width="20" height="34" rx="4" fill="#1E1E1E" />
      <rect x="17" y="8" width="14" height="14" rx="1" fill="#F4EBDD" />
      <path d="M19 10h4v4h-4zM25 16h4v4h-4zM25 10h4v4h-4z" fill="#1E1E1E" />
      <circle cx="24" cy="30" r="2" fill="#F2B33D" />
    </>
  ),
  cash: (
    <>
      <rect x="2" y="9" width="44" height="22" rx="3" fill="#5E8A6E" />
      <circle cx="24" cy="20" r="6" fill="#F4EBDD" />
      <path d="M24 16v8M22 18h3.5a1.5 1.5 0 0 1 0 3h-3" stroke="#2F5D50" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
}

export default function PaymentIcons() {
  const { t } = useAgencia()
  return (
    <ul className="apay">
      {Object.entries(ICONS).map(([id, shapes]) => (
        <li key={id} className="apay__item">
          <svg viewBox="0 0 48 40" role="img" aria-label={t.footer.paymentNames[id]}>
            {shapes}
          </svg>
        </li>
      ))}
    </ul>
  )
}
