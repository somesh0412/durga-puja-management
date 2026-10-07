import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddDonation from './pages/AddDonation';
import AddExpense from './pages/AddExpense';
import DonationReport from './pages/DonationReport';
import ExpenseReport from './pages/ExpenseReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin / Committee Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/donations/add"
          element={<AddDonation />}
        />
        <Route
          path="/admin/expenses/add"
          element={<AddExpense />}
        />
        <Route
          path="/admin/reports/donations"
          element={<DonationReport />}
        />
        <Route
          path="/admin/reports/expenses"
          element={<ExpenseReport />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
