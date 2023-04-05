// // @ts-check
// const HomePage = require("../pageobject/homepage");
// const ItemPage = require('../pageobject/itempage');
// const CartPage = require('../pageobject/cartpage');

// const { test, expect } = require('@playwright/test');

// test('add item from rozetka', async ({ page }) => {
//     const homepage = new HomePage(page);
//     const itempage = new ItemPage(page);
//     const cartpage = new CartPage(page);
//     const itemId = '8714599108932';
//     const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//     // Home page
//     // await homepage.visit();
//     await homepage.findProductById(itemId);
//     await delay(3000);

//     //Next page, item page
//     await page.waitForLoadState('domcontentloaded');
//     await itempage.clickBuyButton();

//     //Cart icon
//     await page.waitForLoadState('domcontentloaded');
//     await cartpage.openItemContextMenu();
//     await cartpage.deleteProductFromCart();
//     await delay(3000)

// });