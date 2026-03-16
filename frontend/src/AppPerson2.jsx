import { useState } from "react";

// ========================================
// 👤 PERSON 2: CHARTS/VISUALIZATION ONLY
// ========================================
import CommitsBarChart from "./components/charts/CommitsBarChart";
import ContributorPieChart from "./components/charts/ContributorPieChart";
import WeeklyTrendChart from "./components/charts/WeeklyTrendChart";

const mockData = {
  contributors: [
    { name: "Rahul", lastActiveDays: 6, commits: 31 },
    { name: "Anika", lastActiveDays: 1, commits: 18 },
    { name: "Vikram", lastActiveDays: 3, commits: 10 }
  ],
  weeklyData: [
    { day: "Mon", commits: 12 },
    { day: "Tue", commits: 8 },
    { day: "Wed", commits: 15 },
    { day: "Thu", commits: 6 },
    { day: "Fri", commits: 11 },
    { day: "Sat", commits: 4 },
    { day: "Sun", commits: 3 }
  ]
};

function AppPerson2() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 32 }}>
      <div className="container">
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>📊 Person 2: Data Visualization</h1>
          <p style={{ color: "#64748b", marginTop: 8 }}>Charts that make data instantly understandable</p>
        </div>

        <div className="grid" style={{ gap: 24 }}>
          {/* Bar Chart */}
          <CommitsBarChart contributors={mockData.contributors} />

          {/* Pie Chart */}
          <ContributorPieChart contributors={mockData.contributors} />

          {/* Line Chart */}
          <WeeklyTrendChart weeklyData={mockData.weeklyData} />
        </div>
      </div>
    </main>
  );
}

export default AppPerson2;
