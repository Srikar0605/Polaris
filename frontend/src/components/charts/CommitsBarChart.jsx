import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

function CommitsBarChart({ contributors }) {
  const data = contributors.map((contributor) => ({
    name: contributor.name,
    commits: contributor.commits || 0
  }));

  const getBarColor = (commits, maxCommits) => {
    const ratio = commits / maxCommits;
    if (ratio > 0.5) return "#dc2626";
    if (ratio > 0.3) return "#ca8a04";
    return "#16a34a";
  };

  const maxCommits = Math.max(...data.map(d => d.commits));

  return (
    <section className="card">
      <h3 className="text-title">Commits Per Contributor</h3>
      <p className="text-muted">Individual commit distribution across team members</p>
      <div style={{ marginTop: 16, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 13 }} stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                background: "#ffffff", 
                border: "1px solid #cbd5e1", 
                borderRadius: 8,
                fontSize: 13
              }} 
            />
            <Bar dataKey="commits" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.commits, maxCommits)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default CommitsBarChart;
