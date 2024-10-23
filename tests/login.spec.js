const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();

const login = async (page) => {
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
  console.log("Success: user landed on portfolios page");
  // Take a screenshot of the portfolios page
  await page.screenshot({
    path: "screenshots/login.spec.png",
    fullPage: true,
  });
  console.log("Screenshot taken: Portfolios page");
};

test("login", async ({ page }) => {
  await login(page);
});
