const handleRedirect = async (req, res, route, body) => {
  res.writeHead(302, { Location: route.url });
  res.end();
  return;
};

module.exports = {
  handleRedirect,
};
