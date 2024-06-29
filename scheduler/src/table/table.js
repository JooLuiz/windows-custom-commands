$(document).ready(function () {
  $.getJSON("scheduled_tasks", function (data) {
    populateTable(data);
  });

  function populateTable(jobs) {
    const tbody = $("#jobTableBody");
    tbody.empty();
    jobs.forEach((job) => {
      const row = `
                  <tr data-uuid="${job.uuid}" data-jobname="${job["Nome da tarefa"]}">
                      <td>${job["Nome da tarefa"]}</td>
                      <td>${job["Hora da próxima execução"]}</td>
                      <td>${job["execução"]}</td>
                      <td>
                          <button class="ui button editBtn">Edit</button>
                          <button class="ui button viewBtn">View</button>
                          <button class="ui button deleteBtn">Delete</button>
                      </td>
                  </tr>
              `;
      tbody.append(row);
    });
  }

  $("table.sortable th").on("click", function () {
    const column = $(this).index();
    const rows = $("#jobTableBody tr").get();

    rows.sort(function (a, b) {
      const A = $(a).children("td").eq(column).text().toUpperCase();
      const B = $(b).children("td").eq(column).text().toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });

    $.each(rows, function (index, row) {
      $("#jobTableBody").append(row);
    });
  });

  $("#nameFilter").on("keyup", function () {
    filterTable(0, $(this).val());
  });
  $("#nextRunFilter").on("keyup", function () {
    filterTable(1, $(this).val());
  });
  $("#lastRunFilter").on("keyup", function () {
    filterTable(2, $(this).val());
  });

  function filterTable(column, value) {
    $("#jobTableBody tr").each(function () {
      const cell = $(this).children("td").eq(column).text().toUpperCase();
      if (cell.indexOf(value.toUpperCase()) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  // Filter based on toggles
  $("#filterUndefineds").on("change", function () {
    applyFilters();
  });
  $("#filterNAs").on("change", function () {
    applyFilters();
  });

  function applyFilters() {
    const filterUndefineds = $("#filterUndefineds").is(":checked");
    const filterNAs = $("#filterNAs").is(":checked");

    $("#jobTableBody tr").each(function () {
      const nextRun = $(this).children("td").eq(1).text();
      const lastRun = $(this).children("td").eq(2).text();

      let show = true;

      if (
        filterUndefineds &&
        (nextRun === "undefined" || lastRun === "undefined")
      ) {
        show = false;
      }
      if (filterNAs && (nextRun === "N/A" || lastRun === "N/A")) {
        show = false;
      }

      if (show) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  $("#addJobBtn").on("click", function () {
    window.location.href = "/form";
  });

  $(document).on("click", ".editBtn", function () {
    const row = $(this).closest("tr");
    const uuid = row.data("uuid");
    window.location.href = `/form?uuid=${uuid}`;
  });

  $(document).on("click", ".viewBtn", function () {
    const row = $(this).closest("tr");
    const uuid = row.data("uuid");
    window.location.href = `/details?uuid=${uuid}`;
  });

  $(document).on("click", ".deleteBtn", function () {
    const row = $(this).closest("tr");
    const name = row.data("jobname");
    fetch("/delete_job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response)
      .then(() => {
        fetch("/refresh_jobs", {
          method: "POST",
        })
          .then((resp) => resp)
          .then(() => {
            window.location.pathname = "/table";
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
