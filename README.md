Run specific test with browser
```
npx playwright test tests/login.spec.js --headed
npx playwright test tests/robLogin.spec.js --headed --debug
npx playwright test tests/createPortfolio.spec.js --headed --debug
```
Run all tests with browser
```
npx playwright test --headed
```
Debugger
```
npx playwright test tests/login.spec.ts --debug
npx playwright test --debug
```