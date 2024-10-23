const { test, expect } = require("@playwright/test");
test.use({ workers: 1 });
test.describe.configure({ mode: "parallel" });
const timeout = 35 * 60 * 1000;
test.setTimeout(timeout);
const dotenv = require("dotenv");
dotenv.config();
import { login } from "../utils";

test("login", async ({ page }) => {
  await login(page);
  await page.screenshot({
    path: "screenshots/login.spec.png",
    fullPage: true,
  });
});
