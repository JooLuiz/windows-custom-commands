const puppeteer = require("puppeteer");
const { deleteScheduledJobsTempFile } = require("./deleteJobsTempFiles");
const baseUrl = "http://localhost:3002";

async function openSchedulerPage(logInfo, logError, server) {
  logInfo("Opening scheduler page");
  const url = `${baseUrl}/scheduler`;

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--window-size=${1900},${1080}`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector("table");
  } catch (err) {
    logError("Erro opening scheduler page:" + err);
  }
}

module.exports = {
  openSchedulerPage,
};
