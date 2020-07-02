const puppeteer = require('puppeteer');

(async () => {

  try {
    const url = 'https://www.cleaneatz.com/mealplanmenu';

    const browser = await puppeteer.launch({headless: true, slowmo: false, defaultViewport: null});

    const context = browser.defaultBrowserContext();
    await context.overridePermissions(url, ['geolocation']);

    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('select')
    await page.waitFor(300);

    const state = await page.select('select#location-states', 'SC');
    const cafe = await page.select('select.fancy-select.state-locs', '3576171');
    console.log('Location chosen - Greenville, SC')
    await page.waitForSelector('.menu-item')
    await page.waitFor(1000)

/*
THE CAFE HAS BEEN SELECTED
*/
    const menuItems = await page.$$('.single-menu-item');

    const scrapedMealz = [];

    for (item of menuItems) {
      const title = await item.$eval('.menu-item h5', (title) => title.innerText);
      const [description, nutrients] = await item.$$eval('.menu-item p', (nodes) => nodes.map(node => node.innerText));
      const [calories, fat, carbs, protein] = nutrients.split(/ |\n|g/).filter(str => parseInt(str)).map(str => parseInt(str));

      scrapedMealz.push({title, calories, protein, carbs, fat});
    }

    console.log(scrapedMealz);
/*
THE MEALS HAVE BEEN SCRAPED AND COMPILED INTO AN ARRAY OF OBJECTS
*/
    await page.goto('https://www.myfitnesspal.com/account/login');
    await page.waitFor('//*[@id="username"]');
    await page.click('input#username.text');

    await page.keyboard.type('jacobcharles96@gmail.com');
    await page.keyboard.press('Tab')
    await page.keyboard.type(password)

    const login = await page.$('form.login div.member-login input[type="submit"]')
    login.click();
    console.log('logged into myfitnesspal')
  /*
  NOW LOGGED INTO MYFITNESSPAL
  */
    await page.waitFor(1000);
    await page.waitFor('#ember1527');
    await page.click('#ember1527');

    const myFoods = await page.waitFor('#header #subNav li a[href="/food/mine"');
    await page.click(myFoods);

    for (food of scrapedMealz) {
      await page.waitFor('a.button[href="/food/new"');
      await page.click('a.button[href="/food/new"');

      await page.waitFor('#food_brand');
      await page.click('#food_brand', {clickCount: 2});

      await page.keyboard.type('Clean Eatz');
      await page.keyboard.press('Tab');
      await page.keyboard.type(food.title);

      await page.click('input.button.style-4')
      console.log('made it to the end');
    }
  } catch (err) {
    console.error(err);
  }

  // browser.close();
})();