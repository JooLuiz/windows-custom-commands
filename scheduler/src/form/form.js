function formatDateYYYYMMDD(dateString) {
  // Split the input date string into day, month, and year components
  const [day, month, year] = dateString.split("/");

  // Format the components into yyyy-MM-dd
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;

  return formattedDate;
}

async function translateFrequency(frequency) {
  const frequenciesTranslations = {
    "somente uma vez": "unique",
    diário: "daily",
    semanalmente: "weekly",
    monthly: "monthly",
    "no logon": "triggered",
    "Quando um evento ocorrer": "triggered",
    "sob demanda": "on demand",
    indefinido: "undefined",
    "Na inicialização do sistema": "on system initialization",
  };

  let hasFreq;

  await Object.entries(frequenciesTranslations).forEach((entry) => {
    let key = entry[0];
    let options = entry[1];
    if (frequency.trim().toLowerCase().includes(key.trim().toLowerCase())) {
      hasFreq = options;
    }
  });

  return hasFreq ?? frequency;
}

document.addEventListener("DOMContentLoaded", async () => {
  const frequencySelect = document.getElementById("frequency");
  const dayField = document.getElementById("dayField");
  const daySelect = document.getElementById("day");
  const timeField = document.getElementById("timeField");
  const startDateField = document.getElementById("startDateField");

  frequencySelect.addEventListener("change", () => {
    const frequency = frequencySelect.value;
    if (frequency === "weekly" || frequency === "monthly") {
      dayField.style.display = "block";
      timeField.style.display = "block";
      startDateField.style.display = "block";
      populateDayOptions(frequency);
    } else if (
      frequency === "triggered" ||
      frequency === "on demand" ||
      frequency === "undefined" ||
      frequency === "on system initialization"
    ) {
      dayField.style.display = "none";
      timeField.style.display = "none";
      startDateField.style.display = "none";
    } else {
      timeField.style.display = "block";
      startDateField.style.display = "block";
      dayField.style.display = "none";
    }
  });

  const populateDayOptions = (frequency) => {
    daySelect.innerHTML = "";
    if (frequency === "weekly") {
      const daysOfWeek = [
        ["Sunday", "SUN"],
        ["Monday", "MON"],
        ["Tuesday", "TUE"],
        ["Wednesday", "WED"],
        ["Thursday", "THU"],
        ["Friday", "FRI"],
        ["Saturday", "SAT"],
      ];
      daysOfWeek.forEach((day) => {
        const option = document.createElement("option");
        option.value = day[1];
        option.textContent = day[0];
        daySelect.appendChild(option);
      });
    } else if (frequency === "monthly") {
      for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
      }
    }
  };

  if (window.location.search.includes("uuid=")) {
    let currentJob;
    const uuid = window.location.search.split("uuid=")[1].split("&")[0];

    await $.getJSON("scheduled_tasks", function (data) {
      data.map((d) => {
        if (d.uuid === uuid) {
          currentJob = d;
        }
      });
    });
    if (currentJob) {
      const formattedStartDate = formatDateYYYYMMDD(
        currentJob["Data de início"]
      );
      const translatedFrequency = await translateFrequency(
        currentJob["Tipo de Agendamento"]
      );

      document.getElementById("schedulerName").value =
        currentJob["Nome da tarefa"];

      document.getElementById("frequency").value = translatedFrequency;
      document.getElementById("frequency").dispatchEvent(new Event("change"));

      document.getElementById("startDate").value = formattedStartDate;

      document.getElementById("time").value = currentJob["Hora de início"];

      document.getElementById("day").value = currentJob["Dias"];

      document.getElementById("command").value =
        currentJob["Tarefa a ser executada"];
    }
  }

  document
    .getElementById("schedulerForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = {
        schedulerName: document.getElementById("schedulerName").value,
        frequency: document.getElementById("frequency").value,
        startDate: document.getElementById("startDate").value,
        time: document.getElementById("time").value,
        day: document.getElementById("day").value,
        command: document.getElementById("command").value,
      };

      fetch("/create_job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response)
        .then((data) => {
          alert("Job created successfully!");
        })
        .catch((error) => {
          alert("Error:", error);
        });
    });

  document.getElementById("cancelButton").addEventListener("click", () => {
    window.location.href = "/table";
  });
});
