import {Page, expect} from "@playwright/test";

export default class LoginPage {

    page:Page;

    constructor(page: Page) {
        this.page = page;
    }
        
    async navigateToLogin(url:String) {
        await this.page.goto('https://sit.tuulasoft.com/')    
        expect(this.page.url()).toBe("")    
    }
   
    async logout() {
        await this.page.waitForTimeout(2000)        
    }
} 
/**
 * Bu sayfa herhangi bir kod içermiyor. Typescripte örnek olarak hazırlandı.
 */