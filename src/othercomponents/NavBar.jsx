import React from "react";
import { FaBars } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { useGoogleSheet } from "../context/GoogleSheetContext"; // 👈 Import context hook

const Navbar = ({ onToggleSidebar }) => {
  const { isLoading, refresh } = useGoogleSheet(); // 👈 Use context data + refresh function

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        backgroundColor: "#1f2937",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaBars
          onClick={onToggleSidebar}
          style={{
            cursor: "pointer",
            marginRight: "1.5rem",
            fontSize: "1.5rem",
            color: "#9ca3af",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e5e7eb")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
        />
        <h1 style={{ fontSize: "1.75rem", margin: 0, fontWeight: "600" }}>
          Fleet Dashboard
        </h1>
      </div>

      <div>
        <button
          onClick={refresh} // 👈 Call real fetch function
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: isLoading ? "wait" : "pointer",
            opacity: isLoading ? "0.8" : "1",
          }}
          disabled={isLoading}
        >
          <FiRefreshCw
            style={{
              marginRight: "0.25rem",
              fontSize: "1rem",
              animation: isLoading ? "spin 1s linear infinite" : "none",
            }}
          />
          {isLoading ? "Loading..." : "Load from Sheets"}
        </button>
      </div>
    </nav>
  );
};

// Inject CSS animation
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default Navbar;
