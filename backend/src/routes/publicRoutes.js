const express = require("express");
const { getPublicSummary } = require("../controllers/dashboardController");

const router = express.Router();

// Public financial summary route (no auth required)
router.get("/summary", getPublicSummary);

module.exports = router;

