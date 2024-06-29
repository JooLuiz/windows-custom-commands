const handleRequest = async (req, res, route, body) => {
  const result = await route.function(req, res, route, body);

  return result;
};

module.exports = {
  handleRequest,
};
