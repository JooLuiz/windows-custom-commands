const { getScheduledJobs } = require("./getScheduledJobs");
const { mountJobsJsonFile } = require("./mountJobsJsonFile");
const {
  schedulerLogInfo,
  schedulerLogError,
  isVerbose,
} = require("./schedulerLoggers");

async function refreshJobs(body, res) {
  await getScheduledJobs(schedulerLogInfo, schedulerLogError);

  await mountJobsJsonFile(schedulerLogInfo, schedulerLogError, isVerbose);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({"message": "Jobs Successfully Updated"}));

  return;
}

module.exports = {
  refreshJobs,
};
