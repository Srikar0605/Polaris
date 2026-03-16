import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ContributorBarChart({ contributorParticipation }) {
  if (!contributorParticipation || contributorParticipation.length === 0) {
    return (
      <div className="card" style={{ marginTop: 24 }}>
        <p style={{ textAlign: "center", color: "#64748b" }}>
          No contributor data available
        </p>
      </div>
    );
  }

  const data = contributorParticipation.map((c) => ({
    name: c.login,
    commits: c.totalCommits
  }));

  return (
    <section style={{ marginTop: 32 }}>
      <div className="card">
        <h3 style={{ fontSize: 20, fontWeight: 800 }}>
          Contributor Participation
        </h3>
        <p className="text-muted">
          All-time commits since project start
        </p>

        <div style={{ width: "100%", height: 320, marginTop: 20 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="commits"
                fill="url(#gradientColor)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default ContributorBarChart;
