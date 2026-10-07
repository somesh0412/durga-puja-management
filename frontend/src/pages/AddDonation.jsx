import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddDonation() {
  // Get current date automatically
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    amount: '',
    physicalReceiptNumber: '',
    paymentMethod: '',
    date: getCurrentDate(),
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error for the field being edited
    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setSuccess('');
  };

  // Validate form (no mobile number)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter the first name.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter the last name.';
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a donation amount greater than 0.';
    }

    if (!formData.physicalReceiptNumber.trim()) {
      newErrors.physicalReceiptNumber = 'Please enter the physical receipt number.';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
    }

    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess('');

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});

      const token = localStorage.getItem('adminToken');

      // User must be authenticated
      if (!token) {
        setErrors({
          submit: 'Your session has expired. Please login again.',
        });
        return;
      }

      // Get current date/time at submission
      const submissionDate = new Date().toISOString();

      // Convert frontend field names to backend field names (no mobile)
      const donationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        amount: Number(formData.amount),
        receiptNo: formData.physicalReceiptNumber.trim(),
        paymentMethod: formData.paymentMethod,
        date: submissionDate,
      };

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_BASE}/api/donations/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      // Authentication failed
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');

        setErrors({
          submit: 'Your session has expired. Please login again.',
        });
        return;
      }

      // Backend validation/error
      if (!response.ok) {
        setErrors({
          submit: data.message || 'Failed to add donation.',
        });
        return;
      }

      // Successful donation
      setSuccess('Donation added successfully. The financial records have been updated.');

      // Clear form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        amount: '',
        physicalReceiptNumber: '',
        paymentMethod: '',
        date: getCurrentDate(),
      });
    } catch (error) {
      console.error('Add donation error:', error);

      setErrors({
        submit: 'Unable to connect to the server. Please make sure the backend is running.',
      });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-cream">
      <Navbar />

      <main className="flex-grow-1 py-4 py-md-5">
        <div className="container">
          {/* Back to Dashboard */}
          <div className="mb-3">
            <Link
              to="/admin/dashboard"
              className="text-decoration-none text-maroon d-inline-flex align-items-center gap-2 fw-semibold small"
            >
              <span style={{ fontSize: '18px' }}>←</span>
              <span>Back to Admin Dashboard</span>
            </Link>
          </div>

          {/* Main Card */}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="card shadow-lg border border-gold rounded-4 overflow-hidden bg-white">
                {/* Header */}
                <div
                  className="text-center py-4 px-3 border-bottom border-gold"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 25%, #560a0f 0%, #3d0508 100%)',
                  }}
                >
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center border border-gold mb-2"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'rgba(212, 175, 55, 0.2)',
                      fontSize: '1.6rem',
                    }}
                  >
                    💰
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                    <span className="text-gold">✦</span>
                    <span
                      className="font-cinzel text-gold-bright small fw-bold text-uppercase"
                      style={{ letterSpacing: '1px' }}
                    >
                      Durga Mata Mitra Mandal 2026
                    </span>
                    <span className="text-gold">✦</span>
                  </div>

                  <h1 className="font-cinzel text-white fs-3 fw-bold mb-1">
                    Add Donation
                  </h1>

                  <p className="text-gold small mb-0">
                    Record a donation collected by the Mandal.
                  </p>
                </div>

                {/* Form */}
                <div className="card-body p-4 p-md-5">
                  {success && (
                    <div className="alert alert-success border-success mb-4">
                      <strong>Success:</strong> {success}
                    </div>
                  )}

                  {errors.submit && (
                    <div className="alert alert-danger border-danger mb-4">
                      <strong>Error:</strong> {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* First Name + Last Name */}
                    <div className="row g-4 mb-3">
                      {/* First Name */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="firstName"
                          className="form-label fw-semibold text-maroon"
                        >
                          First Name <span className="text-danger">*</span>
                        </label>

                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className={`form-control form-control-lg border-gold ${
                            errors.firstName ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />

                        {errors.firstName && (
                          <div className="invalid-feedback">
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="lastName"
                          className="form-label fw-semibold text-maroon"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>

                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className={`form-control form-control-lg border-gold ${
                            errors.lastName ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />

                        {errors.lastName && (
                          <div className="invalid-feedback">
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Amount + Payment Method */}
                    <div className="row g-4 mb-3">
                      {/* Amount */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="amount"
                          className="form-label fw-semibold text-maroon"
                        >
                          Donation Amount <span className="text-danger">*</span>
                        </label>

                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-cream-warm border-gold fw-bold text-maroon">
                            ₹
                          </span>

                          <input
                            id="amount"
                            name="amount"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`form-control border-gold ${
                              errors.amount ? 'is-invalid' : ''
                            }`}
                          />

                          {errors.amount && (
                            <div className="invalid-feedback">
                              {errors.amount}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="paymentMethod"
                          className="form-label fw-semibold text-maroon"
                        >
                          Payment Method <span className="text-danger">*</span>
                        </label>

                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className={`form-select form-select-lg border-gold ${
                            errors.paymentMethod ? 'is-invalid' : ''
                          }`}
                        >
                          <option value="">Select Payment Method</option>
                          <option value="Cash">Cash</option>
                          <option value="Online">Online</option>
                        </select>

                        {errors.paymentMethod && (
                          <div className="invalid-feedback">
                            {errors.paymentMethod}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Physical Receipt + Automatic Date */}
                    <div className="row g-4 mb-3">
                      {/* Physical Receipt */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="physicalReceiptNumber"
                          className="form-label fw-semibold text-maroon"
                        >
                          Physical Receipt / Bill No.{' '}
                          <span className="text-danger">*</span>
                        </label>

                        <input
                          id="physicalReceiptNumber"
                          name="physicalReceiptNumber"
                          type="text"
                          className={`form-control form-control-lg border-gold ${
                            errors.physicalReceiptNumber ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter receipt number"
                          value={formData.physicalReceiptNumber}
                          onChange={handleChange}
                        />

                        {errors.physicalReceiptNumber && (
                          <div className="invalid-feedback">
                            {errors.physicalReceiptNumber}
                          </div>
                        )}

                        <div className="form-text">
                          Enter the number printed on the physical receipt.
                        </div>
                      </div>

                      {/* Automatic Date */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-maroon">
                          Donation Date
                        </label>

                        <div className="p-3 rounded-3 border border-gold bg-cream-warm">
                          <div className="d-flex align-items-center gap-2">
                            <span style={{ fontSize: '1.3rem' }}>📅</span>
                            <div>
                              <div className="small text-muted">
                                Automatically recorded date
                              </div>
                              <strong className="text-maroon">
                                {new Date(formData.date).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="form-text">
                          Date is automatically taken from the current system date.
                        </div>
                      </div>
                    </div>

                    {/* Receipt Rule Notice */}
                    <div className="alert alert-warning border-gold rounded-3 my-4">
                      <div className="fw-bold text-maroon mb-1">
                        ⚠️ Physical Receipt Number Rule
                      </div>
                      <div className="small text-secondary">
                        Enter the receipt number already printed on the physical donation receipt book.
                        The system will <strong>NEVER</strong> auto-generate a receipt number.
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                      <Link
                        to="/admin/dashboard"
                        className="btn btn-outline-secondary btn-lg flex-fill"
                      >
                        ← Back to Dashboard
                      </Link>

                      <button
                        type="submit"
                        className="btn btn-gold btn-lg fw-bold flex-fill"
                      >
                        Add Donation
                        <span className="ms-2">→</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AddDonation;