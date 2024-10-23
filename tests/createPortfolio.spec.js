const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();
import { login } from "../utils";

// Test for creating an empty portfolio
test("createPortfolio - empty portfolio", async ({ page }) => {
  await login(page);

  // Navigate to create portfolio page
  const createPortfolioButton = await page.getByRole("button", { name: "Create New Portfolio" });
  await createPortfolioButton.click();
  await page.waitForURL('**/portfolio/new');

  // Fill in portfolio details and submit
  const portfolioNameInput = await page.getByPlaceholder("Portfolio Name");
  await portfolioNameInput.fill("Empty Portfolio");
  const createButton = await page.getByRole("button", { name: "Create" });
  await createButton.click();

  // Verify that the portfolio was created successfully
  await page.waitForURL('**/portfolios');
  const portfolioTitle = await page.getByText("Empty Portfolio");
  await expect(portfolioTitle).toBeVisible();
  console.log("Success: Empty portfolio created and title is visible");

  // Take a screenshot
  await page.screenshot({
    path: "screenshots/createPortfolio.spec.png",
    fullPage: true,
  });
});

// Test for creating a private portfolio and verifying visibility
test("createPortfolio - private portfolio visibility", async ({ page, context }) => {
  await login(page);

  // Navigate to create portfolio page
  const createPortfolioButton = await page.getByRole("button", { name: "Create Portfolio" });
  await createPortfolioButton.click();
  await page.waitForURL('**/create-portfolio');

  // Fill in portfolio details and set it as private
  const portfolioNameInput = await page.getByPlaceholder("Portfolio Name");
  await portfolioNameInput.fill("Private Portfolio");
  const privateCheckbox = await page.getByRole("checkbox", { name: "Private" });
  await privateCheckbox.check();
  const createButton = await page.getByRole("button", { name: "Create" });
  await createButton.click();

  // Verify that the portfolio was created successfully
  await page.waitForURL('**/portfolios');
  const portfolioTitle = await page.getByText("Private Portfolio");
  await expect(portfolioTitle).toBeVisible();
  console.log("Success: Private portfolio created and title is visible");

  // Verify that the portfolio is not visible in incognito mode
  const incognitoContext = await context.browser().newContext();
  const incognitoPage = await incognitoContext.newPage();
  await incognitoPage.goto(page.url());
  await expect(incognitoPage.getByText("Private Portfolio")).not.toBeVisible();
  console.log("Success: Private portfolio is not visible in incognito mode");

  // Take a screenshot
  await page.screenshot({
    path: "screenshots/createPortfolio.private.spec.png",
    fullPage: true,
  });
});

// Test for creating a public portfolio and verifying visibility
test("createPortfolio - public portfolio visibility", async ({ page, context }) => {
  await login(page);

  // Navigate to create portfolio page
  const createPortfolioButton = await page.getByRole("button", { name: "Create Portfolio" });
  await createPortfolioButton.click();
  await page.waitForURL('**/create-portfolio');

  // Fill in portfolio details and set it as public
  const portfolioNameInput = await page.getByPlaceholder("Portfolio Name");
  await portfolioNameInput.fill("Public Portfolio");
  const publicCheckbox = await page.getByRole("checkbox", { name: "Public" });
  await publicCheckbox.check();
  const createButton = await page.getByRole("button", { name: "Create" });
  await createButton.click();

  // Verify that the portfolio was created successfully
  await page.waitForURL('**/portfolios');
  const portfolioTitle = await page.getByText("Public Portfolio");
  await expect(portfolioTitle).toBeVisible();
  console.log("Success: Public portfolio created and title is visible");

  // Verify that the portfolio is visible in incognito mode
  const incognitoContext = await context.browser().newContext();
  const incognitoPage = await incognitoContext.newPage();
  await incognitoPage.goto(page.url());
  await expect(incognitoPage.getByText("Public Portfolio")).toBeVisible();
  console.log("Success: Public portfolio is visible in incognito mode");

  // Take a screenshot
  await page.screenshot({
    path: "screenshots/createPortfolio.public.spec.png",
    fullPage: true,
  });
});

// Test for creating a portfolio with assets and verifying the pie chart
test("createPortfolio - with stock and crypto asset and assert piechart", async ({ page }) => {
  await login(page);

  // Navigate to create portfolio page
  const createPortfolioButton = await page.getByRole("button", { name: "Create Portfolio" });
  await createPortfolioButton.click();
  await page.waitForURL('**/create-portfolio');

  // Fill in portfolio details and add assets
  const portfolioNameInput = await page.getByPlaceholder("Portfolio Name");
  await portfolioNameInput.fill("Portfolio with Assets");
  const addStockButton = await page.getByRole("button", { name: "Add Stock" });
  await addStockButton.click();
  const stockInput = await page.getByPlaceholder("Stock Name");
  await stockInput.fill("AAPL");
  const addCryptoButton = await page.getByRole("button", { name: "Add Crypto" });
  await addCryptoButton.click();
  const cryptoInput = await page.getByPlaceholder("Crypto Name");
  await cryptoInput.fill("BTC");
  const createButton = await page.getByRole("button", { name: "Create" });
  await createButton.click();

  // Verify that the pie chart is visible
  await page.waitForURL('**/portfolios');
  const portfolioTitle = await page.getByText("Portfolio with Assets");
  await expect(portfolioTitle).toBeVisible();
  const pieChart = await page.getByRole("img", { name: "Portfolio Pie Chart" });
  await expect(pieChart).toBeVisible();
  console.log("Success: Portfolio with assets created and pie chart is visible");

  // Take a screenshot
  await page.screenshot({
    path: "screenshots/createPortfolio.piechart.spec.png",
    fullPage: true,
  });
});
