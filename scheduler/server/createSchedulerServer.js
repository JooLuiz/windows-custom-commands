const http = require("http");
const path = require("path");
const fs = require("fs");
const { schedulerRouter } = require("./router");
const { spawn } = require("child_process");
const { handlePostRequest } = require("../functions");

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

  const buildFilePath = (htmlPageDirectory, directory, file) => {
    const customDirectoryPath = path.join(htmlPageDirectory, directory);
    const customFilePath = path.join(customDirectoryPath, file);
    return customFilePath;
  };

  const server = http.createServer(async (req, res) => {
    const requestWithoutQueryParams = req.url.split("?")[0];
    const htmlPageDirectory = path.resolve(__dirname, "../src");

    let isInRouter = false;

    await Promise.all(
      Object.entries(schedulerRouter).map(async (entry) => {
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
          } else {
            const escapedReqUrl = `/${options.directory}/`.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );
            if (options.action == "readFile") {
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
                const customFilePath = buildFilePath(
                  htmlPageDirectory,
                  options.directory,
                  options.file
                );
                isInRouter = true;
                fs.readFile(customFilePath, (err, data) => {
                  if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                    return;
                  }
                  logInfo(`Opening ${req.url} page`);
                  res.writeHead(200, { "Content-Type": options.contentType });
                  res.end(data);
                  return;
                });
              }
            } else if (options.action == "runBat") {
              if (requestWithoutQueryParams == key) {
                const batFilePath = buildFilePath(
                  htmlPageDirectory,
                  options.directory,
                  options.file
                );
                isInRouter = true;
                if (req.method === "POST") {
                  let body = "";

                  req.on("data", (chunk) => {
                    body += chunk.toString();
                  });

                  req.on("end", async () => {
                    const data = JSON.parse(body);

                    const params = await options.paramsBuilder(data);

                    const bat = spawn("cmd.exe", [
                      "/c",
                      batFilePath,
                      ...params,
                    ]);

                    bat.stdout.on("data", (data) => {
                      logInfo(data.toString());
                    });

                    bat.stderr.on("data", (data) => {
                      logError(data.toString());
                    });

                    await new Promise((resolve, reject) => {
                      bat.on("close", (code) => {
                        if (code === 0) {
                          resolve(code);
                        } else {
                          logError(
                            `Failed to execute bat file. Exit code: ${code}`
                          );
                          reject(
                            new Error(
                              `Failed to execute bat file. Exit code: ${code}`
                            )
                          );
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
                  });
                }
              }
            } else if (options.action == "exec") {
              if (requestWithoutQueryParams == key) {
                isInRouter = true;
                if (req.method === "POST") {
                  await handlePostRequest(req, res, options);
                }
              }
            }
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
