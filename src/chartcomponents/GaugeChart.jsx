import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function GaugeChart({
  title = "title hai ye",
  progress = 70,
  color = "green",
  minValue = 0,
  maxValue = 100,
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const canvasId = useRef(
    `gauge-canvas-${Math.random().toString(36).substr(2, 9)}`
  );

  const normalizedProgress = Math.min(Math.max(progress, minValue), maxValue);
  const progressPercentage = Math.round(
    ((normalizedProgress - minValue) / (maxValue - minValue)) * 100
  );

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const ctx = document.getElementById(canvasId.current).getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Progress", "Remaining"],
        datasets: [
          {
            data: [progressPercentage, 100 - progressPercentage],
            backgroundColor: [color, "#f5f5f5"],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "90%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        animation: {
          animateRotate: true,
          animateScale: false,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [progress, minValue, maxValue, progressPercentage, color]);

  return (
    <div className="relative border border-amber-100 bg-amber-50 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="flex items-start justify-start">
        <h2 className="text-1xl font-medium text-gray-800">{title}</h2>
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <canvas id={canvasId.current} className="w-full h-full"></canvas>
          <div className="absolute inset-0 flex items-center justify-center mt-16">
            <p className="text-4xl font-bold text-gray-800">
              {progressPercentage}%
            </p>
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-between mt-0">
            <h2 className="text-black text-2xl font-medium">0%</h2>
            <h2 className="text-black text-2xl font-medium">100%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GaugeChart;
