const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: 'parallel' });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();

test("login", async ({ page, browser }) => {
  const url = "https://bossman.co/";
  await page.goto(url);
  const loginBtnLandingPage = await page.getByRole("link", { name: "Login" });
  await loginBtnLandingPage.click();
  await page.waitForURL('**/login');
  const loginTitle = await page.getByRole('heading', { name: 'Login' });
  expect(loginTitle).toBeTruthy();
  const username = await page.getByPlaceholder("Username");
  await username.fill(process.env.USERNAME);
  const password = await page.getByPlaceholder("********");
  await password.fill(process.env.PASSWORD);

  const loginBtnOnLoginPage = await page.getByRole("button", { name: "Login" });
  await loginBtnOnLoginPage.click();
  await expect(page).toHaveURL(/.*portfolios/);
  console.log("Success: user landed on portfolios page");
});
