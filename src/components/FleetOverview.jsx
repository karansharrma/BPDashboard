// src/components/FleetOverview.js
import React from "react";
import StatBox from "../fleetcomonents/StatBox";
import PreventiveMaintenance from "../fleetcomonents/PreventiveMaintenance";
import MaintenanceCostTrending from "../fleetcomonents/MaintenanceCostTrending";
import MaintenanceCostPerformance from "../fleetcomonents/MaintenanceCostPerformance";
import TrendingRepairCostChart from "../fleetcomonents/TrendingRepairCostChart";

const PlaceholderIcon1 = () => (
  <span className="text-gray-600 hover:text-indigo-600 cursor-pointer text-3xl">
    ❐
  </span>
);
const PlaceholderIcon2 = () => (
  <span className="text-gray-600 hover:text-indigo-600 cursor-pointer text-3xl">
    ⎚
  </span>
);

const FleetOverview = () => (
  <>
    <div className="font-sans p-2 bg-white">
      <h2 className="text-xl font-semibold text-center  text-gray-700">
        Fleet Profile
      </h2>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <StatBox label="Assets" value="9,096" className="mr-2" />
        <StatBox label="Avg Model Year" value="2016" />
        <StatBox label="Avg Assets(In Years)" value="9" />
        <StatBox label="Manufacturers" value="50" />
      </div>
    </div>
    <div className="font-sans max-w-7xl mx-auto my-8 shadow-xl rounded-lg overflow-hidden bg-gray-50">
      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex space-x-3 items-center">
          <PlaceholderIcon1 />
          <PlaceholderIcon2 />
          <div className="text-2xl text-gray-700 font-medium hidden sm:block">
            Fleet
          </div>
        </div>
      </div>
      <PreventiveMaintenance />
      <MaintenanceCostPerformance />
      <MaintenanceCostTrending />
    </div>
  </>
);

export default FleetOverview;
