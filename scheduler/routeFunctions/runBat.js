const { spawn } = require("child_process");
const {
  buildFilePath,
  schedulerLogInfo,
  schedulerLogError,
} = require("../functions");

async function runBat(req, res, route, body) {
  const batFilePath = buildFilePath(
    route.directory,
    route.file
  );
  const data = JSON.parse(body);

  const params = await route.paramsBuilder(data);

  const bat = spawn("cmd.exe", ["/c", batFilePath, ...params]);

  bat.stdout.on("data", (data) => {
    schedulerLogInfo(data.toString());
  });

  bat.stderr.on("data", (data) => {
    schedulerLogError(data.toString());
  });

  await new Promise((resolve, reject) => {
    bat.on("close", (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        schedulerLogError(`Failed to execute bat file. Exit code: ${code}`);
        reject(new Error(`Failed to execute bat file. Exit code: ${code}`));
      }
    });
  })
    .then((data) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(data);
    })
    .catch(() => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    });
}

module.exports = {
  runBat,
};
