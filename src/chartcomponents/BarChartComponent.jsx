import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataKeyAvgDur = "Average Duration (in Hours)";
const dataKeyNumTasks = "No. of Tasks";
const dataKeyTotalAvgDur = "Total Average Duration (in Hours)";

const chartData = [
  {
    category: "Damage Interior",
    [dataKeyAvgDur]: 10.0,
    [dataKeyTotalAvgDur]: 10.0,
    [dataKeyNumTasks]: 1.0,
  },
  {
    category: "Accident Inspection",
    [dataKeyAvgDur]: 8.0,
    [dataKeyTotalAvgDur]: 8.0,
    [dataKeyNumTasks]: 1.5,
  },
  {
    category: "Damage Exterior",
    [dataKeyAvgDur]: 8.0,
    [dataKeyTotalAvgDur]: 8.0,
    [dataKeyNumTasks]: 2.0,
  },
  {
    category: "Suspension",
    [dataKeyAvgDur]: 7.5,
    [dataKeyTotalAvgDur]: 7.5,
    [dataKeyNumTasks]: 1.8,
  },
  {
    category: "Lights and Wiring",
    [dataKeyAvgDur]: 5.0,
    [dataKeyTotalAvgDur]: 5.0,
    [dataKeyNumTasks]: 1.2,
  },
  {
    category: "Brakes/ABS",
    [dataKeyAvgDur]: 5.0,
    [dataKeyTotalAvgDur]: 5.0,
    [dataKeyNumTasks]: 1.3,
  },
  {
    category: "Trailer Pre-Delivery Insp.",
    [dataKeyAvgDur]: 5.5,
    [dataKeyTotalAvgDur]: 5.5,
    [dataKeyNumTasks]: 2.5,
  },
  {
    category: "Annual Inspection",
    [dataKeyAvgDur]: 6.5,
    [dataKeyTotalAvgDur]: 7.0,
    [dataKeyNumTasks]: 4.0,
  },
  {
    category: "Door",
    [dataKeyAvgDur]: 3.5,
    [dataKeyTotalAvgDur]: 4.5,
    [dataKeyNumTasks]: 2.0,
  },
  {
    category: "Preventative Maintenance",
    [dataKeyAvgDur]: 4.8,
    [dataKeyTotalAvgDur]: 6.0,
    [dataKeyNumTasks]: 10.0,
  },
  {
    category: "Electrical",
    [dataKeyAvgDur]: 4.0,
    [dataKeyTotalAvgDur]: 5.0,
    [dataKeyNumTasks]: 0.8,
  },
  {
    category: "Air Leak",
    [dataKeyAvgDur]: 2.0,
    [dataKeyTotalAvgDur]: 3.0,
    [dataKeyNumTasks]: 1.5,
  },
  {
    category: "Landing Gear",
    [dataKeyAvgDur]: 0.8,
    [dataKeyTotalAvgDur]: 1.5,
    [dataKeyNumTasks]: 0.5,
  },
];

const COLOR_AVG_DURATION = "#28a9a7";
const COLOR_NUM_TASKS = "#000000";
const COLOR_TOTAL_AVG_DURATION = "#4338ca";

const CustomDash = (props) => {
  const { cx, cy, fill } = props; // cx, cy are center of the symbol, fill is series color
  const dashWidth = 15; // Width of the dash
  const dashHeight = 3; // Thickness of the dash
  return (
    <rect
      x={cx - dashWidth / 2}
      y={cy - dashHeight / 2}
      width={dashWidth}
      height={dashHeight}
      fill={fill} // Use the fill color passed by Recharts from the Scatter component
    />
  );
};

function BarChartComponent() {
  return (
    <div className="border border-amber-100 bg-amber-50 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-hidden mx-auto w-full max-w-4xl">
      {/* Header with title on left and date on right */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Task Analysis Overview
        </h3>
        <span className="text-xs text-gray-500 border px-2 py-1 rounded">
          Data Snapshot Q2 2023
        </span>
      </div>

      {/* Chart Area */}
      {/* Using ResponsiveContainer for better adaptability */}
      <div style={{ width: "100%", height: 450 }}>
        {" "}
        {/* Increased height slightly */}
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 20, // Space for legend
              right: 30,
              left: 20,
              bottom: 70, // Increased bottom margin for angled X-axis labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="category"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 15, dy: 5 }} // Adjusted tick position
            />
            <YAxis
              label={{
                value: "Value (Hours / Count)",
                angle: -90,
                position: "insideLeft",
                dx: -10, // Adjust horizontal position of Y-axis label
                fontSize: 12,
                fill: "#6b7280", // gray-500
              }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ccc",
              }}
              itemStyle={{ fontSize: 12 }}
            />
            <Legend
              verticalAlign="top"
              align="left" // Align legend items to the left
              height={36} // Standard height for legend
              iconSize={10} // Adjust icon size
              wrapperStyle={{
                paddingLeft: "50px",
                paddingTop: "0px",
                fontSize: "12px",
              }} // Shift legend to match original image a bit
              formatter={(value, entry) => {
                // `value` is the `name` prop of Bar, Line, Scatter
                // `entry.color` is the color of the series
                return (
                  <span style={{ color: entry.color, marginRight: "5px" }}>
                    {value}
                  </span>
                );
              }}
            />
            <Bar
              dataKey={dataKeyAvgDur}
              fill={COLOR_AVG_DURATION}
              name={dataKeyAvgDur} // Name for legend and tooltip
              barSize={30} // Optional: control bar width
            />
            <Line
              type="monotone"
              dataKey={dataKeyNumTasks}
              stroke={COLOR_NUM_TASKS}
              name={dataKeyNumTasks} // Name for legend and tooltip
              strokeWidth={2}
              dot={{ r: 3, fill: COLOR_NUM_TASKS }}
              activeDot={{ r: 5, stroke: COLOR_NUM_TASKS, strokeWidth: 1 }}
            />
            <Scatter
              dataKey={dataKeyTotalAvgDur}
              fill={COLOR_TOTAL_AVG_DURATION}
              name={dataKeyTotalAvgDur}
              shape={<CustomDash />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
