const handleDeleteJobParams = (data) => {
  const { name } = data;

  const params = [name];

  return params;
};
module.exports = {
  handleDeleteJobParams,
};
