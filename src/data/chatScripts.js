// Guiones del chat de WhatsApp de ejemplo (componente ChatDemo).
// El del restaurante está en site.js (demo.chat); aquí van los de otros rubros.
// contact.avatar: 'restaurant' | 'dental' · lang: idioma de los mensajes
// from: 'guest' (cliente, burbuja verde) | 'bot' (negocio, burbuja blanca)

export const chatScripts = {
  consultorio: {
    label: 'Chatbot de citas por WhatsApp',
    note: 'El chatbot agenda la cita y un día antes envía el recordatorio.',
    replay: 'Repetir conversación',
    online: 'en línea',
    typing: 'escribiendo...',
    lang: 'es',
    contact: { name: 'Sonrisa Andina', place: 'Consultorio dental · Cusco', avatar: 'dental' },
    messages: [
      { from: 'guest', time: '09:12', text: 'Hola, ¿tienen cita para limpieza dental este jueves?' },
      { from: 'bot', time: '09:12', text: '¡Hola! 😊 Sí, el jueves tenemos libre a las 10:00 a. m. y a las 4:30 p. m. ¿Cuál prefieres?' },
      { from: 'guest', time: '09:13', text: 'A las 4:30, por favor' },
      { from: 'bot', time: '09:13', text: 'Perfecto. ¿Me das tu nombre completo?' },
      { from: 'guest', time: '09:13', text: 'María Huamán' },
      { from: 'bot', time: '09:14', text: '¡Listo, María! Tu limpieza dental quedó para el jueves a las 4:30 p. m. ✅' },
      { from: 'bot', time: 'Mié 16:30', text: '🔔 Recordatorio: mañana a las 4:30 p. m. tienes tu cita en Sonrisa Andina. Responde 1 para confirmar o 2 para cambiarla.' },
      { from: 'guest', time: 'Mié 16:41', text: '1' },
      { from: 'bot', time: 'Mié 16:41', text: '¡Gracias! Te esperamos mañana 🦷' },
    ],
  },
}
