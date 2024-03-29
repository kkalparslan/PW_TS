import{test,expect} from '@playwright/test';




test.describe("Form elements",()=>{
  test.beforeEach(async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
   
   })


    test("text box and radio button",async({page})=>{

        const nameField=page.locator("#name");
        const genderRadioButton=page.locator("#male");
        const genderRadioButton2=page.getByText("Female");

        await nameField.fill("Alparslan");
        await expect(nameField).toHaveValue("Alparslan");

        await genderRadioButton.check();
        await expect(genderRadioButton).toBeChecked();

        await genderRadioButton2.check();
        await expect(genderRadioButton2).toBeChecked();
    })

})