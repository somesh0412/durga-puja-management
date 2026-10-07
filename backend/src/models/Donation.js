const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    receiptNo: {
      type: String,
      required: true,
      trim: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Online"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);