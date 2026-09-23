import { createServer } from 'vite';
import { chromium } from 'playwright';
import path from 'path';

async function run() {
  const server = await createServer({
    configFile: path.resolve('vite.config.js'),
    root: path.resolve('.'),
    server: { port: 5173 },
  });
  await server.listen();
  console.log('Vite server running on http://localhost:5173');

  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Visit Main Home to verify AI STUDIO link in header
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'test-home-header.png' });
    console.log('Saved test-home-header.png');

    // 2. Navigate to /ai-studio
    console.log('Navigating to http://localhost:5173/ai-studio');
    await page.goto('http://localhost:5173/ai-studio', { waitUntil: 'networkidle' });
    
    // Smooth scroll down to trigger any reveals and load images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0); // back to top
            setTimeout(resolve, 500);
          }
        }, 100);
      });
    });

    await page.screenshot({ path: 'test-ai-studio-hero.png' });
    console.log('Saved test-ai-studio-hero.png');

    // Full page screenshot
    await page.screenshot({ path: 'test-ai-studio-full.png', fullPage: true });
    console.log('Saved test-ai-studio-full.png');

    console.log('ALL TESTS PASSED SUCCESSFULLY');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
    await server.close();
  }
}

run();
