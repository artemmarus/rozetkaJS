//  @ts-check

const { expect } = require("@playwright/test");

class ItemPage {
    constructor(page){
        this.page = page;
    }
    buyItem = async () => {
        await this.page.waitForLoadState("load")
        await this.page.waitForSelector('//div[@class = "product-about__right"]//button[@aria-label="Купити"]')
        const buyButton = await this.page.locator('//div[@class = "product-about__right"]//button[@aria-label="Купити"]');
        await buyButton.click({timeOut:1000});

        if( (await this.page.locator('//div[@class="modal__content"]')).isVisible()){
            await this.page.waitForSelector('//p[contains(@class, "cart-product__price")]');
            const itemInTheCart = await this.page.locator('//p[contains(@class, "cart-product__price")]');
            await expect(await (itemInTheCart).count()).toBeGreaterThan(0);
            const buttonCloseModal = await this.page.locator('//button[@class="modal__close"]');
            await buttonCloseModal.click();
            // await this.page.goto("")
        } 
    }
    comebackToMainPage = async () => {
        await this.page.goto("https://rozetka.com.ua/")
    }
}
module.exports = ItemPage;