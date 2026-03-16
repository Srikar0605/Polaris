import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip
} from "recharts";

function ContributionIntelligence({ commitIntelligence }) {
  const {
    totalCommits = 0,
    categoryCounts = {},
    meaningfulCommitPercentage = 0,
    superficialCommitPercentage = 0
  } = commitIntelligence || {};

  const safeCategoryCounts = {
    feature: categoryCounts.feature || 0,
    bugfix: categoryCounts.bugfix || 0,
    refactor: categoryCounts.refactor || 0,
    docs: categoryCounts.docs || 0,
    chore: categoryCounts.chore || 0,
    other: categoryCounts.other || 0
  };

  const meaningful = Math.max(0, meaningfulCommitPercentage);
  const superficial = Math.max(0, superficialCommitPercentage);
  const used = Math.min(100, meaningful + superficial);
  const neutral = Math.max(0, 100 - used);

  const donutData =
    totalCommits > 0
      ? [
          { name: "Meaningful", value: meaningful, color: "#16a34a" },
          { name: "Superficial", value: superficial, color: "#dc2626" },
          { name: "Neutral", value: neutral, color: "#94a3b8" }
        ].filter((d) => d.value > 0)
      : [];

  const barRawData = [
    { key: "feature", label: "Feature", value: safeCategoryCounts.feature },
    { key: "bugfix", label: "Bugfix", value: safeCategoryCounts.bugfix },
    { key: "refactor", label: "Refactor", value: safeCategoryCounts.refactor },
    { key: "docs", label: "Docs", value: safeCategoryCounts.docs },
    { key: "chore", label: "Chore", value: safeCategoryCounts.chore },
    { key: "other", label: "Other", value: safeCategoryCounts.other }
  ];

  const barData = barRawData
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  const insightLines = [];

  if (meaningful > 60) {
    insightLines.push(
      "Most recent commits represent substantial development work."
    );
  }

  if (superficial > 40) {
    insightLines.push(
      "A high proportion of low-information commits has been detected."
    );
  }

  if (barData.length > 0) {
    const dominantType = barData[0].key;
    if (dominantType === "feature") {
      insightLines.push(
        "Development focus is primarily on new feature creation."
      );
    } else if (dominantType === "bugfix") {
      insightLines.push("The team is prioritizing defect resolution.");
    }
  }

  if (insightLines.length === 0) {
    insightLines.push(
      "Commit activity appears balanced with no strong skews in work type."
    );
  }

  return (
    <section className="fade-in intelligence-section">
      <h3>📊 Contribution Intelligence</h3>
      <p style={{ color: "var(--text-secondary)", marginTop: 4, marginBottom: 0 }}>
        High-level view of how meaningful and focused the recent commit activity has been.
      </p>

      <div className="grid grid-2" style={{ marginTop: 20 }}>
        {/* Donut chart */}
        <section className="card">
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Commit Quality Mix</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "4px 0 0 0" }}>
            Proportion of meaningful, superficial, and neutral commits
          </p>
          {totalCommits === 0 || donutData.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 14, fontWeight: 600 }}>No commit data</div>
              <p style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: 8 }}>
                Once this repository has recent commits, quality distribution will appear here.
              </p>
            </div>
          ) : (
            <div style={{ marginTop: 16, height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="gradientMeaningful" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="gradientSuperficial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <PieTooltip
                    contentStyle={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: 8,
                      fontSize: 13,
                      color: "var(--text-primary)"
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Bar chart */}
        <section className="card">
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>Commit Distribution by Type</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "4px 0 0 0" }}>
            Understanding what kind of work is being done
          </p>
          {totalCommits === 0 || barData.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 14, fontWeight: 600 }}>No categorized commits</div>
              <p style={{ color: "var(--text-tertiary)", fontSize: 12, marginTop: 8 }}>
                Commit type breakdown will appear here once there is sufficient activity.
              </p>
            </div>
          ) : (
            <div style={{ marginTop: 16, height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 13, fill: "rgba(255,255,255,0.7)" }}
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <YAxis tick={{ fontSize: 13, fill: "rgba(255,255,255,0.7)" }} stroke="rgba(255,255,255,0.08)" allowDecimals={false} />
                  <BarTooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      fontSize: 13,
                      color: "rgba(255,255,255,0.95)"
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="url(#barGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      {/* AI-style insight card */}
      <section className="card" style={{ marginTop: 24 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
          Contribution Insights
        </h3>
        <p style={{ color: "var(--text-secondary)", marginTop: 0, marginBottom: 16, fontSize: 13 }}>
          Interpretation of recent commit patterns based on type and quality.
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14 }}>
          {insightLines.map((line) => (
            <li key={line} style={{ marginBottom: 6 }}>
              {line}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default ContributionIntelligence;

