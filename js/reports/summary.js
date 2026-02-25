// js/reports/summary.js

export function renderSummaryFromSheet(summaryData) {

  const row = summaryData[0];

  renderTrafficSummary(row);
  renderSalesSummary(row);
}

/* ================= TRAFFIC SUMMARY ================= */

function renderTrafficSummary(row) {

  const container = document.getElementById("traffic-summary");

  container.innerHTML = `
    ${buildCard(
      "Impressions",
      formatNumber(row.impressions),
      calculateDelta(row.impressions, row.impressions_prev_7)
    )}

    ${buildCard(
      "Conversion Rate",
      parsePercentage(row.conversion_rate) + "%",
      null
    )}

    ${buildCard(
      "Gross Units & Sales",
      formatNumber(row.gross_units) + " Units",
      "₹ " + formatCurrencyShort(row.gross_revenue),
      calculateDelta(row.gross_units, row.gross_units_prev_7)
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
      "₹ " + formatCurrencyShort(row.gross_revenue),
      calculateDelta(row.gross_units, row.gross_units_prev_7)
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
      "₹ " + formatCurrencyShort(row.net_revenue),
      calculateDelta(row.net_units, row.net_units_prev_7)
    )}
  `;
}

/* ================= CARD BUILDER ================= */

function buildCard(title, value, subtext = "", deltaHTML = "") {

  return `
    <div class="summary-card">
      <div class="summary-title">${title}</div>
      <div class="summary-value">${value}</div>
      ${subtext ? `<div class="summary-subtext">${subtext}</div>` : ""}
      ${deltaHTML ? `<div class="summary-delta">${deltaHTML}</div>` : ""}
    </div>
  `;
}

/* ================= DELTA LOGIC ================= */

function calculateDelta(current, previous) {

  current = Number(current);
  previous = Number(previous);

  if (!previous || previous === 0) return "";

  const change = ((current - previous) / previous) * 100;
  const formatted = change.toFixed(1) + "%";

  if (change > 0) {
    return `<span class="delta-positive">▲ ${formatted}</span>`;
  }

  if (change < 0) {
    return `<span class="delta-negative">▼ ${Math.abs(change).toFixed(1)}%</span>`;
  }

  return "";
}

/* ================= HELPERS ================= */

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

function parsePercentage(value) {

  if (!value) return "0.00";

  value = String(value).replace("%", "");
  const num = Number(value);

  if (isNaN(num)) return "0.00";

  return num.toFixed(2);
}
