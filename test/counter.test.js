const wdio = require("webdriverio");
const assert = require('assert');

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "11.0",
    deviceName: "Pixel 3 API 30",
    app: "/Users/kosate.lim/Work/flutter-session/appium-counter/counter_app/build/app/outputs/apk/debug/app-debug.apk",
    automationName: 'Flutter',
    retryBackoffTime: 500
  }
};

const byValueKey = (key) => {
  let str = JSON.stringify({
    finderType: `ByValueKey`,
    keyValueString: key,
    keyValueType: `String`,
  });

  return Buffer.from(str)
    .toString(`base64`)
    .replace(/=/g, ``)
    .replace(/\+/g, `-`)
    .replace(/\//g, `_`);
}

describe('Test Counter', function() {
  let driver;

  before(async function () {
    driver = await wdio.remote(opts);
  });

  after(async function () {
    return await driver.deleteSession();
  });

  it('should count correctly', async function() {
    const counterTextFinder = byValueKey('counter');
    const buttonFinder = byValueKey('increment');
  
    await driver.switchContext('FLUTTER');
  
    assert.strictEqual(await driver.getElementText(counterTextFinder), '0');
  
    await driver.elementClick(buttonFinder);
    await driver.touchAction({
      action: 'tap',
      element: { elementId: buttonFinder }
    });
  
    assert.strictEqual(await driver.getElementText(counterTextFinder), '2');
  });
});
