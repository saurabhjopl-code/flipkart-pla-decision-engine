// js/reports/scaling.js

export function renderScalingOpportunities(data) {

  const container = document.querySelector(".report-content");

  const scaling = data.filter(row =>
    row.stockCover > 20 && row.last7 > 5
  );

  let html = buildTable(scaling, "High Opportunity SKUs");
  container.innerHTML = html;
}

function buildTable(rows, title) {
  return `
    <h3>${title}</h3>
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Stock</th>
          <th>Stock Cover</th>
          <th>Last 7 Days</th>
          <th>Net Sale</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>${r.mpsku}</td>
            <td>${r.stock}</td>
            <td>${r.stockCover.toFixed(1)}</td>
            <td>${r.last7}</td>
            <td>${r.net}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
