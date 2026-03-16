import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";
import analyzeRoutes from "./Routes/analyze.js";

dotenv.config();

const app = express();

/*
--------------------------------------------------
1️⃣ Webhook route FIRST (raw body)
--------------------------------------------------
*/

app.post(
  "/webhooks/github",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["x-hub-signature-256"];

    const expectedSignature =
      "sha256=" +
      crypto
        .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET)
        .update(req.body) // raw buffer
        .digest("hex");

    console.log("Received:", signature);
    console.log("Expected:", expectedSignature);

    if (signature !== expectedSignature) {
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(req.body.toString());

    console.log("Webhook verified for:", payload.repository.full_name);

    return res.status(200).send("Webhook received");
  }
);

/*
--------------------------------------------------
2️⃣ THEN enable JSON parsing for rest of app
--------------------------------------------------
*/

app.use(express.json());

// Enable CORS for frontend dev server (adjust FRONTEND_URL in .env if needed)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  })
);

// Mount API routes
app.use("/auth", authRoutes);
app.use("/analyze", analyzeRoutes);

/*
Other routes below this
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});