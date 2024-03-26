import {test, expect} from "@playwright/test";
import exp from "constants";
import { describe } from "node:test";

test.describe("Assertions", async()=>{

    test("Hard assertions", async ({page})=>{
        await page.goto("https://www.demoblaze.com/")
        await expect(page).toHaveURL("https://www.demoblaze.com/");
        await expect(page).toHaveTitle("STORE");
        /**
         toBeAttached, bir elementin o sayfaya (DOM) ait olup olmadığını doğrulamak için kullanılıyor
         ctrl+ö yorum satırı için kısa yol
         */
        await expect(page.getByText("Place Order").nth(1)).not.toBeAttached();
    })

    test("Automation practise", async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        // const checkBoxLocator = page.getByRole('radio', {name:'Male'}).first();
        const checkBoxLocator = page.locator("//input[@id='male']");
        await checkBoxLocator.click();
        //Ensures the Locator points to a checked input.
        await expect(checkBoxLocator).toBeChecked();

        //Ensures the Locator points to an enabled element.
        await expect(page.locator("//input[@id='name']")).toBeEnabled();

        //Ensures the Locator points to a disabled element.
        await expect(page.locator("//input[@id='name']")).not.toBeDisabled();

        //Ensures the Locator points to an editable element.
        await expect(page.locator("//input[@id='name']")).toBeEditable();

        //Ensures the Locator points to an empty editable element or to a DOM node that has no text.
        await expect(page.locator("//input[@id='name']")).toBeEmpty();
        await page.locator("//input[@id='name']").fill("Alparslan");
        await expect(page.locator("//input[@id='name']")).not.toBeEmpty();

        //Ensures the Locator points to an element with the given input value.
        await expect(page.locator("//input[@id='name']")).toHaveValue("Alparslan");

    })

    test("Demoqa.com", async({page})=>{
        await page.goto("https://demoqa.com/");
        //Ensures the Locator points to an element that intersects viewport, according to the 
        //intersection observer API. Elementin aılan/görünen sayfada (viewport) görünür olup
        //olmadığını kontrol etmek için kullanılır. 

        // Make sure element is fully outside of viewport.
        await expect(page.getByText("Book Store Application")).not.toBeInViewport();

        // Make sure that at least half of the element intersects viewport.
        //await expect(page.getByText("Book Store Application")).toBeInViewport();

        //Ensures the Locator points to an element that contains the given text.
        await expect(page.getByText("Book Store Application")).toContainText("Application");
        //metnin tamamı da kontrol ettirilebilir ama bu durumda hata alınabilir. bu assertion
        //sadece text e odaklandığı için true döndürebilir bu nedenle bire bir eşitlik kontrolü
        // için toHveText() assertion ı kullanılmalıdır.

        //Ensures the Locator points to an element with the given text.
        await expect(page.getByText("Book Store Application")).toHaveText("Book Store Application");
        /** karşılaştırdığı metinin başında, ortasında yada sonunda boşluk koysanızda bunları yok sayıyor
        ve assertion ı true olarak döndürüyor.
        When expected parameter is a string, Playwright will normalize whitespaces and line breaks 
        both in the actual text and in the expected string before matching. When regular expression
        is used, the actual text is matched as is. */       

    })
})

