import React, { useState } from "react";
import {
  Calendar,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
} from "lucide-react";

const Expiry = () => {
  const [trucks, setTrucks] = useState([
    {
      id: 1,
      plateNumber: "TRK-2024-001",
      model: "Volvo FH16",
      registrationExpiry: "2024-08-15",
      insuranceExpiry: "2024-07-22",
      inspectionExpiry: "2024-09-10",
      licenseExpiry: "2024-12-05",
    },
    {
      id: 2,
      plateNumber: "TRK-2024-002",
      model: "Mercedes Actros",
      registrationExpiry: "2024-06-30",
      insuranceExpiry: "2024-11-18",
      inspectionExpiry: "2024-08-25",
      licenseExpiry: "2025-01-15",
    },
    {
      id: 3,
      plateNumber: "TRK-2024-003",
      model: "Scania R500",
      registrationExpiry: "2024-10-12",
      insuranceExpiry: "2024-09-03",
      inspectionExpiry: "2024-07-08",
      licenseExpiry: "2024-11-28",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0)
      return { status: "expired", color: "text-red-400", bg: "bg-red-900/20" };
    if (days <= 7)
      return {
        status: "critical",
        color: "text-orange-400",
        bg: "bg-orange-900/20",
      };
    if (days <= 30)
      return {
        status: "warning",
        color: "text-yellow-400",
        bg: "bg-yellow-900/20",
      };
    return { status: "good", color: "text-green-400", bg: "bg-green-900/20" };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "expired":
        return <AlertTriangle className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "warning":
        return <Clock className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const filteredTrucks = trucks.filter(
    (truck) =>
      truck.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-gray-900 rounded-2xl m-0">
      <div className="w-full min-h-full p-6 max-w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3 min-w-0">
            <Truck className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
              Truck Expiries Dashboard
            </h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Truck</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search trucks by plate number or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            "Total Trucks",
            "Expired",
            "Critical (≤7 days)",
            "Warning (≤30 days)",
          ].map((title, index) => {
            const counts = [
              trucks.length,
              trucks.reduce((acc, truck) => {
                const expiries = [
                  truck.registrationExpiry,
                  truck.insuranceExpiry,
                  truck.inspectionExpiry,
                  truck.licenseExpiry,
                ];
                return (
                  acc +
                  expiries.filter((date) => getDaysUntilExpiry(date) < 0).length
                );
              }, 0),
              trucks.reduce((acc, truck) => {
                const expiries = [
                  truck.registrationExpiry,
                  truck.insuranceExpiry,
                  truck.inspectionExpiry,
                  truck.licenseExpiry,
                ];
                return (
                  acc +
                  expiries.filter(
                    (date) =>
                      getDaysUntilExpiry(date) >= 0 &&
                      getDaysUntilExpiry(date) <= 7
                  ).length
                );
              }, 0),
              trucks.reduce((acc, truck) => {
                const expiries = [
                  truck.registrationExpiry,
                  truck.insuranceExpiry,
                  truck.inspectionExpiry,
                  truck.licenseExpiry,
                ];
                return (
                  acc +
                  expiries.filter(
                    (date) =>
                      getDaysUntilExpiry(date) > 7 &&
                      getDaysUntilExpiry(date) <= 30
                  ).length
                );
              }, 0),
            ];

            return (
              <div
                key={title}
                className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 min-w-0"
              >
                <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-2 truncate">
                  {title}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {counts[index]}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trucks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pb-6">
          {filteredTrucks.map((truck) => (
            <div
              key={truck.id}
              className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-6 hover:bg-gray-750 transition-colors min-w-0"
            >
              <div className="flex items-center justify-between mb-4 min-w-0">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {truck.plateNumber}
                  </h3>
                  <p className="text-gray-400 truncate">{truck.model}</p>
                </div>
                <Truck className="w-6 h-6 text-gray-400 flex-shrink-0 ml-2" />
              </div>

              <div className="space-y-3">
                {[
                  { label: "Registration", date: truck.registrationExpiry },
                  { label: "Insurance", date: truck.insuranceExpiry },
                  { label: "Inspection", date: truck.inspectionExpiry },
                  { label: "License", date: truck.licenseExpiry },
                ].map((item) => {
                  const status = getExpiryStatus(item.date);
                  const daysLeft = getDaysUntilExpiry(item.date);

                  return (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between p-3 rounded-lg ${status.bg} min-w-0`}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className={status.color}>
                          {getStatusIcon(status.status)}
                        </span>
                        <span className="text-sm font-medium text-gray-300 truncate">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="text-sm text-white whitespace-nowrap">
                          {item.date}
                        </p>
                        <p
                          className={`text-xs ${status.color} whitespace-nowrap`}
                        >
                          {daysLeft < 0
                            ? `${Math.abs(daysLeft)} days overdue`
                            : `${daysLeft} days left`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredTrucks.length === 0 && (
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No trucks found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expiry;
