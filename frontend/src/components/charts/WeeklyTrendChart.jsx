import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function WeeklyTrendChart({ weeklyData }) {
  return (
    <section className="card">
      <h3 className="text-title">Weekly Activity Trend</h3>
      <p className="text-muted">Commit activity over the last 7 days</p>
      <div style={{ marginTop: 16, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fontSize: 13 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 13 }} stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff", 
                border: "1px solid #cbd5e1", 
                borderRadius: 8,
                fontSize: 13
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="commits" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default WeeklyTrendChart;
