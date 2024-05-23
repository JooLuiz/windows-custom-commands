const puppeteer = require("puppeteer");
const { logger } = require("./logger");
const { consts } = require("./consts");

const logError = logger("error", consts.identification.createPuppeteerBrowser);
const logInfo = (data, isVerbose) => {
  if (isVerbose) {
    logger("info", consts.identification.createPuppeteerBrowser)(data);
  }
};

async function createPuppeteerBrowser(isVerbose, handleDisconnect) {
  try {
    logInfo("Creating Puppeteer Browser", isVerbose);
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"],
    });

    browser.on("disconnected", handleDisconnect ?? (() => {}));

    return browser;
  } catch (err) {
    logError("Failed to Start Puppeteer Browser");
  }
}

module.exports = {
  createPuppeteerBrowser,
};
