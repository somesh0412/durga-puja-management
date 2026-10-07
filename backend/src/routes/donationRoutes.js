const express = require("express");

const {
  addDonation,
  getDonations,
} = require("../controllers/donationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addDonation);

router.get("/", authMiddleware, getDonations);

module.exports = router;