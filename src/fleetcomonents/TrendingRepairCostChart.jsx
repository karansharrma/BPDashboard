import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendingRepairCostChart = () => {
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let labels = ["(Blank)"];
  labels = labels.concat(monthAbbreviations.slice(3)); // 2016 (Apr-Dec)
  labels = labels.concat(monthAbbreviations); // 2017 (Jan-Dec)
  labels = labels.concat(monthAbbreviations); // 2018 (Jan-Dec)
  labels = labels.concat(monthAbbreviations.slice(0, 2));

  let dataPoints = [52];
  dataPoints.push(1);

  const remainingPointsCount = labels.length - 2;
  for (let i = 0; i < remainingPointsCount; i++) {
    dataPoints.push(0.5 + Math.random() * 0.1);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Repair Cost",
        data: dataPoints,
        borderColor: "white",
        backgroundColor: "white", // gray-600 with alpha
        tension: 0,
        pointRadius: 0,
        pointHitRadius: 10,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Trending Repair Cost",
        align: "start",
        padding: {
          top: 10,
          bottom: 25,
        },
        font: {
          size: 18,
          weight: "normal",
          family: "sans-serif",
        },
        color: "#374151",
      },
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y.toFixed(1)}M`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 55,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return "$" + value + "M";
          },
          color: "#4B5563",
          font: {
            family: "sans-serif",
          },
        },
        grid: {
          color: "rgba(209, 213, 219, 0.5)",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#4B5563",
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
            family: "sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 0,
        bottom: 5,
      },
    },
  };

  const yearLabelConfig = [
    { label: "", span: 1, isPlaceholder: true },
    { label: "2016", span: 9 },
    { label: "2017", span: 12 },
    { label: "2018", span: 12 },
    { label: "2019", span: 2 },
  ];

  return (
    <div className="flex justify-center pt- pb-2">
      <div className="w-[900px] h-[450px] bg-white border border-gray-200 p-5 box-border font-sans justify-center align-center">
        <div className="h-[calc(100%-30px)]">
          <Line data={data} options={options} />
        </div>
        <div className="flex mt-2 border-t border-gray-300 pt-1 pl-[50px]">
          {yearLabelConfig.map((config, index) => (
            <div
              key={index}
              style={{ flexGrow: config.span }}
              className={`basis-0 text-xs text-gray-600 ${
                config.isPlaceholder ? "text-left" : "text-center"
              } ${
                !config.isPlaceholder && index > 0
                  ? "border-l border-gray-300 pl-1"
                  : ""
              }`}
            >
              {!config.isPlaceholder ? config.label : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingRepairCostChart;
