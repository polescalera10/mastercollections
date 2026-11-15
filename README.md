# Master Collections — Landing

Landing de una sola página para **Master Collections**, comunidad de compraventa y aprendizaje sobre relojes de segunda mano. Misión única: que el visitante se una a la **comunidad gratuita de Telegram**.

Construida con **Next.js 16 (App Router, React 19) + TypeScript + Tailwind CSS + Framer Motion**. Home y catálogo son dinámicos (leen el catálogo del almacenamiento); el resto es estático.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # linting
```

## Despliegue

### Demo (Netlify) — datos ficticios

URL: https://mastercollections-demo.netlify.app (proyecto Netlify `mastercollections-demo`).

- `netlify.toml` activa `NEXT_PUBLIC_DEMO_MODE=true` en el build: aviso "Demo · datos ficticios", `noindex` y `robots.txt` con `Disallow: /`.
- El catálogo y las fotos subidas viven en **Netlify Blobs** (`lib/storage.ts`). La primera vez que se lee el catálogo en modo demo se siembran 6 piezas ficticias (`lib/demo-watches.ts`, ilustraciones en `public/demo/`).
- `ADMIN_PASSWORD` está como variable secreta del proyecto en Netlify. Sin ella (o fuera de Netlify) `/admin` queda desactivado: **no hay contraseña por defecto**.
- Desplegar: `netlify deploy --build --prod` (proyecto ya enlazado con `netlify link --id f387641a-f082-4162-8907-ae9e1acf4533`).

### Autodeploy

El proyecto Netlify está enlazado al repo `polescalera10/mastercollections` (rama `main`) mediante la app de GitHub de Netlify: **cada push a `main` despliega solo**. Vercel ya no se usa. El dominio `mastercollectionsclub.com` no apunta a Netlify todavía (sigue en el hosting antiguo): para publicarlo hay que añadirlo en Netlify y cambiar el DNS.

## Qué tienes que rellenar (busca `TODO` en el código)

Todos los datos pendientes están marcados con `// TODO` o `[TODO]`. Los principales:

### Datos y métricas — `lib/site.ts`
- `metrics.telegramMembers` — nº real de miembros de Telegram.
- `metrics.youtubeSubscribers` — nº real de suscriptores de YouTube.
- `metrics.operations` — operaciones / relojes movidos (si existe el dato).
- `metrics.years` — años activos.

> Mientras una métrica sea `null` se muestra como placeholder visible (p. ej. `[X.XXX]`).
> Si un dato no va a existir, elimina su bloque en `components/Stats.tsx`. **No inventes números.**

### Imágenes (`/public`)
- `hero.jpg` — foto macro de reloj para el hero (ver `components/Hero.tsx`).
- `toni.jpg` — retrato real de Toni (ver `components/About.tsx`).
- `og.jpg` — imagen Open Graph dedicada **1200×630** (ver `app/layout.tsx`).
- `logo.png` / `logo.svg` — logo de marca (nav, footer y JSON-LD).
- `favicon.ico` — en `app/favicon.ico`.

### Vídeos de YouTube — `components/Content.tsx`
- Rellena el array `videos` con los **IDs reales** de 3 vídeos del canal. La miniatura y el
  enlace se generan automáticamente a partir del ID.

### Sobre Toni — `components/About.tsx`
- Sustituye las 2 frases de la biografía por su historia real.

### Textos legales — `app/legal/page.tsx` y `app/privacidad/page.tsx`
- Titular, NIF/CIF, domicilio, email de contacto y fechas.

## Páginas

| Ruta | Qué es |
|------|--------|
| `/` | Landing principal (una sola misión: Telegram). |
| `/links` | Hub estilo Linktree: Telegram, Web, YouTube, Instagram, TikTok, ebook. |
| `/ebook-gratis` | Captura de lead (Nombre + Email) para el ebook gratuito. |
| `/ebook-gratis/gracias` | Descarga directa del PDF + CTA a Telegram (replica el email de entrega). |
| `/relojes` | Escaparate de drops (catálogo). |
| `/admin` | Panel privado: alta de relojes, fotos, estados y difusión a Telegram/WhatsApp. |
| `/legal`, `/privacidad`, `/cookies` | Textos legales. |

## Captura del ebook (leads + descarga)

El formulario de `/ebook-gratis` hace **descarga directa**: al enviarlo, el usuario va a
`/ebook-gratis/gracias` y se baja el PDF al instante (servido desde
`public/ebook-master-collections.pdf`, ya no depende de WordPress).

El email se guarda vía la función serverless [`app/api/lead/route.ts`](app/api/lead/route.ts),
que es **agnóstica de proveedor**:

- **Sin configurar nada**, el formulario funciona y la descarga también — simplemente no se
  guarda el contacto todavía.
- Para **guardar los emails en Brevo** (gratis, contactos ilimitados):
  1. Crea cuenta en [brevo.com](https://www.brevo.com) y una lista de contactos.
  2. En Vercel → Project → Settings → Environment Variables, añade:
     - `BREVO_API_KEY` = tu API key (`xkeysib-…`)
     - `BREVO_LIST_ID` = el ID numérico de tu lista
  3. Redeploy. A partir de ahí, cada alta entra en tu lista de Brevo.
- ¿Prefieres **Google Sheets**? Cambia el bloque de Brevo en `route.ts` por una llamada a un
  Google Apps Script Web App que haga `append` de fila. (Mismo patrón, otro destino.)

Ver [`.env.example`](.env.example) para las variables.

## Estructura

```
app/
  layout.tsx        # fuentes, metadata SEO, OG/Twitter, JSON-LD, lang=es
  page.tsx          # landing principal
  globals.css       # tema (Tailwind) + variables de color
  robots.ts         # robots.txt (permite bots de IA)
  sitemap.ts        # sitemap.xml
  links/            # hub de enlaces (Linktree)
  ebook-gratis/     # captura del ebook + /gracias (descarga directa)
  api/lead/         # función serverless de captura de leads (Brevo, agnóstica)
  legal/            # aviso legal
  privacidad/       # política de privacidad
components/          # una sección/elemento por archivo (Logo, EbookForm, …)
lib/
  site.ts           # enlaces, métricas, ebook y config central
  faq.ts            # FAQ (fuente única: acordeón + JSON-LD)
  testimonials.ts   # capturas de testimonios
public/
  ebook-master-collections.pdf   # el ebook (servido desde la propia web)
  llms.txt                       # contexto para buscadores de IA
  brand/logo-original.jpg        # logo original de referencia
```

## Pendiente de confirmar

- **TikTok**: el handle en `lib/site.ts` (`links.tiktok`) es un candidato sin verificar.
  Sustitúyelo por la URL real de la cuenta.
- **Telegram**: el email de entrega del ebook usaba otro enlace (`t.me/+C2kkMbWHo20xODA0`)
  distinto del principal (`t.me/+ftxLu95f1scyZmZk`). Confirmar cuál es el canónico en `lib/site.ts`.

## Decisiones de SEO ya aplicadas

- Home **`index, follow`** (se corrige el `noindex` de la web anterior).
- Metadata completa vía Metadata API + canonical + `lang="es"`.
- Open Graph y Twitter Card (falta subir la imagen `og.jpg`).
- JSON-LD: `Organization` + `FAQPage`.
- `sitemap.xml` y `robots.txt` generados por Next.
- Un único `<h1>` (el hero); jerarquía H2/H3 correcta.
- `alt` descriptivo en imágenes y `llms.txt` para citación por IA.
