export function getHealthTone(score) {
  if (score >= 80) {
    return { label: "Healthy", colorClass: "score-green", badgeClass: "badge-green" };
  }
  if (score >= 50) {
    return { label: "Watch", colorClass: "score-yellow", badgeClass: "badge-yellow" };
  }
  return { label: "Critical", colorClass: "score-red", badgeClass: "badge-red" };
}

export function getContributorStatus(lastActiveDays) {
  if (lastActiveDays <= 2) {
    return { label: "Active 🟢", badgeClass: "badge-green" };
  }
  if (lastActiveDays <= 5) {
    return { label: "Slow 🟡", badgeClass: "badge-yellow" };
  }
  return { label: "Inactive 🔴", badgeClass: "badge-red" };
}

export function generateAlerts(contributors = []) {
  const alerts = [];

  contributors.forEach((contributor) => {
    if (contributor.lastActiveDays > 5) {
      alerts.push(`🚨 ${contributor.name} inactive for ${contributor.lastActiveDays} days`);
    }
  });

  const totalCommits = contributors.reduce((sum, contributor) => sum + (contributor.commits || 0), 0);
  if (totalCommits > 0) {
    const topContributor = contributors.reduce((max, contributor) => {
      if (!max || (contributor.commits || 0) > (max.commits || 0)) {
        return contributor;
      }
      return max;
    }, null);

    if (topContributor && (topContributor.commits || 0) / totalCommits > 0.5) {
      alerts.push("⚠ Contribution imbalance detected");
    }
  }

  return alerts;
}
