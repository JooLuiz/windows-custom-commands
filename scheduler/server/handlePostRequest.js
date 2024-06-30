const { handleRequest } = require("./handleRequest");

const handlePostRequest = async (req, res, route) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    handleRequest(req, res, route, body)
  });
};

module.exports = {
  handlePostRequest,
};
