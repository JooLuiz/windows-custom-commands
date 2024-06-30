const getJobParams = (data) => {
  const { schedulerName, frequency, startDate, time, day, command } = data;

  const filePattern = /\.\w+$/;

  const commandType = filePattern.test(command) ? "file" : "command";

  const params = [
    schedulerName,
    frequency,
    startDate,
    time,
    command,
    commandType,
  ];

  if (day) {
    params.push(day);
  }

  return params;
};
module.exports = {
  getJobParams,
};
