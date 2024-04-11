import { test, expect } from '@playwright/test';


test.describe("Form elements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

  })

  test("text box and radio button", async ({ page }) => {

    const nameField = page.locator("#name");
    const genderRadioButton = page.locator("#male");
    const genderRadioButton2 = page.getByText("Female");

    await nameField.fill("Alparslan");
    await expect(nameField).toHaveValue("Alparslan");

    await genderRadioButton.check();
    await expect(genderRadioButton).toBeChecked();

    await genderRadioButton2.check();
    await expect(genderRadioButton2).toBeChecked();
  })

  test("CheckBox", async ({ page }) => {
    const day1 = page.getByText("Sunday");
    const day2 = page.getByText("Monday");
    const day3 = page.getByText("Tuesday");

    //   await day1.check();
    //   await expect(day1).toBeChecked();
    //   await day2.check();
    //   await expect(day2).toBeChecked();
    //   await day3.check();
    //   await expect(day3).toBeChecked(); bu şekilde tek tek de yazabiliriz ama aşağıdaki gibi for 
    //   döngüsü ile hepsini seçip assert etmek daha best practise.

    const checkArray = [page.getByText("Sunday"), page.getByText("Monday"), page.getByText("Tuesday")]
    //const checkArray=[day1, day2, day3]

    for (const each of checkArray) {
      await each.check();
      await expect(each).toBeChecked();
    }
  })

  test("Dropdowns intro", async ({ page }) => {
    const dropdown = page.locator("#country");
    /**
     Select tag li dropdown menuleri javadaki gibi 3 şekilde locate edebiliriz. Elementin texti,
     elementin value su ve elementin indexi ile. selectOption() metodu kullanılır. Text direk yazılırken
     value ve index kullanılırsa selectOption içerisine önce bu option yazılır ve sonra değer girilir.
     */
    await dropdown.selectOption("Canada"); //text ile 
    
    await dropdown.selectOption({ value: "germany" }); //value ile
    await dropdown.selectOption({ index: 5 }); //index ile

    const options = page.locator("#country option");

    await expect(options).toHaveCount(10);

    expect(await options.allTextContents()).toContain("China");

    const optionsArray = page.$$("#country option");

    expect(await optionsArray).toHaveLength(10);
    let status: boolean;
    /**
     * let: let değiştirilebilir değişkenler tanımlamak için kullanılır. Yani, bir değeri atanabilir 
     * ve daha sonra bu değer değiştirilebilir
     * const: const sabit değişkenler tanımlamak için kullanılır. Bir kere değer atandıktan sonra 
     * değiştirilemez. Yani değişkeni let ile tanımladığımızda bu değişken immutable olmuyor. 
    kod içerisinde farklı değerler alabiliyor. const ile initialise olursa immutable yani sabit oluyor.
     */
    status = false;

    for (const each of await optionsArray) {
      let opt = await each.textContent();
      if (opt == "China") {
        status = true;
        break;
      }
    }
    expect(status).toBeTruthy();
  })

  /**
   Multi select dropdowns. Select tag ine sahip bazı dropdownlarda (multiple işaretli olanları) 
   multiple seçim yapılabilir. 
   */
  test("Multi-select dropdowns", async ({ page }) => {
    const multiSelect = page.locator("#colors");
    // await multiSelect.selectOption(["Red", "Blue", "Green"]); //text ile
    // await multiSelect.selectOption(["red", "blue", "green"]); //value ile  
    // await multiSelect.selectOption({ index: 0 });
    // await multiSelect.selectOption({ index: 1 });
    // await multiSelect.selectOption({ index: 2 });
    // await expect(multiSelect).toHaveValue("green");

    await multiSelect.selectOption([{ index: 0 }, { index: 1 }, { index: 2 }])
    //await expect(multiSelect).toHaveValues(["red","blue","green"]);    
    //assertion için elementin value değerleri girilmelidir.     

    //     const colorsToSelect = [0, 1, 2]; // Seçmek istediğim renklerin index'leri
    // for (const index of colorsToSelect) {
    //     await multiSelect.selectOption({ index }); 
    // }
  })
})

test.describe("Dropdowns without select tag", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.arabam.com/ikinci-el?days=1");
  })

  test("Multi-select without select tag", async ({ page }) => {
    const dropdown = page.locator("//span[text()='İl']");
    /**
     * bu ve aşağıdaki testte hatalar aldım. locator ları değiştirmeme rağmen dropdown menulere 
     * tıklayamadım.
     */
    await dropdown.click();

    const city1 = page.getByText("İstanbul Avrupa");
    const city2 = page.getByText("İstanbul Anadolu");

    await city1.check(); //click methodu da kullanılabilir
    await city2.check(); //click methodu da kullanılabilir      
  })

  test("Dropdowns without select", async ({ page }) => {
    const dropdown = page.getByText("İlan Sahibi");
    await dropdown.click();

    const option = page.locator("//label[@class='radio']").nth(0);
    const option1 = page.locator("//label[@class='radio']").nth(1);

    await option.check();
    await option1.check();
  })
})