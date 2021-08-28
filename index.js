const fs = require('fs');
const sinon = require('sinon');

module.exports = (config, page) => {
  const stub = sinon.stub(page, 'goto');
  stub.callsFake(async (url) => {
    if (Array.isArray(config)) {
      for (const configPage of config) {
        if (url === configPage.url) {
          const contents = fs.readFileSync(configPage.htmlPath);
          await page.setContent(contents.toString());
          return;
        }
      }
      await page.goto(url);
    } else if (typeof config === 'object' && config !== null) {
      for (const [configUrl, configHtmlPage] of Object.entries(config)) {
        if (url === configUrl) {
          const contents = fs.readFileSync(configHtmlPage);
          await page.setContent(contents.toString());
          return;
        }
      }
      await page.goto(url);
    } else {
      throw new Error('Error: Config must be an object or an array');
    }
  });
  return stub;
};
