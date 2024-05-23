async function stopSchedulerServer(server, logInfo, logError) {
const serverOffMessage = "Scheduler Server is Down"

  logInfo("Turning scheduler server OFF");
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        logError("Error when turning scheduler off:" + err);
        return reject(new Error(err));
      }
      logInfo(serverOffMessage);
      console.log(serverOffMessage)
      resolve();
    });
  });
}

module.exports = {
  stopSchedulerServer,
};
