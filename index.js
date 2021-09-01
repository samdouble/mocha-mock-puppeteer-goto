const fs = require('fs');
const sinon = require('sinon');

module.exports = (page, config) => {
  const { paths, throwIfNotMapped } = config;
  const originalGoto = page.goto.bind(page);
  const stub = sinon.stub(page, 'goto');
  stub.callsFake(async (url) => {
    if (Array.isArray(paths)) {
      for (const configPage of paths) {
        if (url === configPage.url) {
          const contents = fs.readFileSync(configPage.htmlPath);
          await page.setContent(contents.toString());
          return;
        }
      }
    } else if (typeof paths === 'object' && paths !== null) {
      for (const [configUrl, configHtmlPage] of Object.entries(paths)) {
        if (url === configUrl) {
          const contents = fs.readFileSync(configHtmlPage);
          await page.setContent(contents.toString());
          return;
        }
      }
    }
    if (throwIfNotMapped) {
      throw new Error(`The url ${url} could not be found in your config paths.`);
    }
    await originalGoto(url);
  });
  return stub;
};
