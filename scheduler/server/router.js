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
};

module.exports = {
  schedulerRouter,
};
