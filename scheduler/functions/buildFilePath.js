const path = require("path");

const buildFilePath = (directory, file) => {
  const customDirectoryPath = path.join(__dirname, directory);
  const customFilePath = path.join(customDirectoryPath, file);
  return customFilePath;
};

module.exports = {
  buildFilePath,
};
