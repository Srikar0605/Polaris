import { getHealthTone } from "./intelligenceUtils";

function HealthScoreCard({ score }) {
  const tone = getHealthTone(score);

  return (
    <section className="card">
      <div className="h-row">
        <h3 className="text-title">Health Score</h3>
        <span className={`badge ${tone.badgeClass}`}>{tone.label}</span>
      </div>
      <p className={`score ${tone.colorClass}`}>{score}</p>
      <p className="text-muted">Team momentum and consistency signal</p>
    </section>
  );
}

export default HealthScoreCard;
