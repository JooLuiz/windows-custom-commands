const { handleCreateJobParams, handleDeleteJobParams, handleEditJobParams } = require("../functions");

const schedulerRouter = {
  "/": {
    method: "get",
    action: "redirect",
    url: "/table",
  },
  "/scheduled_tasks": {
    method: "get",
    action: "readFile",
    directory: "..",
    file: "scheduled_tasks_temp.json",
    contentType: "application/json",
  },
  "/create_job": {
    method: "post",
    action: "runBat",
    directory: "..",
    file: "create-scheduled-task.bat",
    paramsBuilder: handleCreateJobParams,
  },
  "/edit_job": {
    method: "post",
    action: "runBat",
    directory: "..",
    file: "edit-scheduled-task.bat",
    paramsBuilder: handleEditJobParams,
  },
  "/delete_job": {
    method: "post",
    action: "runBat",
    directory: "..",
    file: "delete-scheduled-task.bat",
    paramsBuilder: handleDeleteJobParams,
  },
  "/table": {
    method: "get",
    action: "readFile",
    directory: "table",
    file: "table.html",
    contentType: "text/html",
    includeJSandCSS: true,
  },
  "/form": {
    method: "get",
    action: "readFile",
    directory: "form",
    file: "form.html",
    contentType: "text/html",
    includeJSandCSS: true,
  },
  "/details": {
    method: "get",
    action: "readFile",
    directory: "details",
    file: "details.html",
    contentType: "text/html",
    includeJSandCSS: true,
  },
};

module.exports = {
  schedulerRouter,
};
