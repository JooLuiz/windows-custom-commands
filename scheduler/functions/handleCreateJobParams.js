const { getJobParams } = require("./getJobParams");

const handleCreateJobParams = (data) => {
  const params = getJobParams(data);

  return params;
};
module.exports = {
  handleCreateJobParams,
};
