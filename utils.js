const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();

export const home = "https://bossman.co/";

export const login = async (page, USER , PASS) => {
    const url = home;
    await page.goto(url);
    const loginBtnLandingPage = await page.getByRole("link", { name: "Login" });
    await loginBtnLandingPage.click();
    await page.waitForTimeout(1000);    

    await page.waitForURL("**/login");
    const loginTitle = await page.getByRole("heading", { name: "Login" });
    expect(loginTitle).toBeTruthy();

    const username = await page.getByPlaceholder("Username");
    if (USER == null) {
      USER = process.env.USERNAME;
    }
    await username.fill(USER);
    await page.waitForTimeout(500);    
    if (PASS == null) {
      PASS = process.env.PASSWORD;
    }
    const password = await page.getByPlaceholder("********");
    await password.fill(PASS);
    await page.waitForTimeout(500);   
  
    const loginBtnOnLoginPage = await page.getByRole("button", { name: "Login" });
    await loginBtnOnLoginPage.click();
    await page.waitForTimeout(1000);   
    await page.waitForURL('**/portfolios');
    await expect(page).toHaveURL(/.*portfolios/);
    console.log("Success: user logged in and landed on portfolios page");
  
  };


export const createPortfolio = async (page, portfolioName,portfolioDescription, isPublic) => {
    // Navigate to create portfolio page
    const createPortfolioButton = await page.getByRole("button", { name: "Create New Portfolio" });
    await createPortfolioButton.click();
    await page.waitForURL('**/portfolio/new');
    await page.waitForTimeout(500);   

    // Fill in portfolio details and submit
    const portfolioNameInput = await page.getByPlaceholder("Portfolio Name");
    await portfolioNameInput.fill(portfolioName);
    await page.waitForTimeout(500);   
    const description = await page.getByPlaceholder('Portfolio description')
    await description.fill(portfolioDescription);
    await page.waitForTimeout(500);   

    if(isPublic == true){
    // if checkbox is checked then its a publicly facing portfolio otherwise its private
    const publicCheckbox = await page.getByLabel('Public')
    await publicCheckbox.click();
    await page.waitForTimeout(500);   
    }

    //  create the portfolio
    const createButton = await page.getByRole("button", { name: "Create" });
    await createButton.click();
    await page.waitForTimeout(500);   
  
    // Verify that the portfolio was created successfully
    await page.waitForURL(/\/portfolio\/\d+$/);
    const portfolioTitle = await page.getByText(portfolioName).nth(0);
    await expect(portfolioTitle).toBeVisible();
    await page.waitForTimeout(500);   
    console.log("Success: Empty portfolio created and title is visible");

 
  
};