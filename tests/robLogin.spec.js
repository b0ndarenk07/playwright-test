const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

test.use({ workers: 1 }); // Run the test sequentially
const timeout = 35 * 60 * 1000; // 35-minute timeout
test.setTimeout(timeout);

test.describe("User Authentication Tests", () => {
    
    // Runs before each test
    test.beforeEach(async ({ page }) => {
        await page.goto("https://bossman.co/");
        console.log("Navigated to homepage");
    });

    // Main login test
    test("login and navigate to portfolios", async ({ page, browser }) => {
        // Navigate to login page
        const loginBtnLandingPage = await page.getByRole("link", { name: "Login" });
        await loginBtnLandingPage.click();
        await page.waitForURL('**/login');
        // Fill in the login form
        const username = await page.getByPlaceholder("Username");
        await username.fill(process.env.USERNAME);
        const password = await page.getByPlaceholder("********");
        await password.fill(process.env.PASSWORD);

        // Submit the login form
        const loginBtnOnLoginPage = await page.getByRole("button", { name: "Login" });
        await loginBtnOnLoginPage.click();
        await page.waitForURL('**/portfolios');
        // Assert that the user is on the portfolios page
        await expect(page).toHaveURL(/.*portfolios/);
        console.log("Success: User landed on portfolios page");

        // Take a screenshot of the portfolios page
        await page.screenshot({ path: 'screenshots/portfolios_page.png', fullPage: true });
        console.log("Screenshot taken: Portfolios page");

        // Navigate to a specific section (e.g., Portfolios)
        const portfoliosLink = await page.getByRole("link", { name: "Portfolios" });
        await portfoliosLink.click();
        await expect(page).toHaveURL(/.*portfolios/);
        console.log("Success: User is on the Portfolios page");

        // Check for the visibility of portfolio title
        const portfoliosTitle = await page.locator('h1:has-text("Portfolios")');
        await expect(portfoliosTitle).toBeVisible();
        console.log("Success: Portfolios title is visible");
        
        const menu = await page.getByRole('button', { name: 'Open user menu' })
        await expect(menu).toBeVisible();
        await menu.click();
        
        // Log out the user
        const logoutBtn = await page.getByRole('menuitem', { name: 'Log out' })
        await logoutBtn.click();

        const landingPage = page.getByRole('heading', { name: 'Bossman Visualizations', exact: true })
        await expect(landingPage).toBeVisible();
        console.log("Success: User logged out");

    });



});