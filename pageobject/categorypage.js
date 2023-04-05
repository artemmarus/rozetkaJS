//  @ts-check
const { expect } = require("@playwright/test");
const category = require("../constans/category.json");

class CategoryPage {
    constructor(page) {
        this.page = page;
    }

    openSubcategory = async (categoryIndex = 2, subcategoryIndex = 1) => {
        const categoryButton = await this.page.locator( `//a[contains(text(), "${category[categoryIndex].subcategory[subcategoryIndex]}")]`);
        await categoryButton.click();
        await expect(await this.page.locator('h1')).toHaveText(category[categoryIndex].subcategory[subcategoryIndex],{ignoreCase:true})
    }

    applyPriceFilter = async () => {
        const minPriceInput = await this.page.locator('//input[@formcontrolname="min"]');
        await minPriceInput.fill("10000");
        await this.page.waitForLoadState('load');
        await minPriceInput.press("Enter", {timeOut: 1000});
        console.log(await minPriceInput.inputValue(), "before OK min price")

        const maxPriceInput = await this.page.locator('//input[@formcontrolname="max"]');
        await maxPriceInput.fill("30000");
        await this.page.waitForLoadState('load');
        await maxPriceInput.press("Enter" , {timeOut: 1000});
        console.log(await maxPriceInput.inputValue(), "before Ok max price");
        
        // const buttonToSubmitPriceRange = await this.page.locator('//button[contains(@class, "slider-filter__button")]');
        // await buttonToSubmitPriceRange.click();
        console.log(await minPriceInput.inputValue(), await maxPriceInput.inputValue(), "After OK");
        
        const buttonOrderSort = await this.page.locator('//div[@class="catalog-settings"]//select');
        await buttonOrderSort.selectOption({ label: "Від дешевих до дорогих"});   
    }

    applyBrandFilter = async (brand) => {
        await this.page.waitForLoadState('load');
        const brandCheckBox = await this.page.locator(`//a[@data-id="${brand}"]`);
        await brandCheckBox.click();
    }

    checkItemsTitle = async (keyWord) => {
        const itemTitle = await this.page.locator('//span[@class="goods-tile__title"]');
        await this.page.waitForSelector('//span[@class="goods-tile__title"]');
        for (let i = 0; i < await itemTitle.count(); i++) {
            await expect(await itemTitle.nth(i)).toContainText(keyWord);
        }
    }

    checkItemsPrice = async (minPrice = 10000, maxPrice = 30000) => {
        await this.page.waitForLoadState('load');
        const itemPrice = await this.page.locator('//span[@class="goods-tile__price-value"]');
        await this.page.waitForSelector('//span[@class="goods-tile__price-value"]');

        for (let i = 0; i < await itemPrice.count(); i++) {
            const regular = /\s+/g;
            const finalprice = await itemPrice.nth(i).textContent();
            const stringPrice = finalprice.substring(0, finalprice.length - 1).replace(regular, "");
            console.log(stringPrice);
            await expect(stringPrice >= minPrice && stringPrice <= maxPrice).toBeTruthy();
        }
    }

    chooseAnItem = async (index) => {
        const itemBanner = await this.page.locator('//a[contains(@class, "goods-tile__picture")]');
        await itemBanner.nth(index).click();
    }

    
}
module.exports = CategoryPage;