import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AllTrucks from "./components/AllTrucks";
import AllTrailers from "./components/AllTrailers";
import AnnualBudget from "./components/AnnualBudget";
import Expiry from "./components/Expiry";
import Repair from "./components/Repair";
import SafetyOfTrucks from "./components/SafetyOfTrucks";
import Dashboard from "./components/DashBoard";
import DashboardLayout from "./DashBoardLayout";
import FleetOverview from "./components/FleetOverview";
import Odometer from "./chartcomponents/Odometer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vehicles" element={<AllTrucks />} />
          <Route path="trailer" element={<AllTrailers />} />
          <Route path="AnnualBudget" element={<AnnualBudget />} />
          <Route path="Expiry" element={<Expiry />} />
          {/* <Route path="Repair" element={<Repair />} /> */}
          <Route path="maintenance" element={<SafetyOfTrucks />} />
          <Route path="fleetProfile" element={<FleetOverview />} />

          {/* <Route path="gauge" element={<GaugeChart />} />
          <Route path="pie" element={<PieChartComponent />} /> */}
          {/* <Route path="bar" element={<BarChartComponent />} /> */}
        </Route>
        {/* Routes without the layout can go here, if any */}
      </Routes>
    </Router>
  );
}
export default App;
