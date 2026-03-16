import axios from "axios";

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json"
});

/**
 * Fetches all branches for a repository
 */
const fetchAllBranches = async (owner, repo) => {
  try {
    let allBranches = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/branches`,
          {
            headers: getHeaders(),
            params: {
              per_page: 100,
              page: page
            }
          }
        );

        if (response.data.length === 0) {
          hasMore = false;
        } else {
          allBranches = allBranches.concat(response.data);
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

    return allBranches;
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    return [];
  }
};

/**
 * Fetches the last commit date for a specific branch
 */
const fetchBranchLastCommitDate = async (owner, repo, branch) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: getHeaders(),
        params: {
          sha: branch,
          per_page: 1
        }
      }
    );

    if (response.data && response.data.length > 0) {
      return new Date(response.data[0].commit.author.date);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Calculates days since last commit
 */
const calculateDaysSinceCommit = (commitDate) => {
  if (!commitDate) return null;
  const now = new Date();
  const diffMs = now.getTime() - commitDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return Math.round(diffDays);
};

/**
 * Analyzes branch intelligence for a repository
 */
export const analyzeBranchIntelligence = async (owner, repo) => {
  try {
    const branches = await fetchAllBranches(owner, repo);

    if (!branches || branches.length === 0) {
      return {
        totalBranches: 0,
        branchesBehindMain: 0,
        staleBranches: 0,
        severelyStaleBranches: 0,
        branchDetails: []
      };
    }

    // Find main branch
    const mainBranch = branches.find(
      (b) => b.name === "main" || b.name === "master"
    );

    if (!mainBranch) {
      return {
        totalBranches: branches.length,
        branchesBehindMain: 0,
        staleBranches: 0,
        severelyStaleBranches: 0,
        branchDetails: []
      };
    }

    const mainCommitSha = mainBranch.commit.sha;

    // Fetch last commit dates for all branches in parallel
    const branchDetailsPromises = branches.map(async (branch) => {
      const lastCommitDate = await fetchBranchLastCommitDate(
        owner,
        repo,
        branch.name
      );
      const daysSinceLastCommit = calculateDaysSinceCommit(lastCommitDate);
      const behindMain = branch.commit.sha !== mainCommitSha;

      return {
        name: branch.name,
        behindMain,
        daysSinceLastCommit: daysSinceLastCommit || 0
      };
    });

    const branchDetails = await Promise.all(branchDetailsPromises);

    // Count metrics
    const branchesBehindMain = branchDetails.filter((b) => b.behindMain).length;
    const staleBranches = branchDetails.filter(
      (b) => b.daysSinceLastCommit > 3 && b.daysSinceLastCommit <= 7
    ).length;
    const severelyStaleBranches = branchDetails.filter(
      (b) => b.daysSinceLastCommit > 7
    ).length;

    return {
      totalBranches: branches.length,
      branchesBehindMain,
      staleBranches,
      severelyStaleBranches,
      branchDetails
    };
  } catch (error) {
    console.error("Error analyzing branch intelligence:", error.message);
    return {
      totalBranches: 0,
      branchesBehindMain: 0,
      staleBranches: 0,
      severelyStaleBranches: 0,
      branchDetails: []
    };
  }
};
