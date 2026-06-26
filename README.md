# Master Collections — Landing

Landing de una sola página para **Master Collections**, comunidad de compraventa y aprendizaje sobre relojes de segunda mano. Misión única: que el visitante se una a la **comunidad gratuita de Telegram**.

Construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**. Totalmente estática (SSG), pensada para desplegar en **Vercel** sin backend ni base de datos.

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

## Desplegar en Vercel

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importa el repo.
3. Framework detectado automáticamente: **Next.js**. No hace falta tocar nada.
4. Deploy. Cada push a `main` redeploya solo.

Antes de publicar, configura el dominio definitivo. La URL canónica está en
[`lib/site.ts`](lib/site.ts) (`siteUrl`); cámbiala si el dominio final es distinto de
`https://www.mastercollectionsclub.com`.

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

## Estructura

```
app/
  layout.tsx        # fuentes, metadata SEO, OG/Twitter, JSON-LD, lang=es
  page.tsx          # ensambla las secciones
  globals.css       # tema (Tailwind) + variables de color
  robots.ts         # robots.txt (permite bots de IA)
  sitemap.ts        # sitemap.xml
  legal/            # aviso legal
  privacidad/       # política de privacidad
components/          # una sección por archivo
lib/
  site.ts           # enlaces, métricas y config central
  faq.ts            # FAQ (fuente única: acordeón + JSON-LD)
public/
  llms.txt          # contexto para buscadores de IA
```

## Decisiones de SEO ya aplicadas

- Home **`index, follow`** (se corrige el `noindex` de la web anterior).
- Metadata completa vía Metadata API + canonical + `lang="es"`.
- Open Graph y Twitter Card (falta subir la imagen `og.jpg`).
- JSON-LD: `Organization` + `FAQPage`.
- `sitemap.xml` y `robots.txt` generados por Next.
- Un único `<h1>` (el hero); jerarquía H2/H3 correcta.
- `alt` descriptivo en imágenes y `llms.txt` para citación por IA.
