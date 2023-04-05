// @ts-check
const {expect} = require('@playwright/test')

class CartPage {
    constructor(page){
        this.page = page;
    }

    checkTotalPrice = async () => {
        await this.page.waitForSelector('//p[contains(@class, "cart-product__price")]')
        const itemPrice = await this.page.locator('//p[contains(@class, "cart-product__price")]')
        let sumOfPrices = 0;
        const regular = /\s+/g;

        for(let i = 0; i < await itemPrice.count(); i++){
            const finalprice = await itemPrice.nth(i).textContent()
            const stringPrice = finalprice.substring(0, finalprice.length - 1).replace(regular, "");
            sumOfPrices += parseInt(stringPrice);    
        }

        const totalPrice = await this.page.locator('//div[@class="cart-receipt__sum-price"]');
        const totalPriceText = await totalPrice.textContent()
        const totalPriceSum = totalPriceText.substring(0, totalPriceText.length - 1).replace(regular, "");
    
        await expect(totalPriceSum == sumOfPrices).toBeTruthy();
    }

    openItemContextMenu = async () => {
        const contextMenuBtn = await this.page.locator('.button--white');
        await contextMenuBtn.click();
        const buttonDeleteItem = await this.page.locator('.context-menu-actions__button');
        await expect(buttonDeleteItem).toBeVisible();
    }

     deleteProductFromCart = async () =>{
        const deleteBtn = await this.page.locator('.context-menu-actions__button');
        await deleteBtn.click();
    }
}

module.exports = CartPage;