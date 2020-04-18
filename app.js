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
  await page.waitForSelector('.single-menu-item')

/*
THE CAFE HAS BEEN SELECTED
*/

  const menuItems = await page.$$('.single-menu-item');

  const scrapedMealz = [];

  for (item of menuItems) {
    const title = await item.$eval('.menu-item h5', (title) => title.innerText);
    const [description, macros] = await item.$$eval('.menu-item p', (nodes) => nodes.map(node => node.innerText));
    const [calories, fat, carbs, protein] = macros.split(/ |\n|g/).filter(str => parseInt(str)).map(str => parseInt(str));

    scrapedMealz.push({title, calories, protein, carbs, fat});
  }

  console.log(scrapedMealz);




  // browser.close();
})();