const fs = require("fs");
const { consts } = require("./consts");
const { logger } = require("./logger");

const logError = logger("error", consts.identification.convertCSVToJson);
const logInfo = (data, isVerbose) => {
  if (isVerbose) {
    logger("info", consts.identification.convertCSVToJson)(data);
  }
};

function writeInFile(filePath, data, isVerbose){
  fs.writeFile(filePath, data, { encoding: "utf8" }, (err) => {
    if (err) {
      logError(`Error creating file: ${err.message}`);
    }
  });

  logInfo(`Created file`, isVerbose);
}

module.exports = {
  writeInFile
}