import React from "react";
import { useGoogleSheet } from "../context/GoogleSheetContext";
import GaugeChartComponent from "../chartcomponents/GaugeChart";
import PieChartComponent from "../chartcomponents/PieChartComponent";
import BarChartComponent from "../chartcomponents/BarChartComponent";
import Odometer from "../chartcomponents/Odometer";

const pieChartData = [
  { name: "Rent", value: 500 },
  { name: "Groceries", value: 300 },
  { name: "Utilities", value: 150 },
  { name: "Transport", value: 100 },
  { name: "Entertainment", value: 200 },
];

const Dashboard = () => {
  const { data: sheetData } = useGoogleSheet();

  const parsedChartData = sheetData.map((item) => ({
    label: item.Metric,
    value: parseFloat(item["Current Value"]),
    color: item.Color || "#22c55e",
  }));

  return (
    <div className="overflow-hidden px-4 py-6">
      <h2 className="mb-6 text-2xl font-medium text-gray-900">
        Key Performance Indicators
      </h2>
      <div className="flex flex-wrap gap-6">
        {parsedChartData.map((chart, index) => (
          <GaugeChartComponent
            key={index}
            title={chart.label}
            color={chart.color}
            progress={chart.value}
            minValue={0}
            maxValue={100}
          />
        ))}
        <PieChartComponent
          data={pieChartData}
          heading="Monthly Expenses"
          dateRange="April 1 - April 30, 2025"
        />

        <BarChartComponent />
      </div>

      <Odometer value={5000} title="Dummy Odometer" />
    </div>
  );
};

export default Dashboard;
