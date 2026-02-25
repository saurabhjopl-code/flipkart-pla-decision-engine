// js/reports/summary.js

export function renderSummary(mergedData) {
  renderTrafficSummary(mergedData);
  renderSalesSummary(mergedData);
}

function renderTrafficSummary(data) {

  const container = document.getElementById("traffic-summary");

  const totalImpressions = sum(data, "views");
  const totalGrossUnits = sum(data, "gross");
  const totalRevenue = sum(data, "revenue");
  const totalNet = sum(data, "net");

  const conversionRate =
    totalImpressions === 0
      ? 0
      : (totalNet / totalImpressions) * 100;

  container.innerHTML = `
    ${buildCard("Impressions", formatNumber(totalImpressions))}
    ${buildCard("Conversion Rate", conversionRate.toFixed(2) + "%")}
    ${buildCard(
      "Gross Units & Sales",
      formatNumber(totalGrossUnits) + " Units",
      "₹" + formatCurrency(totalRevenue)
    )}
  `;
}

function renderSalesSummary(data) {

  const container = document.getElementById("sales-summary");

  const grossSales = sum(data, "gross");
  const netSales = sum(data, "net");
  const totalRevenue = sum(data, "revenue");

  const cancellations = grossSales - netSales;
  const salesAfterCancellation = netSales;
  const returns = 0; // can enhance later

  container.innerHTML = `
    ${buildCard("Gross Sales", formatNumber(grossSales))}
    ${buildCard("Cancellations", formatNumber(cancellations))}
    ${buildCard("Sales After Cancellations", formatNumber(salesAfterCancellation))}
    ${buildCard("Returns", formatNumber(returns))}
    ${buildCard("Net Sales", formatNumber(netSales))}
  `;
}

function buildCard(title, value, subtext = "") {
  return `
    <div class="summary-card">
      <div class="summary-title">${title}</div>
      <div class="summary-value">${value}</div>
      ${subtext ? `<div class="summary-subtext">${subtext}</div>` : ""}
    </div>
  `;
}

function sum(data, key) {
  return data.reduce((acc, row) => acc + (Number(row[key]) || 0), 0);
}

function formatNumber(num) {
  return num.toLocaleString("en-IN");
}

function formatCurrency(num) {
  return num.toLocaleString("en-IN");
}
