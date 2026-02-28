let allData = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    allData = data;
    renderCards(data);
    updateCount(data.length);
  });

function renderCards(data) {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}">
      <div>
        <strong>${item.name}</strong><br>
        ${item.wave_label} ★${"★".repeat(item.rarity)}
      </div>
    `;

    container.appendChild(card);
  });
}

function updateCount(count) {
  document.getElementById("resultCount").textContent =
    `${count}件表示中`;
}
