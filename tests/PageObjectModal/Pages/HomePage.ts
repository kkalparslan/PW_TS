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

    /**
     * Locate işlemlerini klasik type belirten const, let gibi belirteçler ile değil de 
     * (Typescrip, javasccript ile alakalı bir durum bu. Sınıf içerisinde doğrudan locator
     * a isim vererek kullanıyoruz) arrow function içerisinde yaptı Faruk hoca. 
     * Ayrıca locator ı da yine Çünkü locator ı page ile oluşturacağız. this.page i 
     * kullanabilmek yani this in çevrelediği field ları/özellikleri kullanabilmek için bu
     * locator ı arrow function içinde kullanmamız gerekiyor. Aksi takdirde normal bir 
     * fonksiyon ile bunu yapamıyoruz sadece arrow function izin veriyor. Yani locator ı 
     * bir fonksiyon ile atamış olduk. This in çevrelediği page i kullanacağımız için.
     * Normalde This in çevrelediği herhangi bir field ı dışarıda kullanamıyoruz.
     */

    loginBtn = () => this.page.locator("#login2");

    async clickOnTheLoginBtn() {
        await this.loginBtn().click();
    }
}
