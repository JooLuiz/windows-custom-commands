const { getConfigs } = require("../../utils");

async function openSchedulerPage(browser, logInfo, logError) {
  logInfo("Opening scheduler page");

  const defaultPort = 3002;

  const configs = await getConfigs();

  const baseUrl = `http://localhost:${
    configs?.scheduler?.serverPort ?? defaultPort
  }`;

  const url = `${baseUrl}/scheduler`;

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1540,
      height: 700,
    });

    await page.goto(url);

    await page.waitForSelector("table");
  } catch (err) {
    logError("Erro opening scheduler page:" + err);
  }
}

module.exports = {
  openSchedulerPage,
};
