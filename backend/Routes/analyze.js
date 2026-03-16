import express from "express";
import { analyzeRepo } from "../services/githubService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const result = await analyzeRepo(repoUrl);

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;