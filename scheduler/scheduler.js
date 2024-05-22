const { logger, consts, getArgValue } = require("../utils");
const { getScheduledJobs, mountJobsJsonFile, openSchedulerPage } = require("./functions");
const { startSchedulerServer } = require("./server/schedulerServer");

const isVerbose = getArgValue("--verbose", "equals");

const logInfo = (data) => {
  if (isVerbose) {
    logger("info", consts.identification.scheduler)(data);
  }
};

const logError = logger("error", consts.identification.scheduler);

async function exec() {
  await getScheduledJobs(logInfo, logError)

  await mountJobsJsonFile(logInfo, logError, isVerbose)

  await startSchedulerServer(logInfo, logError)

  await openSchedulerPage(logInfo, logError)
}

exec();
