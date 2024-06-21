/**playwright modülünden test ve expect (assertion), packagelarını import ediyoruz. */
import { test, expect } from "@playwright/test";
import exp from "constants";

/**test methodumuza parametre olarak öncelikle testimizin ismi veya açıklaması ile anonimize
 the function yani error function veriyoruz. Error function ı burada bir page nesnesi alıyor.
 buradaki page, testlerimizde kullanacağımız tüm build in methodları içeren bir nesnedir.
 javascript ve typescript bazı noktalarda asenkron çalışır. http requestlerde ve time 
 işlemlerindeki gibi. Playwright taki bu page nesnesi ile birlikte gelen methhodlar da asenkron 
 çalışmaktadır. Örneğin goto() metodu üzerine geldiğimizde çıkan açıklamada promise döndüğünü
 görebiliriz. bir method promise döndürüyorsa burada asenkron bir yapı olduğu anlaşılır. bu 
 durumu senkronize etmek için ise "async" ve "await" keywordları kullanılmaktadır......*/
test('Verify that the website is accessable', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/")
    await expect(page).toHaveTitle("STORE")
    await expect(page).toHaveURL("https://www.demoblaze.com/")    
})
/**expect ile assertionlarımızı yapmış olduk. */