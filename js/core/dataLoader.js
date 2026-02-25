// js/core/dataLoader.js

export async function fetchCSV(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch CSV: " + response.status);
  }

  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const rows = text.trim().split("\n");

  const headers = rows[0].split(",").map(h => h.trim());

  return rows.slice(1).map(row => {
    const values = row.split(",");
    let obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : "";
    });

    return obj;
  });
}
