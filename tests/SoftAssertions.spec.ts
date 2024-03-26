import { test, expect } from "@playwright/test";

test('Soft assertion', async({page})=>{
    await page.goto("https://demoqa.com/");
    await expect.soft(page.getByText("Book Store Application")).not.toBeInViewport();
    // await expect(page.getByText("Book Store Application")).toBeInViewport();
    await expect.soft(page.getByText("Book Store Application"), "assertion1").toContainText("Application");
    await expect.soft(page.getByText("Book Store Application"), "assertion2").toContainText(" ppplication");
    await expect.soft(page.getByText("Book Store Application"), "assertion3").toContainText("pion");
    await expect.soft(page.getByText("Book Store Application"), "asssertion4").toHaveText("Book Store Application");
    // await expect(page.getByText("Book Store Application")).toHaveText(" Book Store Application"); //hata verecek
    // await expect(page.getByText("Book Store Application")).toHaveText("Store Application"); // hata verecek
})