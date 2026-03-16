function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
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
          </nav>
        </div>
      </header>

      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <div className="card" style={{ padding: 48, textAlign: "center" }}>
              <h1 style={{
                fontSize: 32,
                fontWeight: 800,
                margin: "0 0 12px",
                color: "var(--text-primary)"
              }}>
                Sign in with GitHub
              </h1>
              <p style={{
                color: "var(--text-secondary)",
                fontSize: 16,
                margin: "0 0 32px"
              }}>
                Connect your GitHub account to analyze your repositories.
              </p>
              <button 
                className="btn btn-primary btn-icon"
                onClick={handleLogin}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>🔗</span> Continue with GitHub
              </button>
              <p style={{
                color: "var(--text-tertiary)",
                fontSize: 12,
                marginTop: 16,
                marginBottom: 24
              }}>
                We'll never post to your account or store your password.
              </p>
              
              <div style={{ 
                borderTop: "1px solid var(--border-glass)",
                paddingTop: 24,
                marginBottom: 0
              }}>
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  margin: "0 0 16px"
                }}>
                  Or continue as a guest
                </p>
                <button 
                  className="btn btn-secondary btn-icon"
                  onClick={() => {
                    window.history.pushState({}, "", "/analyze");
                    window.location.reload();
                  }}
                  style={{ 
                    width: "100%", 
                    justifyContent: "center",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-glass)",
                    color: "var(--text-primary)"
                  }}
                >
                  <span>👤</span> Continue as Guest
                </button>
                <p style={{
                  color: "var(--text-tertiary)",
                  fontSize: 12,
                  marginTop: 12
                }}>
                  Analyze any public repository without signing in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
