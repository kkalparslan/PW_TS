import { test, expect } from '@playwright/test';

test.describe("Actions", () => {

  test.skip("Hover actions", async ({ page }) => {
    await page.goto("https://www.amazon.com/");
    const helloSignInLink = page.locator("#nav-link-accountList");
    await page.waitForSelector("#nav-link-accountList");
    await helloSignInLink.hover(); 
    await page.waitForTimeout(3000);
    const accountLink = page.locator("//span[text()='Account']");
    await accountLink.hover();
  })

  test("Right click actions", async ({ page, context }) => {
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
    const rightClickElement = page.getByText("right click me");
    await rightClickElement.click()//normal click (default-->sol) yapar
    await rightClickElement.click({ button: 'right' })
    //sağ click yapar. click methoduna option koyduk sadece.

    const rightClickMenu = page.locator("//ul[@class='context-menu-list context-menu-root']");
    await expect(rightClickMenu).toBeVisible();
  })

  test("Double click", async ({ page, context }) => {
    await page.goto("https://demoqa.com/buttons");
    const dbClickBtn = page.getByText("Double Click Me");
    await dbClickBtn.dblclick(); //double click için hazır bir asenkron method var.
    const expectedTextElement = page.locator("id=doubleClickMessage");
    //const expectedTextElement = page.getByText("You have done a double click")
    expect(await expectedTextElement.textContent()).toBe("You have done a double click");

    /**playwright ta bir contextin kapanmasına gerek kalmadan aynı test methodunun içinde yeni bir 
     * context (pencere, tab) açılarak örneğin farklı bir siteye gidilerek orada testler yapılabilir.
     */

    const pageTwo = await context.newPage(); //burada yeni bir context açmış oldum.
    await pageTwo.goto("https://testautomationpractice.blogspot.com/");
    await pageTwo.evaluate(() => {
      window.scrollTo(0, 200);
    })
    const copyTextBtn = pageTwo.getByText("Copy Text");
    await copyTextBtn.dblclick();

    const copiedTextBox = pageTwo.locator("#field2");
    expect(await copiedTextBox.inputValue()).toBe("Hello World!");
    //await expect(copiedTextBox).toHaveValue("Hello World!")
    })

    test("Drag and Drop",async({page})=>{
      await page.goto("https://testautomationpractice.blogspot.com/");
      const sourceElement=page.getByText("Drag me to my target");
      const targetElement=page.locator("#droppable");
   
      await sourceElement.dragTo(targetElement);
   
      const droppedText:string| null = await page.locator("#droppable p").textContent();

      /**droppedText elementinden sonra bir boşluk bırakıp tag i girdiğimizde dragTo dan sonra
       * oluşan texti locate edip ulaşabildim.
       * textContent methodu string yada null döndürdüğü için bizde droppedText değerini string
       * yada null olarak ayarladık ki bu dönüş için problem çıkarma demiş oluyoruz.
       * Tabiki hiç dönüş tipi de vermeyebiliriz.
       * Typescript kullandığımız için dönüş tipi verebiliyoruz.
       */
   
      expect(droppedText).toBe("Dropped!");   
   })
})