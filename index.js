const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Where uploaded images will be saved
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Received file:", req.file.originalname);
  // Move/rename file if needed
  const targetPath = path.join(__dirname, "uploads", req.file.originalname);
  fs.rename(req.file.path, targetPath, (err) => {
    if (err) return res.status(500).send("Error saving file");
    res.send({ status: "ok", file: req.file.originalname });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
