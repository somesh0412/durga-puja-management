const Expense = require("../models/Expense");
const Admin = require("../models/Admin");
const uploadToCloudinary = require("../config/cloudinaryUpload");

const addExpense = async (req, res) => {
  
  try {
    const {
      description,
      amount,
      paymentMethod,
      date,
    } = req.body;

    // Validate description
    if (!description || !description.trim()) {
      return res.status(400).json({
        message: "Expense description is required",
      });
    }

    // Validate amount
    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Valid expense amount is required",
      });
    }

    // Validate payment method
    if (!["Cash", "Online"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Payment method must be Cash or Online",
      });
    }

    // Find logged-in admin
    const admin = await Admin.findById(req.admin.adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Committee member not found",
      });
    }

    let billImageUrl = "";

// Upload bill image if provided
    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer
      );

      billImageUrl = uploadResult.secure_url;
  }
    // Create expense
    const expense = await Expense.create({
      description: description.trim(),
      amount: Number(amount),
      paymentMethod,

      billImageUrl,

      addedBy: {
        adminId: admin._id,
        name: `${admin.firstName} ${admin.lastName}`,
      },

      date: date || new Date(),
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("Add expense error:", error);

    res.status(500).json({
      message: "Failed to add expense",
      error: error.message,
    });
  }
};
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("addedBy.adminId", "firstName lastName mobile")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Expenses fetched successfully",
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};

const uploadExpenseReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate receipt file
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a receipt image to upload",
      });
    }

    // Find the existing expense
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Upload receipt to Cloudinary
    const uploadResult = await uploadToCloudinary(
      req.file.buffer
    );

    // Update only the receipt URL
    expense.billImageUrl = uploadResult.secure_url;
    await expense.save();

    return res.status(200).json({
      message: "Receipt uploaded successfully",
      expense,
    });
  } catch (error) {
    console.error("Upload expense receipt error:", error);

    return res.status(500).json({
      message: "Failed to upload receipt",
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  uploadExpenseReceipt,
};