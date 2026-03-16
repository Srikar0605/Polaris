import { useEffect, useState } from "react";

function RepoSelectorPage() {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/auth/repos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setUser(data.user);
        setRepos(data.repos);
      } catch (err) {
        console.error("Repo fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleAnalyzeRepo = (fullName) => {
    const repoUrl = `https://github.com/${fullName}`;
    // Store the repo URL in a global state or navigate directly
    window.location.href = `/analyze?repo=${encodeURIComponent(repoUrl)}`;
  };

  return (
    <div className="page-shell">
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-card)',
        backdropFilter: 'var(--backdrop-blur)',
        borderBottom: '1px solid var(--border-glass)',
        padding: '16px 0'
      }}>
        <div className="container">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-16">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: 'var(--primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20
                  }}>
                    🛡️
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }} > Polaris </span>
                </a>
              </div>
            </div>
            {user && (
              <div className="flex items-center gap-16">
                <a href="/" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500
                }}>
                  Home
                </a>
              </div>
            )}
          </nav>
        </div>
      </header>

      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          {/* User Profile Section */}
          {user && (
            <div className="card" style={{
              padding: 24,
              marginBottom: 32,
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)'
            }}>
              <div className="flex items-center justify-between" style={{ alignItems: "center" }}>
                <div className="flex items-center" style={{ alignItems: "center", gap: 16 }}>
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8
                      }}
                    />
                  )}
                  <div>
                    <h2 style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 800,
                      color: "var(--text-primary)"
                    }}>
                      {user.name || user.username}
                    </h2>
                    <p style={{
                      margin: "4px 0 0",
                      color: "var(--text-secondary)",
                      fontSize: 14
                    }}>
                      @{user.username}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    border: "1px solid var(--border-glass)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.3s"
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Repositories Section */}
          <div>
            <h2 style={{
              fontSize: 24,
              fontWeight: 800,
              margin: "0 0 20px",
              color: "var(--text-primary)"
            }}>
              Your Repositories
            </h2>

            {loading && (
              <div className="card" style={{ padding: 40, textAlign: "center" }}>
                <p style={{ color: "var(--text-secondary)" }}>Loading repositories...</p>
              </div>
            )}

            {error && (
              <div className="card" style={{ padding: 20, background: "rgba(239, 68, 68, 0.1)" }}>
                <p style={{ color: "#fca5a5", margin: 0 }}>Error: {error}</p>
              </div>
            )}

            {!loading && repos.length === 0 && (
              <div className="card" style={{ padding: 40, textAlign: "center" }}>
                <p style={{ color: "var(--text-secondary)" }}>No repositories found</p>
              </div>
            )}

            {!loading && repos.length > 0 && (
              <div className="grid" style={{ gap: 16 }}>
                {repos.map(repo => (
                  <div key={repo.full_name} className="card" style={{
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--text-primary)"
                      }}>
                        {repo.name}
                      </h3>
                      <p style={{
                        margin: "4px 0 0",
                        color: "var(--text-secondary)",
                        fontSize: 13
                      }}>
                        {repo.full_name}
                        {repo.private && (
                          <span style={{
                            marginLeft: 8,
                            background: "rgba(239, 68, 68, 0.15)",
                            color: "#ef4444",
                            padding: "2px 8px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600
                          }}>
                            Private
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAnalyzeRepo(repo.full_name)}
                      className="btn btn-primary"
                      style={{ padding: "8px 20px", fontSize: 14 }}
                    >
                      Analyze
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RepoSelectorPage;
