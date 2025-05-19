import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import {
  FaTachometerAlt,
  FaTruck,
  FaCaravan,
  FaClipboardList,
  FaCalendarAlt,
  FaWrench,
  FaFileInvoiceDollar,
  FaQuestionCircle,
} from "react-icons/fa";

const iconMap = {
  Dashboard: <FaTachometerAlt />,
  Vehicles: <FaTruck />,
  "All Trailer": <FaCaravan />,
  "Truck Expiries": <FaCalendarAlt />,
  "Truck Repair": <FaWrench />,
  "Annual Budget": <FaFileInvoiceDollar />,
  Maintenance: <FaClipboardList />,
  "Fleet Profile": <Truck />, // Lucide icon
};

const defaultIcon = <FaQuestionCircle />;

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      navigate(path, { replace: true });
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "All Trailer", path: "/trailer" },
    { name: "Truck Expiries", path: "/Expiry" },
    { name: "Truck Repair", path: "/Repair" },
    { name: "Annual Budget", path: "/AnnualBudget" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Fleet Profile", path: "/fleetProfile" },
  ];

  return (
    <aside
      className={`fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-gray-900 shadow-md z-[999] transition-all duration-300 ease-in-out pt-2 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      <ul
        className={`transition-opacity duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const baseClass =
            "flex items-center px-6 py-3 text-xl  text-gray-300 border-l-4 transition-colors duration-200 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis";
          const activeClass = "bg-gray-800 text-white border-cyan-400";
          const inactiveClass =
            "bg-transparent border-gray-900 hover:bg-gray-800 hover:text-white hover:border-cyan-400";

          return (
            <li
              key={index}
              className={`${baseClass} ${
                isActive ? activeClass : inactiveClass
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-3 text-lg w-5 flex-shrink-0 text-center">
                {iconMap[item.name] || defaultIcon}
              </span>
              {item.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
