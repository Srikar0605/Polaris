function StatusLegend() {
  return (
    <section className="card" style={{ padding: "16px 20px" }}>
      <h4 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Status Legend</h4>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontSize: 14, color: "#475569" }}>Healthy / Active</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ca8a04" }} />
          <span style={{ fontSize: 14, color: "#475569" }}>Watch / Slowing</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#dc2626" }} />
          <span style={{ fontSize: 14, color: "#475569" }}>Critical / Inactive</span>
        </div>
      </div>
    </section>
  );
}

export default StatusLegend;
