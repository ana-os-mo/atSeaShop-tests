import { browser, Config } from 'protractor';

const firefoxConfig = {
  browserName: 'firefox',
  firefoxOptions: {
    args: ['-window-size=1920,1080']
  },
  name: 'firefox-tests',
  shardTestFiles: true,
  maxInstances: 1
};

const chromeConfig = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--disable-gpu', '--window-size=1920,1080']
  },
  name: 'chrome-tests',
  shardTestFiles: true,
  maxInstances: 1
};

const multiCapabilities = [chromeConfig, firefoxConfig];

export const config: Config = {
  multiCapabilities,
  framework: 'mocha',
  specs: [ '../test/ui/**/*.test.ts'],
  seleniumAddress: 'http://0.0.0.0:4444',
  SELENIUM_PROMISE_MANAGER : false,
  mochaOpts: {
    timeout: 180000,
    reporter: 'mochawesome-screenshots',
  },
  getPageTimeout: 30000,
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false);
  }
};
