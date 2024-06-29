const handlePostRequest = async (req, res, options) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const result = await options.function(body, res);

    return result;
  });
};

module.exports = {
  handlePostRequest,
};
