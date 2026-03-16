import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const owner = "facebook";
const repo = "react";

const fetchRepo = async () => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      },
    }
  );

  console.log(response.data.full_name);
};

fetchRepo();