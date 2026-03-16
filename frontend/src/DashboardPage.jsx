import ContributionIntelligence from "./components/dashboard/ContributionIntelligence";
import BranchHealthSection from "./components/dashboard/BranchHealthSection";
import TaskSyncSection from "./components/dashboard/TaskSyncSection";
import DemoReadinessCard from "./components/dashboard/DemoReadinessCard";
import ContributorBarChart from "./components/dashboard/ContributorBarChart";

function DashboardPage() {
  // Note: This page requires React Router context and AnalysisContext to function.
  // Currently, all analysis results are displayed on AnalyzePage.jsx
  // This component is kept for future multi-page routing implementation.
  
  const analysisData = null; // Would come from useAnalysis context
  // const navigate = useNavigate(); // Would be used for navigation

  const getStatusBadgeStyle = (status) => {
    const base = {
      padding: "6px 12px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600
    };
    if (status === "On Track") {
      return { ...base, background: "#dcfce7", color: "#166534" };
    }
    if (status === "Warning") {
      return { ...base, background: "#fef9c3", color: "#92400e" };
    }
    if (status === "At Risk") {
      return { ...base, background: "#fee2e2", color: "#b91c1c" };
    }
    return { ...base, background: "#e2e8f0", color: "#1e293b" };
  };

  if (!analysisData) {
    return (
      <div className="page-shell">
        <section style={{ padding: "48px 0 80px" }}>
          <div className="container">
            <div className="card" style={{ padding: 32 }}>
              <h2 style={{ marginTop: 0, marginBottom: 12 }}>
                Analyze a repository first.
              </h2>
              <p style={{ marginTop: 0, marginBottom: 20, color: "#64748b" }}>
                Run an analysis in the Project Command Center to view the detailed dashboard.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                Go to Command Center
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const { repoName, overallStatus, teamMetrics } = analysisData;

  return (
    <div className="page-shell">
      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          {/* Header with repo + status */}
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div className="h-row" style={{ alignItems: "center" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>
                  {repoName}
                </h1>
                <p
                  className="text-muted"
                  style={{ marginTop: 4, marginBottom: 0 }}
                >
                  Deep health and contribution breakdown
                </p>
              </div>
              <span style={getStatusBadgeStyle(overallStatus)}>
                {overallStatus}
              </span>
            </div>
          </div>

          {/* Metric breakdown grid */}
          <div className="grid grid-3">
            <div className="stat-card">
              <div className="stat-label">Total Contributors</div>
              <div className="stat-value">
                {teamMetrics?.totalContributors ?? "—"}
              </div>
              <div className="stat-description">People who have contributed</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Active Contributors</div>
              <div className="stat-value">
                {teamMetrics?.activeContributors ?? "—"}
              </div>
              <div className="stat-description">Commits in the last 3 days</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Inactive Contributors</div>
              <div className="stat-value">
                {teamMetrics?.inactiveContributors ?? "—"}
              </div>
              <div className="stat-description">No commits in the last 3 days</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Commit Velocity</div>
              <div className="stat-value">
                {teamMetrics?.commitVelocity ?? "—"}
              </div>
              <div className="stat-description">
                Commits per day over the last week
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Development Pace</div>
              <div className="stat-value">
                {teamMetrics?.developmentPace ?? "—"}
              </div>
              <div className="stat-description">Stalled, Slow, or Healthy</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Open Issues</div>
              <div className="stat-value">
                {teamMetrics?.openIssues ?? "—"}
              </div>
              <div className="stat-description">Unresolved GitHub issues</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Top Contributor Share</div>
              <div className="stat-value">
                {teamMetrics?.dominancePercentage ?? "—"}%
              </div>
              <div className="stat-description">Share of commits by top person</div>
            </div>
          </div>

          {/* Contribution Intelligence (new section) */}
          {analysisData?.commitIntelligence && (
            <ContributionIntelligence
              commitIntelligence={analysisData.commitIntelligence}
            />
          )}

          {/* Contributor Participation Chart (added) */}
          {analysisData?.contributorParticipation && (
            <ContributorBarChart
              contributorParticipation={analysisData.contributorParticipation}
            />
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

          {/* Demo Readiness Score */}
          {analysisData?.demoReadiness && (
            <DemoReadinessCard demoReadiness={analysisData.demoReadiness} />
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

