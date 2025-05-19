const GOOGLE_SHEET_API_URL =
  "https://gsx2json.com/api?id=1zI6t0bcXKyxWRyp1S3BLtGBQKUcBSWWB60MQl7SwqE4&sheet=Gauges";

export const FetchGaugeDataFromSheet = async () => {
  try {
    const response = await fetch(GOOGLE_SHEET_API_URL);

    if (!response.ok) {
      // Try to get more specific error info if available
      let errorInfo = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorInfo += ` - ${errorData.message || JSON.stringify(errorData)}`;
      } catch (jsonError) {
        // Ignore if response is not JSON
      }
      throw new Error(errorInfo);
    }

    const data = await response.json();

    if (data && data.rows && Array.isArray(data.rows)) {
      return data.rows.map((row) => ({
        ...row,
        progress: parseFloat(row.progress) || 0,
        minvalue: parseFloat(row.minvalue),
        maxvalue: parseFloat(row.maxvalue),
        title: row.title || "Untitled Gauge",
        color: row.color || "blue",
      }));
    } else {
      console.warn(
        "Fetched data is not in the expected format or 'rows' is missing:",
        data
      );
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch gauge data from sheet:", error);
    throw error;
  }
};
