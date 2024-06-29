const {
  handleCreateJobParams,
  handleDeleteJobParams,
  handleEditJobParams,
} = require("../functions");
const { refreshJobs, readFile, runBat } = require("../routeFunctions");
const { handleRedirect } = require("./handleRedirect");

const schedulerRouter = {
  "/": {
    method: ["get"],
    url: "/table",
    function: handleRedirect,
  },
  "/scheduled_tasks": {
    method: ["get"],
    directory: "..",
    file: "scheduled_tasks_temp.json",
    contentType: "application/json",
    function: readFile,
  },
  "/create_job": {
    method: ["post"],
    directory: "..",
    file: "create-scheduled-task.bat",
    paramsBuilder: handleCreateJobParams,
    function: runBat,
  },
  "/edit_job": {
    method: ["post"],
    directory: "..",
    file: "edit-scheduled-task.bat",
    paramsBuilder: handleEditJobParams,
    function: runBat,
  },
  "/delete_job": {
    method: ["post"],
    directory: "..",
    file: "delete-scheduled-task.bat",
    paramsBuilder: handleDeleteJobParams,
    function: runBat,
  },
  "/table": {
    method: ["get"],
    directory: "../src/table",
    file: "table.html",
    contentType: "text/html",
    function: readFile,
  },
  "/table.js": {
    method: ["get"],
    directory: "../src/table",
    file: "table.js",
    contentType: "application/javascript",
    function: readFile,
  },
  "/table.css": {
    method: ["get"],
    directory: "../src/table",
    file: "table.css",
    contentType: "text/css",
    function: readFile,
  },
  "/form": {
    method: ["get"],
    directory: "../src/form",
    file: "form.html",
    contentType: "text/html",
    function: readFile,
  },
  "/form.js": {
    method: ["get"],
    directory: "../src/form",
    file: "form.js",
    contentType: "application/javascript",
    function: readFile,
  },
  "/form.css": {
    method: ["get"],
    directory: "../src/form",
    file: "form.css",
    contentType: "text/css",
    function: readFile,
  },
  "/details": {
    method: ["get"],
    directory: "../src/details",
    file: "details.html",
    contentType: "text/html",
    function: readFile,
  },
  "/details.js": {
    method: ["get"],
    directory: "../src/details",
    file: "details.js",
    contentType: "application/javascript",
    function: readFile,
  },
  "/details.css": {
    method: ["get"],
    directory: "../src/details",
    file: "details.css",
    contentType: "text/css",
    function: readFile,
  },
  "/refresh_jobs": {
    method: ["post"],
    function: refreshJobs,
  },
};

module.exports = {
  schedulerRouter,
};
