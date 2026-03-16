function App() {
  const isLoggedIn = localStorage.getItem("authToken");

  return (
    <div className="page-shell">
      {/* Header Navigation */}
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
            <div className="flex items-center gap-24">
              {isLoggedIn ? (
                <>
                  <a href="/repos" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Repositories</a>
                  <a href="/analyze" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Command Center</a>
                  <a href="/standup" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Stand-Up</a>
                  <button onClick={() => {
                    localStorage.removeItem("authToken");
                    window.history.pushState({}, "", "/login");
                    window.location.reload();
                  }} style={{ 
                    padding: "10px 20px",
                    borderRadius: 10,
                    background: "var(--primary-gradient)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer"
                  }}>Logout</button>
                </>
              ) : (
                <>
                  <a href="#how-it-works" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>How it works</a>
                  <a href="#scenarios" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}>Scenarios</a>
                  <a href="/login" style={{ 
                    padding: "10px 20px",
                    borderRadius: 10,
                    background: "var(--primary-gradient)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 600 
                  }}>Sign In</a>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: 60, alignItems: 'center' }}>
            <div className="fade-in">
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 999,
                background: 'var(--bg-card)',
                backdropFilter: 'var(--backdrop-blur)',
                border: '1px solid var(--border-glass)',
                marginBottom: 24,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}>
                🚀 Built for Hackathons & Capstones
              </div>
              <h1 className="hero-title" style={{ textAlign: 'left', marginBottom: 24 }}>
                Build together.<br/>Ship with confidence.
              </h1>
              <p className="hero-subtitle" style={{ textAlign: 'left', fontSize: 20, marginBottom: 40 }}>
                Track progress, spot blockers early, and keep everyone aligned from day one to demo day.
              </p>
              <div className="flex gap-16" style={{ flexWrap: 'wrap' }}>
                <a href="/analyze" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span>🚀</span> Upload URL
                </a>
                <button style={{
                  height: 56,
                  padding: '0 32px',
                  borderRadius: 16,
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-card)',
                  backdropFilter: 'var(--backdrop-blur)',
                  color: 'var(--text-primary)',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <div style={{
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-glass)',
                background: 'var(--bg-card)',
                backdropFilter: 'var(--backdrop-blur)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80" 
                  alt="Dashboard Analytics"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section id="features" style={{ padding: '60px 0', background: 'rgba(255, 255, 255, 0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 12px',
              color: 'var(--text-primary)'
            }}>
              Key Features
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Everything you need in one simple dashboard
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card" style={{ padding: 28 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 16
              }}>
                ❤️
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Team Health
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: 14 }}>
                Real-time momentum tracking for your team
              </p>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 16
              }}>
                🚨
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Smart Alerts
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: 14 }}>
                Automatic detection of team issues
              </p>
            </div>

            <div className="card" style={{ padding: 28 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                marginBottom: 16
              }}>
                📊
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                Visual Analytics
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, fontSize: 14 }}>
                Interactive charts and contribution tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              margin: '0 0 16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              How It Works
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 18 }}>
              Three simple steps to team clarity
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 40 }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
                color: '#ffffff',
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
              }}>
                1
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Enter Repo URL
              </h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                Paste your GitHub repository link. Public or private—we'll handle it.
              </p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
                color: '#ffffff',
                boxShadow: '0 10px 40px rgba(236, 72, 153, 0.3)'
              }}>
                2
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', margin: 0 }}>
                AI Analyzes
              </h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                Our engine processes commits, contributors, activity patterns, and generates insights.
              </p>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
                color: '#ffffff',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
              }}>
                3
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', margin: 0 }}>
                Get Actionable Insights
              </h3>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7 }}>
                See your dashboard with health scores, alerts, charts, and AI recommendations.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 80, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)' }}>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80" 
              alt="Team Collaboration"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* Real Scenarios - Problem vs Solution */}
      <section id="scenarios" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 36,
              fontWeight: 800,
              margin: '0 0 16px',
              color: '#ffffff'
            }}>
              Scenarios We Solve
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
              Real problems. Real solutions. No more surprises on demo day.
            </p>
          </div>

          <div className="grid grid-2" style={{ gap: 40 }}>
            {/* Scenario 1 */}
            <div className="glass-card" style={{ padding: 36, background: 'rgba(239, 68, 68, 0.14)', borderColor: 'rgba(239, 68, 68, 0.35)' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔴</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                Without Polaris
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>❌</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.88)', fontSize: 15, lineHeight: 1.6 }}>
                    One teammate hasn't pushed code in 5 days—but you don't know until demo day
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>❌</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.88)', fontSize: 15, lineHeight: 1.6 }}>
                    80% of commits from one person while others are ghosting
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>❌</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.88)', fontSize: 15, lineHeight: 1.6 }}>
                    Endless WhatsApp messages asking "did you finish your part?"
                  </p>
                </div>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="glass-card" style={{ padding: 36, background: 'rgba(16, 185, 129, 0.14)', borderColor: 'rgba(16, 185, 129, 0.35)' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🟢</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                With Polaris
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>✅</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: 15, lineHeight: 1.6 }}>
                    Alert on Day 2: "Sarah hasn't committed in 48 hours"—you fix it before it's a crisis
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>✅</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: 15, lineHeight: 1.6 }}>
                    See contribution imbalance instantly, rebalance tasks before demo day
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 18, lineHeight: 1 }}>✅</span>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)', fontSize: 15, lineHeight: 1.6 }}>
                    One dashboard shows who's working, who's stuck—no more chat overload
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ padding: '80px 0', background: 'rgba(255, 255, 255, 0.05)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{
              fontSize: 36,
              fontWeight: 800,
              margin: '0 0 12px',
              color: '#ffffff'
            }}>
              Built for Teams Like Yours
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16 }}>
              From capstone projects to 48-hour hackathons
            </p>
          </div>

          <div className="grid grid-4">
            <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                fontSize: 48,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                &lt;5s
              </div>
              <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Analysis Time</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Instant insights</div>
            </div>

            <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                fontSize: 48,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                100%
              </div>
              <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Free Forever</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>For students</div>
            </div>

            <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                fontSize: 48,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                24/7
              </div>
              <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Real-Time Tracking</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Always updated</div>
            </div>

            <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{
                fontSize: 48,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8
              }}>
                0
              </div>
              <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Setup Required</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Just paste URL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 0 40px',
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="grid grid-4" style={{ marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20
                }}>
                  🛡️
                </div>
                <span style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#ffffff'
                }}>
                  Polaris
                </span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, lineHeight: 1.6 }}>
                Making team collaboration visible for student developers everywhere.
              </p>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Product
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="#features" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: 14, transition: 'color 0.3s' }}>Features</a>
                <a href="#scenarios" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: 14, transition: 'color 0.3s' }}>Scenarios</a>
                <a href="#how-it-works" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: 14, transition: 'color 0.3s' }}>How It Works</a>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Use Cases
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Hackathons</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Capstone Projects</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Group Coursework</span>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Connect
              </h4>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#ffffff',
                  fontWeight: 600
                }}>
                  𝕏
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#ffffff',
                  fontWeight: 600
                }}>
                  in
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  color: '#ffffff',
                  fontWeight: 600
                }}>
                  f
                </div>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: 32,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
              © 2026 Code Style Policeman. Built for WEBATHON.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: 14 }}>Privacy</a>
              <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', fontSize: 14 }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
