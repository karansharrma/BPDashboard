import React, { useState } from "react";
import {
  AlertTriangle,
  Wrench,
  Calendar,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const SafetyOfTrucks = ({ trucks = sampleTruckData }) => {
  const [selectedTruck, setSelectedTruck] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-900/20 border-red-500/50 text-red-300";
      case "warning":
        return "bg-yellow-900/20 border-yellow-500/50 text-yellow-300";
      case "good":
        return "bg-emerald-900/20 border-emerald-500/50 text-emerald-300";
      default:
        return "bg-gray-800 border-gray-600 text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "good":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      default:
        return <Truck className="w-5 h-5 text-gray-400" />;
    }
  };

  const trucksNeedingRepair = trucks.filter((truck) => truck.status !== "good");

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 rounded-xl shadow-md border border-gray-200"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="min-h-screen p-6">
        <div className="  mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Safety of Trucks
            </h1>
            <p className="text-gray-300">
              Monitor truck safety status and repair requirements
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-blue-900/30 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">
                    Total Trucks
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {trucks.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-red-900/30 rounded-lg">
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">
                    Critical Issues
                  </p>
                  <p className="text-2xl font-bold text-red-400">
                    {trucks.filter((t) => t.status === "critical").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-900/30 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {trucks.filter((t) => t.status === "warning").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-orange-900/30 rounded-lg">
                  <Wrench className="w-8 h-8 text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">
                    Need Repair
                  </p>
                  <p className="text-2xl font-bold text-orange-400">
                    {trucksNeedingRepair.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trucks Needing Repair Section */}
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 mb-8">
            <div
              className="px-6 py-4 border-b border-gray-700 bg-gray-750"
              style={{ backgroundColor: "#1f2937" }}
            >
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-orange-400" />
                Trucks Requiring Immediate Attention
              </h2>
            </div>

            <div className="p-6">
              {trucksNeedingRepair.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-lg text-emerald-300">
                    All trucks are in good condition!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {trucksNeedingRepair.map((truck) => (
                    <div
                      key={truck.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg hover:bg-gray-750 ${getStatusColor(
                        truck.status
                      )}`}
                      onClick={() => setSelectedTruck(truck)}
                      style={{ backgroundColor: "#374151" }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          {getStatusIcon(truck.status)}
                          <div className="ml-3">
                            <h3 className="font-semibold text-lg text-white">
                              {truck.model}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {truck.licensePlate} • {truck.id}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            truck.priority === "High"
                              ? "bg-red-900/50 text-red-300 border border-red-500/30"
                              : truck.priority === "Medium"
                              ? "bg-yellow-900/50 text-yellow-300 border border-yellow-500/30"
                              : "bg-blue-900/50 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {truck.priority} Priority
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2 text-gray-300">
                          Issues:
                        </p>
                        <ul className="text-sm space-y-1">
                          {truck.issues.map((issue, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-400"
                            >
                              <span className="w-2 h-2 bg-current rounded-full mr-2 opacity-60"></span>
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between text-sm text-gray-400">
                        <span>
                          Mileage: {truck.mileage.toLocaleString()} km
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Next Service: {truck.nextService}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* All Trucks Table */}
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <div
              className="px-6 py-4 border-b border-gray-700"
              style={{ backgroundColor: "#1f2937" }}
            >
              <h2 className="text-xl font-semibold text-white">
                All Trucks Overview
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead
                  className="bg-gray-750"
                  style={{ backgroundColor: "#1f2937" }}
                >
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Truck Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Issues
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Mileage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Next Service
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {trucks.map((truck) => (
                    <tr
                      key={truck.id}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-700 rounded-lg mr-3">
                            <Truck className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {truck.model}
                            </div>
                            <div className="text-sm text-gray-400">
                              {truck.licensePlate} • {truck.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(truck.status)}
                          <span
                            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              truck.status
                            )}`}
                          >
                            {truck.status.charAt(0).toUpperCase() +
                              truck.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          {truck.issues.length === 0 ? (
                            <span className="text-emerald-400 font-medium">
                              No issues
                            </span>
                          ) : (
                            <div className="space-y-1">
                              {truck.issues.slice(0, 2).map((issue, index) => (
                                <div key={index} className="text-sm">
                                  {issue}
                                </div>
                              ))}
                              {truck.issues.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{truck.issues.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {truck.mileage.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {truck.nextService}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Modal */}
          {selectedTruck && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] sm:max-h-96 overflow-y-auto shadow-2xl border border-gray-600">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {selectedTruck.model} Details
                    </h3>
                    <button
                      onClick={() => setSelectedTruck(null)}
                      className="text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-full p-2 transition-colors"
                      aria-label="Close modal"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                      <p className="text-sm font-medium text-gray-300">
                        License Plate
                      </p>
                      <p className="text-lg text-white">
                        {selectedTruck.licensePlate}
                      </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                      <p className="text-sm font-medium text-gray-300">
                        Truck ID
                      </p>
                      <p className="text-lg text-white">{selectedTruck.id}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                      <p className="text-sm font-medium text-gray-300">
                        Current Mileage
                      </p>
                      <p className="text-lg text-white">
                        {selectedTruck.mileage.toLocaleString()} km
                      </p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                      <p className="text-sm font-medium text-gray-300">
                        Priority Level
                      </p>
                      <p className="text-lg text-white">
                        {selectedTruck.priority}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-300 mb-2">
                      Current Issues
                    </p>
                    {selectedTruck.issues.length === 0 ? (
                      <p className="text-emerald-400 font-medium">
                        No issues reported
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {selectedTruck.issues.map((issue, index) => (
                          <li
                            key={index}
                            className="flex items-start text-red-400"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-1" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div
                      className="bg-gray-750 p-3 rounded-lg border border-gray-600"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <p className="font-medium text-gray-300">
                        Last Inspection
                      </p>
                      <p className="text-gray-400">
                        {selectedTruck.lastInspection}
                      </p>
                    </div>
                    <div
                      className="bg-gray-750 p-3 rounded-lg border border-gray-600"
                      style={{ backgroundColor: "#374151" }}
                    >
                      <p className="font-medium text-gray-300">
                        Next Service Due
                      </p>
                      <p className="text-gray-400">
                        {selectedTruck.nextService}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="px-6 py-4 bg-gray-750 border-t border-gray-600 flex justify-end"
                  style={{ backgroundColor: "#1f2937" }}
                >
                  <button
                    onClick={() => setSelectedTruck(null)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyOfTrucks;

const sampleTruckData = [
  {
    id: "TR001",
    model: "Volvo FH16",
    licensePlate: "ABC-123",
    status: "critical",
    issues: ["Brake system failure", "Worn tires", "Engine oil leak"],
    lastInspection: "2024-11-15",
    nextService: "2025-01-15",
    mileage: 185000,
    priority: "High",
  },
  {
    id: "TR002",
    model: "Mercedes Actros",
    licensePlate: "DEF-456",
    status: "warning",
    issues: ["Transmission noise", "Headlight alignment"],
    lastInspection: "2024-12-01",
    nextService: "2025-02-01",
    mileage: 142000,
    priority: "Medium",
  },
  {
    id: "TR003",
    model: "Scania R450",
    licensePlate: "GHI-789",
    status: "critical",
    issues: [
      "Suspension problems",
      "Exhaust system leak",
      "Battery replacement needed",
    ],
    lastInspection: "2024-10-20",
    nextService: "2024-12-20",
    mileage: 220000,
    priority: "High",
  },
  {
    id: "TR004",
    model: "MAN TGX",
    licensePlate: "JKL-012",
    status: "good",
    issues: [],
    lastInspection: "2024-12-15",
    nextService: "2025-03-15",
    mileage: 95000,
    priority: "Low",
  },
  {
    id: "TR005",
    model: "DAF XF",
    licensePlate: "MNO-345",
    status: "warning",
    issues: ["Cooling system check needed", "Minor paint damage"],
    lastInspection: "2024-11-28",
    nextService: "2025-01-28",
    mileage: 167000,
    priority: "Medium",
  },
];
