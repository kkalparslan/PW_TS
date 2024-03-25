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
        await expect(checkBoxLocator).toBeChecked();
        await expect(page.locator("//input[@id='name']")).toBeEnabled();
        await expect(page.locator("//input[@id='name']")).not.toBeDisabled();
        await expect(page.locator("//input[@id='name']")).toBeEditable();

    })
})

