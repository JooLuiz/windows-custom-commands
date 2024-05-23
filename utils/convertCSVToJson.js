const fs = require("fs");
const { consts } = require("./consts");
const { logger } = require("./logger");

const logError = logger("error", consts.identification.convertCSVToJson);
const logInfo = (data, isVerbose) => {
  if (isVerbose) {
    logger("info", consts.identification.convertCSVToJson)(data);
  }
};


function convertCSVToJson(filePath, isVerbose) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        logError(err);
        return;
      }
      logInfo("Loaded csv file",isVerbose)

      const rows = data.trim().split("\n");

      const headers = rows[0].split(",");

      const objs = rows.slice(1).map((row, rowIndex) => {
        if (rowIndex === rows.length - 2) {
          return;
        }

        const values = row.split(",");

        const obj = {};

        headers.forEach((header, headerIndex) => {
          obj[header.trim().replace(/"/g, "")] = values[headerIndex]
            .trim()
            .replace(/"/g, "");
        });

        
        return obj;
      });
      
      logInfo("Converted csv to json", isVerbose)

      resolve(objs);
    });
  });
}

module.exports = {
  convertCSVToJson
}