const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = path.join(__dirname, '../public/images/logo-miel-badge.jpg');

async function createRgbaPng(src, size) {
  const { data } = await sharp(src).resize(size, size).raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = 254; // Guarantee 4-channel RGBA in PNG
  }
  return sharp(rgba, { raw: { width: size, height: size, channels: 4 } }).png().toBuffer();
}

async function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count

  let offset = 6 + (16 * pngBuffers.length);
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  if (!fs.existsSync(srcPath)) {
    throw new Error('Source image not found: ' + srcPath);
  }

  const targetJpg = path.join(__dirname, '../public/images/logo-miel-badge.jpg');
  if (path.resolve(srcPath) !== path.resolve(targetJpg)) {
    fs.copyFileSync(srcPath, targetJpg);
  }
  await sharp(srcPath).png().toFile(path.join(__dirname, '../public/images/logo-miel-badge.png'));

  // Pre-generate RGBA sizes for ICO
  const b16 = await createRgbaPng(srcPath, 16);
  const b32 = await createRgbaPng(srcPath, 32);
  const b48 = await createRgbaPng(srcPath, 48);

  const icoBuf = await createIco([
    { width: 16, height: 16, buffer: b16 },
    { width: 32, height: 32, buffer: b32 },
    { width: 48, height: 48, buffer: b48 }
  ]);
  // Next.js serves static favicon from public/favicon.ico
  fs.writeFileSync('public/favicon.ico', icoBuf);
  console.log('Saved public/favicon.ico (Valid 32-bit RGBA)');

  // Ensure app/favicon.ico does not exist (Next.js Turbopack metadata handler conflict)
  if (fs.existsSync('app/favicon.ico')) {
    fs.unlinkSync('app/favicon.ico');
  }

  // PNG icon sizes
  const b180 = await sharp(srcPath).resize(180, 180).png().toBuffer();
  const b192 = await sharp(srcPath).resize(192, 192).png().toBuffer();
  const b512 = await sharp(srcPath).resize(512, 512).png().toBuffer();

  fs.writeFileSync('public/icon-32x32.png', b32);
  fs.writeFileSync('public/icon-light-32x32.png', b32);
  fs.writeFileSync('public/icon-dark-32x32.png', b32);
  fs.writeFileSync('public/apple-icon.png', b180);
  fs.writeFileSync('app/apple-icon.png', b180);
  fs.writeFileSync('public/icon-192x192.png', b192);
  fs.writeFileSync('public/icon-512x512.png', b512);
  fs.writeFileSync('public/icon.png', b512);
  fs.writeFileSync('app/icon.png', b512);
  console.log('Saved standard PNG icons');

  // SVG representation
  const base64Png = b512.toString('base64');
  const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="512" height="512" xlink:href="data:image/png;base64,${base64Png}" />
</svg>
`;
  fs.writeFileSync('public/icon.svg', svgContent);
  console.log('Saved public/icon.svg');
}

run().catch(console.error);
