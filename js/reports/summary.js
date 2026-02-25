// js/reports/summary.js

export function renderSummaryFromSheet(summaryData) {

  const row = summaryData[0];

  renderTrafficSummary(row);
  renderSalesSummary(row);
}

/* ================= TRAFFIC SUMMARY ================= */

function renderTrafficSummary(row) {

  const container = document.getElementById("traffic-summary");

  const conversionRate = parsePercentage(row.conversion_rate);

  container.innerHTML = `
    ${buildCard(
      "Impressions",
      formatNumber(row.impressions)
    )}

    ${buildCard(
      "Conversion Rate",
      conversionRate + "%"
    )}

    ${buildCard(
      "Gross Units & Sales",
      formatNumber(row.gross_units) + " Units",
      "₹ " + formatCurrencyShort(row.gross_revenue)
    )}
  `;
}

/* ================= SALES SUMMARY ================= */

function renderSalesSummary(row) {

  const container = document.getElementById("sales-summary");

  container.innerHTML = `
    ${buildCard(
      "Gross Sales",
      formatNumber(row.gross_units),
      "₹ " + formatCurrencyShort(row.gross_revenue)
    )}

    ${buildCard(
      "Cancellations",
      formatNumber(row.cancellation_units),
      "₹ " + formatCurrencyShort(row.cancellation_amount)
    )}

    ${buildCard(
      "Sales After Cancellations",
      formatNumber(row.sales_after_cancel_units),
      "₹ " + formatCurrencyShort(row.sales_after_cancel_revenue)
    )}

    ${buildCard(
      "Returns",
      formatNumber(row.return_units),
      "₹ " + formatCurrencyShort(row.return_amount)
    )}

    ${buildCard(
      "Net Sales",
      formatNumber(row.net_units),
      "₹ " + formatCurrencyShort(row.net_revenue)
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

function formatNumber(num) {
  return Number(num).toLocaleString("en-IN");
}

function formatCurrencyShort(num) {

  num = Number(num);

  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + " Cr";
  }

  if (num >= 100000) {
    return (num / 100000).toFixed(2) + " L";
  }

  return num.toLocaleString("en-IN");
}

/* Safe % Parser */
function parsePercentage(value) {

  if (!value) return "0.00";

  // Remove % if exists
  value = String(value).replace("%", "");

  const num = Number(value);

  if (isNaN(num)) return "0.00";

  return num.toFixed(2);
}
