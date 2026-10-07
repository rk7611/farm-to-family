const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'social-media');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const testSvg = `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1080" fill="#0D1F14"/>
  <rect x="40" y="40" width="1000" height="1000" rx="32" fill="none" stroke="#2A5237" stroke-width="3"/>
  <text x="540" y="200" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#A1D1AF" text-anchor="middle" letter-spacing="4">FARM-TO-FAMILY • PRIVATE MANAGED FARMING</text>
  <text x="540" y="450" font-family="Georgia, serif" font-size="64" font-weight="bold" fill="#FAF8F5" text-anchor="middle">Your Family's Farm.</text>
  <text x="540" y="550" font-family="Georgia, serif" font-size="54" font-style="italic" fill="#D4A373" text-anchor="middle">We Grow It. You Enjoy It.</text>
  <text x="540" y="720" font-family="Arial, sans-serif" font-size="28" fill="#D1DFD6" text-anchor="middle">Premium managed farming for families who want clean food.</text>
  <rect x="340" y="850" width="400" height="70" rx="35" fill="#FAF8F5"/>
  <text x="540" y="895" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#0D1F14" text-anchor="middle">www.farmtofamily.in</text>
</svg>
`;

sharp(Buffer.from(testSvg))
  .png()
  .toFile(path.join(outDir, 'test-post.png'))
  .then(() => {
    console.log('Successfully generated test-post.png');
  })
  .catch((err) => {
    console.error('Error generating image:', err);
  });
