import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const galleryDir = './public/images/gallery';

// These are HEIC files mislabeled as .jpeg - browsers cannot display HEIC
const heicImages = [29, 32, 34, 39, 42];

console.log('Attempting HEIC conversion with sharp...\n');

for (const num of heicImages) {
  const filePath = join(galleryDir, `${num}.jpeg`);
  console.log(`Processing ${num}.jpeg...`);
  try {
    const buffer = readFileSync(filePath);
    const output = await sharp(buffer, { failOn: 'none' })
      .jpeg({ quality: 90, mozjpeg: true })
      .toBuffer();
    writeFileSync(filePath, output);
    const meta = await sharp(output).metadata();
    console.log(`  ✓ Converted: ${meta.width}x${meta.height}, ${output.length} bytes`);
  } catch (err) {
    console.error(`  ✗ Sharp failed: ${err.message}`);
    console.log(`  → Will exclude from gallery`);
  }
}

// Verify which images are now valid JPEG
console.log('\n--- Verification ---');
for (const num of [14, ...heicImages]) {
  const filePath = join(galleryDir, `${num}.jpeg`);
  const buffer = readFileSync(filePath);
  const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8;
  console.log(`${num}.jpeg: ${isJpeg ? '✓ Valid JPEG' : '✗ NOT JPEG (needs exclusion)'}`);
}
