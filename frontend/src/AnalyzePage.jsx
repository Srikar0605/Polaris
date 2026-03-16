import { useState, useEffect } from "react";
import { useAnalysis } from "./context/AnalysisContext";
import AlertsPanel from "./components/intelligence/AlertsPanel";
import AISummaryPanel from "./components/intelligence/AISummaryPanel";
import HealthScoreCard from "./components/intelligence/HealthScoreCard";
import DuplicateWorkSection from "./components/intelligence/DuplicateWorkSection";
import ContributionIntelligence from "./components/dashboard/ContributionIntelligence";
import BranchHealthSection from "./components/dashboard/BranchHealthSection";
import TaskSyncSection from "./components/dashboard/TaskSyncSection";
import DemoReadinessCard from "./components/dashboard/DemoReadinessCard";
import ContributorBarChart from "./components/dashboard/ContributorBarChart";
import { Link } from "react-router-dom";

function AnalyzePage() {
  const { setAnalysisData } = useAnalysis();
  const [repoUrl, setRepoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setLocalAnalysisData] = useState(null);

  // Read repo URL from query parameters or restore from sessionStorage on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const repo = params.get("repo");
    
    if (repo) {
      // New repo from query params - clear old session data
      sessionStorage.removeItem("analysisData");
      sessionStorage.removeItem("analysisRepoUrl");
      setRepoUrl(repo);
      // Trigger analysis immediately if repo is provided
      handleAnalyzeAuto(repo);
    } else {
      // Try to restore from sessionStorage
      const savedRepoUrl = sessionStorage.getItem("analysisRepoUrl");
      const savedAnalysis = sessionStorage.getItem("analysisData");
      
      if (savedRepoUrl) {
        setRepoUrl(savedRepoUrl);
      }
      
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
  }, []);

  const handleAnalyzeAuto = async (url) => {
    if (!url) return;

    setIsAnalyzing(true);
    setError(null);
    setLocalAnalysisData(null);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ repoUrl: url })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();
      setLocalAnalysisData(result);
      setAnalysisData(result);
      
      // Save to sessionStorage for persistence across navigation
      sessionStorage.setItem("analysisData", JSON.stringify(result));
      sessionStorage.setItem("analysisRepoUrl", url);
    } catch (err) {
      console.error(err);
      setError("Unable to analyze repository.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!repoUrl) return;
    await handleAnalyzeAuto(repoUrl);
  };

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
                        background: "var(--primary-gradient)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20
                      }}
                    >
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }} > Polaris </span>
                  </a>
                </div>
            </div>
            <div className="flex items-center gap-24">
              <a
                href="/repos"
                style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
              >
                Repositories
              </a>
              <a
                href="/analyze"
                style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
              >
                Command Center
              </a>
              <a
                href="/standup"
                style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
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

      {!localStorage.getItem("authToken") && (
        <div style={{
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(168, 85, 247, 0.1))",
          borderBottom: "1px solid var(--border-glass)",
          padding: "16px 0"
        }}>
          <div className="container">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "var(--text-primary)",
              fontSize: 14
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span>👤</span>
                <span><strong>Browsing as Guest</strong> — Analyze any public repository</span>
              </div>
              <a href="/login" style={{
                color: "var(--primary-color)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 13
              }}>
                Sign in for more features →
              </a>
            </div>
          </div>
        </div>
      )}

      <section id="dashboard" style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: 30,
                fontWeight: 900,
                color: "var(--text-primary)"
              }}
            >
              Upload GitHub Repository URL
            </h1>
            <p style={{ margin: "0 0 20px", color: "var(--text-secondary)" }}>
              Paste your repository link and run full analysis with team intelligence + visualizations.
            </p>

            <div className="input-group">
              <div className="input-field">
                <label className="input-label">Repository URL</label>
                <input
                  type="url"
                  className="input"
                  value={repoUrl}
                  onChange={(event) => setRepoUrl(event.target.value)}
                  placeholder="https://github.com/username/repository"
                  disabled={isAnalyzing}
                />
              </div>
              <button
                className="btn btn-primary btn-icon"
                onClick={handleAnalyze}
                disabled={!repoUrl || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="pulse">⏳</span> Analyzing...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Analyze Repository
                  </>
                )}
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>Analyzing repository…</p>
          )}

          {error && !isAnalyzing && (
            <div className="card" style={{ marginTop: 16, color: "#fca5a5" }}>
              {error}
            </div>
          )}

          {!isAnalyzing && analysisData && (
            <div className="fade-in" style={{ display: "grid", gap: 24, marginTop: 24 }}>
              {/* Status section - Hero */}
              <section className="card" style={{ background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)" }}>
                <div className="h-row" style={{ alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
                      {analysisData.repoName}
                    </h2>
                    <p style={{ marginTop: 6, color: "var(--text-secondary)", fontSize: 14 }}>
                      Project Command Center • Last analyzed just now
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="live-dot"></span>
                      <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>LIVE</span>
                    </div>
                    <span className={`status-badge ${getStatusBadgeStyle(analysisData.overallStatus)}`}>
                      {analysisData.overallStatus}
                    </span>
                  </div>
                </div>
              </section>

              {/* Team snapshot */}
              <section className="grid grid-3">
                <div className="stat-card contributors">
                  <div className="stat-label">Total Contributors</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.totalContributors ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>People who have contributed</div>
                </div>
                <div className="stat-card contributors">
                  <div className="stat-label">Active (Last 3 Days)</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.activeContributors ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>Currently pushing code</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Inactive</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.inactiveContributors ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>No commits in last 3 days</div>
                </div>
                <div className="stat-card velocity">
                  <div className="stat-label">Commit Velocity</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.commitVelocity ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>Commits per day (7-day avg)</div>
                </div>
                <div className="stat-card velocity">
                  <div className="stat-label">Development Pace</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.developmentPace ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>Stalled, Slow, or Healthy</div>
                </div>
                <div className="stat-card issues">
                  <div className="stat-label">Open Issues</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.openIssues ?? "—"}
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>Current unresolved issues</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Top Contributor Share</div>
                  <div className="stat-value">
                    {analysisData.teamMetrics?.dominancePercentage ?? "—"}%
                  </div>
                  <div className="stat-description" style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 8 }}>Commit concentration</div>
                </div>
              </section>

              {/* Health Score */}
              {analysisData.healthScore !== undefined && (
                <HealthScoreCard score={analysisData.healthScore} />
              )}

              {/* Demo Readiness Score */}
              {analysisData?.demoReadiness && (
                <DemoReadinessCard demoReadiness={analysisData.demoReadiness} />
              )}

              {/* Risk alerts */}
              <AlertsPanel alerts={analysisData.risks || []} />

              {/* AI summary */}
              <AISummaryPanel
                summary={
                  analysisData.aiProjectSummary ||
                  "No AI summary available yet."
                }
              />

              {/* Contribution Intelligence */}
              {analysisData?.commitIntelligence && (
                <ContributionIntelligence
                  commitIntelligence={analysisData.commitIntelligence}
                />
              )}

              {/* Contributor Participation Chart */}
              {analysisData?.contributorParticipation && (
                <ContributorBarChart contributorParticipation={analysisData.contributorParticipation} />
              )}

              {/* Branch Health Monitor */}
              {analysisData?.branchIntelligence && (
                <BranchHealthSection
                  branchIntelligence={analysisData.branchIntelligence}
                />
              )}

              {/* Task Sync Engine */}
              {analysisData?.taskSync && (
                <TaskSyncSection taskSync={analysisData.taskSync} />
              )}

              {/* Duplicate Work Detection */}
              {analysisData?.duplicateWork && (
                <DuplicateWorkSection duplicateWork={analysisData.duplicateWork} />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AnalyzePage;
