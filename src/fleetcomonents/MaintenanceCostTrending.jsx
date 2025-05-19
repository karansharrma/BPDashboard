// src/components/MaintenanceCostTrending.js
import React from "react";
import TrendingRepairCostChart from "./TrendingRepairCostChart";

const MaintenanceCostTrending = () => (
  <div className="p-5 bg-white h-[400] ">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">
      Maintenance Cost Trending
    </h2>

    <TrendingRepairCostChart />
  </div>
);

export default MaintenanceCostTrending;
