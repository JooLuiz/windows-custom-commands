const {
  logger,
  consts,
  getArgValue,
  createPuppeteerBrowser,
} = require("../utils");
const {
  getScheduledJobs,
  mountJobsJsonFile,
  openSchedulerPage,
  deleteScheduledJobsTempFile,
} = require("./functions");
const {
  createSchedulerServer,
  startSchedulerServer,
  stopSchedulerServer,
} = require("./server");

const isVerbose = getArgValue("--verbose", "equals");

const logInfo = (data) => {
  if (isVerbose) {
    logger("info", consts.identification.scheduler)(data);
  }
};

const logError = logger("error", consts.identification.scheduler);

async function exec() {
  await getScheduledJobs(logInfo, logError);

  await mountJobsJsonFile(logInfo, logError, isVerbose);

  const server = await createSchedulerServer(logInfo, logError);

  const handleCloseBrowser = async () => {
    await stopSchedulerServer(server, logInfo, logError);
    await deleteScheduledJobsTempFile(logInfo, logError);
  };

  const browser = await createPuppeteerBrowser(isVerbose, handleCloseBrowser);

  await startSchedulerServer(server, logInfo, logError);

  await openSchedulerPage(browser, logInfo, logError);
}

exec();
