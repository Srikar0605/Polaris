import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
};

/**
 * Builds a contributor activity summary from commits
 */
const buildContributorActivity = (commits) => {
  const contributorMap = {};

  commits.forEach((commit) => {
    const author = commit.author?.login || commit.commit.author.name;
    const message = commit.commit?.message?.split("\n")[0] || "";

    if (!contributorMap[author]) {
      contributorMap[author] = [];
    }

    contributorMap[author].push(message);
  });

  return contributorMap;
};

/**
 * Formats contributor activity for the prompt
 */
const formatContributorActivity = (contributorMap) => {
  return Object.entries(contributorMap)
    .map(([author, commits]) => {
      const summary = commits.slice(0, 3).join(", ");
      return `- ${author}: ${summary}${commits.length > 3 ? ` (and ${commits.length - 3} more)` : ""}`;
    })
    .join("\n");
};

/**
 * Generates an automated stand-up summary using Gemini
 */
export const generateStandup = async (
  repoName,
  teamMetrics,
  risks,
  commitIntelligence,
  commits
) => {
  try {
    const ai = getClient();

    // Build contributor activity
    const contributorActivity = buildContributorActivity(commits);
    const formattedActivity = formatContributorActivity(contributorActivity);

    // Handle empty activity
    if (commits.length === 0) {
      return {
        standup:
          "Yesterday:\n- No recent activity\n\nToday:\n- Awaiting task assignment\n\nBlockers:\n- Team is inactive"
      };
    }

    // Build risk summary
    const riskList =
      risks.length > 0
        ? risks.map((r) => `- ${r}`).join("\n")
        : "- None identified";

    // Build inactivity summary
    const inactiveCount = teamMetrics.inactiveContributors || 0;
    const inactivityNote =
      inactiveCount > 0
        ? `\nNote: ${inactiveCount} contributor(s) have been inactive for 3+ days.`
        : "";

    const prompt = `You are an engineering manager analyzing team activity for a daily stand-up summary.

Repository: ${repoName}

Team Metrics:
- Total contributors: ${teamMetrics.totalContributors}
- Active contributors: ${teamMetrics.activeContributors}
- Inactive contributors: ${teamMetrics.inactiveContributors}
- Commit velocity: ${teamMetrics.commitVelocity} commits/day
- Development pace: ${teamMetrics.developmentPace}${inactivityNote}

Code Quality:
- Meaningful commits: ${commitIntelligence.meaningfulCommitPercentage}%
- Superficial commits: ${commitIntelligence.superficialCommitPercentage}%

Recent Contributor Activity:
${formattedActivity}

Active Risks:
${riskList}

Generate a concise daily stand-up summary in exactly this format:

Yesterday:
<brief summary of yesterday's work based on commits>

Today:
<realistic expectations for today based on velocity and active contributors>

Blockers:
<list blockers or risks if any, otherwise say "None">

Important rules:
- Be factual. Don't hallucinate tasks not in the commit data.
- Keep it under 150 words total.
- Mention inactive contributors only if relevant to blockers.
- Reference risks from the list above if they impact today.
- Use professional, clear language.
- Output ONLY the stand-up format above. No preamble or explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    const standup = response.text.trim();

    return {
      standup
    };
  } catch (error) {
    console.error("Error generating stand-up:", error.message);
    return {
      standup: "Stand-up summary unavailable."
    };
  }
};
