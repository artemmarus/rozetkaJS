//  @ts-check
const { expect } = require("@playwright/test");

class LoginPage {
    constructor (page){
        this.page = page;
    }

    loginInAccount = async () => {

        const fieldForMail = await this.page.locator("#auth_email");
        await fieldForMail.fill("litvischenko@gmail.com");

        const fieldForPassword = await this.page.locator("#auth_pass");
        await fieldForPassword.fill("Woper10rof40ti");

        const buttonSubmitLogin = await this.page.locator('//button[contains(@class, "auth-modal__submit")]');
        await buttonSubmitLogin.click();
    }

    openUserAccoun = async () => {
        const userButtonInNav = await this.page.locator('//li[contains(@class, "header-actions__item--user")]//button');
        await userButtonInNav.click();

        await expect(this.page).toHaveURL("https://rozetka.com.ua/ua/cabinet/orders/");
    }
}

module.exports = LoginPage