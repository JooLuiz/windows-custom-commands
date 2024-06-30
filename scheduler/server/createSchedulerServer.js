const http = require("http");
const { schedulerRouter } = require("./router");
const { handleRequest } = require("./handleRequest");
const { handlePostRequest } = require("./handlePostRequest");

async function createSchedulerServer(logInfo, logError) {
  logInfo("Creating Server");

  const server = http.createServer(async (req, res) => {
    const requestWithoutQueryParams = req.url.split("?")[0];

    let isInRouter = false;

    await Promise.all(
      Object.entries(schedulerRouter).map(async (entry) => {
        let key = entry[0];
        let options = entry[1];

        if (
          options.method
            .map((m) => m.toUpperCase())
            .includes(req.method.toUpperCase())
        ) {
          if (requestWithoutQueryParams == key) {
            isInRouter = true;
            if (req.method === "POST") {
              await handlePostRequest(req, res, options);
            }

            if (req.method === "GET") {
              await handleRequest(req, res, options);
            }

            return;
          }
        }
      })
    );

    if (!isInRouter) {
      logError(`Page Not Found: ${req.url}`);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });

  return server;
}

module.exports = {
  createSchedulerServer,
};
