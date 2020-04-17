const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, slowmo: true, defaultViewport: null});
  const page = await browser.newPage();
  await page.goto('https://www.cleaneatz.com/mealplanmenu');

  browser.close();
})();