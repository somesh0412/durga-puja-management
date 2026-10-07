const Donation = require("../models/Donation");
const Expense = require("../models/Expense");

// Shared MongoDB aggregation logic for financial totals
const calculateFinancialSummary = async () => {
  // Calculate total donations
  const donationResult = await Donation.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  // Calculate total expenses
  const expenseResult = await Expense.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalDonations =
    donationResult.length > 0 ? donationResult[0].total : 0;

  const totalExpenses =
    expenseResult.length > 0 ? expenseResult[0].total : 0;

  const remainingBalance = totalDonations - totalExpenses;

  return {
    totalDonations,
    totalExpenses,
    remainingBalance,
  };
};

// Protected admin dashboard summary
const getDashboardSummary = async (req, res) => {
  try {
    const summary = await calculateFinancialSummary();

    res.status(200).json({
      message: "Dashboard summary fetched successfully",
      summary,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    res.status(500).json({
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};

// Public aggregate financial summary (no authentication required)
const getPublicSummary = async (req, res) => {
  try {
    const summary = await calculateFinancialSummary();

    res.status(200).json({
      message: "Public financial summary fetched successfully",
      summary,
    });
  } catch (error) {
    console.error("Public summary error:", error);

    res.status(500).json({
      message: "Failed to fetch public financial summary",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
  getPublicSummary,
};