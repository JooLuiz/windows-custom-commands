const { logger, consts, getArgValue } = require("../../utils");

const isVerbose = getArgValue("--verbose", "equals");

const schedulerLogInfo = (data) => {
  if (isVerbose) {
    logger("info", consts.identification.scheduler)(data);
  }
};

const schedulerLogError = logger("error", consts.identification.scheduler);

module.exports = {
  schedulerLogInfo,
  schedulerLogError,
  isVerbose,
};
