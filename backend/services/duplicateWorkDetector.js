import axios from "axios";

const getHeaders = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json"
});

/**
 * Detects file-level overlap when multiple contributors modify the same files
 * Analyzes commits from the last 3 days to identify potential duplicate work
 */
export const detectDuplicateWork = async (owner, repo, commits) => {
  // Filter commits to last 3 days only
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const recentCommits = commits.filter((commit) => {
    const commitDate = new Date(commit.commit.author.date);
    return commitDate >= threeDaysAgo;
  });

  if (recentCommits.length === 0) {
    return {
      overlappingFilesCount: 0,
      overlappingFiles: []
    };
  }

  // Map to track which contributors modified each file
  const fileContributorMap = {};

  // Fetch details for each commit to get file changes
  try {
    // Process commits sequentially to avoid rate limiting
    for (const commit of recentCommits) {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`,
          { headers: getHeaders() }
        );

        const files = response.data.files || [];
        const author = commit.author?.login || commit.commit.author.name;

        // Track which contributor modified each file
        files.forEach((file) => {
          const filePath = file.filename;
          if (!fileContributorMap[filePath]) {
            fileContributorMap[filePath] = new Set();
          }
          fileContributorMap[filePath].add(author);
        });
      } catch (error) {
        console.error(`Failed to fetch commit details for ${commit.sha}`);
        // Continue processing other commits
      }
    }

    // Find overlapping files (modified by 2+ contributors)
    const overlappingFiles = Object.entries(fileContributorMap)
      .filter(([, contributors]) => contributors.size >= 2)
      .map(([file, contributors]) => ({
        file,
        contributors: Array.from(contributors)
      }))
      // Sort by number of contributors (descending), then by filename
      .sort((a, b) => {
        if (b.contributors.length !== a.contributors.length) {
          return b.contributors.length - a.contributors.length;
        }
        return a.file.localeCompare(b.file);
      })
      // Limit to first 10 entries for safety
      .slice(0, 10);

    return {
      overlappingFilesCount: overlappingFiles.length,
      overlappingFiles
    };
  } catch (error) {
    console.error("Error detecting duplicate work:", error.message);
    return {
      overlappingFilesCount: 0,
      overlappingFiles: []
    };
  }
};
