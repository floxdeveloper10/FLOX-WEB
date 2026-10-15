// Pantallas de las apps de ejemplo dibujadas en SVG (decorativas, sin capturas).
// Se usan en la portada de /apps, en "Muy pronto" y en las tarjetas de Proyectos.
const DISPLAY = "'Barlow Condensed', 'Arial Narrow', sans-serif"
const BODY = "'Inter', system-ui, sans-serif"

function PumaFit() {
  return (
    <>
      <rect width="300" height="600" fill="#0F0F10" />
      <text x="20" y="40" fill="#A8A8B0" fontFamily={BODY} fontSize="11">Miércoles, 15 de octubre</text>
      <text x="20" y="70" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="30">HOLA, DIEGO</text>
      <circle cx="262" cy="58" r="17" fill="#2A2A2E" />
      <circle cx="270" cy="50" r="4" fill="#B6F24A" />
      {/* Membresía */}
      <rect x="16" y="88" width="268" height="150" rx="16" fill="#232327" />
      <circle cx="250" cy="100" r="70" fill="#B6F24A" opacity="0.08" />
      <text x="30" y="112" fill="#A8A8B0" fontFamily={BODY} fontSize="9" fontWeight="700" letterSpacing="1">MEMBRESÍA ACTIVA</text>
      <text x="30" y="134" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="21">PLAN TRIMESTRAL</text>
      <circle cx="68" cy="190" r="30" fill="none" stroke="#3A3A40" strokeWidth="8" />
      <circle cx="68" cy="190" r="30" fill="none" stroke="#B6F24A" strokeWidth="8" strokeLinecap="round" strokeDasharray="188.5" strokeDashoffset="140" transform="rotate(-90 68 190)" />
      <text x="68" y="197" textAnchor="middle" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="22">23</text>
      <rect x="188" y="104" width="82" height="96" rx="10" fill="#fff" />
      <g fill="#0F0F10">
        <rect x="196" y="112" width="18" height="18" />
        <rect x="244" y="112" width="18" height="18" />
        <rect x="196" y="160" width="18" height="18" />
        <rect x="200" y="116" width="10" height="10" fill="#fff" />
        <rect x="248" y="116" width="10" height="10" fill="#fff" />
        <rect x="200" y="164" width="10" height="10" fill="#fff" />
        <rect x="220" y="114" width="6" height="6" />
        <rect x="230" y="122" width="8" height="6" />
        <rect x="220" y="136" width="14" height="6" />
        <rect x="240" y="138" width="6" height="12" />
        <rect x="252" y="150" width="10" height="8" />
        <rect x="222" y="152" width="8" height="10" />
        <rect x="236" y="164" width="10" height="6" />
        <rect x="252" y="166" width="8" height="10" />
      </g>
      <text x="229" y="192" textAnchor="middle" fill="#0F0F10" fontFamily={BODY} fontSize="7" fontWeight="700">Recepción</text>
      {/* Próxima clase */}
      <rect x="16" y="250" width="268" height="98" rx="16" fill="#1C1C1F" />
      <text x="30" y="274" fill="#A8A8B0" fontFamily={BODY} fontSize="9" fontWeight="700" letterSpacing="1">TU PRÓXIMA CLASE</text>
      <circle cx="35" cy="294" r="5" fill="#B6F24A" />
      <text x="46" y="301" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="22">SPINNING</text>
      <text x="30" y="324" fill="#A8A8B0" fontFamily={BODY} fontSize="11">Hoy · 19:00 · Rocío Mamani</text>
      {/* Racha y rutina */}
      <rect x="16" y="360" width="130" height="112" rx="16" fill="#1C1C1F" />
      <path d="M38 410c-8 0-13-5-13-12 0-7 5-11 7-17 2 3 3 5 6 6 0-6 3-10 7-13-1 6 6 12 6 19 0 10-5 17-13 17Z" fill="#FF8A3D" opacity="0.9" />
      <text x="58" y="408" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="34">5</text>
      <text x="28" y="432" fill="#A8A8B0" fontFamily={BODY} fontSize="10">días seguidos</text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={34 + i * 15} cy="452" r="5.5" fill={i < 5 ? '#B6F24A' : '#2A2A2E'} />
      ))}
      <rect x="154" y="360" width="130" height="112" rx="16" fill="#1C1C1F" />
      <text x="166" y="384" fill="#A8A8B0" fontFamily={BODY} fontSize="8.5" fontWeight="700" letterSpacing="1">RUTINA DE HOY</text>
      <text x="166" y="408" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="18">PIERNAS Y CORE</text>
      <rect x="166" y="424" width="104" height="6" rx="3" fill="#2A2A2E" />
      <rect x="166" y="424" width="52" height="6" rx="3" fill="#B6F24A" />
      <text x="166" y="452" fill="#A8A8B0" fontFamily={BODY} fontSize="10">3 de 6 hechos</text>
      {/* Clases */}
      <rect x="16" y="484" width="268" height="44" rx="14" fill="#1C1C1F" />
      <rect x="28" y="496" width="4" height="20" rx="2" fill="#5CD6FF" />
      <text x="42" y="511" fill="#fff" fontFamily={DISPLAY} fontWeight="800" fontSize="16">FUNCIONAL · 20:00</text>
      <rect x="206" y="494" width="66" height="24" rx="12" fill="#B6F24A" />
      <text x="239" y="510" textAnchor="middle" fill="#0F0F10" fontFamily={BODY} fontWeight="700" fontSize="10">Reservar</text>
      {/* Pestañas */}
      <rect y="542" width="300" height="58" fill="#1C1C1F" />
      <rect x="11" y="550" width="40" height="24" rx="12" fill="#B6F24A" />
      {[31, 91, 150, 210, 269].map((x, i) => (
        <circle key={x} cx={x} cy="562" r="6" fill="none" stroke={i === 0 ? '#0F0F10' : '#A8A8B0'} strokeWidth="2" />
      ))}
      {[31, 91, 150, 210, 269].map((x) => (
        <rect key={x} x={x - 12} y="580" width="24" height="4" rx="2" fill="#3A3A40" />
      ))}
    </>
  )
}

function QhapaqPedidos() {
  const dishes = [
    { name: 'Chiriuchu', price: 'S/ 38', plate: '#C9603A' },
    { name: 'Rocoto relleno', price: 'S/ 28', plate: '#B23A1E' },
    { name: 'Adobo cusqueño', price: 'S/ 26', plate: '#8A3A20' },
  ]
  return (
    <>
      <rect width="300" height="600" fill="#FFF4E2" />
      <rect width="300" height="128" fill="#A63A1E" />
      <path d="M0 128 L20 118 L40 128 L60 118 L80 128 L100 118 L120 128 L140 118 L160 128 L180 118 L200 128 L220 118 L240 128 L260 118 L280 128 L300 118 V128 Z" fill="#5C7A3A" />
      <text x="20" y="44" fill="#F6E6CB" fontFamily={BODY} fontSize="10">Entregar en</text>
      <text x="20" y="62" fill="#fff" fontFamily={BODY} fontWeight="700" fontSize="13">Calle Plateros 340 ▾</text>
      <circle cx="268" cy="52" r="16" fill="#3B2418" />
      <rect x="20" y="78" width="260" height="30" rx="15" fill="#fff" opacity="0.95" />
      <circle cx="38" cy="93" r="6" fill="none" stroke="#3B2418" strokeWidth="2" />
      <text x="52" y="97" fill="#6B5446" fontFamily={BODY} fontSize="11">Buscar platos…</text>
      <text x="20" y="162" fill="#3B2418" fontFamily={BODY} fontWeight="800" fontSize="18">¿Qué se te antoja?</text>
      {['Fondos', 'Entradas', 'Bebidas'].map((c, i) => (
        <g key={c}>
          <rect x={20 + i * 86} y="174" width="78" height="28" rx="14" fill={i === 0 ? '#A63A1E' : '#F6E6CB'} />
          <text x={59 + i * 86} y="192" textAnchor="middle" fill={i === 0 ? '#fff' : '#A63A1E'} fontFamily={BODY} fontWeight="700" fontSize="11">{c}</text>
        </g>
      ))}
      {dishes.map((d, i) => (
        <g key={d.name} transform={`translate(20 ${218 + i * 92})`}>
          <rect width="260" height="80" rx="16" fill="#fff" />
          <circle cx="44" cy="40" r="28" fill="#F3E3CF" />
          <circle cx="44" cy="40" r="20" fill={d.plate} />
          <circle cx="38" cy="34" r="6" fill="#5C7A3A" opacity="0.8" />
          <text x="86" y="34" fill="#3B2418" fontFamily={BODY} fontWeight="700" fontSize="13">{d.name}</text>
          <text x="86" y="54" fill="#A63A1E" fontFamily={BODY} fontWeight="800" fontSize="13">{d.price}</text>
          <circle cx="232" cy="52" r="14" fill="#5C7A3A" />
          <path d="M232 46v12M226 52h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <rect x="20" y="500" width="260" height="50" rx="25" fill="#A63A1E" />
      <circle cx="50" cy="525" r="13" fill="#5C7A3A" />
      <text x="50" y="530" textAnchor="middle" fill="#fff" fontFamily={BODY} fontWeight="800" fontSize="12">2</text>
      <text x="74" y="530" fill="#fff" fontFamily={BODY} fontWeight="700" fontSize="13">Ver pedido</text>
      <text x="262" y="530" textAnchor="end" fill="#fff" fontFamily={BODY} fontWeight="800" fontSize="13">S/ 66</text>
      <rect x="110" y="572" width="80" height="5" rx="2.5" fill="#d8c3ad" />
    </>
  )
}

function StockAndino() {
  const items = [
    { name: 'Arroz extra 5 kg', qty: '42 und', level: 0.8, color: '#0E4C5A' },
    { name: 'Aceite vegetal 1 L', qty: '3 und', level: 0.1, color: '#D9534F', alert: true },
    { name: 'Leche evaporada 400 g', qty: '18 und', level: 0.45, color: '#F2A93B' },
    { name: 'Azúcar rubia 1 kg', qty: '27 und', level: 0.6, color: '#0E4C5A' },
  ]
  return (
    <>
      <rect width="300" height="600" fill="#F1F4F5" />
      <rect width="300" height="150" fill="#0E4C5A" />
      <text x="20" y="46" fill="#B7CCE3" fontFamily={BODY} fontSize="10">Minimarket Wayra · Cusco</text>
      <text x="20" y="70" fill="#fff" fontFamily={BODY} fontWeight="800" fontSize="20">Stock Andino</text>
      <circle cx="266" cy="56" r="16" fill="#1B6F80" />
      <rect x="20" y="88" width="124" height="48" rx="12" fill="#1B6F80" />
      <text x="32" y="108" fill="#B7CCE3" fontFamily={BODY} fontSize="9">Productos</text>
      <text x="32" y="127" fill="#fff" fontFamily={BODY} fontWeight="800" fontSize="16">248</text>
      <rect x="156" y="88" width="124" height="48" rx="12" fill="#F2A93B" />
      <text x="168" y="108" fill="#3d2410" fontFamily={BODY} fontSize="9">Por agotarse</text>
      <text x="168" y="127" fill="#3d2410" fontFamily={BODY} fontWeight="800" fontSize="16">3</text>
      <rect x="20" y="166" width="260" height="44" rx="12" fill="#FDECEA" />
      <circle cx="40" cy="188" r="9" fill="#D9534F" />
      <text x="40" y="192" textAnchor="middle" fill="#fff" fontFamily={BODY} fontWeight="800" fontSize="11">!</text>
      <text x="58" y="186" fill="#8E2A1D" fontFamily={BODY} fontWeight="700" fontSize="11">Aceite vegetal: quedan 6</text>
      <text x="58" y="200" fill="#8E2A1D" fontFamily={BODY} fontSize="9.5">Te avisamos por WhatsApp</text>
      <text x="20" y="238" fill="#0E4C5A" fontFamily={BODY} fontWeight="800" fontSize="14">Inventario</text>
      {items.map((it, i) => (
        <g key={it.name} transform={`translate(20 ${250 + i * 66})`}>
          <rect width="260" height="56" rx="12" fill="#fff" />
          <rect x="12" y="12" width="32" height="32" rx="8" fill="#D6E7EA" />
          <text x="54" y="26" fill="#1b2b3c" fontFamily={BODY} fontWeight="700" fontSize="11">{it.name}</text>
          <rect x="54" y="36" width="130" height="6" rx="3" fill="#E6EDF5" />
          <rect x="54" y="36" width={130 * it.level} height="6" rx="3" fill={it.color} />
          <text x="246" y="34" textAnchor="end" fill={it.alert ? '#B8392A' : '#0E4C5A'} fontFamily={BODY} fontWeight="800" fontSize="11">{it.qty}</text>
        </g>
      ))}
      <circle cx="246" cy="540" r="26" fill="#F2A93B" />
      <path d="M234 532v-6h6M252 526h6v6M258 548v6h-6M240 554h-6v-6M236 540h20" stroke="#3d2410" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="110" y="580" width="80" height="5" rx="2.5" fill="#B7CCE3" />
    </>
  )
}

const SCREENS = { 'app-gym': PumaFit, 'app-restaurante': QhapaqPedidos, 'app-inventario': StockAndino }

export default function AppScreen({ app, className = '' }) {
  const Screen = SCREENS[app] ?? PumaFit
  return (
    <svg viewBox="0 0 300 600" preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true" focusable="false">
      <Screen />
    </svg>
  )
}
