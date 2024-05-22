const { spawn } = require("child_process");
const path = require("path");

function deleteScheduledJobsTempFile(logInfo, logError) {
  logInfo(`Deleting Temp Files`);
  const batFilePath = path.resolve(
    __dirname,
    "delete-scheduled-tasks-temp-file.bat"
  );

  const bat = spawn("cmd.exe", ["/c", batFilePath]);

  bat.stderr.on("data", (data) => {
    logError(data.toString());
  });

  bat.on("close", () => {
    logInfo(`Temp Files deleted`);
  });
}

module.exports = {
  deleteScheduledJobsTempFile,
};
