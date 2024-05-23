const { getConfigs } = require("../../utils");

async function startSchedulerServer(server, logInfo, logError) {
  const defaultPort = 3002;

  const configs = await getConfigs();
  await new Promise((resolve, reject) => {
    try {
      logInfo("Turning scheduler server ON");
      server.listen(configs?.scheduler?.serverPort ?? defaultPort, () => {
        console.log(
          `Scheduler Server is Up and listening to http://localhost:${
            configs?.scheduler?.serverPort ?? defaultPort
          }`
        );
        resolve(server);
      });
    } catch (err) {
      logError("Failed to start server:" + err);
      reject(new Error("Failed to start server"));
    }
  });
}

module.exports = {
  startSchedulerServer,
};
