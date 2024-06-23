import { test, expect } from '@playwright/test';

test.describe("Handling windows", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://demoqa.com/browser-windows");
    })

    test.skip("New Tab", async ({ page }) => {
        const newTabBtn = page.getByText("New Tab");
        await newTabBtn.click();

        const newTabText = page.getByText("This is a sample page");
        await expect(newTabText).toBeVisible();
        //hatalı kod! page nesnesi ile yeni açılan tabde işlem yapılamaz    
    })

    test.skip("New Tab with context", async ({ page, context }) => {
        const newTabBtn = page.getByText("New Tab");

        const newPage = context.waitForEvent('page');
        //newPage rastgele bir isim. context nesnesi ile yani açılan sayfayı tanıtmış olduk.
        await newTabBtn.click();
        const page2 = await newPage; //tanıttığımız sayfayı page2 nesnesine atadım.
        await page2.waitForLoadState();//bazen ihtiyaç duyduğu için waitForLoadState() methodu kullandım.

        const newTabText = page2.getByText("This is a sample page");
        await expect(newTabText).toBeVisible(); //assertion bu kez passed oldu.    

        await page.bringToFront(); //bu kodu kullanmasakta aşağıdaki işlemi yapar. 
        //Ancak UI da görülmesi isteniyorsa o sayfa bu kod bloğu ile öne getirilmelidir.
        await page.waitForTimeout(2000);
        await page.getByText("Elements").click();   

        await page2.bringToFront()        
        expect(page2.url()).toBe("https://demoqa.com/sample") //işlem yapılan sayfayı biz 
        //göremesekte, playwright görüyor ve tanımlı methodun gereğini yapıyor. 
        /**yani yeni açılan bir sayfada işlem yapılmak isteniyorsa o sayfa tanıtılmalıdır. Aksi
         * takdirde o sayfada işlem yapamayız.*/
    })

    test("New Tab with for loop", async ({ page, context }) => {
        const newTabBtn = page.getByText("New Tab");
        const newPage = context.waitForEvent('page');
        await newTabBtn.click();
        const page2 = await newPage; //tanıttığımız sayfayı page2 nesnesine atadım.
        await page2.waitForLoadState();

        const allPages = context.pages();
        
        for(const eachPage of allPages){
            const eachPageUrl = eachPage.url();
            console.log(`èach page url: ${eachPageUrl}`);
        }        
    })    
})