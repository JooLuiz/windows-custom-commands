const { getConfigs } = require("../../utils");
const { getJobParams } = require("./getJobParams");

const handleEditJobParams = async (data) => {
  const configs = await getConfigs();

  const params = getJobParams(data);

  if (params.length == 6) {
    params.push("");
  }

  params.push(configs?.scheduler?.userPassword);
  const transformedParams = params.map((item) =>
    item === undefined ? "" : item
  );

  return transformedParams;
};
module.exports = {
  handleEditJobParams,
};
