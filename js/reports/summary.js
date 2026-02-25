// js/reports/summary.js

export function renderSummary(mergedData) {
  renderTrafficSummary(mergedData);
  renderSalesSummary(mergedData);
}

/* ================= TRAFFIC SUMMARY ================= */

function renderTrafficSummary(data) {

  const container = document.getElementById("traffic-summary");

  const totalImpressions = sum(data, "views");
  const totalGrossUnits = sum(data, "gross");
  const totalRevenue = sum(data, "gross_revenue");
  const totalNetUnits = sum(data, "net");

  const conversionRate =
    totalImpressions === 0
      ? 0
      : (totalNetUnits / totalImpressions) * 100;

  container.innerHTML = `
    ${buildCard(
      "Impressions",
      formatNumber(totalImpressions)
    )}

    ${buildCard(
      "Conversion Rate",
      conversionRate.toFixed(2) + "%"
    )}

    ${buildCard(
      "Gross Units & Sales",
      formatNumber(totalGrossUnits) + " Units",
      "₹ " + formatCurrencyShort(totalRevenue)
    )}
  `;
}

/* ================= SALES SUMMARY ================= */

function renderSalesSummary(data) {

  const container = document.getElementById("sales-summary");

  const grossUnits = sum(data, "gross");
  const grossRevenue = sum(data, "gross_revenue");

  const cancellationUnits = sum(data, "cancellation_units");
  const cancellationAmount = sum(data, "cancellation_amount");

  const returnUnits = sum(data, "return_units");
  const returnAmount = sum(data, "return_amount");

  const netUnits = sum(data, "net");
  const netRevenue = sum(data, "net_revenue");

  container.innerHTML = `
    ${buildCard(
      "Gross Sales",
      formatNumber(grossUnits),
      "₹ " + formatCurrencyShort(grossRevenue)
    )}

    ${buildCard(
      "Cancellations",
      formatNumber(cancellationUnits),
      "₹ " + formatCurrencyShort(cancellationAmount)
    )}

    ${buildCard(
      "Sales After Cancellations",
      formatNumber(netUnits),
      "₹ " + formatCurrencyShort(netRevenue)
    )}

    ${buildCard(
      "Returns",
      formatNumber(returnUnits),
      "₹ " + formatCurrencyShort(returnAmount)
    )}

    ${buildCard(
      "Net Sales",
      formatNumber(netUnits),
      "₹ " + formatCurrencyShort(netRevenue)
    )}
  `;
}

/* ================= HELPERS ================= */

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

/* ₹ Short Format (Lakhs / Crores Ready) */
function formatCurrencyShort(num) {

  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr";
  }

  if (num >= 100000) {
    return (num / 100000).toFixed(2) + " L";
  }

  return num.toLocaleString("en-IN");
}
