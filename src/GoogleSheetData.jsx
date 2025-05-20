import React, { useEffect, useState } from "react";

const GoogleSheetData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = "1zI6t0bcXKyxWRyp1S3BLtGBQKUcBSWWB60MQl7SwqE4";
      const sheetName = "TRAILER";
      const query = encodeURIComponent("Select *");
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&tq=${query}`;

      try {
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47).slice(0, -2));

        const headers = json.table.cols.map((col) => col.label);
        const rows = json.table.rows.map((row) =>
          row.c.map((cell) => cell?.v || "")
        );

        const formattedData = rows.map((row) =>
          Object.fromEntries(headers.map((h, i) => [h, row[i]]))
        );

        setData(formattedData);
      } catch (err) {
        console.error("Failed to load sheet data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default GoogleSheetData;
