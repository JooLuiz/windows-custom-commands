const { getScheduledJobs } = require("../functions/getScheduledJobs");
const { mountJobsJsonFile } = require("../functions/mountJobsJsonFile");
const {
  schedulerLogInfo,
  schedulerLogError,
  isVerbose,
} = require("../functions/schedulerLoggers");

async function refreshJobs(req, res, route, body) {
  await getScheduledJobs(schedulerLogInfo, schedulerLogError);

  await mountJobsJsonFile(schedulerLogInfo, schedulerLogError, isVerbose);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify({ message: "Jobs Successfully Updated" }));

  return;
}

module.exports = {
  refreshJobs,
};
