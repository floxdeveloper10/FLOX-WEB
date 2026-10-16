import RestaurantLogo from './RestaurantLogo.jsx'

// Foto de perfil del contacto en el chat de ejemplo
export default function ChatAvatar({ avatar = 'restaurant', size = 36 }) {
  if (avatar === 'dental') {
    // Consultorio dental ficticio: un diente sobre turquesa
    return (
      <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="20" fill="#E0F5F2" />
        <path
          d="M14 11.5c-2.6 0-4.4 2.2-4.1 5.3.3 2.7 1.4 4.3 1.9 7.3.4 2.6.8 5 2.4 5 1.4 0 1.7-2 2.2-4.2.4-1.6.9-2.6 3.6-2.6s3.2 1 3.6 2.6c.5 2.2.8 4.2 2.2 4.2 1.6 0 2-2.4 2.4-5 .5-3 1.6-4.6 1.9-7.3.3-3.1-1.5-5.3-4.1-5.3-2.3 0-3.1 1.2-6 1.2s-3.7-1.2-6-1.2Z"
          fill="#fff"
          stroke="#00786E"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return <RestaurantLogo size={size} />
}
