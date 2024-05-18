const path = require("path");

const configFile = require(path.resolve(__dirname, "../config/config.json"));

async function getConfigs() {
  return configFile
}

module.exports = {
  getConfigs,
};
