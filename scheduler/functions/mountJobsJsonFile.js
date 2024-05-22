const { convertCSVToJson, writeInFile } = require("../../utils");

const path = require("path");
const jsonFileName = "scheduled_tasks_temp.json";
const csvFileName = "scheduled_tasks_temp.csv";

async function mountJobsJsonFile(logInfo, logError, isVerbose) {
    try{
        const directory = __dirname.replace("\\functions", "")
        const jsonFilePath = path.resolve(directory, jsonFileName);
        const csvFilePath = path.resolve(directory, csvFileName);
      
        const scheduledJobsJson = await convertCSVToJson(csvFilePath, isVerbose);
      
        const formattedJobs = JSON.stringify(scheduledJobsJson, null, 2);
      
        writeInFile(jsonFilePath, formattedJobs, isVerbose);
        
        logInfo("Arquivo json criado")
    } catch(err){
        logError("Erro ao salvar arquivo json: " + err)
    }
}

module.exports = {
    mountJobsJsonFile
}