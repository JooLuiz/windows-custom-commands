function showToast(message, type = "success", duration = 5000) {
  const toaster = document.getElementById("toaster");

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  const progress = document.createElement("div");
  progress.className = "progress";

  toast.appendChild(progress);
  toaster.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, duration);
}

function showCreateSuccess() {
  showToast("Task created successfully!", "success");
}

function showUpdateSuccess() {
  showToast("Task updated successfully!", "success");
}

function showDeleteSuccess() {
  showToast("Task deleted successfully!", "success");
}

function showError(message) {
  showToast(message || "Something went wrong", "error");
}
