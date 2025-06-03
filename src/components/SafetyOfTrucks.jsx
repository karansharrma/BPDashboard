import React, { useState } from "react";
import {
  AlertTriangle,
  Wrench,
  Calendar,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Define a type for a single truck (optional but good practice for TypeScript)
// interface TruckData {
//   id: string;
//   model: string;
//   licensePlate: string;
//   status: 'critical' | 'warning' | 'good';
//   issues: string[];
//   lastInspection: string;
//   nextService: string;
//   mileage: number;
//   priority: 'High' | 'Medium' | 'Low';
// }

// Define a type for the props (optional but good practice for TypeScript)
// interface SafetyOfTrucksProps {
//   trucks: TruckData[];
// }

const SafetyOfTrucks = ({ trucks = sampleTruckData }) => {
  // Destructure trucks from props, provide default empty array
  const [selectedTruck, setSelectedTruck] = useState(null);

  // Sample truck data is now expected from props
  // const trucks = [ ... ]; // REMOVED

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 border-red-500 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-800";
      case "good":
        return "bg-green-100 border-green-500 text-green-800";
      default:
        return "bg-gray-100 border-gray-500 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Truck className="w-5 h-5 text-gray-600" />;
    }
  };

  const trucksNeedingRepair = trucks.filter((truck) => truck.status !== "good");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Safety of Trucks
          </h1>
          <p className="text-gray-600">
            Monitor truck safety status and repair requirements
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Trucks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {trucks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Critical Issues
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {trucks.filter((t) => t.status === "critical").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {trucks.filter((t) => t.status === "warning").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Wrench className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Need Repair</p>
                <p className="text-2xl font-bold text-orange-600">
                  {trucksNeedingRepair.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trucks Needing Repair Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-orange-600" />
              Trucks Requiring Immediate Attention
            </h2>
          </div>

          <div className="p-6">
            {trucksNeedingRepair.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg text-gray-600">
                  All trucks are in good condition!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trucksNeedingRepair.map((truck) => (
                  <div
                    key={truck.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getStatusColor(
                      truck.status
                    )}`}
                    onClick={() => setSelectedTruck(truck)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        {getStatusIcon(truck.status)}
                        <div className="ml-3">
                          <h3 className="font-semibold text-lg">
                            {truck.model}
                          </h3>
                          <p className="text-sm opacity-75">
                            {truck.licensePlate} • {truck.id}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          truck.priority === "High"
                            ? "bg-red-200 text-red-800"
                            : truck.priority === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {truck.priority} Priority
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Issues:</p>
                      <ul className="text-sm space-y-1">
                        {truck.issues.map((issue, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-current rounded-full mr-2 opacity-60"></span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between text-sm opacity-75">
                      <span>Mileage: {truck.mileage.toLocaleString()} km</span>
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
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              All Trucks Overview
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Truck Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Service
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trucks.map((truck) => (
                  <tr key={truck.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Truck className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {truck.model}
                          </div>
                          <div className="text-sm text-gray-500">
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
                      <div className="text-sm text-gray-900">
                        {truck.issues.length === 0 ? (
                          <span className="text-green-600">No issues</span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.mileage.toLocaleString()} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] sm:max-h-96 overflow-y-auto">
              {" "}
              {/* Adjusted max-h for responsiveness */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    {selectedTruck.model} Details
                  </h3>
                  <button
                    onClick={() => setSelectedTruck(null)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Close modal" // Accessibility
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {" "}
                  {/* Responsive grid */}
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      License Plate
                    </p>
                    <p className="text-lg">{selectedTruck.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Truck ID
                    </p>
                    <p className="text-lg">{selectedTruck.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Current Mileage
                    </p>
                    <p className="text-lg">
                      {selectedTruck.mileage.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Priority Level
                    </p>
                    <p className="text-lg">{selectedTruck.priority}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Current Issues
                  </p>
                  {selectedTruck.issues.length === 0 ? (
                    <p className="text-green-600">No issues reported</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedTruck.issues.map((issue, index) => (
                        <li
                          key={index}
                          className="flex items-start text-red-600"
                        >
                          {" "}
                          {/* items-start for long issues */}
                          <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-1" />{" "}
                          {/* flex-shrink-0 and mt-1 for alignment */}
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {" "}
                  {/* Responsive grid */}
                  <div>
                    <p className="font-medium text-gray-600">Last Inspection</p>
                    <p>{selectedTruck.lastInspection}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">
                      Next Service Due
                    </p>
                    <p>{selectedTruck.nextService}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedTruck(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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
// export default App;
