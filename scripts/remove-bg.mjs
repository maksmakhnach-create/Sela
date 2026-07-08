import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, "../public/images/coffee-cup-hero.png");
const output = path.join(__dirname, "../public/images/coffee-cup-hero-nobg.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = new Uint8Array(data);
const visited = new Uint8Array(width * height);

function idx(x, y) {
  return (y * width + x) * 4;
}

function isBackground(r, g, b) {
  if (r > 215 && g > 205 && b > 175 && r - b < 60) return true;
  if (r > 230 && g > 230 && b > 225) return true;
  return false;
}

const queue = [];

for (let x = 0; x < width; x++) {
  queue.push([x, 0], [x, height - 1]);
}
for (let y = 0; y < height; y++) {
  queue.push([0, y], [width - 1, y]);
}

while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= width || y >= height) continue;

  const pi = y * width + x;
  if (visited[pi]) continue;
  visited[pi] = 1;

  const i = idx(x, y);
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  if (!isBackground(r, g, b)) continue;

  pixels[i + 3] = 0;

  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// Soften edges — partial transparency on fringe pixels
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const i = idx(x, y);
    if (pixels[i + 3] === 0) continue;

    let transparentNeighbors = 0;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      if (pixels[idx(x + dx, y + dy) + 3] === 0) transparentNeighbors++;
    }

    if (transparentNeighbors >= 2 && isBackground(pixels[i], pixels[i + 1], pixels[i + 2])) {
      pixels[i + 3] = 0;
    }
  }
}

await sharp(pixels, {
  raw: { width, height, channels: 4 },
})
  .trim()
  .png()
  .toFile(output);

console.log(`Saved: ${output}`);
