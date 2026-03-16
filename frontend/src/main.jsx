import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { AnalysisProvider } from "./context/AnalysisContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnalysisProvider>
      <Router />
    </AnalysisProvider>
  </React.StrictMode>
);
