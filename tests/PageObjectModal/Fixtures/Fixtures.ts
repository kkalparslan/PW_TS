import { test as base } from '@playwright/test';
import Home from '../Pages/HomePage';
import LoggedIn from '../Pages/LoggedInPage';
import Login from '../Pages/LoginPage'

// Declare the types of your fixtures.
type MyFixtures = {
  home:Home,
  loggedIn:LoggedIn,
  login:Login
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
   home: async ({ page }, use) => {
    /*const home = new Home(page);
    await use(home);    şeklinde de kullanabilirdik ama use içinde doğrudan new ile kullandık*/
    await use(new Home(page));
  },

  loggedIn: async ({ page }, use) => {
    await use(new LoggedIn(page));
  },

  login:async({page},use)=>{
    await use(new Login(page));
  }
  /**
   * Yukarıda home, loggedIn ve login fixture larını oluşturmuş olduk. Yani her test objesinin 
   * içinde page fixture nı nasıl kullanıyorsak bunları da kullanabileceğiz.
   * Kullandığımız hiç bir sınıfta da bu dosyayı import etmemizze ya da buradan nesne oluş
   * turmaya gerek kalmamış oluyor. Testlerin içinde doğrudan parametre olarak çağırıp methodlara 
   * erişmek mümkün oluyor.
   */
});
export { expect } from '@playwright/test';