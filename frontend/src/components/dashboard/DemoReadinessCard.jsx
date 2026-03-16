function DemoReadinessCard({ demoReadiness }) {
  const { score = 0, status = "Not Ready" } = demoReadiness || {};

  const getStatusStyle = (status) => {
    const base = {
      display: "inline-block",
      padding: "8px 16px",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 700,
      marginTop: 12,
      letterSpacing: "0.05em"
    };

    if (status === "Ready") {
      return { ...base, background: "#dcfce7", color: "#166534" };
    }
    if (status === "Risky") {
      return { ...base, background: "#fef9c3", color: "#92400e" };
    }
    if (status === "Not Ready") {
      return { ...base, background: "#fee2e2", color: "#b91c1c" };
    }
    return { ...base, background: "#e2e8f0", color: "#1e293b" };
  };

  const getProgressBarColor = (status) => {
    if (status === "Ready") return "#22c55e";
    if (status === "Risky") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <section className="fade-in" style={{ marginTop: 32 }}>
      <div className="card">
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>
          Demo Readiness Score
        </h2>
        <p className="text-muted" style={{ marginTop: 0, marginBottom: 24 }}>
          Executive-level readiness assessment for demo day
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 40
          }}
        >
          {/* Score Circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${getProgressBarColor(
                  status
                )}1a 0%, ${getProgressBarColor(status)}2a 100%)`,
                border: `3px solid ${getProgressBarColor(status)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                fontWeight: 900,
                color: getProgressBarColor(status),
                letterSpacing: "-0.02em"
              }}
            >
              {score}
            </div>

            <span style={getStatusStyle(status)}>{status}</span>
          </div>

          {/* Progress Bar & Details */}
          <div style={{ flex: 1 }}>
            {/* Progress Bar */}
            <div
              style={{
                marginBottom: 24
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#64748b",
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                Readiness Progress
              </div>
              <div
                style={{
                  height: 12,
                  borderRadius: 8,
                  background: "#e2e8f0",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: "100%",
                    borderRadius: 8,
                    background: getProgressBarColor(status),
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
            </div>

            {/* Status Description */}
            <div style={{ marginBottom: 16 }}>
              <h4
                style={{
                  margin: "0 0 8px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                Assessment Summary
              </h4>
              <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
                {getStatusMessage(status, score)}
              </p>
            </div>

            {/* Key Factors */}
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                fontSize: 13,
                color: "#64748b",
                lineHeight: 1.6
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#1e293b" }}>
                Score Factors:
              </p>
              <p style={{ margin: "2px 0" }}>• Open issues, branch sync, commit velocity</p>
              <p style={{ margin: "2px 0" }}>• Active contributor count & development pace</p>
              <p style={{ margin: "2px 0" }}>• Stale branch detection & team momentum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getStatusMessage(status, score) {
  if (status === "Ready") {
    return `With a score of ${score}, your project is well-organized and ready for demo day. The team is active, issues are managed, and the codebase is in good shape.`;
  }
  if (status === "Risky") {
    return `With a score of ${score}, your project shows potential but has some concerns. Review open issues, boost commit velocity, and ensure team alignment before demo day.`;
  }
  return `With a score of ${score}, your project needs immediate attention. Address critical blockers, increase team activity, and resolve major issues before the demo.`;
}

export default DemoReadinessCard;
