// js/reports/listingIssue.js

export function renderListingIssues(data) {

  const container = document.querySelector(".report-content");

  const issues = data.filter(row =>
    row.views > 1000 && row.net === 0
  );

  let html = buildTable(issues, "High Views but No Sales");
  container.innerHTML = html;
}

function buildTable(rows, title) {
  return `
    <h3>${title}</h3>
    <table>
      <thead>
        <tr>
          <th>MPSKU</th>
          <th>Views</th>
          <th>Clicks</th>
          <th>Net Sale</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td>${r.mpsku}</td>
            <td>${r.views}</td>
            <td>${r.clicks}</td>
            <td>${r.net}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
