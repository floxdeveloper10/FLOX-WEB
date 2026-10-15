# FLOX — web

Web de **FLOX**, micro agencia de tecnología de Cusco: webs, apps móviles y atención por WhatsApp para negocios.
Incluye las páginas de FLOX (inicio, Nosotros, Proyectos, Apps) y los proyectos demo con negocios ficticios
(hotel, agencia de turismo y tres apps).

Publicada en: https://floxdeveloper10.github.io/flox-web/

## Correr el proyecto en tu computadora

Necesitas [Node.js](https://nodejs.org/) 20 o más reciente.

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev     # abre la web en http://localhost:5173/flox-web/
```

Otros comandos:

```bash
npm run build    # construye la versión final en la carpeta dist/
npm run preview  # muestra esa versión final en http://localhost:4173/flox-web/
npm run lint     # revisa el código
npm run og       # vuelve a generar la imagen para compartir (public/og-image.png)
```

## Publicar

La web se publica sola en GitHub Pages cada vez que se sube un cambio a la rama `main`
(lo hace `.github/workflows/deploy.yml`). Solo hay que activarlo una vez en GitHub:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Cambiar los datos de contacto

Todo está en **`src/data/site.js`**: número de WhatsApp, correo y redes sociales.
Si cambias el número, todos los botones de WhatsApp de la web (también los de las demos) usan el nuevo.

Otros textos que se cambian seguido:

- `src/data/site.js`: textos del inicio, servicios y precios.
- `src/data/proyectos.js`: proyectos demo que se muestran en Proyectos.
- `src/data/seo.js`: título y descripción de cada página (para Google).
- `src/data/nosotros.js`: página Nosotros (falta la foto del fundador, marcada como `[FOTO FUNDADOR]`).
