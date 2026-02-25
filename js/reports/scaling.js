// js/reports/scaling.js

let currentIndex = 0;
const PAGE_SIZE = 50;
let fullData = [];

export function renderScalingOpportunities(data) {
  const container = document.querySelector(".report-content");

  // Filter: High stock cover + good recent sales
  fullData = data.filter(row =>
    row.stockCover > 20 && row.last7 > 5
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
          <th>Last 7 Days</th>
          <th>Net Sale</th>
        </tr>
      </thead>
      <tbody id="scaling-body"></tbody>
    </table>
    <div class="load-more-wrapper">
      <button id="scaling-load-more" class="tab-btn">Load More</button>
    </div>
  `;

  loadMoreRows();

  document
    .getElementById("scaling-load-more")
    .addEventListener("click", loadMoreRows);
}

function loadMoreRows() {
  const tbody = document.getElementById("scaling-body");
  const nextChunk = fullData.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextChunk.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${row.stock}</td>
        <td>${row.stockCover.toFixed(1)}</td>
        <td>${row.last7}</td>
        <td>${row.net}</td>
      </tr>
    `;
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex >= fullData.length) {
    const btn = document.getElementById("scaling-load-more");
    if (btn) btn.style.display = "none";
  }
}
