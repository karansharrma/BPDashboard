import {
  MapPin,
  Navigation,
  Gauge,
  Clock,
  Thermometer,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { sampleTruckData } from "../data/sampleTruckdata";

const TruckGrid = ({ trucks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Delayed":
        return "bg-yellow-500";
      case "Inactive":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "Delayed":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "Inactive":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getFuelColor = (fuel) => {
    if (fuel >= 70) return "from-green-400 to-green-600";
    if (fuel >= 30) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const getBatteryColor = (battery) => {
    if (battery >= 70) return "text-green-400";
    if (battery >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {trucks.map((truck, index) => (
        <div
          key={truck.id}
          className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl opacity-0 animate-[slideInUp_0.6s_ease-out_forwards] relative overflow-hidden"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full ${getStatusColor(
                  truck.status
                )} animate-pulse shadow-lg`}
              ></div>
              <h3 className="text-xl font-bold text-white font-mono">
                {truck.id}
              </h3>
            </div>
            <div className="bg-slate-700/50 p-2 rounded-lg">
              {getStatusIcon(truck.status)}
            </div>
          </div>

          {/* Driver Info */}
          <div className="mb-4 relative z-10">
            <p className="text-slate-400 text-sm font-medium">Driver</p>
            <p className="text-white font-semibold text-lg">{truck.driver}</p>
          </div>

          {/* Status Badge */}
          <div className="mb-4 relative z-10">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${getStatusColor(
                truck.status
              )} shadow-lg`}
            >
              {truck.status}
            </span>
          </div>

          {/* Location Info */}
          <div className="space-y-3 mb-4 relative z-10">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-400 text-xs font-medium">
                  Current Location
                </p>
                <p className="text-white text-sm truncate">{truck.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Navigation className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-400 text-xs font-medium">
                  Destination
                </p>
                <p className="text-white text-sm truncate">
                  {truck.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <p className="text-slate-400 text-xs font-medium mb-1">
                Fuel Level
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 bg-gradient-to-r ${getFuelColor(
                      truck.fuel
                    )}`}
                    style={{ width: `${truck.fuel}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm font-bold">
                  {truck.fuel}%
                </span>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-3">
              <p className="text-slate-400 text-xs font-medium mb-1">Speed</p>
              <div className="flex items-center space-x-1">
                <Gauge className="w-4 h-4 text-blue-400" />
                <span className="text-white font-bold">{truck.speed}</span>
                <span className="text-slate-400 text-xs">mph</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2 text-xs relative z-10">
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-slate-400">
                <Clock className="w-3 h-3" />
                <span>Updated: {truck.lastUpdate}</span>
              </div>
              <div className="flex items-center space-x-1 text-slate-400">
                <Thermometer className="w-3 h-3" />
                <span>{truck.temperature}°C</span>
              </div>
            </div> */}

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                ETA:{" "}
                <span className="text-white font-semibold">{truck.eta}</span>
              </span>
              <span
                className={`font-semibold ${getBatteryColor(
                  truck.batteryHealth
                )}`}
              >
                {truck.batteryHealth}% health
              </span>
            </div>

            <div className="text-slate-400">
              Cargo:{" "}
              <span className="text-white font-medium">{truck.cargo}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TruckGrid;
