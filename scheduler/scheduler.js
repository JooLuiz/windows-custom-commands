const { createPuppeteerBrowser } = require("../utils");
const {
  getScheduledJobs,
  mountJobsJsonFile,
  openSchedulerPage,
  deleteScheduledJobsTempFile,
  schedulerLogInfo,
  schedulerLogError,
  isVerbose,
} = require("./functions");
const {
  createSchedulerServer,
  startSchedulerServer,
  stopSchedulerServer,
} = require("./server");

async function exec() {
  await getScheduledJobs(schedulerLogInfo, schedulerLogError);

  await mountJobsJsonFile(schedulerLogInfo, schedulerLogError, isVerbose);

  const server = await createSchedulerServer(
    schedulerLogInfo,
    schedulerLogError
  );

  const handleCloseBrowser = async () => {
    await stopSchedulerServer(server, schedulerLogInfo, schedulerLogError);
    await deleteScheduledJobsTempFile(schedulerLogInfo, schedulerLogError);
  };

  const browser = await createPuppeteerBrowser(isVerbose, handleCloseBrowser);

  await startSchedulerServer(server, schedulerLogInfo, schedulerLogError);

  await openSchedulerPage(browser, schedulerLogInfo, schedulerLogError);
}

exec();
