document.addEventListener("DOMContentLoaded", () => {
  const frequencySelect = document.getElementById("frequency");
  const dayField = document.getElementById("dayField");
  const daySelect = document.getElementById("day");

  frequencySelect.addEventListener("change", () => {
    const frequency = frequencySelect.value;
    if (frequency === "weekly" || frequency === "monthly") {
      dayField.style.display = "block";
      populateDayOptions(frequency);
    } else {
      dayField.style.display = "none";
    }
  });

  const populateDayOptions = (frequency) => {
    daySelect.innerHTML = "";
    if (frequency === "weekly") {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      daysOfWeek.forEach((day, index) => {
        const option = document.createElement("option");
        option.value = index + 1;
        option.textContent = day;
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

  document
    .getElementById("schedulerForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Form submitted!");
      // Add logic to handle form submission
    });

  document.getElementById("cancelButton").addEventListener("click", () => {
    alert("Form canceled!");
    // Add logic to handle form cancellation
  });
});
