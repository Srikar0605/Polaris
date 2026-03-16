import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

const tokenStore = new Map(); // userId -> GitHub access token

// Step 1: Redirect to GitHub
router.get("/github", (req, res) => {
  const redirectUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=repo user`;

  res.redirect(redirectUrl);
});

// Step 2: GitHub Callback
router.get("/github/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: { Accept: "application/json" }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const user = userResponse.data;

    const jwtToken = jwt.sign(
      {
        id: user.id,
        username: user.login,
        avatar: user.avatar_url,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    tokenStore.set(user.id, accessToken);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    res.redirect(`${frontendUrl}/auth/success?token=${jwtToken}`);
  } catch (error) {
    console.error("OAuth Error:", error.message);
    res.status(500).send("Authentication failed");
  }
});

// Step 3: Fetch User Repos
router.get("/repos", authenticate, async (req, res) => {
  const userId = req.user.id;
  const githubToken = tokenStore.get(userId);

  if (!githubToken) {
    return res.status(401).json({ message: "Session expired" });
  }

  try {
    const reposResponse = await axios.get(
      "https://api.github.com/user/repos",
      {
        headers: {
          Authorization: `Bearer ${githubToken}`
        },
        params: {
          per_page: 100,
          sort: "updated"
        }
      }
    );

    const repos = reposResponse.data.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      updated_at: repo.updated_at
    }));

    res.json({
      user: {
        username: req.user.username,
        avatar: req.user.avatar,
        name: req.user.name
      },
      repos
    });
  } catch (error) {
    console.error("Repo fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch repos" });
  }
});

export default router;
