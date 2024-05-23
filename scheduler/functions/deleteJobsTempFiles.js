const { spawn } = require("child_process");
const path = require("path");

async function deleteScheduledJobsTempFile(logInfo, logError) {
  logInfo(`Deleting Temp Files`);

  const directory = __dirname.replace("\\functions", "")

  const batFilePath = path.resolve(
    directory,
    "delete-scheduled-tasks-temp-file.bat"
  );

  const bat = spawn("cmd.exe", ["/c", batFilePath]);

  bat.stderr.on("data", (data) => {
    logError(data.toString());
  });

  await new Promise((resolve, reject) => {
  bat.on("close", (code) => {
    if (code === 0) {
      logInfo(`Temp Files deleted`);
      resolve();
    } else {
      logError(`Failed to delete temp files. Exit code: ${code}`)
      reject(new Error(`Failed to execute bat file. Exit code: ${code}`));
    }
  });
  })
}

module.exports = {
  deleteScheduledJobsTempFile,
};
