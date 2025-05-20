import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "In Transit", value: 400 },
  { name: "Delivered", value: 300 },
  { name: "Processing", value: 200 },
  { name: "Delayed", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF5A5F"];

const LABELS = [
  { name: "Delivered", color: "#00C49F" },
  { name: "In Transit", color: "#0088FE" },
  { name: "Delayed", color: "#FF5A5F" },
  { name: "Processing", color: "#FFBB28" },
];

function PieChartComponent() {
  return (
    <div className="border border-amber-100 bg-amber-50 h-[400px] rounded-lg shadow-lg pt-6 h-[600] px-6 pb-4 hover:shadow-2xl transition-shadow duration-300 overflow-hidden mx-auto w-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Cost Breakdown</h3>
        <span className="text-xs text-gray-500 border px-2 py-1 rounded">
          June 1 - June 30, 2023
        </span>
      </div>

      <div className="flex items-center">
        <div>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="ml-8">
          {LABELS.map((item, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <span
                className="w-3 h-3 rounded-full inline-block mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-700 text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PieChartComponent;
