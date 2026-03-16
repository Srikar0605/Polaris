/**
 * Classifies a commit message into a category
 */
const classifyCommit = (message) => {
  const msg = message.toLowerCase().trim();

  if (
    msg.includes("feat") ||
    msg.includes("feature") ||
    msg.includes("add ") ||
    msg.includes("implement") ||
    msg.includes("create")
  ) {
    return "feature";
  }

  if (
    msg.includes("fix") ||
    msg.includes("bug") ||
    msg.includes("resolve") ||
    msg.includes("patch") ||
    msg.includes("hotfix")
  ) {
    return "bugfix";
  }

  if (
    msg.includes("refactor") ||
    msg.includes("cleanup") ||
    msg.includes("optimize") ||
    msg.includes("restructure")
  ) {
    return "refactor";
  }

  if (msg.includes("doc") || msg.includes("readme") || msg.includes("comment")) {
    return "docs";
  }

  if (
    msg.includes("chore") ||
    msg.includes("config") ||
    msg.includes("setup") ||
    msg.includes("update deps") ||
    msg.includes("merge")
  ) {
    return "chore";
  }

  return "other";
};

/**
 * Checks if a commit is superficial
 */
const isSuperficialCommit = (message) => {
  const msg = message.toLowerCase().trim();
  const firstLine = msg.split("\n")[0];

  const meaningfulKeywords = [
    "feat",
    "feature",
    "fix",
    "bug",
    "refactor",
    "optimize",
    "implement",
    "add",
    "create"
  ];

  const trivialExactMatches = [
    "update",
    "changes",
    "wip",
    "test",
    "minor",
    "typo"
  ];

  // Exact trivial messages (very low quality)
  if (trivialExactMatches.includes(firstLine)) {
    return true;
  }

  // Very short message AND no meaningful keywords
  if (
    firstLine.length < 8 &&
    !meaningfulKeywords.some((keyword) =>
      firstLine.includes(keyword)
    )
  ) {
    return true;
  }

  return false;
};

/**
 * Analyzes commit intelligence from commit array
 */
export const analyzeCommitIntelligence = (commits) => {
  if (!commits || commits.length === 0) {
    return {
      totalCommits: 0,
      categoryCounts: {
        feature: 0,
        bugfix: 0,
        refactor: 0,
        docs: 0,
        chore: 0,
        other: 0
      },
      meaningfulCommitPercentage: 0,
      superficialCommitPercentage: 0
    };
  }

  const categoryCounts = {
    feature: 0,
    bugfix: 0,
    refactor: 0,
    docs: 0,
    chore: 0,
    other: 0
  };

  let meaningfulCount = 0;
  let superficialCount = 0;

  commits.forEach((commit) => {
    const message = commit.commit?.message || "";
    const category = classifyCommit(message);
    const superficial = isSuperficialCommit(message);

    categoryCounts[category]++;

    if (superficial) {
      superficialCount++;
    } else if (
      category === "feature" ||
      category === "bugfix" ||
      category === "refactor"
    ) {
      meaningfulCount++;
    }
  });

  const totalCommits = commits.length;
  const meaningfulCommitPercentage = Math.round(
    (meaningfulCount / totalCommits) * 100
  );
  const superficialCommitPercentage = Math.round(
    (superficialCount / totalCommits) * 100
  );

  return {
    totalCommits,
    categoryCounts,
    meaningfulCommitPercentage,
    superficialCommitPercentage
  };
};