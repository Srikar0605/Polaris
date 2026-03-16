/**
 * Email Service
 * Handles sending alert emails for webhook-triggered analysis
 * 
 * LOCAL DEV MODE: Logs emails to console instead of sending
 */

export async function sendRiskAlertEmail(analysisData) {
  const {
    repoName,
    overallStatus,
    demoReadiness,
    branchIntelligence
  } = analysisData;

  const emailContent = {
    to: process.env.ALERT_EMAIL || "admin@example.com",
    subject: `🚨 Risk Alert: ${repoName}`,
    timestamp: new Date().toISOString(),
    analysis: {
      repoName,
      overallStatus,
      demoReadiness: demoReadiness?.overallScore || "N/A",
      branchCount: branchIntelligence?.branchCount || 0,
      staleBranches: branchIntelligence?.staleBranches?.length || 0
    }
  };

  // In dev mode, log to console (can be extended to send emails via Nodemailer)
  if (process.env.NODE_ENV !== "production") {
    console.log("\n📧 EMAIL ALERT (DEV MODE):");
    console.log("================================");
    console.log(`To: ${emailContent.to}`);
    console.log(`Subject: ${emailContent.subject}`);
    console.log(`Timestamp: ${emailContent.timestamp}`);
    console.log("\nAnalysis Summary:");
    console.log(JSON.stringify(emailContent.analysis, null, 2));
    console.log("================================\n");
  } else {
    // In production, integrate Nodemailer or your email service here
    console.log("⚠ Email sending not configured in production");
  }

  return { success: true };
}
