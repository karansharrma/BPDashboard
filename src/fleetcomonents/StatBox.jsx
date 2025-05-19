// src/components/StatBox.js
import React from "react";

const StatBox = ({
  label,
  value,
  valueClassName = "text-gray-800",
  smallLabel = false,
  subLabel = null,
  className = "",
}) => (
  <div
    className={`border border-gray-300 rounded bg-white text-center min-w-[150px] m-1 ${
      smallLabel ? "p-2 px-4" : "p-4 px-5"
    } ${className}`}
  >
    <div className={`mb-1 ${smallLabel ? "text-xs" : "text-sm"} text-gray-600`}>
      {label}
    </div>
    <div
      className={`font-bold ${
        smallLabel ? "text-xl" : "text-2xl"
      } ${valueClassName}`}
    >
      {value}
    </div>
    {subLabel && <div className="text-xs text-gray-500 mt-0.5">{subLabel}</div>}
  </div>
);

export default StatBox;
