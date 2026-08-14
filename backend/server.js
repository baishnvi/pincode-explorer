const express = require("express");
const cors = require("cors");
const path = require("path");
const pincodeData = require("./data/bangalorePincodes.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /api/pincode/:code -> returns area name for a Bangalore pincode
app.get("/api/pincode/:code", (req, res) => {
  const { code } = req.params;

  if (!/^\d{6}$/.test(code)) {
    return res.status(400).json({ error: "Pincode must be a 6-digit number." });
  }

  const area = pincodeData[code];

  if (!area) {
    return res.status(404).json({ error: "Pincode not found in Bangalore dataset." });
  }

  return res.json({ pincode: code, area });
});

// GET /api/pincodes -> returns the full list (used to populate suggestions on the frontend)
app.get("/api/pincodes", (req, res) => {
  const list = Object.entries(pincodeData).map(([pincode, area]) => ({
    pincode,
    area,
  }));
  return res.json(list);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Pincode Explorer backend running on http://localhost:${PORT}`);
});
