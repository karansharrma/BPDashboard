// src/context/GoogleSheetContext.js
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const GoogleSheetContext = createContext();

export const GoogleSheetProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sheetId = "1zI6t0bcXKyxWRyp1S3BLtGBQKUcBSWWB60MQl7SwqE4";
  const sheetName = "Gauges";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
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

      const formatted = rows.map((row) =>
        Object.fromEntries(headers.map((h, i) => [h, row[i]]))
      );

      setData(formatted);
    } catch (err) {
      console.error("Sheet fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <GoogleSheetContext.Provider
      value={{ data, isLoading, refresh: fetchData }}
    >
      {children}
    </GoogleSheetContext.Provider>
  );
};

export const useGoogleSheet = () => useContext(GoogleSheetContext);
