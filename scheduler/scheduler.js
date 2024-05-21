const { spawn } = require("child_process");
const path = require("path");
const { logger, consts, getArgValue } = require("../utils");
const fs = require("fs");

const isVerbose = getArgValue("--verbose", "equals");

const logInfo = (data) => {
  if (isVerbose) {
    logger("info", consts.identification.scheduler)(data);
  }
};

const logError = logger("error", consts.identification.scheduler);

function getScheduledJobs() {
  const batFilePath = path.resolve(__dirname, "get-scheduled-tasks.bat");

  const format = "csv";

  const bat = spawn("cmd.exe", ["/c", batFilePath, format]);

  let output = "";

  bat.stdout.on("data", (data) => {
    output += data.toString();
  });

  bat.stderr.on("data", (data) => {
    logError(data.toString());
  });

  bat.on("close", (code) => {
    logInfo(`Process closed with status: ${code}`);

    logInfo("Successfully taken scheduled Jobs");
    logInfo("Processing scheduled jobs: turning them in a json file");

    const rows = output.split("\n");
    const headers = rows[0].split(",");

    const tasks = rows.slice(1).map((row, rowIndex) => {
      if (rowIndex === rows.length - 2) {
        return;
      }
      const values = row.split(",");
      const task = {};
      headers.forEach((header, headerIndex) => {
        task[header.trim().replace(/"/g, "")] = values[headerIndex].trim().replace(/"/g, "");
      });
      return task;
    });

    const jsonFilePath = path.resolve(__dirname, "scheduled_tasks_temp.json");

    const jsonData = JSON.stringify(tasks, null, 2)

    fs.writeFile(jsonFilePath, jsonData, { encoding: 'utf8' } , (err) => {
      if (err) {
        logError(`Error writing scheduled jobs JSON file: ${err.message}`);
        return;
      }
      logInfo(`Scheduled jobs saved in a json file: ${jsonFilePath}`);
    });

    logInfo(`Scheduled jobs successfully loaded`);
  });
}

function exec() {
  getScheduledJobs();
}

exec();
