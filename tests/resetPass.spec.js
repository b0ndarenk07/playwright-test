const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();

test("reset password", async ({ page }) => {

    // login page
    // forgot password

    // figure out how to sign into google without 2FA or an email like proton.me 
    // test that the email came in  usually sends a link 

    // click the link and reset the password
    // login with the new password and verify user is logged in



});
