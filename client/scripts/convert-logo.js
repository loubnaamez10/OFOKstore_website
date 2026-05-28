import sharp from 'sharp';
import fs from 'fs';

const input = process.argv[2];
if (!input) {
  console.log('Usage: node ./scripts/convert-logo.js <path-to-image> [size] [quality]');
  process.exit(1);
}

const size = parseInt(process.argv[3], 10) || 256;
const quality = parseInt(process.argv[4], 10) || 80;
const outDir = './public';
const outPath = `${outDir}/ofok-logo.webp`;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

try {
  await sharp(input)
    .resize(size, size, { fit: 'cover' })
    .webp({ quality })
    .toFile(outPath);
  console.log(`Wrote optimized logo to ${outPath} (${size}x${size}, q=${quality})`);
} catch (err) {
  console.error('Conversion failed:', err);
  process.exit(2);
}
