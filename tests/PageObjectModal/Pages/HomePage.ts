import { Page, expect } from "@playwright/test"; //page ve expecti import ettik

/**
burada bir class oluşturcağız ve bu classın dışarıya açık olması yani erişilebilir olması gerekecek
(dışarıdan çağırılabilecek). bunun için öncelikle export keyword unu kullanıyoruz. classın public 
olması için default keywordu kullanılıyor. herhangi bir keyword kullanılmasa da zaten default olarak
public oluyor.*/

export default class Home {
    page: Page; //class levelinde bir page instance ı oluşturduk.

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToTheSite(url: string) {
        await this.page.goto(url);
    }

    async verifyTheAccecibility(url: string) { //doğrulama koyduk
        expect(url).toBe(this.page.url());
    }

    loginBtn = () => this.page.locator("#login2");

    async clickOnTheLoginBtn() {
        await this.loginBtn().click();
    }
}
