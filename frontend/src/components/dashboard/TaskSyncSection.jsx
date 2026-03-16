function TaskSyncSection({ taskSync }) {
  const {
    totalIssues = 0,
    linkedIssues = 0,
    unlinkedOpenIssues = 0,
    closedWithoutCommits = 0,
    issueDetails = []
  } = taskSync || {};

  const getBadgeStyle = (status, linkedCommits) => {
    const base = {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600
    };

    if (linkedCommits > 0) {
      return { ...base, background: "#dcfce7", color: "#166534" };
    }

    if (status === "open") {
      return { ...base, background: "#fee2e2", color: "#b91c1c" };
    }

    return { ...base, background: "#fef9c3", color: "#92400e" };
  };

  const getStatusText = (status, linkedCommits) => {
    if (linkedCommits > 0) return `Linked (${linkedCommits})`;
    if (status === "open") return "Unlinked Open";
    return "Closed, No Commits";
  };

  return (
    <section className="fade-in" style={{ marginTop: 40 }}>
      {/* Header Card */}
      <div className="card" style={{ marginBottom: 24, padding: 24 }}>
        <h2
          className="text-title"
          style={{ marginBottom: 8, fontSize: 22, fontWeight: 800 }}
        >
          Task Sync Engine
        </h2>
        <p className="text-muted" style={{ marginTop: 0 }}>
          Detect fragmented work and orphaned issues by linking commits to tasks
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-label">Total Issues</div>
          <div className="stat-value">{totalIssues}</div>
          <div className="stat-description">Open + closed</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Linked Issues</div>
          <div className="stat-value">{linkedIssues}</div>
          <div className="stat-description">Have commit references</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Unlinked Open</div>
          <div className="stat-value">{unlinkedOpenIssues}</div>
          <div className="stat-description">Open, no commits</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Closed w/o Commits</div>
          <div className="stat-value">{closedWithoutCommits}</div>
          <div className="stat-description">Closed but unlinked</div>
        </div>
      </div>

      {/* Issue Table */}
      {issueDetails.length > 0 ? (
        <div className="card" style={{ padding: 24 }}>
          <h3
            className="text-title"
            style={{ marginBottom: 16, fontSize: 18, fontWeight: 700 }}
          >
            Issue Details
          </h3>

          {/* Scroll Container */}
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
                minWidth: 700
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
                    Issue #
                  </th>
                  <th
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#475569",
                      borderBottom: "2px solid #e2e8f0"
                    }}
                  >
                    Title
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
                    Linked Commits
                  </th>
                </tr>
              </thead>

              <tbody>
                {issueDetails.map((issue, index) => (
                  <tr
                    key={issue.issueNumber}
                    style={{
                      borderBottom:
                        index < issueDetails.length - 1
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
                      <a
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#7c3aed",
                          textDecoration: "none"
                        }}
                      >
                        #{issue.issueNumber}
                      </a>
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        color: "#1e293b",
                        maxWidth: 400,
                        wordBreak: "break-word"
                      }}
                    >
                      <span title={issue.title}>
                        {issue.title.length > 60
                          ? issue.title.substring(0, 60) + "..."
                          : issue.title}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          background:
                            issue.status === "open"
                              ? "#dbeafe"
                              : "#e5e7eb",
                          color:
                            issue.status === "open"
                              ? "#1e40af"
                              : "#374151"
                        }}
                      >
                        {issue.status.charAt(0).toUpperCase() +
                          issue.status.slice(1)}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <span
                        style={getBadgeStyle(
                          issue.status,
                          issue.linkedCommits
                        )}
                      >
                        {getStatusText(
                          issue.status,
                          issue.linkedCommits
                        )}
                      </span>
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
            No issues found
          </p>
        </div>
      )}
    </section>
  );
}

export default TaskSyncSection;