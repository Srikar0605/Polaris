import React from "react";

const DuplicateWorkSection = ({ duplicateWork }) => {
  if (!duplicateWork) return null;

  const { overlappingFilesCount, overlappingFiles } = duplicateWork;

  return (
    <div className="intelligence-section">
      <h3>🔄 Duplicate Work Detection</h3>

      {overlappingFilesCount === 0 ? (
        <div className="metric-card empty-state">
          <p>✅ No overlapping work detected.</p>
          <small>Contributors are working on different files.</small>
        </div>
      ) : (
        <>
          <div className="metric-card metric-highlight">
            <div className="metric-value">{overlappingFilesCount}</div>
            <div className="metric-label">Overlapping Files</div>
            <small style={{ color: "#f59e0b" }}>
              Multiple contributors modifying the same files in last 3 days
            </small>
          </div>

          <div className="table-container">
            <table className="analysis-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Contributors</th>
                </tr>
              </thead>
              <tbody>
                {overlappingFiles.map((item, index) => (
                  <tr key={index}>
                    <td className="file-cell" title={item.file}>
                      <code>{truncateFilePath(item.file)}</code>
                    </td>
                    <td>
                      <div className="contributor-tags">
                        {item.contributors.map((contributor) => (
                          <span key={contributor} className="contributor-tag">
                            {contributor}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

/**
 * Truncates long file paths for display
 * Shows only the last 2 path segments if over 50 characters
 */
const truncateFilePath = (filePath) => {
  if (filePath.length <= 50) return filePath;

  const parts = filePath.split("/");
  if (parts.length >= 2) {
    return ".../" + parts.slice(-2).join("/");
  }
  return filePath;
};

export default DuplicateWorkSection;
