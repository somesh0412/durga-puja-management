const express = require("express");

const {
  adminSignup,
  adminLogin,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Protected test route
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Authentication successful",
    admin: req.admin,
  });
});

module.exports = router;