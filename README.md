# mock-puppeteer-goto

[![samdouble](https://circleci.com/gh/samdouble/mock-puppeteer-goto.svg?style=svg)](https://circleci.com/gh/samdouble/mock-puppeteer-goto)

A Node module to help you mock a Puppeteer page's goto method.

### Use Case
You have a Puppeteer script that you would like to test, but you do not want actual webpages to be loaded every time your tests are ran.
This module offers you a concise way to test your script against local HTML files instead of real webpages.

### Installation
```
npm install --save-dev mock-puppeteer-goto
```

### Usage
Here is a small example on how to use the module in your test files.

```javascript
// First, import it
const mockPuppeteerGoto = require('mock-puppeteer-goto');

describe('mock-puppeteer-goto', () => {
  it('Should throw if not passed a config argument', async () => {
    // Call ***mock-puppeteer-goto** with a config object that tells it how it should stub Puppeteer's goto function.
    // This can either be done before every test or inside a before/beforeEach hook.
    // The keys are the links that are going to be visited by the Puppeteer script as found in the source code of the webpage.
    // The values are the paths to the local HTML files with which the webpages will be stubbed.
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const mock = mockPuppeteerGoto(page, {
      'https://somewebsite.com/': './tests/main.html',
      './f150.html': './tests/f150.html',
      './silverado.html': './tests/silverado.html',
      './ram.html': './tests/ram.html',
    });

    // Call the Puppeteer script that you want to test.
    // It will need to use the same Puppeteer page as the one you gave to mock-puppeteer-goto
    const results = await myPuppeteerFunction(page);

    // ...
    // Assertions
    // ...
  });
});

// At the end of your test(s), restore the normal behavior of Puppeteer's goto function to avoid any weird results in some of your other tests.
mock.restore();
```

