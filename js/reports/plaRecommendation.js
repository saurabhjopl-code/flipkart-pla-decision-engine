// js/reports/plaRecommendation.js

export function renderPLAReport(data) {

  const container = document.querySelector(".report-container");

  let html = `
    <div class="report-title">PLA Recommendation Report</div>
    <div style="overflow-x:auto;">
    <table style="width:100%; border-collapse: collapse; font-size:14px;">
      <thead>
        <tr style="background:#f1f5f9;">
          <th style="padding:10px;">MPSKU</th>
          <th>Brand</th>
          <th>Views</th>
          <th>Net Sale</th>
          <th>Stock</th>
          <th>Stock Cover</th>
          <th>Decision</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.forEach(row => {
    html += `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:10px;">${row.mpsku}</td>
        <td>${row.brand}</td>
        <td>${row.views}</td>
        <td>${row.net}</td>
        <td>${row.stock}</td>
        <td>${row.stockCover.toFixed(1)}</td>
        <td>${row.decision}</td>
      </tr>
    `;
  });

  html += "</tbody></table></div>";

  container.innerHTML = html;
}
