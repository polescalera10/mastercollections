#!/usr/bin/env node
/**
 * Genera ilustraciones SVG genéricas de relojes para el catálogo de DEMO.
 * No reproducen logos ni diseños protegidos: son dibujos esquemáticos con la
 * paleta de color de cada pieza, para no depender de fotos con derechos.
 *
 *   node scripts/generate-demo-watches.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'demo');
mkdirSync(outDir, { recursive: true });

const CX = 400;
const CY = 300;

const watches = [
  {
    file: 'watch-diver-black.svg',
    shape: 'round',
    dial: ['#2a2a2e', '#0b0b0d'],
    bezel: '#101012',
    bezelTicks: '#e9e6dc',
    index: '#f3f1e8',
    hands: '#f3f1e8',
    seconds: '#f3f1e8',
    strap: { type: 'bracelet', color: '#b9bec4' },
    subdials: false,
    date: true,
  },
  {
    file: 'watch-chrono-black.svg',
    shape: 'round',
    dial: ['#1d1d1f', '#050506'],
    bezel: '#0c0c0e',
    bezelTicks: '#d8d4c6',
    index: '#ece8da',
    hands: '#ece8da',
    seconds: '#ece8da',
    strap: { type: 'leather', color: '#17171a', stitch: '#8c8c93' },
    subdials: true,
    date: false,
  },
  {
    file: 'watch-heritage-burgundy.svg',
    shape: 'round',
    dial: ['#262626', '#0d0d0d'],
    bezel: '#6b1d2a',
    bezelTicks: '#e8d9a8',
    index: '#e8d9a8',
    hands: '#e8d9a8',
    seconds: '#c9a24a',
    strap: { type: 'leather', color: '#5b3a22', stitch: '#c8a77f' },
    subdials: false,
    date: false,
  },
  {
    file: 'watch-square-white.svg',
    shape: 'square',
    dial: ['#fbfaf5', '#e6e3d6'],
    bezel: '#c8ccd2',
    bezelTicks: '#c8ccd2',
    index: '#1b2a4a',
    hands: '#1b2a4a',
    seconds: '#2f56a8',
    strap: { type: 'bracelet', color: '#c3c8ce' },
    subdials: false,
    date: true,
  },
  {
    file: 'watch-dress-teal.svg',
    shape: 'round',
    dial: ['#2f7a78', '#0f3c3d'],
    bezel: '#c8ccd2',
    bezelTicks: '#c8ccd2',
    index: '#f1ecd8',
    hands: '#f1ecd8',
    seconds: '#e0a82e',
    strap: { type: 'leather', color: '#7a4a2b', stitch: '#d9b48a' },
    subdials: false,
    date: true,
  },
  {
    file: 'watch-snowflake-silver.svg',
    shape: 'round',
    dial: ['#f4f6f8', '#cfd6dd'],
    bezel: '#d4d8dd',
    bezelTicks: '#d4d8dd',
    index: '#3a4350',
    hands: '#2a3b66',
    seconds: '#2a3b66',
    strap: { type: 'leather', color: '#1a1a1c', stitch: '#7a7a82' },
    subdials: false,
    date: true,
  },
];

function polar(r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function strap(w) {
  const { type, color, stitch } = w.strap;
  const top = `<rect x="335" y="14" width="130" height="190" rx="20" fill="${color}"/>`;
  const bottom = `<rect x="335" y="396" width="130" height="190" rx="20" fill="${color}"/>`;
  let detail = '';
  if (type === 'bracelet') {
    for (let y = 40; y < 200; y += 26) {
      detail += `<line x1="338" y1="${y}" x2="462" y2="${y}" stroke="#00000033" stroke-width="2"/>`;
    }
    for (let y = 410; y < 580; y += 26) {
      detail += `<line x1="338" y1="${y}" x2="462" y2="${y}" stroke="#00000033" stroke-width="2"/>`;
    }
    detail += `<line x1="372" y1="14" x2="372" y2="204" stroke="#00000022" stroke-width="2"/><line x1="428" y1="14" x2="428" y2="204" stroke="#00000022" stroke-width="2"/>`;
    detail += `<line x1="372" y1="396" x2="372" y2="586" stroke="#00000022" stroke-width="2"/><line x1="428" y1="396" x2="428" y2="586" stroke="#00000022" stroke-width="2"/>`;
  } else {
    detail += `<rect x="347" y="22" width="106" height="174" rx="14" fill="none" stroke="${stitch}" stroke-width="2.5" stroke-dasharray="7 6"/>`;
    detail += `<rect x="347" y="404" width="106" height="174" rx="14" fill="none" stroke="${stitch}" stroke-width="2.5" stroke-dasharray="7 6"/>`;
    detail += `<circle cx="400" cy="530" r="5" fill="#00000055"/><circle cx="400" cy="548" r="5" fill="#00000055"/><circle cx="400" cy="566" r="5" fill="#00000055"/>`;
  }
  return top + bottom + detail;
}

function caseShape(w) {
  if (w.shape === 'square') {
    return `
      <rect x="232" y="132" width="336" height="336" rx="58" fill="url(#metal)" stroke="#3b3f44" stroke-width="2"/>
      <rect x="250" y="150" width="300" height="300" rx="46" fill="${w.bezel}" stroke="#3b3f44" stroke-opacity=".5"/>
      <rect x="272" y="172" width="256" height="256" rx="30" fill="url(#dial)"/>`;
  }
  let ticks = '';
  if (w.bezel !== '#c8ccd2' && w.bezel !== '#d4d8dd') {
    for (let i = 0; i < 60; i++) {
      const long = i % 5 === 0;
      const [x1, y1] = polar(140, i * 6);
      const [x2, y2] = polar(long ? 128 : 134, i * 6);
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${w.bezelTicks}" stroke-width="${long ? 3 : 1.5}" stroke-linecap="round"/>`;
    }
  }
  return `
      <circle cx="${CX}" cy="${CY}" r="172" fill="url(#metal)" stroke="#3b3f44" stroke-width="2"/>
      <circle cx="${CX}" cy="${CY}" r="150" fill="${w.bezel}" stroke="#3b3f44" stroke-opacity=".5"/>
      ${ticks}
      <circle cx="${CX}" cy="${CY}" r="122" fill="url(#dial)"/>`;
}

function indices(w) {
  let out = '';
  const inner = w.shape === 'square' ? 100 : 100;
  for (let h = 0; h < 12; h++) {
    const major = h % 3 === 0;
    const [x1, y1] = polar(major ? inner - 14 : inner - 8, h * 30);
    const [x2, y2] = polar(inner + 8, h * 30);
    out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${w.index}" stroke-width="${major ? 9 : 5}" stroke-linecap="round"/>`;
  }
  return out;
}

function subdials(w) {
  if (!w.subdials) return '';
  const spots = [
    [CX - 52, CY],
    [CX + 52, CY],
    [CX, CY + 50],
  ];
  return spots
    .map(
      ([x, y]) =>
        `<circle cx="${x}" cy="${y}" r="26" fill="#00000040" stroke="${w.index}" stroke-width="1.6"/><line x1="${x}" y1="${y}" x2="${x + 12}" y2="${y - 12}" stroke="${w.hands}" stroke-width="2" stroke-linecap="round"/>`,
    )
    .join('');
}

function dateWindow(w) {
  if (!w.date) return '';
  return `<rect x="${CX + 66}" y="${CY - 13}" width="30" height="26" rx="3" fill="#f7f5ee" stroke="#00000066"/><text x="${CX + 81}" y="${CY + 6}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="17" fill="#111">14</text>`;
}

function hands(w) {
  const [hx, hy] = polar(66, 305);
  const [mx, my] = polar(100, 60);
  const [sx, sy] = polar(108, 150);
  const [tx, ty] = polar(-22, 150);
  return `
      <line x1="${CX}" y1="${CY}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${w.hands}" stroke-width="10" stroke-linecap="round"/>
      <line x1="${CX}" y1="${CY}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="${w.hands}" stroke-width="6" stroke-linecap="round"/>
      <line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="${w.seconds}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="${CX}" cy="${CY}" r="9" fill="${w.hands}" stroke="#00000055"/>
      <circle cx="${CX}" cy="${CY}" r="3.5" fill="#222"/>`;
}

function svg(w) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="Ilustración de reloj (demo)">
  <defs>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7f8f9"/><stop offset=".35" stop-color="#9ba1a8"/>
      <stop offset=".6" stop-color="#eceef0"/><stop offset="1" stop-color="#737a82"/>
    </linearGradient>
    <radialGradient id="dial" cx=".38" cy=".32" r=".9">
      <stop offset="0" stop-color="${w.dial[0]}"/><stop offset="1" stop-color="${w.dial[1]}"/>
    </radialGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#D4FF00" stop-opacity=".07"/><stop offset="1" stop-color="#c9a24a" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".45"/>
    </filter>
  </defs>
  <circle cx="${CX}" cy="${CY}" r="290" fill="url(#glow)"/>
  <g filter="url(#shadow)">
    ${strap(w)}
    <rect x="556" y="284" width="26" height="32" rx="6" fill="url(#metal)" stroke="#3b3f44"/>
    ${caseShape(w)}
    ${indices(w)}
    ${subdials(w)}
    ${dateWindow(w)}
    ${hands(w)}
    <path d="M${CX - 120} ${CY - 70} A ${130} ${130} 0 0 1 ${CX + 40} ${CY - 128}" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="10" stroke-linecap="round"/>
  </g>
</svg>
`;
}

for (const w of watches) {
  writeFileSync(join(outDir, w.file), svg(w));
}

writeFileSync(
  join(outDir, 'placeholder.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="Sin foto">
  <rect width="800" height="600" fill="#111113"/>
  <circle cx="400" cy="300" r="120" fill="none" stroke="#c9a24a" stroke-opacity=".5" stroke-width="6"/>
  <line x1="400" y1="300" x2="400" y2="230" stroke="#c9a24a" stroke-opacity=".6" stroke-width="8" stroke-linecap="round"/>
  <line x1="400" y1="300" x2="450" y2="320" stroke="#c9a24a" stroke-opacity=".6" stroke-width="6" stroke-linecap="round"/>
  <text x="400" y="500" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8d8d93">Foto pendiente</text>
</svg>
`,
);

console.log(`SVG generados en ${outDir}`);
