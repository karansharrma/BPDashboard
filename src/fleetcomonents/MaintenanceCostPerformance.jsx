// src/components/MaintenanceCostPerformance.js
import React from "react";
import StatBox from "./StatBox";
import GaugeChart from "../chartcomponents/GaugeChart";

const MaintenanceCostPerformance = () => (
  <div className="p-5 border-b border-gray-200 bg-white">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">
      Maintenance Cost Performance
    </h2>
    <div className="flex flex-wrap justify-between items-start">
      <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-0 gap-5">
        <GaugeChart
          value={101}
          maxValue={110}
          size={110}
          strokeWidth={14}
          color="#ef4444" // Red-500
          description="Indicates the $ of budget that has been consumed during the period selected."
        />
        <GaugeChart
          value={1}
          maxValue={110}
          size={110}
          strokeWidth={14}
          color="#9ca3af" // Gray-400
          className="mt-4 sm:mt-0 sm:ml-4"
          description="Indicates the % of budget consumed in the current month / fiscal period."
        />
      </div>

      <div className="flex flex-col w-full sm:w-auto  sm:mt-0">
        <div className="flex flex-wrap justify-center sm:justify-end">
          <StatBox label="WIP Accrual Cost" value="$626,537" smallLabel />
          <StatBox label="Spend" value="$97,409,438" smallLabel />
          <StatBox
            label="Variance"
            value="$657,470"
            valueClassName="text-red-500"
            smallLabel
          />
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end mt-0 sm:mt-2">
          <div className="min-w-[120px] m-1 p-2 px-4"></div>{" "}
          <StatBox label="Budget" value="$96,751,967" smallLabel />
          <StatBox
            label="Spend / Budget"
            value="101%"
            valueClassName="text-red-500"
            smallLabel
          />
        </div>
      </div>
    </div>
  </div>
);

export default MaintenanceCostPerformance;
