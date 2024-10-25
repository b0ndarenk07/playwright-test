const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "serial" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();
import {login, home} from "../utils";
const user = {
    username: process.env.TEST_USERNAME,
    password: process.env.PASSWORD,
    email: process.env.TEST_EMAIL
}

test("register new user", async ({ page }) => {
    await page.goto(home);
    await expect(page).toHaveURL(/.*bossman.co/);
    await page.waitForTimeout(1000);    

    const userMenu = page.getByRole('button', { name: 'Open user menu' })
    await userMenu.click();
    await page.waitForTimeout(500);    

    const registerBtn = page.getByRole("menuitem", { name: "Register" });
    await expect(registerBtn).toBeVisible();
    await registerBtn.click();
    await page.waitForTimeout(1000);    

    await expect(page).toHaveURL(/.*register/);
        console.log("Success: user landed on register page");
    // register page
    // fill in the form with the new user details

    const username = await page.getByPlaceholder('Username')
    await expect(username).toBeVisible();

    const email =  await page.getByPlaceholder('Email')
    await expect(email).toBeVisible();

    const pass = await page.getByLabel('Password').nth(0);
    await expect(pass).toBeVisible();

    const confirmPass = await page.getByLabel('Confirm Password');
    await expect(confirmPass).toBeVisible();
  

    await username.fill(process.env.TEST_USERNAME);
    await email.fill(process.env.TEST_EMAIL);
    await pass.fill(process.env.PASSWORD);
    await confirmPass.fill(process.env.PASSWORD);
    await page.waitForTimeout(1000);  

    const registerBtnOnForm =  page.getByRole('button', { name: 'Register' });
    await registerBtnOnForm.click();
    //  verify user is logged in after we register

    await expect(page).toHaveURL(/.*portfolios/);
        console.log("Success: user registered and logged in");
    //  then we need to delete the user from settings

});



test("register new user - error handling", async ({ page  }) => {

    page.setDefaultTimeout(10000);
    await page.goto(home);
    await expect(page).toHaveURL(/.*bossman.co/);
    const userMenu = page.getByRole('button', { name: 'Open user menu' })
    await userMenu.click();
    const registerBtn = page.getByRole("menuitem", { name: "Register" });
    await expect(registerBtn).toBeVisible();
    await registerBtn.click();
    await expect(page).toHaveURL(/.*register/);
        console.log("Success: user landed on register page");
    await page.waitForTimeout(1000);
    // register page
    // test visibility of fields and fill in the form with the new user details
    const username = await page.getByPlaceholder('Username')
    await expect(username).toBeVisible();
    await username.fill(user.username);

    const email =  await page.getByPlaceholder('Email')
    await expect(email).toBeVisible();
    await email.fill(user.email);

    const pass = await page.getByLabel('Password').nth(0);
    await expect(pass).toBeVisible();
    await pass.fill(user.password);

    const confirmPass = await page.getByLabel('Confirm Password');
    await expect(confirmPass).toBeVisible();
    await confirmPass.fill(user.password);

    const registerBtnOnForm = await page.getByRole('button', { name: 'Register' });
    await registerBtnOnForm.click();

    await page.waitForTimeout(1000);

    // test that we can not create a user with a username admin or root or one that already exists
    // test that we can not create a user with an existing email 
   
    let userError = page.getByText('Username is already taken');
    await page.waitForTimeout(1000);
    await expect(userError).toBeVisible();
        console.log("Success: username is already taken");

    let emailError = page.getByText('Email is already taken');
    await page.waitForTimeout(1000);
    await expect(emailError).toBeVisible();
        console.log("Success: email is already taken");
    await username.fill("admin");
    userError = page.getByText('Username cannot contain the word "admin"');
    await page.waitForTimeout(1000);
    await expect(userError).toBeVisible();
        console.log("Success: username cannot contain the word admin");

    await username.fill("root");
    userError = page.getByText('Username cannot contain the word "root"');
    await page.waitForTimeout(1000);
    await expect(userError).toBeVisible();
        console.log("Success: username cannot contain the word root");
    
    await username.fill("");
    userError = page.getByText('Username cannot be empty')
    await page.waitForTimeout(1000);
    await expect(userError).toBeVisible();
        console.log("Success: username cannot be empty");

    await email.fill("");   
    emailError = page.getByText('Email cannot be empty');
    await page.waitForTimeout(1000);
    await expect(emailError).toBeVisible();
        console.log("Success: email cannot be empty");

    await pass.fill("");   
    await confirmPass.fill("");  
    let passError = page.getByText('Password cannot be empty')
    await page.waitForTimeout(1000);
    await expect(passError).toBeVisible();
        console.log("Success: password cannot be empty");
});

test("delete the newly registered user", async ({ page }) => {
    await login(page, user.username, user.password);

    const userMenu = page.getByRole('button', { name: 'Open user menu' })
    await userMenu.click();
    await expect(userMenu).toBeVisible();
    const settingsBtn = page.getByRole("menuitem", { name: "Settings" });
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();
    await expect(page).toHaveURL(/.*settings/);
        console.log("Success: user landed on settings page");
    await page.waitForTimeout(1000);    
    
    // delete user
    const deleteBtn = page.getByRole('button', { name: 'Delete My Account' })
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();
    await page.waitForTimeout(1000);    
    await expect(page).toHaveURL(/.*bossman.co/);
        console.log("Success: user deleted");
});




