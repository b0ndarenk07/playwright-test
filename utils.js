const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();


export const login = async (page) => {
    const url = "https://bossman.co/";
    await page.goto(url);
    const loginBtnLandingPage = await page.getByRole("link", { name: "Login" });
    await loginBtnLandingPage.click();
    await page.waitForURL("**/login");
    const loginTitle = await page.getByRole("heading", { name: "Login" });
    expect(loginTitle).toBeTruthy();
    const username = await page.getByPlaceholder("Username");
    await username.fill(process.env.USERNAME);
    const password = await page.getByPlaceholder("********");
    await password.fill(process.env.PASSWORD);
  
    const loginBtnOnLoginPage = await page.getByRole("button", { name: "Login" });
    await loginBtnOnLoginPage.click();
    await expect(page).toHaveURL(/.*portfolios/);
    console.log("Success: user logged in and landed on portfolios page");
  
  };