/**
 * Calculates demo readiness score based on key metrics
 * Rule-based, transparent scoring system
 */
export const calculateDemoReadiness = (teamMetrics, branchIntelligence) => {
  // Handle missing inputs gracefully
  if (!teamMetrics || !branchIntelligence) {
    return {
      score: 50,
      status: "Risky",
      details: "Insufficient data for assessment"
    };
  }

  let score = 100;

  // Extract metrics with safe defaults
  const openIssues = teamMetrics.openIssues || 0;
  const commitVelocity = teamMetrics.commitVelocity || 0;
  const activeContributors = teamMetrics.activeContributors || 0;
  const branchesBehindMain = branchIntelligence.branchesBehindMain || 0;
  const staleBranches = branchIntelligence.staleBranches || 0;

  // Apply deductions based on rules
  if (openIssues > 20) {
    score -= 25;
  } else if (openIssues > 10) {
    score -= 15;
  }

  if (commitVelocity < 0.5) {
    score -= 25;
  } else if (commitVelocity < 1) {
    score -= 10;
  }

  if (activeContributors === 0) {
    score -= 30;
  }

  if (branchesBehindMain > 2) {
    score -= 15;
  }

  if (staleBranches > 2) {
    score -= 15;
  }

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Determine status based on score
  let status = "Not Ready";
  if (score >= 75) {
    status = "Ready";
  } else if (score >= 50) {
    status = "Risky";
  }

  return {
    score,
    status
  };
};
