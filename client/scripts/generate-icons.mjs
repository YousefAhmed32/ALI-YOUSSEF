// Regenerates the raster icon derivatives from the SVG sources in public/.
// Run after editing public/favicon.svg or public/brand/og-image.svg.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');
const favicon = path.join(publicDir, 'favicon.svg');
const ogSource = path.join(publicDir, 'brand', 'og-image.svg');

await sharp(favicon).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
await sharp(favicon).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'));
await sharp(favicon).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16.png'));
await sharp(ogSource).resize(1200, 630).png().toFile(path.join(publicDir, 'og-image.png'));

console.log('Icons generated: apple-touch-icon.png, favicon-32.png, favicon-16.png, og-image.png');
