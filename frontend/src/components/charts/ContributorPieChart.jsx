import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

function ContributorPieChart({ contributors }) {
  const data = contributors.map((contributor) => ({
    name: contributor.name,
    value: contributor.commits || 0
  }));

  const totalCommits = data.reduce((sum, item) => sum + item.value, 0);

  const renderLabel = (entry) => {
    const percent = ((entry.value / totalCommits) * 100).toFixed(1);
    return `${percent}%`;
  };

  return (
    <section className="card">
      <h3 className="text-title">Contribution Distribution</h3>
      <p className="text-muted">Team contribution split by percentage</p>
      <div style={{ marginTop: 16, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff", 
                border: "1px solid #cbd5e1", 
                borderRadius: 8,
                fontSize: 13
              }} 
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: 13 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ContributorPieChart;
