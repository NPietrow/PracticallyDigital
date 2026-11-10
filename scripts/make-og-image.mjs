// Makes public/og-default.png, the 1200x630 social preview image used by pages
// without a hero image. Run it with `npm run og` after changing the design,
// then commit the PNG. The site build never runs this.
//
// Shapes are drawn from inline SVG. Text is drawn by sharp's text renderer with
// the same IBM Plex files the site self-hosts (Fontsource), so the image doesn't
// depend on which fonts happen to be installed on the machine that runs it.
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import sharp from 'sharp';

// sharp's text renderer can't read web fonts, and Fontsource ships only .woff
// and .woff2. A .woff file is a TrueType font with each table zlib-compressed,
// so unpacking the tables gives back the original .ttf (WOFF 1.0 spec, W3C).
function woffToTtf(woff) {
  const flavour = woff.readUInt32BE(4);
  const count = woff.readUInt16BE(12);
  let selector = 0;
  while (2 ** (selector + 1) <= count) selector++;
  const searchRange = 2 ** selector * 16;

  const header = Buffer.alloc(12 + 16 * count);
  header.writeUInt32BE(flavour, 0);
  header.writeUInt16BE(count, 4);
  header.writeUInt16BE(searchRange, 6);
  header.writeUInt16BE(selector, 8);
  header.writeUInt16BE(count * 16 - searchRange, 10);

  const parts = [header];
  let offset = header.length;
  for (let i = 0; i < count; i++) {
    const entry = 44 + i * 20; // WOFF table directory entry
    const tag = woff.readUInt32BE(entry);
    const start = woff.readUInt32BE(entry + 4);
    const compLength = woff.readUInt32BE(entry + 8);
    const origLength = woff.readUInt32BE(entry + 12);
    const checksum = woff.readUInt32BE(entry + 16);
    const stored = woff.subarray(start, start + compLength);
    const table = compLength < origLength ? inflateSync(stored) : stored;

    const record = 12 + i * 16; // TrueType table record
    header.writeUInt32BE(tag, record);
    header.writeUInt32BE(checksum, record + 4);
    header.writeUInt32BE(offset, record + 8);
    header.writeUInt32BE(origLength, record + 12);

    const padding = (4 - (table.length % 4)) % 4; // tables start on 4-byte boundaries
    parts.push(table, Buffer.alloc(padding));
    offset += table.length + padding;
  }
  return Buffer.concat(parts);
}

const require = createRequire(import.meta.url);
const fontDir = mkdtempSync(join(tmpdir(), 'pd-og-fonts-'));
function font(pkg, name) {
  const ttf = join(fontDir, `${name}.ttf`);
  writeFileSync(ttf, woffToTtf(readFileSync(require.resolve(`@fontsource/${pkg}/files/${name}.woff`))));
  return ttf;
}
const SANS_600 = font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal');
const SANS_400 = font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal');
const MONO_400 = font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal');

const OUT = fileURLToPath(new URL('../public/og-default.png', import.meta.url));
const W = 1200;
const H = 630;
const LEFT = 88; // left edge shared by every line of text

// Design tokens (src/styles/tokens.css).
const STONE = '#ECECE7';
const STONE_LINE = '#D5D5CE';
const INK = '#1B1F23';
const INK_SOFT = '#3C413B';
const MUTED = '#62675F';
const SIGNAL = '#F2B705';

// One block of text as a transparent PNG layer. `markup` is Pango markup.
async function textLayer({ markup, fontfile, font, width }) {
  const { data, info } = await sharp({
    text: { text: markup, fontfile, font, width, rgba: true, dpi: 72, spacing: 6 },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { input: data, height: info.height };
}

// Background: stone, an ink band across the top (the site header) and a
// stone-line rule above the footer line.
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${STONE}"/>
  <rect width="${W}" height="20" fill="${INK}"/>
  <rect x="${LEFT}" y="${H - 104}" width="${W - LEFT * 2}" height="2" fill="${STONE_LINE}"/>
</svg>`);

const label = await textLayer({
  markup: `<span foreground="${MUTED}" letter_spacing="2048">DATA · AI · DIGITAL TWINS · IOT · CLOUD</span>`,
  fontfile: MONO_400,
  font: 'IBM Plex Mono 24',
});

// The wordmark: ink words, signal-yellow slash, as in the site header.
const wordmark = await textLayer({
  markup: `<span foreground="${INK}">practically</span><span foreground="${SIGNAL}">/</span><span foreground="${INK}">digital</span>`,
  fontfile: SANS_600,
  font: 'IBM Plex Sans SemiBold 112',
});

const tagline = await textLayer({
  markup: `<span foreground="${INK_SOFT}">Plain-English guides to data, AI, digital twins, IoT and cloud for UK industrial leaders.</span>`,
  fontfile: SANS_400,
  font: 'IBM Plex Sans 40',
  width: W - LEFT * 2 - 80,
});

const domain = await textLayer({
  markup: `<span foreground="${MUTED}">practicallydigital.co.uk</span>`,
  fontfile: MONO_400,
  font: 'IBM Plex Mono 24',
});

await sharp(background)
  .composite([
    { input: label.input, left: LEFT, top: 128 },
    // +4: the "p" renders slightly left of its layer, so this lines its stem up with the label.
    { input: wordmark.input, left: LEFT + 4, top: 192 },
    { input: tagline.input, left: LEFT, top: 192 + wordmark.height + 28 },
    { input: domain.input, left: LEFT, top: H - 72 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(OUT);

rmSync(fontDir, { recursive: true, force: true });
console.log(`Wrote ${OUT} (${W}x${H})`);
