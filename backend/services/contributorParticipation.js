export const analyzeContributorParticipation = (contributors, commits) => {
  if (!contributors || !commits) return [];

  const now = new Date();

  const participationMap = {};

  contributors.forEach((c) => {
    participationMap[c.login] = {
      login: c.login,
      totalCommits: 0,
      commitsLast3Days: 0,
      daysSinceLastCommit: null,
      participationPercentage: 0
    };
  });

  commits.forEach((commit) => {
    const login = commit.author?.login;
    if (!login || !participationMap[login]) return;

    const commitDate = new Date(commit.commit.author.date);
    const daysAgo =
      (now - commitDate) / (1000 * 60 * 60 * 24);

    participationMap[login].totalCommits++;

    if (daysAgo <= 3) {
      participationMap[login].commitsLast3Days++;
    }

    if (
      participationMap[login].daysSinceLastCommit === null ||
      daysAgo < participationMap[login].daysSinceLastCommit
    ) {
      participationMap[login].daysSinceLastCommit = Math.floor(daysAgo);
    }
  });

  const totalCommitsAll = commits.length || 1;

  Object.values(participationMap).forEach((p) => {
    p.participationPercentage = Math.round(
      (p.totalCommits / totalCommitsAll) * 100
    );
  });

  return Object.values(participationMap).sort(
    (a, b) => b.totalCommits - a.totalCommits
  );
};
