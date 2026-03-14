const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 10000;

app.post("/report", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ status: "ok", received: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
