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

   test("Keybord actions",async({page})=>{   
    await page.goto("https://www.ebay.com/");
    const serachBox=page.getByPlaceholder("Search for anything");
    
    await serachBox.fill("phone holder for bike"); //search box a texti girdik    
    await page.keyboard.down('Shift'); //shift e basılı tutuyoruz.
  
    for(let i=0;i<'bike'.length; i++){
      await page.keyboard.press("ArrowLeft");//press işlemi tek seferlik basmak tır. Down da basılı
      //tutmuş oluyoruz.
      await page.waitForTimeout(1000);
    }
    
    await page.keyboard.up("Shift");//shift ten elimizi çekmiş olduk burada
    await page.waitForTimeout(1000);  
    await page.keyboard.press("Backspace");//seçtiğimiz bike stringini burada silecek
  
    await page.keyboard.press("c");
    await page.keyboard.press("a");
    await page.keyboard.press("r");
  
    await page.keyboard.press("Control+A");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Control+X");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Control+V");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Enter");
  })
})