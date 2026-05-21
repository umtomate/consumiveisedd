const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const clearBtn = document.querySelector("#clearBtn");
const markAllBtn = document.querySelector("#markAllBtn");
const searchInput = document.querySelector("#searchInput");
const checklist = document.querySelector("#checklist");

const storageKey = "edd-consumiveis-minimal";

function loadState() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = saved.includes(index);
  });
  updateProgress();
}

function saveState() {
  const checkedIndexes = checkboxes
    .map((checkbox, index) => checkbox.checked ? index : null)
    .filter(index => index !== null);

  localStorage.setItem(storageKey, JSON.stringify(checkedIndexes));
}

function updateProgress() {
  const total = checkboxes.length;
  const checked = checkboxes.filter(checkbox => checkbox.checked).length;
  const percentage = total ? Math.round((checked / total) * 100) : 0;

  progressText.textContent = `${checked}/${total}`;
  progressFill.style.width = `${percentage}%`;
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    saveState();
    updateProgress();
  });
});

clearBtn.addEventListener("click", () => {
  checkboxes.forEach(checkbox => checkbox.checked = false);
  saveState();
  updateProgress();
});

markAllBtn.addEventListener("click", () => {
  checkboxes.forEach(checkbox => checkbox.checked = true);
  saveState();
  updateProgress();
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();
  Array.from(checklist.querySelectorAll(".item")).forEach(item => {
    item.classList.toggle("hidden", !item.dataset.product.includes(term));
  });
});

loadState();
