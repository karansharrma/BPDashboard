import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./othercomponents/NavBar";
import Sidebar from "./othercomponents/SideBar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      className=" overflow-hidden"
    >
      <Navbar onToggleSidebar={toggleSidebar} />
      <div style={{ display: "flex", flexGrow: 1, paddingTop: "60px" }}>
        <Sidebar isOpen={isSidebarOpen} />
        <main
          style={{
            flexGrow: 1,
            padding: "2rem",
            marginLeft: isSidebarOpen ? "260px" : "0px",
            transition: "margin-left 0.3s ease-in-out",
            backgroundColor: "#f3f4f6",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
