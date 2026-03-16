/**
 * Alert Evaluator
 * Determines if webhook analysis results should trigger email alerts
 */

export function shouldTriggerEmailAlert(analysis) {
  const {
    overallStatus,
    demoReadiness,
    branchIntelligence
  } = analysis;

  // Flag alert if any critical condition is met
  const isCriticalStatus = overallStatus?.toLowerCase() === "critical";
  const isDemoNotReady = demoReadiness?.overallScore < 50;
  const hasBranchIssues = branchIntelligence?.branchCount === 0 || 
                          (branchIntelligence?.staleBranches?.length > 0);

  return isCriticalStatus || isDemoNotReady || hasBranchIssues;
}
