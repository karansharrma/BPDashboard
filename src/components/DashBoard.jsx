import React from "react";
import GaugeChartComponent from "../chartcomponents/GaugeChart";
import PieChartComponent from "../chartcomponents/PieChartComponent";
import BarChartComponent from "../chartcomponents/BarChartComponent";
import VehicleMeter from "../chartcomponents/VehicleMeter";

const chartData = [
  { label: "Preventive Maintenance", value: 96, color: "#22c55e" },
  { label: "Annual Inspections", value: 100, color: "#22c55e" },
  { label: "Coverage in Travel Safety", value: 30, color: "#22c55e" },
  { label: "Unmet Repairs", value: 5, color: "#ef4444" },
  { label: "Warranty Management", value: 70, color: "#22c55e" },
  { label: "Budget Utilization", value: 60, color: "#f59e0b" },
  { label: "Vehicle Availability", value: 100, color: "#22c55e" },
  { label: "Route Availability", value: 59, color: "#84cc16" },
  { label: "Route Accuracy", value: 88, color: "#84cc16" },
  { label: "Dock Availability", value: 93, color: "#22c55e" },
];

const pieChartData = [
  { label: "Vehicle Availability", value: 100, color: "#22c55e" },
  { label: "Route Availability", value: 89, color: "#84cc16" },
  { label: "Route Accuracy", value: 88, color: "#84cc16" },
  { label: "Dock Availability", value: 93, color: "#22c55e" },
];

const Dashboard = () => {
  return (
    <div className=" overflow-hidden">
      <h2
        style={{
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          fontWeight: "600",
          color: "#111827",
        }}
      >
        Key Performance Indicators
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {chartData.map((chart, index) => (
          <GaugeChartComponent
            key={index}
            title={chart.label}
            color={chart.color}
            progress={chart.value}
            minValue={0}
            maxValue={100}
          />
        ))}

        <PieChartComponent />
        <BarChartComponent />
        <VehicleMeter />
      </div>
    </div>
  );
};
export default Dashboard;
