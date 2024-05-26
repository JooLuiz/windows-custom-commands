const http = require("http");
const path = require("path");
const fs = require("fs");
const { schedulerRouter } = require("./router");

async function createSchedulerServer(logInfo, logError) {
  logInfo("Creating Server");

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

  const server = http.createServer(async (req, res) => {
    const requestWithoutQueryParams = req.url.split("?")[0];
    const htmlPageDirectory = path.resolve(__dirname, "../src");

    let isInRouter = false;

    await Promise.all(
      Object.entries(schedulerRouter).map((entry) => {
        let key = entry[0];
        let options = entry[1];

        if (req.method.toUpperCase() == options.method.toUpperCase()) {
          if (
            options.action == "redirect" &&
            requestWithoutQueryParams == key
          ) {
            isInRouter = true;
            res.writeHead(302, { Location: options.url });
            res.end();
            return;
          } else if (options.action == "readFile") {
            const escapedReqUrl = `/${options.directory}/`.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );
            if (options.includeJSandCSS) {
              const jsCssRegex = new RegExp(
                `^${escapedReqUrl}[^/]+\\.(js|css)$`
              );
              if (jsCssRegex.test(requestWithoutQueryParams)) {
                isInRouter = true;
                const jsCssPath = path.join(
                  htmlPageDirectory,
                  requestWithoutQueryParams
                );
                if (/.js$/.exec(requestWithoutQueryParams)) {
                  serveStaticFile(jsCssPath, "application/javascript", res);
                } else if (/.css$/.exec(requestWithoutQueryParams)) {
                  serveStaticFile(jsCssPath, "text/css", res);
                }
                return;
              }
            }

            if (requestWithoutQueryParams == key) {
              isInRouter = true;
              if (options.action == "readFile") {
                const customDirectoryPath = path.join(
                  htmlPageDirectory,
                  options.directory
                );
                const customFilePath = path.join(
                  customDirectoryPath,
                  options.file
                );
                fs.readFile(customFilePath, (err, data) => {
                  if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                    return;
                  }
                  logInfo(`Opening ${req.url} page`);
                  res.writeHead(200, { "Content-Type": options.contentType });
                  res.end(data);
                });
              }
            }
          }
        }
      })
    );

    if (!isInRouter) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      logError(`Page Not Found: ${req.url}`);
      res.end("Not Found");
    }
  });

  return server;
}

module.exports = {
  createSchedulerServer,
};
