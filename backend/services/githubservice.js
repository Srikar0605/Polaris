import axios from "axios";
import { generateProjectSummary } from "./geminiService.js";
import { analyzeCommitIntelligence } from "./commitClassifier.js";
import { analyzeBranchIntelligence } from "./branchIntelligence.js";
import { analyzeTaskSync } from "./taskSyncEngine.js";
import { analyzeContributorParticipation } from "./contributorParticipation.js";
import { generateStandup } from "./standupGenerator.js";
import { calculateDemoReadiness } from "./demoReadinessEngine.js";
import { detectDuplicateWork } from "./duplicateWorkDetector.js";

// ============================================
// DATA FETCHING MODULE
// ============================================

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json"
});

const extractRepo = (repoUrl) => {
  const parts = repoUrl.split("/");
  return {
    owner: parts[3],
    repo: parts[4]
  };
};

/**
 * Fetches repository basic information
 */
const fetchRepoData = async (owner, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers: getHeaders() }
  );
  return response.data;
};

/**
 * Fetches all contributors for the repository
 */
const fetchContributors = async (owner, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contributors`,
    { headers: getHeaders() }
  );
  return response.data;
};

/**
 * Fetches commits from the last N days
 * Uses pagination to get all commits from the specified time period
 */
const fetchRecentCommits = async (owner, repo, days = 7) => {
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - days);
  const sinceISO = sinceDate.toISOString();

  let allCommits = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          headers: getHeaders(),
          params: {
            per_page: 100,
            page: page,
            since: sinceISO
          }
        }
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        allCommits = allCommits.concat(response.data);
        // If we got less than 100, we've reached the end
        if (response.data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    } catch (error) {
      // If pagination fails, return what we have
      hasMore = false;
    }
  }

  return allCommits;
};

/**
 * Fetches the entire commit history (paginated)
 */
const fetchAllCommits = async (owner, repo) => {
  let allCommits = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          headers: getHeaders(),
          params: {
            per_page: 100,
            page
          }
        }
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        allCommits = allCommits.concat(response.data);

        if (response.data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    } catch (error) {
      hasMore = false;
    }
  }

  return allCommits;
};

/**
 * Fetches all open issues for the repository
 */
const fetchOpenIssues = async (owner, repo) => {
  let allIssues = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          headers: getHeaders(),
          params: {
            state: "open",
            per_page: 100,
            page: page
          }
        }
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        // Filter out pull requests (they appear in issues endpoint)
        const issuesOnly = response.data.filter(
          (item) => !item.pull_request
        );
        allIssues = allIssues.concat(issuesOnly);

        if (response.data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    } catch (error) {
      hasMore = false;
    }
  }

  return allIssues;
};

/**
 * Fetches all closed issues for the repository
 */
const fetchClosedIssues = async (owner, repo) => {
  let allIssues = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          headers: getHeaders(),
          params: {
            state: "closed",
            per_page: 100,
            page: page
          }
        }
      );

      if (response.data.length === 0) {
        hasMore = false;
      } else {
        // Filter out pull requests (they appear in issues endpoint)
        const issuesOnly = response.data.filter(
          (item) => !item.pull_request
        );
        allIssues = allIssues.concat(issuesOnly);

        if (response.data.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    } catch (error) {
      hasMore = false;
    }
  }

  return allIssues;
};

// ============================================
// METRIC COMPUTATION MODULE
// ============================================

/**
 * Calculates team metrics from fetched data
 */
const computeTeamMetrics = (contributors, commits, issues) => {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Total contributors
  const totalContributors = contributors.length;

  // Active/Inactive contributors (based on commits in last 3 days)
  const activeContributorLogins = new Set();
  const contributorCommitCounts = {};
  const contributorLoginSet = new Set(contributors.map((c) => c.login));

  commits.forEach((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    const authorLogin = commit.author?.login || commit.commit.author.name;

    // Only count contributors from the contributors list
    if (commitDate >= threeDaysAgo && contributorLoginSet.has(authorLogin)) {
      activeContributorLogins.add(authorLogin);
    }

    // Count commits per contributor for dominance calculation
    if (contributorLoginSet.has(authorLogin)) {
      contributorCommitCounts[authorLogin] =
        (contributorCommitCounts[authorLogin] || 0) + 1;
    }
  });

  const activeContributors = activeContributorLogins.size;
  const inactiveContributors = totalContributors - activeContributors;

  // Dominance percentage (top contributor share)
  let dominancePercentage = 0;
  if (commits.length > 0) {
    const sortedContributors = Object.entries(contributorCommitCounts).sort(
      (a, b) => b[1] - a[1]
    );
    if (sortedContributors.length > 0) {
      const topContributorCommits = sortedContributors[0][1];
      dominancePercentage = Math.round(
        (topContributorCommits / commits.length) * 100
      );
    }
  }

  // Commit velocity (commits per day over last 7 days)
  const commitsLast7Days = commits.filter((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    return commitDate >= sevenDaysAgo;
  });
  const commitVelocity =
    commitsLast7Days.length > 0
      ? Math.round((commitsLast7Days.length / 7) * 10) / 10
      : 0;

  // Development pace classification
  const developmentPace =
    commitVelocity === 0 ? "Stalled" : commitVelocity < 1 ? "Slow" : "Healthy";

  // Open issues count
  const openIssues = issues.length;

  return {
    totalContributors,
    activeContributors,
    inactiveContributors,
    commitVelocity,
    dominancePercentage,
    openIssues,
    developmentPace
  };
};

// ============================================
// RISK DETECTION MODULE
// ============================================

/**
 * Detects if commit messages are mostly unclear (< 15 characters)
 */
const detectLowClarityCommits = (commits) => {
  if (commits.length === 0) {
    return false;
  }

  let shortMessageCount = 0;

  commits.forEach((commit) => {
    const message = commit.commit.message.trim();
    const firstLine = message.split("\n")[0]; // Get first line only

    if (firstLine.length < 15) {
      shortMessageCount++;
    }
  });

  // Flag if more than 50% of commits are unclear
  const unclearPercentage = (shortMessageCount / commits.length) * 100;
  return unclearPercentage > 50;
};

/**
 * Detects risks based on team metrics and commit messages
 * Returns risks with severity classification
 */
const detectRisks = (metrics, commits) => {
  const risks = [];

  // CRITICAL RISKS

  // Single contributor dependency
  if (metrics.totalContributors === 1) {
    risks.push("Single contributor dependency");
  }

  // Low development activity
  if (metrics.commitVelocity < 0.5) {
    risks.push("Low development activity");
  }

  // Entire team inactive
  if (metrics.activeContributors === 0 && metrics.totalContributors > 1) {
    risks.push("Entire team inactive");
  }

  // MODERATE RISKS

  // Contribution imbalance
  if (metrics.dominancePercentage > 70) {
    risks.push("Contribution imbalance");
  }

  // High unresolved issue load
  if (metrics.openIssues > 20) {
    risks.push("High unresolved issue load");
  }

  // Low clarity commits
  if (detectLowClarityCommits(commits)) {
    risks.push("Low clarity commits");
  }

  return risks;
};

/**
 * Calculates health score (0-100) based on metrics and risks
 */
const calculateHealthScore = (metrics, risks) => {
  let score = 100;

  // Deduct for risks
  score -= risks.length * 15;

  // Deduct for low/no activity
  if (metrics.commitVelocity === 0) {
    score -= 30;
  } else if (metrics.commitVelocity < 0.5) {
    score -= 20;
  }

  // Deduct for team inactivity
  if (metrics.activeContributors === 0 && metrics.totalContributors > 1) {
    score -= 25;
  } else if (metrics.activeContributors / metrics.totalContributors < 0.3) {
    score -= 15;
  }

  // Deduct for contribution imbalance
  if (metrics.dominancePercentage > 70) {
    score -= 15;
  }

  // Deduct for high issue load
  if (metrics.openIssues > 20) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Determines overall status using pace + key risks.
 */
const determineOverallStatus = (risks, developmentPace) => {
  if (risks.includes("Entire team inactive") || developmentPace === "Stalled") {
    return "At Risk";
  }

  if (risks.length >= 2) {
    return "Warning";
  }

  return "On Track";
};

// ============================================
// MAIN ANALYSIS FUNCTION
// ============================================

/**
 * Analyzes a GitHub repository and returns team insights
 */
export const analyzeRepo = async (repoUrl) => {
  const { owner, repo } = extractRepo(repoUrl);

  // Fetch all required data in parallel (recent commits for metrics, allCommits for participation)
  const [
    repoData,
    contributors,
    recentCommits,
    openIssues,
    closedIssues,
    branchIntelligence,
    allCommits
  ] = await Promise.all([
    fetchRepoData(owner, repo),
    fetchContributors(owner, repo),
    fetchRecentCommits(owner, repo, 7), // Last 7 days for velocity
    fetchOpenIssues(owner, repo),
    fetchClosedIssues(owner, repo),
    analyzeBranchIntelligence(owner, repo),
    fetchAllCommits(owner, repo) // full history
  ]);

  // maintain `commits` alias for existing logic that expects recent commits
  const commits = recentCommits;

  // Combine open and closed issues for task sync analysis
  const allIssues = [...openIssues, ...closedIssues];


  // Compute team metrics (use recent commits for velocity + activity)
  const teamMetrics = computeTeamMetrics(contributors, recentCommits, openIssues);

  // Analyze commit intelligence (based on recent commits)
  const commitIntelligence = analyzeCommitIntelligence(recentCommits);

  // Analyze contributor participation (ALL-time commits)
  const contributorParticipation = analyzeContributorParticipation(contributors, allCommits);

  // Analyze task sync (using all issues - open and closed)
  const taskSync = analyzeTaskSync(commits, allIssues);

  // Detect duplicate work (file-level overlap)
  const duplicateWork = await detectDuplicateWork(owner, repo, commits);

  // Detect risks
  const risks = detectRisks(teamMetrics, commits);

  // Determine overall status
  const overallStatus = determineOverallStatus(risks, teamMetrics.developmentPace);

  // Calculate health score
  const healthScore = calculateHealthScore(teamMetrics, risks);

  // Calculate demo readiness
  const demoReadiness = calculateDemoReadiness(teamMetrics, branchIntelligence);

  // Generate AI project manager summary
  let aiProjectSummary = "";
  try {
    aiProjectSummary = await generateProjectSummary(
      repoData.full_name,
      teamMetrics,
      risks,
      overallStatus
    );
  } catch (error) {
    console.error("Failed to generate AI project summary:", error.message);
  }

  // Generate automated stand-up
  let standup = "";
  try {
    const standupResult = await generateStandup(
      repoData.full_name,
      teamMetrics,
      risks,
      commitIntelligence,
      commits
    );
    standup = standupResult.standup;
  } catch (error) {
    console.error("Failed to generate stand-up:", error.message);
    standup = "Stand-up summary unavailable.";
  }

  // Return structured response (no raw arrays)
  return {
    repoName: repoData.full_name,
    teamMetrics,
    risks,
    overallStatus,
    healthScore,
    aiProjectSummary,
    commitIntelligence,
    branchIntelligence,
    taskSync,
    duplicateWork,
    standup,
    demoReadiness
    ,
    contributorParticipation
  };
};
