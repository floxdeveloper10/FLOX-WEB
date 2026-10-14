// Carta de la demo: "Picantería Qhapaq", un restaurante ficticio.
// Cada texto va en ES y EN. Los precios son de ejemplo, en soles.

export const restaurant = {
  name: 'Picantería Qhapaq',
  place: 'San Blas, Cusco',
  tagline: { es: 'Cocina cusqueña de siempre', en: 'Traditional Cusco cuisine' },
  rating: 4.8,
  reviews: 326,
  hours: { es: 'Abierto · hasta 10 p. m.', en: 'Open · until 10 pm' },
}

// Tipo de cambio referencial para mostrar precios en dólares
export const USD_RATE = 3.75

export function formatPrice(soles, currency) {
  if (currency === 'USD') return `US$ ${(soles / USD_RATE).toFixed(2)}`
  return `S/ ${soles}`
}

export const menuUi = {
  languageLabel: { es: 'Idioma de la carta', en: 'Menu language' },
  currencyLabel: { es: 'Moneda', en: 'Currency' },
  ratingLabel: { es: 'de 5, reseñas:', en: 'out of 5, reviews:' },
  categoriesLabel: { es: 'Categorías', en: 'Categories' },
  chefPick: { es: 'Recomendado del chef', en: "Chef's pick" },
  options: { es: (n) => `${n} ${n === 1 ? 'opción' : 'opciones'}`, en: (n) => `${n} ${n === 1 ? 'option' : 'options'}` },
  add: { es: 'Agregar', en: 'Add' },
  addOne: { es: 'Agregar uno', en: 'Add one' },
  removeOne: { es: 'Quitar uno', en: 'Remove one' },
  inOrder: { es: 'en tu pedido', en: 'in your order' },
  addToOrder: { es: 'Agregar', en: 'Add' },
  quantity: { es: 'Cantidad', en: 'Quantity' },
  spicyTitle: { es: 'Picante', en: 'Spice level' },
  spicyLevels: {
    es: ['No pica', 'Suave', 'Medio', 'Muy picante'],
    en: ['Not spicy', 'Mild', 'Medium', 'Hot'],
  },
  allergensTitle: { es: 'Alérgenos', en: 'Allergens' },
  noAllergens: { es: 'Sin alérgenos comunes', en: 'No common allergens' },
  viewOrder: { es: 'Ver mi pedido', en: 'View my order' },
  orderTitle: { es: 'Tu pedido', en: 'Your order' },
  total: { es: 'Total', en: 'Total' },
  orderHint: {
    es: 'Muéstrale esta pantalla al mozo o llámalo desde aquí.',
    en: 'Show this screen to your waiter or call them from here.',
  },
  callWaiter: { es: 'Llamar al mozo', en: 'Call the waiter' },
  waiterComing: { es: '¡Listo! El mozo ya viene', en: 'Done! Waiter on the way' },
  keepBrowsing: { es: 'Seguir viendo la carta', en: 'Keep browsing' },
  close: { es: 'Cerrar', en: 'Close' },
  footnote: {
    es: `Precios de ejemplo · US$ referencial (S/ ${USD_RATE})`,
    en: `Sample prices · US$ for reference (S/ ${USD_RATE})`,
  },
  poweredBy: { es: 'Carta digital creada por FLOX', en: 'Digital menu by FLOX' },
}

export const tagLabels = {
  popular: { es: 'Popular', en: 'Popular' },
  chef: { es: 'Recomendado', en: "Chef's pick" },
  new: { es: 'Nuevo', en: 'New' },
  veg: { es: 'Vegetariano', en: 'Vegetarian' },
  alcohol: { es: 'Con alcohol', en: 'Contains alcohol' },
}

export const allergenLabels = {
  lacteos: { es: 'Lácteos', en: 'Dairy' },
  gluten: { es: 'Gluten', en: 'Gluten' },
  huevo: { es: 'Huevo', en: 'Egg' },
  pescado: { es: 'Pescado', en: 'Fish' },
  mani: { es: 'Maní', en: 'Peanuts' },
}

// art: ilustración del plato (ver DishArt.jsx) · spicy: 0 a 3
export const categories = [
  {
    id: 'entradas',
    icon: 'entradas',
    label: { es: 'Entradas', en: 'Starters' },
    title: { es: 'Entradas', en: 'Starters' },
    dishes: [
      {
        id: 'choclo',
        art: 'choclo',
        name: { es: 'Choclo con queso', en: 'Corn with cheese' },
        description: { es: 'Choclo del Valle con queso fresco', en: 'Sacred Valley corn with fresh cheese' },
        detail: {
          es: 'Choclo del Valle Sagrado, de grano gigante y tierno, con una tajada de queso fresco andino. El clásico para empezar.',
          en: 'Giant-kernel corn from the Sacred Valley with a slice of fresh Andean cheese. The classic way to start.',
        },
        price: 12,
        tags: ['popular', 'veg'],
        spicy: 0,
        allergens: ['lacteos'],
      },
      {
        id: 'rocoto',
        art: 'rocoto',
        name: { es: 'Rocoto relleno', en: 'Stuffed rocoto pepper' },
        description: { es: 'Relleno de carne, gratinado con queso', en: 'Stuffed with beef, topped with cheese' },
        detail: {
          es: 'Rocoto al horno relleno de carne picada, maní y pasas, gratinado con queso. Picante, pero con mucho sabor.',
          en: 'Baked rocoto pepper stuffed with minced beef, peanuts and raisins, topped with melted cheese. Spicy and full of flavor.',
        },
        price: 18,
        tags: ['popular'],
        spicy: 2,
        allergens: ['lacteos', 'mani'],
      },
      {
        id: 'kapchi',
        art: 'kapchi',
        name: { es: 'Kapchi de setas', en: 'Mushroom kapchi' },
        description: { es: 'Setas en salsa cremosa de queso', en: 'Mushrooms in a creamy cheese sauce' },
        detail: {
          es: 'Guiso cremoso de setas de la zona con queso fresco, leche y un toque de ají amarillo. Receta de la abuela.',
          en: 'Creamy stew of local mushrooms with fresh cheese, milk and a hint of yellow chili. Grandma’s recipe.',
        },
        price: 16,
        tags: ['new', 'veg'],
        spicy: 1,
        allergens: ['lacteos'],
      },
    ],
  },
  {
    id: 'fondo',
    icon: 'fondo',
    label: { es: 'Fondos', en: 'Mains' },
    title: { es: 'Platos de fondo', en: 'Main dishes' },
    dishes: [
      {
        id: 'chiriuchu',
        art: 'chiriuchu',
        name: { es: 'Chiriuchu', en: 'Chiriuchu' },
        description: { es: 'El plato del Corpus Christi', en: 'The Corpus Christi feast platter' },
        detail: {
          es: 'El plato del Corpus Christi cusqueño: cuy, gallina, charqui, chorizo, cochayuyo, queso, torreja y rocoto. Se come con la mano.',
          en: 'Cusco’s Corpus Christi feast: guinea pig, hen, jerky, sausage, seaweed, cheese, corn fritter and rocoto. Eaten by hand.',
        },
        price: 38,
        tags: ['chef'],
        spicy: 1,
        allergens: ['gluten', 'huevo', 'lacteos'],
      },
      {
        id: 'adobo',
        art: 'adobo',
        name: { es: 'Adobo cusqueño', en: 'Cusco-style adobo' },
        description: { es: 'Cerdo en chicha de jora, con pan chuta', en: 'Pork in corn beer, with chuta bread' },
        detail: {
          es: 'Cerdo macerado toda la noche en chicha de jora y ají panca, cocido a fuego lento. Se acompaña con pan chuta.',
          en: 'Pork marinated overnight in corn beer and panca chili, slow-cooked. Served with traditional chuta bread.',
        },
        price: 25,
        tags: ['popular'],
        spicy: 1,
        allergens: ['gluten'],
      },
      {
        id: 'lechon',
        art: 'lechon',
        name: { es: 'Lechón al horno', en: 'Roast suckling pig' },
        description: { es: 'Piel crocante, con tamal y sarsa', en: 'Crispy skin, with tamale and salsa' },
        detail: {
          es: 'Lechón horneado en horno de leña, con la piel bien crocante, tamal de maíz y sarsa criolla.',
          en: 'Suckling pig roasted in a wood oven with extra-crispy skin, corn tamale and Creole onion salsa.',
        },
        price: 32,
        tags: [],
        spicy: 0,
        allergens: [],
      },
      {
        id: 'trucha',
        art: 'trucha',
        name: { es: 'Trucha frita', en: 'Fried trout' },
        description: { es: 'Con papas nativas, arroz y ensalada', en: 'With native potatoes, rice and salad' },
        detail: {
          es: 'Trucha fresca de río andino, frita y dorada, con papas nativas, arroz y ensalada fresca.',
          en: 'Fresh Andean river trout, fried golden, with native potatoes, rice and a fresh salad.',
        },
        price: 28,
        tags: ['popular'],
        spicy: 0,
        allergens: ['pescado', 'gluten'],
      },
      {
        id: 'quinotto',
        art: 'quinotto',
        name: { es: 'Quinotto de setas', en: 'Mushroom quinotto' },
        description: { es: 'Quinua cremosa con setas', en: 'Creamy quinoa with mushrooms' },
        detail: {
          es: 'Quinua cremosa al estilo risotto con setas, queso andino y hierbas frescas.',
          en: 'Creamy risotto-style quinoa with mushrooms, Andean cheese and fresh herbs.',
        },
        price: 26,
        tags: ['new', 'veg'],
        spicy: 0,
        allergens: ['lacteos'],
      },
    ],
  },
  {
    id: 'bebidas',
    icon: 'bebidas',
    label: { es: 'Bebidas', en: 'Drinks' },
    title: { es: 'Bebidas', en: 'Drinks' },
    dishes: [
      {
        id: 'chicha-morada',
        art: 'chicha',
        name: { es: 'Chicha morada', en: 'Chicha morada' },
        description: { es: 'Maíz morado, piña y canela', en: 'Purple corn, pineapple and cinnamon' },
        detail: {
          es: 'Refresco de maíz morado hervido con piña, canela y clavo. Sin alcohol y bien helado.',
          en: 'Soft drink of purple corn boiled with pineapple, cinnamon and clove. Alcohol-free and ice-cold.',
        },
        price: 8,
        tags: ['popular'],
        spicy: 0,
        allergens: [],
      },
      {
        id: 'mate',
        art: 'mate',
        name: { es: 'Mate de coca', en: 'Coca leaf tea' },
        description: { es: 'Ideal para la altura', en: 'Perfect for the altitude' },
        detail: {
          es: 'Hojas de coca en agua caliente. La bebida tradicional para sentirte bien en la altura.',
          en: 'Coca leaves in hot water. The traditional drink to feel good at high altitude.',
        },
        price: 5,
        tags: [],
        spicy: 0,
        allergens: [],
      },
      {
        id: 'jora',
        art: 'jora',
        name: { es: 'Chicha de jora', en: 'Chicha de jora' },
        description: { es: 'Maíz fermentado, receta ancestral', en: 'Fermented corn, ancestral recipe' },
        detail: {
          es: 'Bebida ancestral de maíz fermentado, ligera y espumosa, como en las chicherías de antes.',
          en: 'Ancestral fermented corn beer, light and foamy, just like in the old chicherías.',
        },
        price: 7,
        tags: ['alcohol'],
        spicy: 0,
        allergens: [],
      },
      {
        id: 'emoliente',
        art: 'emoliente',
        name: { es: 'Emoliente', en: 'Emoliente' },
        description: { es: 'Hierbas calientes con limón y miel', en: 'Hot herbal drink with lemon and honey' },
        detail: {
          es: 'Bebida caliente de hierbas, linaza y cebada, con limón y miel. Perfecta para las noches frías.',
          en: 'Hot drink of herbs, flaxseed and barley, with lemon and honey. Perfect for cold nights.',
        },
        price: 6,
        tags: ['new'],
        spicy: 0,
        allergens: [],
      },
    ],
  },
  {
    id: 'postres',
    icon: 'postres',
    label: { es: 'Postres', en: 'Desserts' },
    title: { es: 'Postres', en: 'Desserts' },
    dishes: [
      {
        id: 'picarones',
        art: 'picarones',
        name: { es: 'Picarones', en: 'Picarones' },
        description: { es: 'Con miel de chancaca', en: 'With chancaca syrup' },
        detail: {
          es: 'Anillos fritos de masa de zapallo y camote, bañados en miel de chancaca recién hecha.',
          en: 'Fried pumpkin and sweet-potato rings drizzled with freshly made chancaca syrup.',
        },
        price: 12,
        tags: ['popular'],
        spicy: 0,
        allergens: ['gluten'],
      },
      {
        id: 'mazamorra',
        art: 'mazamorra',
        name: { es: 'Mazamorra morada', en: 'Purple corn pudding' },
        description: { es: 'Maíz morado con frutas y canela', en: 'Purple corn with fruit and cinnamon' },
        detail: {
          es: 'Postre tradicional de maíz morado con frutas secas, piña y canela.',
          en: 'Traditional purple corn pudding with dried fruit, pineapple and cinnamon.',
        },
        price: 9,
        tags: ['veg'],
        spicy: 0,
        allergens: [],
      },
      {
        id: 'arroz-con-leche',
        art: 'arroz',
        name: { es: 'Arroz con leche', en: 'Rice pudding' },
        description: { es: 'Cremoso, con canela', en: 'Creamy, with cinnamon' },
        detail: {
          es: 'Arroz cocido lentamente en leche con canela y clavo. Cremoso y casero.',
          en: 'Rice slowly cooked in milk with cinnamon and clove. Creamy and homemade.',
        },
        price: 9,
        tags: ['veg'],
        spicy: 0,
        allergens: ['lacteos'],
      },
    ],
  },
]

export const allDishes = categories.flatMap((c) => c.dishes)
export const chefPick = allDishes.find((d) => d.tags.includes('chef'))
