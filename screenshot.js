const puppeteer = require('puppeteer');

const BASE = 'http://localhost:3412';

const pages = [
  { id: 15, url: `${BASE}/breathing-lung/` },
  { id: 7,  url: `${BASE}/football2d.html` },
  { id: 8,  url: `${BASE}/civ-lab/enter.html` },
  { id: 9,  url: `${BASE}/express/index.html` },
  { id: 11, url: `${BASE}/summer-review.html` },
  { id: 10, url: `${BASE}/shooter.html` },
  { id: 12, url: `${BASE}/cinema-history/` },
  { id: 13, url: `${BASE}/scl.html` },
  { id: 14, url: `${BASE}/word-cards.html` },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 960 });

  for (const { id, url } of pages) {
    console.log(`Screenshotting ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({
        path: `img/pj${id}.jpg`,
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1280, height: 960 }
      });
      console.log(`  ✓ img/pj${id}.jpg`);
    } catch (e) {
      console.log(`  ✗ ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
