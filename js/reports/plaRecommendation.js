// js/reports/plaRecommendation.js

let currentIndex = 0;
const PAGE_SIZE = 50;
let fullData = [];

export function renderPLAReport(data) {
  const container = document.querySelector(".report-content");

  fullData = data;
  currentIndex = 0;

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Brand</th>
          <th>Views</th>
          <th>Net Sale</th>
          <th>Stock</th>
          <th>Stock Cover</th>
          <th>Decision</th>
        </tr>
      </thead>
      <tbody id="pla-body"></tbody>
    </table>
    <div class="load-more-wrapper">
      <button id="load-more-btn" class="tab-btn">Load More</button>
    </div>
  `;

  loadMoreRows();

  document
    .getElementById("load-more-btn")
    .addEventListener("click", loadMoreRows);
}

function loadMoreRows() {
  const tbody = document.getElementById("pla-body");

  const nextChunk = fullData.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextChunk.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${row.views}</td>
        <td>${row.net}</td>
        <td>${row.stock}</td>
        <td>${row.stockCover.toFixed(1)}</td>
        <td>${row.decision}</td>
      </tr>
    `;
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex >= fullData.length) {
    document.getElementById("load-more-btn").style.display = "none";
  }
}
