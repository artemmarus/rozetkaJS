//  @ts-check
const { expect } = require("@playwright/test");
const category = require( "../constans/category.json" );


class HomePage{
    constructor(page){
        this.page = page 
    }
    
    verifyURL = async ( url) => {
        await expect(this.page).toHaveURL(url);
    };

    openCategory = async (index = 2) => {
        const categoryButton = await this.page.locator(`//div[@class = "fat-wrap"]//a[contains(text(), "${category[index].category}")]`);
        await categoryButton.click();
        await expect(await this.page.locator('h1')).toHaveText(category[index].category, {ignoreCase:true});
    }

    findProductById = async (itemName) => {
        const searchInput = await this.page.locator('input.search-form__input');
        await searchInput.fill(itemName);
        await searchInput.press('Enter');
    }

    openCart = async () => {
        const cartButtonInNav = await this.page.locator('//li[contains(@class, "header-actions__item--cart")]//button');
        await cartButtonInNav.click();

        const cartModalWindow = await this.page.locator('//div[@class="modal__content"]');
        await expect(cartModalWindow).toBeVisible();
    }

    openUserAccount = async () => {
        const userButtonInNav = await this.page.locator('//li[contains(@class, "header-actions__item--user")]//button');
        await userButtonInNav.click();

        const cartModalWindow = await this.page.locator('//div[@class="modal__content"]');
        await expect(cartModalWindow).toBeVisible();
    }
}
module.exports =  HomePage;