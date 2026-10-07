const Donation = require("../models/Donation");

const addDonation = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      amount,
      receiptNo,
      paymentMethod,
      date,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !firstName.trim() ||
      !lastName ||
      !lastName.trim() ||
      !amount ||
      !receiptNo ||
      !receiptNo.trim() ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Check payment method
    if (!["Cash", "Online"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Payment method must be Cash or Online",
      });
    }

    // Check amount
    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Donation amount must be greater than 0",
      });
    }

    // Create donation directly without donor lookup or mobile number
    const donation = await Donation.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      amount: Number(amount),
      receiptNo: receiptNo.trim(),
      paymentMethod,
      date: date || new Date(),
    });

    res.status(201).json({
      message: "Donation added successfully",
      donation,
    });
  } catch (error) {
    console.error("Add donation error:", error);

    res.status(500).json({
      message: "Failed to add donation",
      error: error.message,
    });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });

    res.status(200).json({
      message: "Donations fetched successfully",
      count: donations.length,
      donations,
    });
  } catch (error) {
    console.error("Get donations error:", error);

    res.status(500).json({
      message: "Failed to fetch donations",
      error: error.message,
    });
  }
};

module.exports = {
  addDonation,
  getDonations,
};