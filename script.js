let allData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allData = data;

    initFilters(data);   // ← 追加

    renderCards(data);
    updateCount(data.length);
  });

function createCheckboxFilter(containerId, key, data, isRarity = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const values = [...new Set(data.map(item => item[key]))];

  // ソート
  if (key === "wave_label") {
    values.sort((a, b) => parseInt(a) - parseInt(b));
  }

  if (key === "rarity") {
    values.sort((a, b) => a - b);
  }

  values.forEach(value => {
    const label = document.createElement("label");

    label.innerHTML = `
      <input type="checkbox" value="${value}" data-key="${key}">
      ${isRarity ? "★".repeat(value) : value}
    `;

    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function updateCount(count) {
  document.getElementById("resultCount").textContent =
    `${count}件表示中`;
}
function initFilters(data) {
  createCheckboxFilter("brandFilter", "brand", data);
  createCheckboxFilter("waveFilter", "wave_label", data);
  createCheckboxFilter("rarityFilter", "rarity", data, true);
  createCheckboxFilter("colorFilter", "color", data);
}

document.getElementById("filterToggle")
  .addEventListener("click", () => {
    const area = document.getElementById("filterArea");
    area.style.display =
      area.style.display === "none" ? "block" : "none";
  });
