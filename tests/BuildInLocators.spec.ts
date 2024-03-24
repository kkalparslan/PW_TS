import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
})

/**
1-Locate by Role;
"The page.getByRole() locator reflects how users and assistive technology perceive the page, 
for example whether some element is a button or a checkbox. When locating by role, you should 
usually pass the accessible name as well, so that the locator pinpoints the exact element."
Role locators include buttons, checkboxes, headings, links, lists, tables, and many more and 
follow W3C specifications for ARIA role, ARIA attributes and accessible name. Note that many 
html elements like <button> have an implicitly defined role that is recognized by the role locator.

Note that role locators do not replace accessibility audits and conformance tests, but rather give
early feedback about the ARIA guidelines.
Accessibility name, bir web elementini UI da tanımlayan isimdir. Yani kullanıcının elemente 
baktığında onu ne olaak algıladığı isim diyebiliriz.

2-Locate by Label;
Most form controls usually have dedicated labels that could be conveniently used to interact 
with the form. In this case, you can locate the control by its associated label using 
page.getByLabel().
"Use this locator when locating form fields". Burası önemli. Her label tag li element getByLabel
ile locate edilmez. Bu element form field ise edilir. Burada locate ettiğimiz şey label ın kendisi
değil label ın bağlı olduğu input field ı.

3- Locate by Placeholder;
Bazı inputbox ların içerisinde nasıl bir format kullanmanız gerektiğini gösteren tanımlar 
veya ipucuları (placeholder) olur. Bu haldeki elementin placeholder atribute ı varsa 
getByPlaceholder("....") locator ı ile locate edebiliriz.

4- Locate by Alt text;
All images should have an alt attribute that describes the image. You can locate an image based
on the text alternative using page.getByAltText().
Use this locator when your element supports alt text such as img and area elements.

5- Locate by Title
Locate an element with a matching title attribute using page.getByTitle().
You can check the issues count after locating it by the title text:
await expect(page.getByTitle('Issues count')).toHaveText('25 issues');

6- Locate by test id;
Testing by test ids is the most resilient way of testing as even if your text or role of the 
attribute changes the test will still pass. QA's and developers should define explicit test ids 
and query them with page.getByTestId(). However testing by test ids is not user facing. If the 
role or text value is important to you then consider using user facing locators such as role and 
text locators.
*/


test('Build in Locators', async ({ page }) => {
    await expect(page.getByAltText("company-branding")).toBeVisible();
    await expect(page.getByText("Forgot your password? ")).toBeVisible();
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', { name: ' Login ' }).click();
})