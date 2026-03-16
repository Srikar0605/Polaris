function RepoInput({ repoUrl, setRepoUrl, onAnalyze, isLoading }) {
  return (
    <section className="surface" style={{ padding: "24px 28px" }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>Analyze Your Repository</h2>
        <p className="text-muted" style={{ margin: 0 }}>
          Enter a GitHub repository URL to analyze team health, activity patterns, and collaboration signals.
        </p>
      </div>
      
      <div className="h-row" style={{ alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <label style={{ flex: 1, minWidth: 280 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#475569", display: "block", marginBottom: 8 }}>
            Repository URL
          </span>
          <input
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            placeholder="https://github.com/organization/repository"
            disabled={isLoading}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 10,
              border: "2px solid #cbd5e1",
              padding: "0 14px",
              fontSize: 15,
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
          />
        </label>
        <button 
          className="btn" 
          onClick={onAnalyze} 
          disabled={!repoUrl || isLoading}
          style={{ height: 44, fontSize: 15, fontWeight: 600, paddingLeft: 24, paddingRight: 24 }}
        >
          {isLoading ? "🔄 Analyzing..." : "🚀 Analyze"}
        </button>
      </div>
    </section>
  );
}

export default RepoInput;
