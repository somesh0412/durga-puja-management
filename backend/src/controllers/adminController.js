const Admin = require("../models/Admin");

const jwt = require("jsonwebtoken");

const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, mobile } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !mobile) {
      return res.status(400).json({
        message: "First name, last name and mobile number are required",
      });
    }

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        message: "Mobile number must contain exactly 10 digits",
      });
    }

    // Check whether admin already exists
    const existingAdmin = await Admin.findOne({ mobile });

    if (existingAdmin) {
      return res.status(409).json({
        message: "An account with this mobile number already exists",
      });
    }

    // Create admin
    const admin = await Admin.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      mobile,
    });

    res.status(201).json({
      message: "Admin account created successfully",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error);

    res.status(500).json({
      message: "Failed to create admin account",
      error: error.message,
    });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { mobile } = req.body;

    // Validate mobile
    if (!mobile) {
      return res.status(400).json({
        message: "Mobile number is required",
      });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        message: "Mobile number must contain exactly 10 digits",
      });
    }

    // Find admin by mobile
    const admin = await Admin.findOne({ mobile });

    if (!admin) {
      return res.status(404).json({
        message: "Admin account not found",
      });
    }

    // Check whether account is active
    if (!admin.isActive) {
      return res.status(403).json({
        message: "Admin account is inactive",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Admin login successful",

      token,

      admin: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Admin login failed",
      error: error.message,
    });
  }
};
module.exports = {
  adminSignup,
  adminLogin,
};