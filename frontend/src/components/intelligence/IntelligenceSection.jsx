import HealthScoreCard from "./HealthScoreCard";
import ContributorStatus from "./ContributorStatus";
import AlertsPanel from "./AlertsPanel";
import AISummaryPanel from "./AISummaryPanel";
import LoadingSkeleton from "./LoadingSkeleton";
import { generateAlerts } from "./intelligenceUtils";

function IntelligenceSection({ isLoading, error, data }) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div className="error">Unable to analyze repo</div>;
  }

  if (!data) {
    return null;
  }

  const alerts = generateAlerts(data.contributors || []);

  return (
    <section className="grid">
      <div className="grid grid-2">
        <HealthScoreCard score={data.healthScore} />
        <AISummaryPanel summary={data.aiSummary} />
      </div>
      <ContributorStatus contributors={data.contributors || []} />
      <AlertsPanel alerts={alerts} />
    </section>
  );
}

export default IntelligenceSection;
