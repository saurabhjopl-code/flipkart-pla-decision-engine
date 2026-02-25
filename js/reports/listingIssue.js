// js/reports/listingIssue.js

let fullData = [];
let currentIndex = 0;
const PAGE_SIZE = 50;

export function renderListingIssues(data) {

  const container = document.querySelector(".report-content");

  fullData = data
    .filter(row => row.views > 1000 && row.net === 0)
    .sort((a, b) => b.views - a.views);

  currentIndex = 0;

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Brand</th>
          <th>Views</th>
          <th>Clicks</th>
          <th>Net Sale</th>
        </tr>
      </thead>
      <tbody id="listing-body"></tbody>
    </table>
    <div class="load-more-wrapper">
      <button id="listing-load-more" class="tab-btn">Load More</button>
    </div>
  `;

  loadMoreRows();
  document.getElementById("listing-load-more")
    .addEventListener("click", loadMoreRows);
}

function loadMoreRows() {

  const tbody = document.getElementById("listing-body");
  const nextChunk = fullData.slice(currentIndex, currentIndex + PAGE_SIZE);

  nextChunk.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${row.views}</td>
        <td>${row.clicks}</td>
        <td>${row.net}</td>
      </tr>
    `;
  });

  currentIndex += PAGE_SIZE;

  if (currentIndex >= fullData.length) {
    document.getElementById("listing-load-more").style.display = "none";
  }
}
