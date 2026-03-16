import React, { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export function AnalysisProvider({ children }) {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within AnalysisProvider");
  }
  return context;
}
