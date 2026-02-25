// js/reports/stockRisk.js

export function renderStockRisk(data) {

  const container = document.querySelector(".report-content");

  const risk = data.filter(row =>
    row.stockCover > 0 && row.stockCover < 7
  );

  let html = buildTable(risk, "Low Stock Risk SKUs");
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
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>${r.mpsku}</td>
            <td>${r.stock}</td>
            <td>${r.stockCover.toFixed(1)}</td>
            <td>${r.last7}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
