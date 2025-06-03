import React, { useState, useEffect } from "react";
import {
  Truck,
  MapPin,
  Clock,
  Fuel,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Navigation,
  Thermometer,
  Gauge,
  Search,
  RefreshCw,
} from "lucide-react";
import TruckGrid from "../TruckComponents/TruckGrid";

const AllTrucks = ({ trucks = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedTrucks, setAnimatedTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("id");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Enhanced sample data with more realistic information
  const defaultTrucks = [
    {
      id: "TRK-001",
      driver: "John Smith",
      status: "En Route",
      location: "Highway 101, CA",
      destination: "Los Angeles, CA",
      fuel: 75,
      speed: 65,
      temperature: 22,
      cargo: "Electronics",
      eta: "2h 45m",
      mileage: 234.5,
      batteryHealth: 98,
    },
    {
      id: "TRK-002",
      driver: "Sarah Johnson",
      status: "Delivered",
      location: "Seattle, WA",
      destination: "Portland, OR",
      fuel: 45,
      speed: 0,
      temperature: 18,
      cargo: "Food Supplies",
      eta: "Completed",
      mileage: 456.2,
      batteryHealth: 95,
    },
    {
      id: "TRK-003",
      driver: "Mike Chen",
      status: "Loading",
      location: "Denver, CO",
      destination: "Phoenix, AZ",
      fuel: 90,
      speed: 0,
      temperature: 25,
      cargo: "Manufacturing Parts",
      eta: "Loading...",
      mileage: 123.7,
      batteryHealth: 92,
    },
    {
      id: "TRK-004",
      driver: "Emma Davis",
      status: "Maintenance",
      location: "Houston, TX",
      destination: "Dallas, TX",
      fuel: 30,
      speed: 0,
      temperature: 28,
      cargo: "Medical Supplies",
      eta: "In Service",
      mileage: 678.9,
      batteryHealth: 87,
    },
    {
      id: "TRK-005",
      driver: "Robert Wilson",
      status: "In Route",
      location: "Interstate 75, FL",
      destination: "Miami, FL",
      fuel: 60,
      speed: 70,
      temperature: 30,
      cargo: "Consumer Goods",
      eta: "1h 20m",
      mileage: 345.1,
      batteryHealth: 94,
    },
    {
      id: "TRK-006",
      driver: "Lisa Garcia",
      status: "Rest Break",
      location: "Rest Area, NV",
      destination: "Las Vegas, NV",
      fuel: 55,
      speed: 0,
      temperature: 35,
      cargo: "Furniture",
      eta: "3h 15m",
      mileage: 567.3,
      batteryHealth: 89,
    },
  ];

  const trucksData = trucks.length > 0 ? trucks : defaultTrucks;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setAnimatedTrucks([]);
    const filteredTrucks = getFilteredTrucks();
    filteredTrucks.forEach((truck, index) => {
      setTimeout(() => {
        setAnimatedTrucks((prev) => [...prev, truck]);
      }, index * 150);
    });
  }, [trucksData, searchTerm, statusFilter, sortBy]);

  const getFilteredTrucks = () => {
    let filtered = trucksData.filter(
      (truck) =>
        truck.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "All") {
      filtered = filtered.filter((truck) => truck.status === statusFilter);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "fuel":
          return b.fuel - a.fuel;
        case "speed":
          return b.speed - a.speed;
        case "driver":
          return a.driver.localeCompare(b.driver);
        default:
          return a.id.localeCompare(b.id);
      }
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  const getTotalStats = () => {
    const filtered = getFilteredTrucks();
    const total = filtered.length;
    const enRoute = filtered.filter((t) => t.status === "In Route").length;
    const delivered = filtered.filter((t) => t.status === "Delivered").length;
    const maintenance = filtered.filter(
      (t) => t.status === "Maintenance"
    ).length;
    const avgFuel = filtered.reduce((sum, t) => sum + t.fuel, 0) / total || 0;

    return { total, enRoute, delivered, maintenance, avgFuel };
  };

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
              Fleet Command Center
            </h1>
          </div>
          <div className="text-right opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            <div className="text-2xl font-bold text-white font-mono">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-slate-400">
              {currentTime.toLocaleDateString()}
            </div>
            <button
              onClick={handleRefresh}
              className="mt-2 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-300"
            >
              <RefreshCw
                className={`w-4 h-4 text-slate-300 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 opacity-0 animate-[slideInLeft_0.8s_ease-out_0.6s_forwards]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search trucks, drivers, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors duration-300"
          >
            <option value="All">All Status</option>
            <option value="In Route">In Route</option>
            <option value="Delivered">Delivered</option>
            <option value="Loading">Loading</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Rest Break">Rest Break</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors duration-300"
          >
            <option value="id">Sort by ID</option>
            <option value="driver">Sort by Driver</option>
            <option value="fuel">Sort by Fuel</option>
            <option value="speed">Sort by Speed</option>
          </select>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl opacity-0 animate-[slideInLeft_0.8s_ease-out_0.8s_forwards]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Fleet
                </p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-slate-500 mt-1">Active vehicles</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl opacity-0 animate-[slideInLeft_0.8s_ease-out_1s_forwards]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">In Route</p>
                <p className="text-3xl font-bold text-blue-400">
                  {stats.enRoute}
                </p>
                <p className="text-xs text-slate-500 mt-1">Moving now</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Navigation className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl opacity-0 animate-[slideInLeft_0.8s_ease-out_1.2s_forwards]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Delivered</p>
                <p className="text-3xl font-bold text-green-400">
                  {stats.delivered}
                </p>
                <p className="text-xs text-slate-500 mt-1">Completed</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl opacity-0 animate-[slideInLeft_0.8s_ease-out_1.4s_forwards]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Maintenance
                </p>
                <p className="text-3xl font-bold text-red-400">
                  {stats.maintenance}
                </p>
                <p className="text-xs text-slate-500 mt-1">Need service</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl opacity-0 animate-[slideInLeft_0.8s_ease-out_1.6s_forwards]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Avg Fuel</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {Math.round(stats.avgFuel)}%
                </p>
                <p className="text-xs text-slate-500 mt-1">Fleet average</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-xl">
                <Fuel className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
        <TruckGrid trucks={defaultTrucks} />
      </div>

      {/* Enhanced Trucks Grid */}

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AllTrucks;
