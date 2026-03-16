function AISummaryPanel({ summary }) {
  return (
    <section className="card">
      <h3 className="text-title">AI Summary</h3>
      <p className="text-muted">High-level interpretation from the backend insight engine</p>
      <div className="summary" style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>{summary}</p>
      </div>
    </section>
  );
}

export default AISummaryPanel;
