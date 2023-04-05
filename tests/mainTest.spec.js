// @ts-check
import { test } from "@playwright/test"
import CartPage from "../pageobject/cartpage";
import ItemPage from "../pageobject/itempage";
import LoginPage from "../pageobject/loginPage";
const HomePage = require("../pageobject/homepage");
const CategoryPage = require("../pageobject/categorypage");


test.beforeEach(async ({ page }) => {
    await page.goto("/")
})

test.describe("Verify if the price filter working correctly for the following marketplaces", () => {
    // 1. Open marketplace url. Verify it.
    // 2. Open category and subcategory if it is necessary.
    // 3. Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2-3 filters.
    // 4. Verify that all the items on the page are sorted correctly by the "from" and "to" price filters you entered.

    test("Verify that marketplace urs is correct", async ({ page }) => {
        // create new Object
        const homepage = new HomePage(page);
        await homepage.verifyURL("https://rozetka.com.ua/ua/");
    });
    

    test("apply some filters and check that items sorted correctly", async ({ page }) => {
        // create new Objects
        const homepage = new HomePage(page);
        const categorypage = new CategoryPage(page);

        // open category and subcategory and verify it
        await homepage.openCategory();
        await categorypage.openSubcategory();

        // apply some filters and check that items sorted correct
        await categorypage.applyBrandFilter("Valve");
        await categorypage.applyPriceFilter();
        await categorypage.checkItemsTitle("Valve");
        await categorypage.checkItemsPrice()
    })

});

test.describe("Add items to the basket", async () => {
    // 1. Open marketplace url.Verify it.
    // 2. Open category and subcategory if it is necessary.
    // 3. Add any item to the basket.
    // 4. Select another category and add an item from that category.
    // 5. Verify information of items inside the basket.
    // 6. Verify that the price is calculated correctly.
    // 7. Verify that the delete item button is clickable.
    test("Add item to the Cart (Basket)", async ({ page }) => {
    // create new Objects
    const homepage = new HomePage(page);
    const categorypage = new CategoryPage(page);
    const itemPage = new ItemPage(page)
    const cartPage = new CartPage(page)

    //choose category
    await homepage.openCategory();
    await categorypage.openSubcategory();
    await categorypage.chooseAnItem(0);
    await itemPage.buyItem();
    await itemPage.comebackToMainPage();
    await homepage.openCategory(3);
    await categorypage.openSubcategory(3, 1);
    await categorypage.chooseAnItem(0);
    await itemPage.buyItem();
    await itemPage.comebackToMainPage();
    await homepage.openCart()
    await cartPage.checkTotalPrice()
    });
});

test.describe("Search the item", async () => {
    // 1. Open marketplace url. Verify it.
    // 2. Search random item by name.
    // 3. Verify that all items are correctly displayed according to your searching request (only on the first page).
    test("Search an item", async ({ page }) => {
        const homepage = new HomePage(page);
        const categorypage = new CategoryPage(page);

        await homepage.verifyURL("https://rozetka.com.ua/ua/");
        await homepage.findProductById("iPhone 14");
        await categorypage.checkItemsTitle("iPhone 14");
    })
});

test.describe("Try to login in account", async () => {
    test ("open login modal and try to login in unavailable account", async ({ page }) => {
        const homepage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homepage.openUserAccount();
        await loginPage.loginInAccount();
        await loginPage.openUserAccoun()
    })
})