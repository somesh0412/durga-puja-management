const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");

const app = express();
const donationRoutes = require("./src/routes/donationRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const publicRoutes = require("./src/routes/publicRoutes");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Durga Puja Management API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});