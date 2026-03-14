const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

// Set up multer to temporarily store files in /tmp
const upload = multer({ dest: "/tmp" });

const GITHUB_TOKEN = "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"; // from step 2
const REPO = "kosmicar/server_outputs"; // your repo
const BRANCH = "main"; // branch to commit to

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const localPath = req.file.path;
    const fileName = req.file.originalname;
    const fileContent = fs.readFileSync(localPath, { encoding: "base64" });

    const githubPath = `uploads/${fileName}`; // path inside repo

    await axios.put(`https://api.github.com/repos/${REPO}/contents/${githubPath}`, {
      message: `Upload ${fileName} from agent`,
      content: fileContent,
      branch: BRANCH
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "User-Agent": "Node.js"
      }
    });

    // Remove temp file
    fs.unlinkSync(localPath);

    res.json({ status: "ok", file: fileName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
