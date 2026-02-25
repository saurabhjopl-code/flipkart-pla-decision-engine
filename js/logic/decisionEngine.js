// js/logic/decisionEngine.js

export function mergeData(trafficData, salesData) {

  const salesMap = new Map();

  salesData.forEach(row => {
    salesMap.set(row.mpsku, row);
  });

  const merged = [];

  trafficData.forEach(t => {

    const s = salesMap.get(t.mpsku) || {};

    merged.push(applyDecision({

      /* ===== TRAFFIC DATA ===== */
      mpsku: t.mpsku,
      brand: t.brand,
      category: t.category,
      vertical: t.vertical,

      views: Number(t.product_views) || 0,
      clicks: Number(t.product_clicks) || 0,
      revenue: Number(t.revenue) || 0,
      ctr: Number(t.CTR) || 0,

      /* ===== SALES UNITS ===== */
      gross: Number(s.gross_month_sale) || 0,
      net: Number(s.net_month_sale) || 0,
      last7: Number(s.last_7_days_sale) || 0,

      /* ===== FINANCIAL METRICS ===== */
      gross_revenue: Number(s.gross_revenue) || 0,
      cancellation_units: Number(s.cancellation_units) || 0,
      cancellation_amount: Number(s.cancellation_amount) || 0,
      return_units: Number(s.return_units) || 0,
      return_amount: Number(s.return_amount) || 0,
      net_revenue: Number(s.net_revenue) || 0,

      /* ===== STOCK ===== */
      stock: Number(s.total_stock) || 0,
      stockCover: Number(s.stock_cover_days) || 0,

      remark: s.remark || ""

    }));

  });

  return merged;
}

/* ================= DECISION LOGIC ================= */

function applyDecision(row) {

  if (row.stock === 0) {
    row.decision = "❌ Do Not Run (No Stock)";
  }
  else if (row.stockCover < 5) {
    row.decision = "⚠ Low Stock – Avoid Scaling";
  }
  else if (row.stockCover > 20 && row.last7 > 5) {
    row.decision = "🔥 Run PLA Aggressive";
  }
  else if (row.stockCover > 10 && row.last7 >= 2) {
    row.decision = "🧪 Run PLA Test";
  }
  else if (row.views > 1000 && row.net === 0) {
    row.decision = "🛠 Improve Listing";
  }
  else {
    row.decision = "👀 Monitor";
  }

  return row;
}
