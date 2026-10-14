# FLOX — Brief de la página web (v2)

Instrucciones para que Claude Code construya la web de FLOX. Seguir este documento al pie de la letra.

## 1. Objetivo
Una web de una sola página que haga que un dueño de negocio de Cusco piense **"quiero algo así para mi negocio"** y nos escriba por WhatsApp.
- La web es en sí misma la muestra de lo que vendemos, así que tiene que impresionar.
- Se va a mostrar en el celular durante visitas a negocios y será el destino de los anuncios de Google. **Primero móvil**, y que cargue rápido con datos móviles.
- Acción principal en toda la página: **escribir por WhatsApp**.

## 2. Datos reales de FLOX
| Dato | Valor |
|---|---|
| Nombre | FLOX |
| Ciudad | Cusco, Perú |
| Correo | developerflox@gmail.com |
| WhatsApp | +51 927 484 492 |
| Enlace de WhatsApp | `https://wa.me/51927484492?text=Hola%20FLOX%2C%20quiero%20una%20demo%20para%20mi%20negocio` |
| Facebook | https://www.facebook.com/profile.php?id=61576914354970 |
| Instagram | [PENDIENTE]: no mostrar el ícono hasta tener el enlace |
| TikTok | [PENDIENTE]: no mostrar el ícono hasta tener el enlace |
| GitHub | floxdeveloper10 |
| Dirección pública | `https://floxdeveloper10.github.io/flox-web/` |

Guardar todos estos datos en **un solo archivo**, `src/data/site.js`, para cambiarlos en un solo lugar. Las redes pendientes van como `null` y el componente no las muestra.

## 3. Tecnología
- **React + Vite** (JavaScript) y **Framer Motion** para las animaciones. No agregar más librerías sin necesidad.
- Estructura:
  ```
  src/
  ├── data/site.js           (datos de contacto y redes)
  ├── data/carta.js          (platos de la demo, en ES y EN)
  ├── components/            (un componente por sección)
  ├── components/brand/      (Chakana.jsx, LogoFlox.jsx, StepBand.jsx)
  ├── styles/                (variables de color y estilos globales)
  ├── App.jsx
  └── main.jsx
  ```
- `vite.config.js` con `base: '/flox-web/'` para GitHub Pages.
- Publicación con **GitHub Actions** en GitHub Pages.
- Respetar `prefers-reduced-motion`: si el usuario lo pide, sin animaciones.

## 4. Marca (no cambiar)
**Imagen de referencia:** `docs/logo-referencia.png` muestra las 4 versiones del logo (a color, blanco, negro y perfil). Es solo para comparar visualmente. En la web, el logo se dibuja con los **SVG de abajo** como componentes React, no como imagen.

| Color | Código | Uso |
|---|---|---|
| Fucsia | #E8185D | Color principal |
| Morado andino | #2D1450 | Textos y fondos oscuros |
| Naranja | #FF6B1A | Botones y llamados a la acción |
| Amarillo inti | #FFC21A | Detalles y acentos |
| Turquesa | #00B8A9 | Tecnología |
| Crema | #FFF6EC | Fondos claros |

- Definir los colores como variables CSS (`--flox-fucsia`, etc.).
- Tipografía: **Space Grotesk** (Google Fonts), pesos 500 y 700.
- Reglas del logo: no deformarlo, rotarlo ni cambiarle los colores. Sobre morado se usa la versión blanca. Dejar espacio libre alrededor.
- Tono: cercano y claro. Se habla de vender más, ahorrar y evitar pérdidas, sin términos técnicos. Tutear al visitante.

### Chakana tecnológica (componente `Chakana.jsx`)
Acepta una prop `variant`: `color` | `white` | `black`.
```html
<svg viewBox="-6 -6 76 76" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#00B8A9" stroke-width="5" d="M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z"/>
  <path fill="none" stroke="#FF6B1A" stroke-width="3.5" d="M32 24 V8 M32 40 V56 M24 32 H8 M40 32 H56"/>
  <circle cx="32" cy="8" r="4" fill="#FFC21A"/><circle cx="32" cy="56" r="4" fill="#FFC21A"/>
  <circle cx="8" cy="32" r="4" fill="#FFC21A"/><circle cx="56" cy="32" r="4" fill="#FFC21A"/>
  <rect x="24" y="24" width="16" height="16" rx="2" fill="#E8185D"/>
</svg>
```

### Letras FLOX (componente `LogoFlox.jsx`, logo completo: chakana arriba y letras abajo)
```html
<!-- F fucsia -->   <svg viewBox="0 0 48 64"><path fill="#E8185D" d="M0 0 H48 V8 H40 V16 H16 V24 H36 V32 H32 V40 H16 V64 H0 Z"/></svg>
<!-- L naranja -->  <svg viewBox="0 0 48 64"><path fill="#FF6B1A" d="M0 0 H16 V48 H40 V56 H48 V64 H0 Z"/></svg>
<!-- O morado -->   <svg viewBox="0 0 64 64"><path fill-rule="evenodd" fill="#2D1450" d="M24 0 H40 V8 H48 V16 H56 V24 H64 V40 H56 V48 H48 V56 H40 V64 H24 V56 H16 V48 H8 V40 H0 V24 H8 V16 H16 V8 H24 Z M32 21 A11 11 0 1 0 32 43 A11 11 0 1 0 32 21 Z"/><circle cx="32" cy="32" r="5" fill="#FFC21A"/></svg>
<!-- X turquesa --> <svg viewBox="0 0 64 64"><g fill="#00B8A9"><rect x="0" y="0" width="16" height="16"/><rect x="8" y="8" width="16" height="16"/><rect x="16" y="16" width="16" height="16"/><rect x="24" y="24" width="16" height="16"/><rect x="32" y="32" width="16" height="16"/><rect x="40" y="40" width="16" height="16"/><rect x="48" y="48" width="16" height="16"/><rect x="48" y="0" width="16" height="16"/><rect x="40" y="8" width="16" height="16"/><rect x="32" y="16" width="16" height="16"/><rect x="16" y="32" width="16" height="16"/><rect x="8" y="40" width="16" height="16"/><rect x="0" y="48" width="16" height="16"/></g></svg>
```
- Proporción: las letras van separadas unos 5 px y cada letra mide aprox. 1/4 del ancho de la chakana. Comparar con `docs/logo-referencia.png`.
- Versión horizontal para el encabezado: chakana pequeña a la izquierda y letras FLOX a la derecha.

### Franja andina (componente `StepBand.jsx`)
Una fila de pirámides escalonadas (4 escalones de 8 px) que repiten fucsia → naranja → amarillo → turquesa, como en la portada de Facebook.

## 5. Efecto "wow"
1. **Chakana que se enciende (portada):** el contorno turquesa se dibuja solo, después las pistas naranjas se iluminan desde el chip central hacia las 4 puntas y al final los contactos amarillos laten suavemente en bucle. Es como una placa electrónica que se prende.
2. **Demo en vivo de la carta digital:** un celular dibujado con CSS (sin imagen) con la carta de un restaurante ficticio, **"Picantería Qhapaq"**.
   - Botón **ES / EN** que cambia el idioma al instante, con una transición suave.
   - Categorías tocables: Entradas, Platos de fondo, Bebidas.
   - 6 a 8 platos cusqueños con precios **de ejemplo** (chiriuchu, adobo, lechón, trucha, chicha morada, mate de coca, etc.).
   - Debajo del celular, un código QR decorativo y el texto "Así la ven tus clientes al escanear el QR".
3. **Demo del chatbot de WhatsApp:** un chat que se escribe solo cuando aparece en pantalla.
   - El turista pregunta en inglés si hay mesa para 4 a las 8 pm. El bot responde en inglés, confirma la reserva y envía la ubicación.
   - Burbujas con el estilo de WhatsApp, "escribiendo..." entre mensajes y un botón para repetir la animación.
4. **Animaciones al hacer scroll:** las secciones aparecen con movimiento suave y escalonado. Las tarjetas se elevan al pasar el mouse o al tocarlas.
5. **Franja andina animada** en el pie de página, desplazándose lentamente.
6. **Botón flotante de WhatsApp** abajo a la derecha, visible siempre en el móvil, con un pulso suave cada pocos segundos.

Todo debe sentirse fluido en un celular de gama media. Usar solo `transform` y `opacity` en las animaciones.

## 6. Secciones (en este orden)
1. **Encabezado fijo:** logo horizontal y, a la derecha, el botón naranja "Escríbenos". En escritorio, enlaces a Servicios, Demo, Precios y Contacto. En el móvil, solo el logo y el botón.
2. **Portada (hero):** fondo morado (#2D1450).
   - Arriba: "Tecnología hecha en Cusco" (amarillo, mayúsculas espaciadas).
   - Título: **"Vende más y pierde menos"**, con "pierde menos" en amarillo.
   - Subtítulo: "con tecnología sencilla para tu negocio".
   - Botón principal: "Pide tu demo gratis por WhatsApp". Botón secundario: "Ver cómo funciona", que baja a la demo.
   - A un lado (debajo en el móvil): la chakana que se enciende, en grande.
3. **Problemas que resolvemos:** tres tarjetas con preguntas de dolor y su solución en una línea.
   - "¿Los turistas te piden la carta en inglés?" → carta digital multilingüe con QR.
   - "¿Pierdes clientes porque no respondes WhatsApp a tiempo?" → chatbot que responde 24/7.
   - "¿Tu negocio no aparece en Google Maps?" → configuramos tu perfil para que te encuentren.
4. **Servicios:** tres tarjetas, una por línea, cada una con su color.
   - **FLOX Web** (fucsia): páginas web, cartas digitales con QR en varios idiomas, perfiles de Google Maps y redes.
   - **FLOX Auto** (naranja): chatbots de WhatsApp y sistema de citas con recordatorios.
   - **FLOX Sense** (turquesa): sensores con alertas por WhatsApp para refrigeradoras y tanques. Etiqueta **"Próximamente"**.
5. **Pruébalo tú mismo:** la demo de la carta y la demo del chatbot, una al lado de la otra en escritorio y una debajo de la otra en el móvil.
6. **Cómo trabajamos:** 3 pasos numerados: "Visitamos tu negocio" → "Te mostramos una demo con tus datos" → "Lo dejamos funcionando y te enseñamos a usarlo".
7. **Precios:** tres tarjetas con precios "desde":
   - Carta digital con QR: desde S/ 250
   - Web de una página: desde S/ 600
   - Perfil de Google Maps y redes: desde S/ 150
   - Nota: "Precio de lanzamiento para los primeros clientes. Trabajamos con 50 % de adelanto."
   - Cada tarjeta tiene su botón "Lo quiero", que abre WhatsApp con un mensaje que nombra ese servicio.
8. **Por qué FLOX:** bloque corto con tres razones: "Somos de Cusco y te visitamos", "Te explicamos todo sin términos técnicos" y "Soporte por WhatsApp".
9. **Contacto:** fondo morado. Botón grande de WhatsApp, el correo como enlace `mailto:`, "Cusco, Perú" y el ícono de Facebook.
10. **Pie de página:** logo blanco, franja andina animada y "© 2026 FLOX · Hecho en Cusco".

## 7. SEO y vista previa al compartir
- `<html lang="es">`
- Título: "FLOX | Webs, cartas digitales y WhatsApp para negocios en Cusco"
- Meta descripción: "Ayudamos a restaurantes, hostales, agencias y tiendas de Cusco a vender más con webs, cartas digitales con QR y atención automática por WhatsApp."
- Open Graph y Twitter Card con una imagen **1200×630** (`public/og-image.png`): logo blanco sobre morado con la frase "Vende más y pierde menos". Generarla como SVG y exportarla a PNG.
- Favicon: la chakana a color (`public/favicon.svg`).
- HTML semántico (`header`, `main`, `section`, `footer`), textos alternativos, contraste mínimo de 4.5:1 y botones reales (`<a>` o `<button>`).

## 8. Revisión final (Claude Code debe comprobar)
- [ ] Se ve bien a 360 px de ancho (celular) y a 1440 px (escritorio), sin scroll horizontal.
- [ ] Todos los botones de WhatsApp abren `wa.me/51927484492` con el mensaje correcto.
- [ ] La demo de la carta cambia entre ES y EN y las categorías funcionan.
- [ ] El chat se anima al aparecer en pantalla y se puede repetir.
- [ ] No aparecen íconos de Instagram ni TikTok mientras sean `null`.
- [ ] `npm run build` termina sin errores y la web funciona en `/flox-web/`.
- [ ] Lighthouse en móvil con 90 o más en rendimiento y accesibilidad.

## 9. Fuera de alcance por ahora
Versión completa en inglés, blog, formulario con servidor, dominio propio (se comprará flox.pe cuando haya ingresos) y FLOX Sense funcional.
