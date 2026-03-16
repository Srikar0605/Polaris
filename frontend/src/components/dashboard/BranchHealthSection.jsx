function BranchHealthSection({ branchIntelligence }) {
  const {
    totalBranches = 0,
    branchesBehindMain = 0,
    staleBranches = 0,
    severelyStaleBranches = 0,
    branchDetails = []
  } = branchIntelligence || {};

  const getBadgeStyle = (behindMain, daysSinceLastCommit) => {
    const base = {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600
    };

    if (daysSinceLastCommit > 7) {
      return { ...base, background: "#fee2e2", color: "#b91c1c" };
    }

    if (daysSinceLastCommit > 3) {
      return { ...base, background: "#fef9c3", color: "#92400e" };
    }

    if (behindMain) {
      return { ...base, background: "#dbeafe", color: "#1e40af" };
    }

    return { ...base, background: "#dcfce7", color: "#166534" };
  };

  const getStatusText = (behindMain, daysSinceLastCommit) => {
    if (daysSinceLastCommit > 7) {
      return `Severely Stale (${daysSinceLastCommit}d)`;
    }
    if (daysSinceLastCommit > 3) {
      return `Stale (${daysSinceLastCommit}d)`;
    }
    if (behindMain) {
      return "Behind Main";
    }
    return "Current";
  };

  return (
    <section className="fade-in" style={{ marginTop: 40 }}>
      {/* Header Card */}
      <div className="card" style={{ marginBottom: 24, padding: 24 }}>
        <h2
          className="text-title"
          style={{ marginBottom: 8, fontSize: 22, fontWeight: 800 }}
        >
          Branch Health Monitor
        </h2>
        <p className="text-muted" style={{ marginTop: 0 }}>
          Track branch synchronization and staleness across your repository
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Branches</div>
          <div className="stat-value">{totalBranches}</div>
          <div className="stat-description">Active branches</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Behind Main</div>
          <div className="stat-value">{branchesBehindMain}</div>
          <div className="stat-description">Out of sync</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Stale (3–7d)</div>
          <div className="stat-value">{staleBranches}</div>
          <div className="stat-description">Needs attention</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Severely Stale (7+d)</div>
          <div className="stat-value">{severelyStaleBranches}</div>
          <div className="stat-description">High risk</div>
        </div>
      </div>

      {/* Branch Table */}
      {branchDetails.length > 0 ? (
        <div className="card" style={{ padding: 24 }}>
          <h3
            className="text-title"
            style={{ marginBottom: 16, fontSize: 18, fontWeight: 700 }}
          >
            Branch Details
          </h3>

          {/* Scrollable Container */}
          <div
            style={{
              maxHeight: 420,
              overflowY: "auto",
              overflowX: "auto",
              border: "1px solid #e2e8f0",
              borderRadius: 10
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                minWidth: 600
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#f8fafc",
                  zIndex: 2
                }}
              >
                <tr>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "2px solid #e2e8f0"
                    }}
                  >
                    Branch Name
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "2px solid #e2e8f0"
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "2px solid #e2e8f0"
                    }}
                  >
                    Days Since Commit
                  </th>
                </tr>
              </thead>

              <tbody>
                {branchDetails.map((branch, index) => (
                  <tr
                    key={branch.name}
                    style={{
                      borderBottom:
                        index < branchDetails.length - 1
                          ? "1px solid #f1f5f9"
                          : "none",
                      backgroundColor:
                        index % 2 === 0 ? "#ffffff" : "#f9fafb",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.background = "#f1f5f9")
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.background =
                        index % 2 === 0 ? "#ffffff" : "#f9fafb")
                    }
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 600,
                        color: "#1e293b"
                      }}
                    >
                      {branch.name}
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "center"
                      }}
                    >
                      <span
                        style={getBadgeStyle(
                          branch.behindMain,
                          branch.daysSinceLastCommit
                        )}
                      >
                        {getStatusText(
                          branch.behindMain,
                          branch.daysSinceLastCommit
                        )}
                      </span>
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "right",
                        color: "#475569",
                        fontWeight: 500
                      }}
                    >
                      {branch.daysSinceLastCommit}d
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              textAlign: "center",
              fontWeight: 500
            }}
          >
            No branch data available
          </p>
        </div>
      )}
    </section>
  );
}

export default BranchHealthSection;