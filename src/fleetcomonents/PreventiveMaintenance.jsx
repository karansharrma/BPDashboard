// src/components/PreventiveMaintenance.js
import React from "react";
import GaugeChart from "../chartcomponents/GaugeChart";
import StatBox from "./StatBox";

const PreventiveMaintenance = () => (
  <div className="p-5 border-t border-b border-gray-200 bg-white">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">
      Preventive Maintenance
    </h2>
    <div className="flex flex-wrap items-start">
      <GaugeChart
        value={43}
        maxValue={100}
        size={140}
        strokeWidth={18}
        color="#ef4444"
      />
      <div className="flex flex-wrap ml-0 md:ml-5 mt-4 md:mt-0 items-center">
        <StatBox
          label="Overdue Units"
          value="3,756"
          valueClassName="text-red-500"
        />
        <StatBox
          label="Compliant Units"
          value="2,866"
          valueClassName="text-green-500"
        />
        <StatBox label="Total Units" value="6,622" />
        <StatBox
          label="Units Due this Month"
          value="800"
          valueClassName="text-amber-500"
          className="border-amber-500 border-2"
        />
      </div>
    </div>
  </div>
);

export default PreventiveMaintenance;
