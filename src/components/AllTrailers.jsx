import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  Circle,
  Settings,
  Filter,
  Search,
  Plus,
} from "lucide-react";

const AllTrailers = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  // Sample trailer data
  const trailers = [
    {
      id: "TRL-001",
      type: "Dry Van",
      status: "in-transit",
      driver: "John Mitchell",
      route: "Chicago → Dallas",
      cargo: "Electronics",
      capacity: "48ft / 53ft",
      weight: "24,500 lbs",
      maxWeight: "80,000 lbs",
      location: "Kansas City, MO",
      eta: "2h 45m",
      progress: 65,
      temperature: null,
      lastUpdate: "15 min ago",
    },
    {
      id: "TRL-002",
      type: "Refrigerated",
      status: "loading",
      driver: "Sarah Johnson",
      route: "Miami → Atlanta",
      cargo: "Fresh Produce",
      capacity: "48ft / 53ft",
      weight: "31,200 lbs",
      maxWeight: "80,000 lbs",
      location: "Miami Port, FL",
      eta: "6h 30m",
      progress: 5,
      temperature: "34°F",
      lastUpdate: "3 min ago",
    },
    {
      id: "TRL-003",
      type: "Flatbed",
      status: "delivered",
      driver: "Mike Rodriguez",
      route: "Houston → Phoenix",
      cargo: "Steel Beams",
      capacity: "48ft / 53ft",
      weight: "45,800 lbs",
      maxWeight: "80,000 lbs",
      location: "Phoenix, AZ",
      eta: "Delivered",
      progress: 100,
      temperature: null,
      lastUpdate: "1 hour ago",
    },
    {
      id: "TRL-004",
      type: "Tanker",
      status: "maintenance",
      driver: "Not Assigned",
      route: "N/A",
      cargo: "Available",
      capacity: "7,500 gal",
      weight: "0 lbs",
      maxWeight: "80,000 lbs",
      location: "Depot - Denver, CO",
      eta: "N/A",
      progress: 0,
      temperature: null,
      lastUpdate: "2 hours ago",
    },
    {
      id: "TRL-005",
      type: "Dry Van",
      status: "delayed",
      driver: "Tom Wilson",
      route: "Seattle → Portland",
      cargo: "Furniture",
      capacity: "48ft / 53ft",
      weight: "28,900 lbs",
      maxWeight: "80,000 lbs",
      location: "Olympia, WA",
      eta: "4h 20m (Delayed)",
      progress: 45,
      temperature: null,
      lastUpdate: "8 min ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "in-transit":
        return "bg-blue-900/30 text-blue-300 border-blue-700";
      case "loading":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-700";
      case "delivered":
        return "bg-green-900/30 text-green-300 border-green-700";
      case "maintenance":
        return "bg-gray-700/50 text-gray-300 border-gray-600";
      case "delayed":
        return "bg-red-900/30 text-red-300 border-red-700";
      default:
        return "bg-gray-700/50 text-gray-300 border-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "in-transit":
        return <Truck className="w-4 h-4" />;
      case "loading":
        return <Package className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "maintenance":
        return <Settings className="w-4 h-4" />;
      case "delayed":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const filteredTrailers = trailers.filter((trailer) => {
    const matchesFilter =
      selectedFilter === "all" || trailer.status === selectedFilter;
    const matchesSearch =
      trailer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trailer.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trailer.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: trailers.length,
    inTransit: trailers.filter((t) => t.status === "in-transit").length,
    delivered: trailers.filter((t) => t.status === "delivered").length,
    delayed: trailers.filter((t) => t.status === "delayed").length,
    maintenance: trailers.filter((t) => t.status === "maintenance").length,
  };

  return (
    <div className="p-6 bg-gradient-to-br border-xl from-gray-900 to-slate-900 min-h-screen rounded-2xl">
      {/* Header */}
      <div className="mb-8 justify-center align-middle">
        <h1 className="text-3xl font-bold text-white mb-2">Truck Trailers</h1>
        <p className="text-gray-300">
          Monitor and manage your fleet of trailers in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Trailers</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Truck className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">In Transit</p>
              <p className="text-2xl font-bold text-blue-400">
                {stats.inTransit}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-900/30 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Delivered</p>
              <p className="text-2xl font-bold text-green-400">
                {stats.delivered}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Delayed</p>
              <p className="text-2xl font-bold text-red-400">{stats.delayed}</p>
            </div>
            <div className="w-8 h-8 bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Maintenance</p>
              <p className="text-2xl font-bold text-gray-400">
                {stats.maintenance}
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-gray-800 to-slate-800 p-4 rounded-xl shadow-lg border border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trailers..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="bg-gray-700 border border-gray-600 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="in-transit">In Transit</option>
                <option value="loading">Loading</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Trailer
          </button>
        </div>
      </div>

      {/* Trailers Grid - Rectangle Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrailers.map((trailer) => (
          <div
            key={trailer.id}
            className="bg-gradient-to-r from-gray-800 to-slate-800 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-gray-600"
          >
            {/* Rectangular Trailer Card */}
            <div className="p-6">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">
                      {trailer.id}
                    </h3>
                    <p className="text-gray-300">{trailer.type}</p>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                    trailer.status
                  )}`}
                >
                  {getStatusIcon(trailer.status)}
                  {trailer.status
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </div>
              </div>

              {/* Main Content Row */}
              <div className="grid grid-cols-1 gap-4">
                {/* Driver & Route Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Driver</p>
                    <p className="text-white font-medium">{trailer.driver}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Route</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">
                        {trailer.route}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cargo & Weight Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Cargo</p>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">
                        {trailer.cargo}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Weight</p>
                    <p className="text-white font-medium">{trailer.weight}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (parseInt(trailer.weight.replace(/,/g, "")) /
                              80000) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Location & ETA Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Current Location
                    </p>
                    <p className="text-white font-medium">{trailer.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">ETA</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">
                        {trailer.eta}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar (for in-transit trailers) */}
              {trailer.status === "in-transit" && (
                <div className="mt-4 p-3 bg-gray-700/50 rounded-xl">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Trip Progress</span>
                    <span>{trailer.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${trailer.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Temperature (for refrigerated) */}
              {trailer.temperature && (
                <div className="mt-4 p-3 bg-blue-900/30 rounded-xl border border-blue-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-300">
                      Temperature Monitor
                    </span>
                    <span className="text-xl font-bold text-blue-400">
                      {trailer.temperature}
                    </span>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Updated {trailer.lastUpdate}</span>
                </div>
                <button
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  onClick={() => setSelectedTrailer(trailer)}
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTrailers.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            No trailers found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTrailer && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {selectedTrailer.id} Details
                </h2>
                <button
                  onClick={() => setSelectedTrailer(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="font-medium text-white">
                      {selectedTrailer.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Capacity</p>
                    <p className="font-medium text-white">
                      {selectedTrailer.capacity}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Location</p>
                  <p className="font-medium text-white">
                    {selectedTrailer.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Route</p>
                  <p className="font-medium text-white">
                    {selectedTrailer.route}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrailers;
