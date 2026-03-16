import { getContributorStatus } from "./intelligenceUtils";

function ContributorStatus({ contributors }) {
  return (
    <section className="card">
      <h3 className="text-title">Contributor Status</h3>
      <p className="text-muted">Who is active, slowing, or inactive</p>
      <div className="list" style={{ marginTop: 12 }}>
        {contributors.map((contributor) => {
          const status = getContributorStatus(contributor.lastActiveDays);
          return (
            <div key={contributor.name} className="h-row" style={{ paddingBottom: 6, borderBottom: "1px solid #f1f5f9" }}>
              <div>
                <strong>{contributor.name}</strong>
                <p className="text-muted" style={{ margin: "2px 0 0" }}>
                  Last active {contributor.lastActiveDays} day(s) ago · {contributor.commits} commits
                </p>
              </div>
              <span className={`badge ${status.badgeClass}`}>{status.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ContributorStatus;
