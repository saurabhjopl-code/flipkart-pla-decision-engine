// js/logic/decisionEngine.js

export function mergeData(trafficData, salesData) {

  const salesMap = new Map();
  salesData.forEach(row => {
    salesMap.set(row.mpsku, row);
  });

  const merged = [];

  trafficData.forEach(t => {

    const s = salesMap.get(t.mpsku) || {};

    const views = Number(t.product_views) || 0;
    const clicks = Number(t.product_clicks) || 0;
    const revenue = Number(t.revenue) || 0;
    const ctr = Number(t.CTR) || 0;

    const gross = Number(s.gross_month_sale) || 0;
    const net = Number(s.net_month_sale) || 0;
    const last7 = Number(s.last_7_days_sale) || 0;
    const stock = Number(s.total_stock) || 0;
    const stockCover = Number(s.stock_cover_days) || 0;

    merged.push(applyDecision({
      mpsku: t.mpsku,
      brand: t.brand,
      category: t.category,
      vertical: t.vertical,
      views,
      clicks,
      revenue,
      ctr,
      gross,
      net,
      last7,
      stock,
      stockCover,
      remark: s.remark || ""
    }));

  });

  return merged;
}


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
