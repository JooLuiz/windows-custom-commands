const fs = require("fs");
const { buildFilePath, schedulerLogInfo } = require("../functions");

async function readFile(req, res, route, body) {
  const customFilePath = buildFilePath(route.directory, route.file);

  fs.readFile(customFilePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }
    schedulerLogInfo(`Opening ${req.url} page`);
    res.writeHead(200, { "Content-Type": route.contentType });
    res.end(data);
    return;
  });
}

module.exports = {
  readFile,
};
