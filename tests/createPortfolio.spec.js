const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();
import { login } from "../utils";

test("createPortfolio - empty portfolio", async ({ page }) => {
  await login(page);

  //    TODO: we logged in, now let's create a portfolio
  //    Verify that the user can create a portfolio by asserting via expect(something).toBeVisible() on the page, then screenshot the page
  //    For example the title of a portfolio is visible, without assets  added
  await page.screenshot({
    path: "screenshots/createPortfolio.spec.png",
    fullPage: true,
  });
});

test("createPortfolio - private portfolio visibility", async ({ page }) => {
  await login(page);

  //   TODO: use the same portfolio and make it private ( usually is private by default)
  //   Verify that the user can create a private portfolio
  //   Assert it can NOT be viewed from incognito
  await page.screenshot({
    path: "screenshots/createPortfolio.private.spec.png",
    fullPage: true,
  });
});

test("createPortfolio - public portfolio visibility", async ({ page }) => {
  await login(page);

  //    TODO: use the same portfolio and make it public
  //    Verify that the user can create a public portfolio
  //    Assert it can be viewed from incognito

  await page.screenshot({
    path: "screenshots/createPortfolio.public.spec.png",
    fullPage: true,
  });
});

test("createPortfolio - with stock and crypto asset and assert piechart", async ({ page }) => {
  await login(page);

  //   TODO: we logged in, now let's create a portfolio
  //   Verify that a portfolio with a stock and crypto asset can render the pie chart.
  await page.screenshot({
    path: "screenshots/createPortfolio.piechart.spec.png",
    fullPage: true,
  });
});
