const puppeteer = require('puppeteer');

(async () => {

  const url = 'https://www.cleaneatz.com/mealplanmenu';

  const browser = await puppeteer.launch({headless: true, slowmo: false, defaultViewport: null});

  const context = browser.defaultBrowserContext();
  await context.overridePermissions(url, ['geolocation']);

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('select')
  await page.waitFor(100);

  const state = await page.select('select#location-states', 'SC');
  const cafe = await page.select('select.fancy-select.state-locs', '3576171');






  // browser.close();
})();