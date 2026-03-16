import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
};

export const generateProjectSummary = async (
  repoName,
  teamMetrics,
  risks,
  overallStatus
) => {
  const ai = getClient();

  const {
    totalContributors,
    activeContributors,
    inactiveContributors,
    commitVelocity,
    dominancePercentage,
    openIssues
  } = teamMetrics;

  const riskList =
    risks.length > 0 ? risks.map((r) => `- ${r}`).join("\n") : "- None";

  const prompt = `
You are an experienced software project manager.

Repository: ${repoName}

TEAM METRICS:
- Total contributors: ${totalContributors}
- Active contributors (last 3 days): ${activeContributors}
- Inactive contributors: ${inactiveContributors}
- Commit velocity (last 7 days): ${commitVelocity} commits per day
- Top contributor dominance: ${dominancePercentage}% of commits
- Open issues: ${openIssues}

RISKS:
${riskList}

OVERALL STATUS: ${overallStatus}

Write a concise professional summary in 4–6 sentences.
No emojis.
Neutral tone.
No bullet points.
Return only paragraph text.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini project summary error:", error.message);
    return "";
  }
};