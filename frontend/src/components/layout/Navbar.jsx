function Navbar() {
  return (
    <nav style={{
      background: "#1e293b",
      color: "#ffffff",
      padding: "16px 24px",
      borderBottom: "2px solid #3b82f6"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, fontWeight: 800 }}>🔍</span>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Code Style Policeman</h1>
        </div>
        <span style={{ fontSize: 13, color: "#94a3b8" }}>AI-Powered Team Dashboard</span>
      </div>
    </nav>
  );
}

export default Navbar;
