const puppeteer = require('puppeteer');

(async (state, cafe) => {

  state = state.toUpperCase();
  cafe = cafe.toUpperCase();
  const url = 'https://www.cleaneatz.com/mealplanmenu';

  const browser = await puppeteer.launch({headless: false, slowmo: true, defaultViewport: null});

  const context = browser.defaultBrowserContext();
  await context.overridePermissions(url, ['geolocation']);

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('select');

  const states = await page.$('#location-states');
  states.click();





  // browser.close();
})('South Carolina', 'Greenville');