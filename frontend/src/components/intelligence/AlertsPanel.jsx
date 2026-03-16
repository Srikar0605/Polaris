function AlertsPanel({ alerts }) {
  return (
    <section className="card">
      <h3 className="text-title">Risk Alerts</h3>
      <p className="text-muted">Warnings generated from team activity patterns</p>
      <div className="list" style={{ marginTop: 12 }}>
        {alerts.length === 0 ? (
          <p className="text-subtle" style={{ margin: 0 }}>No major risks detected.</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert} className="alert">
              {alert}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AlertsPanel;
