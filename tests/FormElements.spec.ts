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

    test("CheckBox",async({page})=>{
          const day1=page.getByText("Sunday");
          const day2=page.getByText("Monday");
          const day3=page.getByText("Tuesday");
    
        //   await day1.check();
        //   await expect(day1).toBeChecked();
        //   await day2.check();
        //   await expect(day2).toBeChecked();
        //   await day3.check();
        //   await expect(day3).toBeChecked(); bu şekilde tek tek de yazabiliriz ama aşağıdaki gibi for 
        //   döngüsü ile hepsini seçip assert etmek daha best practise.
    
          const checkArray=[page.getByText("Sunday"),page.getByText("Monday"),page.getByText("Tuesday")]
          //const checkArray=[day1, day2, day3]
    
          for(const each of checkArray){
            await each.check();
            await expect(each).toBeChecked();
        }    
        })


})