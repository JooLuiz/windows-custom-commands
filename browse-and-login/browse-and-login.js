const puppeteer = require("puppeteer");
const { getConfigs, logger, getArgValue, consts } = require("../utils");

const isVerbose = getArgValue("--verbose", "equals");

const actionArgument = getArgValue("action=", "contains", true);

const logInfo = (data) => {
  if (isVerbose) {
    logger("info", consts.identification.browseAndLogin)(data);
  }
};

const logError = logger("error", consts.identification.browseAndLogin);

if (!actionArgument) {
  logError(consts.missingActionMsg);
  throw new Error(consts.missingActionMsg);
}

function getAction(action) {
  return action.replace("action=", "");
}

async function browseAndLogin() {
  const configs = await getConfigs();

  if (!configs) {
    logError(consts.missingConfigMsg);
    throw new Error(consts.missingConfigMsg);
  }

  const action = getAction(actionArgument);

  if (!configs.browseAndLogin[action]) {
    logError(consts.missingConfigMsg);
    throw new Error(consts.missingConfigMsg);
  }

  logInfo("Config successfully loaded");

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  logInfo("Opened Default Browser");

  const {
    url,
    usernameInput,
    usernameValue,
    passwordInput,
    passwordValue,
    loginButton,
  } = configs.browseAndLogin[action];

  await page.goto(url);

  logInfo("Navigated to specified URL");

  await page.type(usernameInput, usernameValue);

  logInfo("Filled username input");

  await page.type(passwordInput, passwordValue);

  logInfo("Filled password input");

  await page.click(loginButton);

  logInfo("Clicked login button");
}

browseAndLogin();
