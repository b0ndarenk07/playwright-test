const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "serial" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();
import { login } from "../utils";
const user = {
    username: process.env.TEST_USERNAME,
    password: process.env.PASSWORD,
    email: process.env.TEST_EMAIL
}
const port = {
    name: "A TEST OF TIME",
    description: "AN ABSOLUTE MONSTER OF A PORTFOLIO",
    empty: "EMPTY PORTFOLIO",
  }

test("deletePortfolio", async ({ page }) => {
    await login(page);
  
    // find the portfolio and the delete button associated with it, click it
    // await page.waitForTimeout(500);   

    // Navigate to create portfolio page
    // const deletPortfolioBtn = await page.getByRole("button", { name: "Create New Portfolio" });
    // await deletPortfolioBtn.click();

    // console.log("Success: Portfolio deleted");
    // await page.waitForTimeout(500);   
  
  });