# SpainRoom — SEO + Analytics + API (Patch)
## Qué incluye
- **SEO por ruta** con `react-helmet-async` (Inicio, Jobs, Reservas, Oportunidades).
- **Google Analytics GA4** (opcional) mediante `VITE_GA4_ID`.
- **Sentry** (opcional) mediante `VITE_SENTRY_DSN`.
- **APIs mínimas**:
  - `GET /api/jobs/nearby?lat=&lng=&radius_km=2`
  - `GET /api/jobs/search?query=&lat=&lng=&radius_km=20`
  - `POST /api/reservas` (recibe JSON y responde 200).
- **robots.txt** y **sitemap.xml** en `public/`.
- `vercel.json` con `routes` (prioriza `/api` y mantiene SPA).

## Instalación
1) Copia **todo** el contenido de este ZIP en tu proyecto **madre** (`C:\spainroom\frontend`), respetando rutas:
   - `src/main.jsx` (ENVUELVE App con `HelmetProvider` y carga CSS global)
   - `src/pages/InicioElegante.jsx` (SEO)
   - `src/pages/Jobs.jsx`, `src/pages/Reservas.jsx`, `src/pages/Oportunidades.jsx` (si ya existen, añade el `<Helmet>` igual que en estos ejemplos)
   - `public/robots.txt`, `public/sitemap.xml`
   - `api/jobs/nearby.js`, `api/jobs/search.js`, `api/reservas.js`
   - `vercel.json` (con `routes`)
2) Dependencias:
   - Ejecuta `scripts\INSTALL_DEPS.cmd` o `npm i react-helmet-async @sentry/react`
3) (Opcional) Variables:
   - `scripts\SET_ENV_TRACKING.cmd` y rellena `GAID`/`SENTRY_DSN`
4) Despliegue:
   - `scripts\DEPLOY_SEO_API.cmd` o:
     ```
     npx vercel build --prod
     npx vercel deploy --prebuilt --prod --yes
     ```
