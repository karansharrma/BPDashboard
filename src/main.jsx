import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleSheetProvider } from "./context/GoogleSheetContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleSheetProvider>
      <App />
    </GoogleSheetProvider>
  </StrictMode>
);
