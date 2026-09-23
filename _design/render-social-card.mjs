// Renders _design/social-card.html to assets/uttervr-social.jpg (1200x630).
// Usage: node _design/render-social-card.mjs   (needs playwright)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'assets', 'uttervr-social.jpg');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file://' + path.join(here, 'social-card.html'));
await page.evaluate(() => document.fonts.ready);
await page.locator('#card').screenshot({ path: out, type: 'jpeg', quality: 90 });
await browser.close();
console.log('wrote', out);
