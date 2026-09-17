'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('../../../Auric-Artisan-Emoji/node_modules/sharp');

const ROOT = path.resolve(__dirname, '../../..');
const OUT = __dirname;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function imageData(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  return `data:image/png;base64,${fs.readFileSync(absolutePath).toString('base64')}`;
}

function cardSvg(card) {
  const titleLines = card.titleLines.map((line, index) => (
    `<text x="74" y="${214 + index * 82}" font-family="Segoe UI, Arial, sans-serif" font-size="72" font-weight="760" letter-spacing="-2" fill="${card.heading}">${escapeXml(line)}</text>`
  )).join('');
  const chips = card.chips.map((chip, index) => {
    const widths = [188, 206, 232];
    const x = 74 + card.chips.slice(0, index).reduce((sum, _, itemIndex) => sum + widths[itemIndex] + 14, 0);
    return `<g transform="translate(${x} 394)"><rect width="${widths[index]}" height="48" rx="24" fill="${card.chipFill}" stroke="${card.chipStroke}"/><text x="${widths[index] / 2}" y="31" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="650" letter-spacing=".5" fill="${card.chipText}">${escapeXml(chip)}</text></g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${card.bgStart}"/><stop offset="1" stop-color="${card.bgEnd}"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="${card.accent}" stop-opacity=".20"/><stop offset="1" stop-color="${card.accent}" stop-opacity="0"/></radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity=".30"/></filter>
      <clipPath id="mediaClip"><rect x="74" y="486" width="1052" height="724" rx="34"/></clipPath>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="${card.grid}" stroke-width="1"/></pattern>
    </defs>
    <rect width="1200" height="1500" fill="url(#bg)"/>
    <circle cx="1080" cy="70" r="360" fill="url(#glow)"/>
    <rect width="1200" height="1500" fill="url(#grid)" opacity=".42"/>
    <path d="M74 126h1052" stroke="${card.accent}" stroke-width="2" stroke-opacity=".55"/>
    <text x="74" y="94" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="760" letter-spacing="5" fill="${card.accent}">AURIC ARTISAN</text>
    <text x="1126" y="94" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="17" font-weight="650" letter-spacing="2.5" fill="${card.muted}">${escapeXml(card.series)}</text>
    ${titleLines}
    <text x="74" y="359" font-family="Segoe UI, Arial, sans-serif" font-size="25" font-weight="430" fill="${card.muted}">${escapeXml(card.subtitle)}</text>
    ${chips}
    <rect x="74" y="486" width="1052" height="724" rx="34" fill="${card.panel}" stroke="${card.panelStroke}" stroke-width="2" filter="url(#shadow)"/>
    <image x="92" y="504" width="1016" height="688" href="${imageData(card.image)}" preserveAspectRatio="xMidYMid meet" clip-path="url(#mediaClip)"/>
    <rect x="74" y="1254" width="1052" height="2" fill="${card.panelStroke}"/>
    <text x="74" y="1324" font-family="Segoe UI, Arial, sans-serif" font-size="31" font-weight="720" fill="${card.heading}">${escapeXml(card.metric)}</text>
    <text x="74" y="1367" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="${card.muted}">${escapeXml(card.detail)}</text>
    <g transform="translate(74 1411)"><rect width="292" height="55" rx="27.5" fill="${card.accent}"/><text x="146" y="36" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="760" letter-spacing="1.8" fill="${card.ctaText}">FOLLOW THE BUILD</text></g>
    <text x="1126" y="1447" text-anchor="end" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="650" letter-spacing="1" fill="${card.muted}">github.com/auricartisan</text>
  </svg>`;
}

const cards = [
  {
    output: 'auric-artisan-icon-post.png',
    series: '01 / DRAWN SYSTEM',
    titleLines: ['Auric Artisan Icon'],
    subtitle: 'A complete source system for warm, hand-drawn vector icons.',
    chips: ['50 CATEGORIES', 'VECTOR MASTERS', 'VALIDATED OUTPUT'],
    metric: '1,200 original icons',
    detail: 'Color SVG · Mono SVG · Transparent PNG · Searchable manifests',
    image: 'Auric-Artisan-Icon/samples/sample-sheet.png',
    bgStart: '#241A13', bgEnd: '#120F0D', heading: '#FFF4DE', muted: '#D5C3A9', accent: '#E2AD36',
    panel: '#34271D', panelStroke: '#6C5334', chipFill: '#33271C', chipStroke: '#765A31', chipText: '#F4DEB5', grid: '#5A432A', ctaText: '#1B140B',
  },
  {
    output: 'auric-artisan-modern-icon-post.png',
    series: '02 / MODERN SYSTEM',
    titleLines: ['Auric Artisan', 'Modern Icon'],
    subtitle: 'A file and folder language designed for the 16px frontier.',
    chips: ['720 LIBRARY ICONS', '4 FRAMEWORK PACKS', 'SMART THEMING'],
    metric: 'Fast recognition at editor scale',
    detail: 'Files · Folder pairs · States · Associations · Content awareness',
    image: 'Auric-Artisan-Modern-Icon/adapters/vscode/media/marketplace/hero.png',
    bgStart: '#111722', bgEnd: '#080B10', heading: '#F7F3E9', muted: '#AEB9CB', accent: '#E2AD36',
    panel: '#171D27', panelStroke: '#343F50', chipFill: '#171E29', chipStroke: '#39475A', chipText: '#D8E0EC', grid: '#263244', ctaText: '#17110A',
  },
  {
    output: 'auric-artisan-icon-library-post.png',
    series: '03 / SHARED ICON STUDIO',
    titleLines: ['Auric Artisan', 'Icon Library'],
    subtitle: 'Three collections. One shared workflow inside the editor.',
    chips: ['SEARCH', 'PREVIEW', 'INSERT OR COPY'],
    metric: '2,425 icons · one shared Studio',
    detail: 'Modern · Drawn · Playful · Co-install aware',
    image: 'Auric-Artisan-Icon-Library/assets/explorer-workflow.png',
    bgStart: '#111317', bgEnd: '#090A0D', heading: '#F3F4F7', muted: '#A9AFBA', accent: '#E7AE36',
    panel: '#181A1F', panelStroke: '#3C3F47', chipFill: '#1D2026', chipStroke: '#41454E', chipText: '#E5E7EC', grid: '#252930', ctaText: '#17110A',
  },
  {
    output: 'auric-artisan-svg-post.png',
    series: '04 / SVG PIPELINE',
    titleLines: ['Auric Artisan SVG'],
    subtitle: 'Editable masters transformed into a complete delivery pipeline.',
    chips: ['4 VISUAL VARIANTS', 'REACT + VUE', 'DETERMINISTIC QA'],
    metric: 'A 1,225-concept production plan',
    detail: 'SVG · PNG · Components · Sprites · Metadata · Validation',
    image: 'Auric-Artisan-SVG/previews/samples.png',
    bgStart: '#FFF7E7', bgEnd: '#EFD9A9', heading: '#211C17', muted: '#665A4E', accent: '#C86D52',
    panel: '#FFF9EE', panelStroke: '#D2AF62', chipFill: '#FFF4DE', chipStroke: '#D4A94D', chipText: '#44382D', grid: '#C9AD76', ctaText: '#FFF9EE',
  },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const card of cards) {
    await sharp(Buffer.from(cardSvg(card))).png({ compressionLevel: 9 }).toFile(path.join(OUT, card.output));
    console.log(`created ${card.output}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
