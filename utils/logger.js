function log(data, type = "info") {
  if (type == "info") {
    console.log("[INFO] - " + data);
  } else if (type == "error") {
    console.error("[ERROR] - " + data);
  }
}

function buildLogMessage(identification, data){
  return identification + " - " + data
}

function logger(type, identification) {
  return (data) => {
    if (type == "error") {
      log(buildLogMessage(identification, data), "error");
    } else {
      log(buildLogMessage(identification, data));
    }
  }
}

module.exports = {
  logger,
};
