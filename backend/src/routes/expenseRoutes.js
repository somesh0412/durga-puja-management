const express = require("express");

const {
  addExpense,
  getExpenses,
  uploadExpenseReceipt,
} = require("../controllers/expenseController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.single("billImage"),
  addExpense
);

router.get("/", authMiddleware, getExpenses);

router.post(
  "/:id/receipt",
  authMiddleware,
  upload.single("billImage"),
  uploadExpenseReceipt
);

module.exports = router;