// js/reports/plaRecommendation.js

let fullData = [];
let filteredData = [];
let currentIndex = 0;
const PAGE_SIZE = 50;

export function renderPLAReport(data) {

  const contentContainer = document.querySelector(".report-content");
  const titleContainer = document.querySelector(".report-title");

  // SORT BY GROSS HIGH → LOW
  fullData = [...data].sort((a, b) => b.gross - a.gross);
  filteredData = [...fullData];
  currentIndex = 0;

  // Title + Filters in single row
  titleContainer.innerHTML = `
    <div class="report-title-row">
      <span>PLA Recommendation Report</span>
      ${buildFilters()}
    </div>
  `;

  contentContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Brand</th>
          <th>Views</th>
          <th>Clicks</th>
          <th>CTR</th>
          <th>CVR</th>
          <th>Gross Sale</th>
          <th>Net Sale</th>
          <th>Stock</th>
          <th>Decision</th>
        </tr>
      </thead>
      <tbody id="pla-body"></tbody>
    </table>

    <div class="load-more-wrapper">
      <button id="pla-load-more" class="tab-btn">Load More</button>
    </div>
  `;

  attachFilterEvents();
  loadMoreRows();
}

/* ================= FILTERS ================= */

function buildFilters() {

  const brands = [...new Set(fullData.map(r => r.brand))].sort();
  const decisions = [...new Set(fullData.map(r => r.decision))];

  return `
    <div class="filter-pills">
      <select id="filter-brand" class="pill-select">
        <option value="">All Brands</option>
        ${brands.map(b => `<option value="${b}">${b}</option>`).join("")}
      </select>

      <select id="filter-decision" class="pill-select">
        <option value="">All Decisions</option>
        ${decisions.map(d => `<option value="${d}">${d}</option>`).join("")}
      </select>
    </div>
  `;
}

function attachFilterEvents() {

  document.getElementById("filter-brand")
    .addEventListener("change", applyFilters);

  document.getElementById("filter-decision")
    .addEventListener("change", applyFilters);

  document.getElementById("pla-load-more")
    .addEventListener("click", loadMoreRows);
}

function applyFilters() {

  const brand = document.getElementById("filter-brand").value;
  const decision = document.getElementById("filter-decision").value;

  filteredData = fullData.filter(row => {
    return (!brand || row.brand === brand) &&
           (!decision || row.decision === decision);
  });

  currentIndex = 0;
  document.getElementById("pla-body").innerHTML = "";
  document.getElementById("pla-load-more").style.display = "inline-block";

  loadMoreRows();
}

/* ================= LOAD MORE ================= */

function loadMoreRows() {

  const tbody = document.getElementById("pla-body");
  const nextChunk = filteredData.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextChunk.forEach(row => {

    const ctr = row.views > 0
      ? ((row.clicks / row.views) * 100).toFixed(2) + "%"
      : "0.00%";

    const cvr = row.clicks > 0
      ? ((row.net / row.clicks) * 100).toFixed(2) + "%"
      : "0.00%";

    tbody.innerHTML += `
      <tr>
        <td>${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${formatNumber(row.views)}</td>
        <td>${formatNumber(row.clicks)}</td>
        <td>${ctr}</td>
        <td>${cvr}</td>
        <td>${formatNumber(row.gross)}</td>
        <td>${formatNumber(row.net)}</td>
        <td>${formatNumber(row.stock)}</td>
        <td>${row.decision}</td>
      </tr>
    `;
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex >= filteredData.length) {
    document.getElementById("pla-load-more").style.display = "none";
  }
}

/* ================= HELPERS ================= */

function formatNumber(num) {
  return Number(num).toLocaleString("en-IN");
}
