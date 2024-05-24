const http = require("http");
const path = require("path");
const fs = require("fs");
const { schedulerRouter } = require("./router");

async function createSchedulerServer(logInfo, logError) {
  logInfo("Creating Server");
  const server = http.createServer(async (req, res) => {
    const htmlPageDirectory = path.resolve(__dirname, "../page");

    const serveStaticFile = (filePath, contentType, response) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("Not Found");
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(data);
        }
      });
    };

    if (req.url === "/") {
      res.writeHead(302, { Location: "/scheduler" });
      res.end();
    }
     if (req.url === "/scheduled_tasks") {
      const jsonDirectory = path.resolve(__dirname, "..");
      const jsonFilePath = path.join(
        jsonDirectory,
        "scheduled_tasks_temp.json"
      );

      fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
          return;
        }

        logInfo("Loading Scheduler Json");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      });
    }
    else if (/.css$/.exec(req.url)) {
      const cssPath = path.join(htmlPageDirectory, req.url);
      serveStaticFile(cssPath, "text/css", res);
    } else if (/.js$/.exec(req.url)) {
      const jsPath = path.join(htmlPageDirectory, req.url);
      serveStaticFile(jsPath, "application/javascript", res);
    } else {
      let isInRouter = false
      await Promise.all(
        Object.entries(schedulerRouter).map((entry) => {
          let key = entry[0];
          let value = entry[1];
          if (req.url == "/" + key) {
            isInRouter = true
            const customDirectoryPath = path.join(htmlPageDirectory, value);
            fs.readFile(customDirectoryPath, (err, data) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
                return;
              }
              logInfo("Opening Scheduler Page");
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(data);;
            });
          }
        })
      );
      if(!isInRouter){
        res.writeHead(404, { "Content-Type": "text/plain" });
        logError(`Page Not Found: ${req.url}`);
        res.end("Not Found");
      }
    }
  });

  return server;
}

module.exports = {
  createSchedulerServer,
};
