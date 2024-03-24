import{test, expect} from "@playwright/test";

test.beforeEach(async({page})=>{ //isim parametresi yok sadece error function alıyor.
    await page.goto("https://www.demoblaze.com/")
})

test.describe("Login functionallity", ()=>{ //testlerimizi gruplandırmak için kullanıyoruz. 
    //async ve page nesnesi almadan sadece error function ile kullanılır. 
    test('Verify that the website is accessable', async ({ page }) => {
        await expect(page).toHaveTitle("STORE")
        await expect(page).toHaveURL("https://www.demoblaze.com/")    
    })

    test("Verify that user is able to log in the system with valid credentials", async({page})=>{
        //await page.locator("//a[text()='Log in']").click();
        await page.click("//a[text()='Log in']"); //xpath ile locate ettik.
        await page.fill("#loginusername", "alparslan@gmail.com");//css ile locate ettik.
        await page.locator("[id='loginpassword']").fill("12345") //property ile locate ettik.
        await page.locator("button[class='btn btn-primary']").nth(2).click()
        await expect(page.locator("//a[@id='logout2']")).toBeVisible();        
    })
})

