/**
 * Extracts issue numbers from commit message
 * Looks for #123 format references
 */
const extractIssueNumbers = (message) => {
  const matches = message.match(/#\d+/g);
  if (!matches) return [];
  return matches.map((m) => parseInt(m.replace("#", ""), 10));
};

/**
 * Analyzes task sync between commits and issues
 */
export const analyzeTaskSync = (commits = [], allIssues = []) => {
  if (!commits || !allIssues) {
    return {
      totalIssues: 0,
      linkedIssues: 0,
      unlinkedOpenIssues: 0,
      closedWithoutCommits: 0,
      issueDetails: []
    };
  }

  // Build commit → issue mapping
  const issueToCommitsMap = {};

  commits.forEach((commit) => {
    const message = commit.commit?.message || "";
    const issueNumbers = extractIssueNumbers(message);

    issueNumbers.forEach((issueNum) => {
      if (!issueToCommitsMap[issueNum]) {
        issueToCommitsMap[issueNum] = [];
      }
      issueToCommitsMap[issueNum].push(commit);
    });
  });

  // Categorize issues
  let linkedIssues = 0;
  let unlinkedOpenIssues = 0;
  let closedWithoutCommits = 0;
  const issueDetails = [];

  allIssues.forEach((issue) => {
    const issueNumber = issue.number;
    const linkedCommits = issueToCommitsMap[issueNumber]?.length || 0;
    const isOpen = issue.state === "open";

    const detail = {
      issueNumber,
      title: issue.title,
      status: issue.state,
      linkedCommits,
      url: issue.html_url
    };

    issueDetails.push(detail);

    // Count metrics
    if (linkedCommits > 0) {
      linkedIssues++;
    } else if (isOpen) {
      unlinkedOpenIssues++;
    } else {
      closedWithoutCommits++;
    }
  });

  // Sort by issue number (descending)
  issueDetails.sort((a, b) => b.issueNumber - a.issueNumber);

  return {
    totalIssues: allIssues.length,
    linkedIssues,
    unlinkedOpenIssues,
    closedWithoutCommits,
    issueDetails
  };
};
