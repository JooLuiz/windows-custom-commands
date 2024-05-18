const { consts } = require("./consts");
const { logger } = require("./logger");

const logError = logger("error", consts.identification.getArgValue);

function getArgValue(argContent, validationType, isMandatory = false) {
  let argIndex;
  process.argv.forEach((arg, index) => {
    if (validationType == "equals") {
      if (arg == argContent) argIndex = index;
    } else if (validationType == "contains") {
      if (arg.includes(argContent)) argIndex = index;
    }
  });

  if (argIndex) return process.argv[argIndex];
  else if (isMandatory) {
    logError(consts.failedToFindArguments);
    throw new Error(consts.failedToFindArguments);
  } else return "";
}

module.exports = {
  getArgValue,
};
