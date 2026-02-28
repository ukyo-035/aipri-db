let allData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allData = data;
    renderCards(allData);
    updateCount(allData.length);
  });

function renderCards(data) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="">
      <h4>${item.name}</h4>
      <p>${item.brand} / ${item.color}</p>
      <p>${item.series} / ${item.rarity}</p>
    `;

    container.appendChild(card);
  });
}

function updateCount(count) {
  document.getElementById("count").textContent =
    `表示件数：${count}件`;
}

function applyFilters() {
  const checkedBoxes = document.querySelectorAll("input[type=checkbox]:checked");
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const groupToggle = document.getElementById("groupToggle").checked;

  const filterMap = {};

  checkedBoxes.forEach(box => {
    if (!box.dataset.key) return;

    const key = box.dataset.key;
    if (!filterMap[key]) filterMap[key] = [];
    filterMap[key].push(box.value);
  });

  let filteredData = allData.filter(item => {

    const categoryMatch = Object.keys(filterMap).every(key => {
      return filterMap[key].includes(item[key].toString());
    });

    if (!categoryMatch) return false;

    if (searchText) {
      const searchable =
        item.name +
        item.parts.tops +
        item.parts.bottoms +
        item.parts.shoes +
        item.parts.accessory;

      if (!searchable.toLowerCase().includes(searchText)) {
        return false;
      }
    }

    return true;
  });

  if (groupToggle) {
    const seen = new Set();
    filteredData = filteredData.filter(item => {
      if (!item.color_group) return true;
      if (seen.has(item.color_group)) return false;
      seen.add(item.color_group);
      return true;
    });
  }

  renderCards(filteredData);
  updateCount(filteredData.length);
}

document.querySelectorAll("input[type=checkbox]")
  .forEach(cb => cb.addEventListener("change", applyFilters));

document.getElementById("searchInput")
  .addEventListener("input", applyFilters);

document.getElementById("groupToggle")
  .addEventListener("change", applyFilters);
