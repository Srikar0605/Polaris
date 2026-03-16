import { useAnalysis } from "../context/AnalysisContext";
import { useEffect, useState } from "react";

function StandupPage() {
  const { analysisData, setAnalysisData } = useAnalysis();
  const [localAnalysisData, setLocalAnalysisData] = useState(analysisData);

  // Restore from sessionStorage if context data is empty
  useEffect(() => {
    if (analysisData) {
      setLocalAnalysisData(analysisData);
    } else {
      const savedAnalysis = sessionStorage.getItem("analysisData");
      if (savedAnalysis) {
        try {
          const parsed = JSON.parse(savedAnalysis);
          setLocalAnalysisData(parsed);
          setAnalysisData(parsed);
        } catch (e) {
          console.error("Failed to restore analysis data:", e);
        }
      }
    }
  }, [analysisData, setAnalysisData]);

  const getStatusBadgeStyle = (status) => {
    if (status === "On Track") {
      return "status-ontrack";
    }
    if (status === "Warning") {
      return "status-warning";
    }
    if (status === "At Risk") {
      return "status-risk";
    }
    return "status-ontrack";
  };

  return (
    <div className="page-shell">
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--bg-card)",
          backdropFilter: "var(--backdrop-blur)",
          borderBottom: "1px solid var(--border-glass)",
          padding: "16px 0"
        }}
      >
        <div className="container">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-16">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      background:
                        "var(--primary-gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20
                    }}
                  >
                    🛡️
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }} > Polaris </span>
                </a>
              </div>
            </div>
            <div className="flex items-center gap-24">
              <a
                href="/repos"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500
                }}
              >
                Repositories
              </a>
              <a
                href="/analyze"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500
                }}
              >
                Command Center
              </a>
              <a
                href="/standup"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500
                }}
              >
                Stand-Up
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.history.pushState({}, "", "/login");
                  window.location.reload();
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  background: "var(--primary-gradient)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </header>

      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          {!localAnalysisData ? (
            <div className="card" style={{ padding: 32 }}>
              <h2 style={{ marginTop: 0, marginBottom: 12, color: "var(--text-primary)" }}>
                Analyze a repository first.
              </h2>
              <p
                style={{
                  marginTop: 0,
                  marginBottom: 20,
                  color: "var(--text-secondary)"
                }}
              >
                Run an analysis in the Command Center to view the automated
                stand-up.
              </p>
              <a
                href="/analyze"
                style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: 10,
                  background:
                    "var(--primary-gradient)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15
                }}
              >
                Go to Command Center
              </a>
            </div>
          ) : (
            <div className="fade-in" style={{ display: "grid", gap: 24 }}>
              {/* Header with repo + status */}
              <section className="card" style={{ padding: 24 }}>
                <div className="h-row" style={{ alignItems: "center" }}>
                  <div>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 26,
                        fontWeight: 800,
                        color: "var(--text-primary)"
                      }}
                    >
                      {localAnalysisData.repoName}
                    </h1>
                    <p
                      className="text-muted"
                      style={{ marginTop: 4, marginBottom: 0 }}
                    >
                      Daily Automated Stand-Up
                    </p>
                  </div>
                  <span
                    className={`status-badge ${getStatusBadgeStyle(
                      localAnalysisData.overallStatus
                    )}`}
                  >
                    {localAnalysisData.overallStatus}
                  </span>
                </div>
              </section>

              {/* Stand-Up Content */}
              <section className="card">
                <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>
                  Automated Stand-Up
                </h2>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    fontSize: 14,
                    margin: 0,
                    padding: 16,
                    background: "var(--bg-secondary)",
                    borderRadius: 12,
                    border: "1px solid var(--border-glass)",
                    fontFamily:
                      "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"
                  }}
                >
                  {localAnalysisData?.standup ||
                    "Stand-up summary unavailable."}
                </pre>
              </section>

              {/* Quick Actions */}
              <section className="card">
                <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                  Quick Actions
                </h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href="/analyze"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      borderRadius: 10,
                      background:
                        "var(--primary-gradient)",
                      color: "#ffffff",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                      transition: "all 0.3s"
                    }}
                  >
                    Re-analyze Repository
                  </a>
                  <button
                    onClick={() => {
                      const standup = localAnalysisData?.standup;
                      if (standup) {
                        navigator.clipboard.writeText(standup);
                        alert("Stand-up copied to clipboard!");
                      }
                    }}
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      borderRadius: 10,
                      border: "1px solid var(--border-glass)",
                      background: "var(--bg-card)",
                      backdropFilter: "var(--backdrop-blur)",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "all 0.3s"
                    }}
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StandupPage;
