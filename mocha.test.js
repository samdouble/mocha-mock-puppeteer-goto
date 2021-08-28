const puppeteer = require('puppeteer');
const { expect } = require('chai');
const mockPuppeteerGoto = require('.');
const myPuppeteerScript = require('./tests/myPuppeteerScript');

describe('mock-puppeteer-goto', () => {
  it('should work properly with mocha', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const mock = mockPuppeteerGoto({
      'https://somewebsite.com/': './tests/main.html',
      './f150.html': './tests/f150.html',
      './silverado.html': './tests/silverado.html',
      './ram.html': './tests/ram.html',
    }, page);
    const scriptResults = await myPuppeteerScript(page);
    await browser.close();
    mock.restore();
    expect(scriptResults).to.be.an('array');
    expect(scriptResults).to.have.length(3);
    expect(scriptResults).to.deep.equal([
      {
        name: 'Ford F150',
        engines: [
          '3.3-liter V-6: 290 hp, 265 lb-ft',
          '2.7-liter V-6: 325 hp, 400 lb-ft',
          '5.0-liter V-8: 400 hp, 410 lb-ft',
          '3.5-liter V-6: 400 hp, 500 lb-ft',
          '3.0-liter V-6, diesel: 250 hp, 440 lb-ft',
          '3.5-liter V-6, hybrid: 430 hp, 570 lb-ft',
        ],
      },
      {
        name: 'Chevrolet Silverado',
        engines: [
          '4.3-liter V-6: 285 hp, 305 lb-ft',
          '5.3-liter V-8: 355 hp, 383 lb-ft',
          '2.7-liter I-4: 310 hp, 348 lb-ft',
          '6.2-liter V-8: 420 hp, 460 lb-ft',
          '3.0-liter I-6, diesel: 277 hp, 460 lb-ft',
        ],
      },
      {
        name: 'Dodge Ram 1500',
        engines: [
          '3.6-liter V-6 w/ eTorque: 305 hp, 269 lb-ft',
          '3.0-liter V-6, diesel: 260 hp, 480 lb-ft',
          '5.7-liter V-8 w/ or w/o eTorque: 395 hp, 410 lb-ft',
        ],
      },
    ]);
  });
});
