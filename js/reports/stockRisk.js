// js/reports/stockRisk.js

let currentIndex = 0;
const PAGE_SIZE = 50;
let fullData = [];

export function renderStockRisk(data) {
  const container = document.querySelector(".report-content");

  // Filter: Low stock cover (0 < cover < 7)
  fullData = data.filter(row =>
    row.stockCover > 0 && row.stockCover < 7
  );

  currentIndex = 0;

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Brand</th>
          <th>Stock</th>
          <th>Stock Cover</th>
          <th>Last 7 Days Sale</th>
        </tr>
      </thead>
      <tbody id="stock-body"></tbody>
    </table>
    <div class="load-more-wrapper">
      <button id="stock-load-more" class="tab-btn">Load More</button>
    </div>
  `;

  loadMoreRows();

  document
    .getElementById("stock-load-more")
    .addEventListener("click", loadMoreRows);
}

function loadMoreRows() {
  const tbody = document.getElementById("stock-body");
  const nextChunk = fullData.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextChunk.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${row.stock}</td>
        <td>${row.stockCover.toFixed(1)}</td>
        <td>${row.last7}</td>
      </tr>
    `;
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex >= fullData.length) {
    const btn = document.getElementById("stock-load-more");
    if (btn) btn.style.display = "none";
  }
}
