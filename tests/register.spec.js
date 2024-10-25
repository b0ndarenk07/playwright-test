const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();

test("register new user", async ({ page }) => {

    // register page
    // fill in the form with the new user details
    //  verify user is logged in after we register

    //  then we need to delete the user from db
});

test("register new user - error handling", async ({ page }) => {

    // register page
    // fill in the form with the new user details

    // test that we can not create a user with a username admin or root or one that already exists
    // test that we can not create a user with an existing email 

});


