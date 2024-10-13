const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();

test("login", async ({ page, browser }) => {
  const url = "https://bossman.co/";
  await page.goto(url);
  const loginBtnLandingPage = await page.getByRole("link", { name: "Login" });
  await loginBtnLandingPage.click();

  const username = await page.getByPlaceholder("Username");
  await username.fill(process.env.USERNAME);
  const password = await page.getByPlaceholder("********");
  await password.fill(process.env.PASSWORD);

  const loginBtnOnLoginPage = await page.getByRole("button", { name: "Login" });
  await loginBtnOnLoginPage.click();

  await expect(page).toHaveURL(/.*portfolios/);
  console.log("Success: user landed on portfolios page");
  browser.close();
});
