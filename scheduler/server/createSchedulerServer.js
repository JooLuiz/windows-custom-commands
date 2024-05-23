const http = require("http");
const path = require("path");
const fs = require("fs");

async function createSchedulerServer(logInfo, logError){
    logInfo("Creating Server")
    const server = http.createServer((req, res) => {
        if (req.url === '/') {
          res.writeHead(302, { 'Location': '/scheduler' });
          res.end();
        } else if (req.url === "/scheduled_tasks") {
          const jsonDirectory = __dirname.replace("\\server", "");
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
        } else if (req.url === "/scheduler") {
          const htmlPageDirectory = __dirname.replace("\\server", "\\page");
  
          const indexPath = path.join(htmlPageDirectory, "index.html");
  
          fs.readFile(indexPath, (err, data) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Internal Server Error");
              return;
            }
            logInfo("Opening Scheduler Page");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          });
  
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          logError(`Page Not Found: ${req.url}`);
          res.end("Not Found");
        }
      });

      return server
}

module.exports = {
    createSchedulerServer
}