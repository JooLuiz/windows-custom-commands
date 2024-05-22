const { spawn } = require("child_process");
const path = require("path");

const defaultBatFile = "get-scheduled-tasks.bat";
const exportType = "csv";

async function getScheduledJobs(logInfo, logError, url = defaultBatFile) {
  const directory = __dirname.replace("\\functions", "")

  const batFilePath = path.resolve(directory, url);

  const format = exportType;

  const bat = spawn("cmd.exe", ["/c", batFilePath, format]);

  bat.stderr.on("data", (data) => {
    logError(data.toString());
  });

  await new Promise((resolve, reject) => {
    bat.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Failed to execute bat file. Exit code: ${code}`));
      }
    });
  });
}

module.exports = {
  getScheduledJobs
}