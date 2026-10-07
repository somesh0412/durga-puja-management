import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddExpense() {
  // Temporary logged-in user.
  // Later this will come automatically from authentication/backend.
  

  const getCurrentDate = () => {
    return new Date().toISOString();
  };

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paymentMethod: '',
    billImageUrl: '',
    date: getCurrentDate(),
  });

  const [billImageFile, setBillImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // Handle normal form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setSuccess('');
  };

  // Handle bill/receipt image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setBillImageFile(null);
      setImagePreview('');
      return;
    }

    // Only allow images
    if (!file.type.startsWith('image/')) {
      setErrors((previous) => ({
        ...previous,
        billImage: 'Please select a valid image file.',
      }));
      return;
    }

    setBillImageFile(file);

    // Temporary browser preview only.
    // This is NOT the permanent image URL.
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setErrors((previous) => ({
      ...previous,
      billImage: '',
    }));

    setSuccess('');
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setBillImageFile(null);
    setImagePreview('');

    // Reset file input
    const fileInput = document.getElementById('billImage');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description =
        'Please enter what the money was spent on.';
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount =
        'Please enter an expense amount greater than 0.';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod =
        'Please select a payment method.';
    }

    return newErrors;
  };

  // Submit
  // Submit expense to backend
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

    if (!token) {
      setErrors({
        submit: 'Your session has expired. Please login again.',
      });
      return;
    }

    const submissionDate = new Date().toISOString();

    const expenseFormData = new FormData();

    expenseFormData.append(
      'description',
      formData.description.trim()
    );

    expenseFormData.append(
      'amount',
      String(Number(formData.amount))
    );

    expenseFormData.append(
      'paymentMethod',
      formData.paymentMethod
    );

    expenseFormData.append(
      'date',
      submissionDate
    );

    // Add bill image only if the user selected one.
    // Backend expects the exact field name: billImage
    if (billImageFile) {
      expenseFormData.append(
        'billImage',
        billImageFile
      );
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/expenses/add`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: expenseFormData,
      }
    );

    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');

      setErrors({
        submit: 'Your session has expired. Please login again.',
      });

      return;
    }

    if (!response.ok) {
      setErrors({
        submit: data.message || 'Failed to add expense.',
      });

      return;
    }

    console.log('Expense added successfully:', data);

    setSuccess(
      'Expense added successfully. The financial records have been updated.'
    );

    // Clear form after successful submission
    setFormData({
      description: '',
      amount: '',
      paymentMethod: '',
      billImageUrl: '',
      date: getCurrentDate(),
    });

    setBillImageFile(null);
    setImagePreview('');

    // Reset file input
    const fileInput = document.getElementById('billImage');

    if (fileInput) {
      fileInput.value = '';
    }

  } catch (error) {
    console.error('Add expense error:', error);

    setErrors({
      submit:
        'Unable to connect to the server. Please make sure the backend is running.',
    });
  }
};

  return (
    <>
    <style>{`
  .expense-submit-btn {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .expense-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }

  .expense-submit-btn:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`}
</style>

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
                      background:
                        'rgba(212, 175, 55, 0.2)',
                      fontSize: '1.6rem',
                    }}
                  >
                    💸
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
                    Add Expense
                  </h1>

                  <p className="text-gold small mb-0">
                    Record an expense made for the Puja.
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

                    {/* Description */}
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="form-label fw-semibold text-maroon"
                      >
                        Expense Description{' '}
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        id="description"
                        name="description"
                        type="text"
                        className={`form-control form-control-lg border-gold ${
                          errors.description
                            ? 'is-invalid'
                            : ''
                        }`}
                        placeholder="Example: Banner"
                        value={formData.description}
                        onChange={handleChange}
                      />

                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}

                      <div className="form-text">
                        Enter the actual item or service. Do not select a category.
                      </div>
                    </div>

                    {/* Amount + Payment */}
                    <div className="row g-4">

                      {/* Amount */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="amount"
                          className="form-label fw-semibold text-maroon"
                        >
                          Expense Amount{' '}
                          <span className="text-danger">*</span>
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
                            className="form-control border-gold"
                          />
                        </div>

                        {errors.amount && (
                          <div className="text-danger small mt-1">
                            {errors.amount}
                          </div>
                        )}
                      </div>

                      {/* Payment Method */}
                      <div className="col-12 col-md-6">
                        <label
                          htmlFor="paymentMethod"
                          className="form-label fw-semibold text-maroon"
                        >
                          Payment Method{' '}
                          <span className="text-danger">*</span>
                        </label>

                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleChange}
                          className="form-select form-select-lg border-gold"
                        >
                          <option value="">
                            Select Payment Method
                          </option>

                          <option value="Cash">
                            Cash
                          </option>

                          <option value="Online">
                            Online
                          </option>
                        </select>

                        {errors.paymentMethod && (
                          <div className="text-danger small mt-1">
                            {errors.paymentMethod}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Receipt / Bill Photo */}
                    <div className="mt-4">
                      <label
                        htmlFor="billImage"
                        className="form-label fw-semibold text-maroon"
                      >
                        Receipt / Bill Photo
                        <span className="text-muted fw-normal">
                          {' '} (Optional)
                        </span>
                      </label>

                      <input
                        id="billImage"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="form-control form-control-lg border-gold"
                      />

                      <div className="form-text">
                        JPG, JPEG, PNG or WEBP. You can add a photo of the physical bill/receipt.
                      </div>

                      {errors.billImage && (
                        <div className="text-danger small mt-1">
                          {errors.billImage}
                        </div>
                      )}

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="mt-3 p-3 rounded-3 border border-gold bg-cream-warm">

                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong className="text-maroon">
                              Selected Receipt
                            </strong>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={handleRemoveImage}
                            >
                              Remove
                            </button>
                          </div>

                          <img
                            src={imagePreview}
                            alt="Receipt preview"
                            className="img-fluid rounded border"
                            style={{
                              maxHeight: '300px',
                              objectFit: 'contain',
                            }}
                          />

                          {billImageFile && (
                            <div className="small text-muted mt-2">
                              File: {billImageFile.name}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Added By */}
                    <div className="mt-4">
                      <label className="form-label fw-semibold text-maroon">
                        Added By
                      </label>

                      <div className="p-3 rounded-3 border border-gold bg-cream-warm">
                        <div className="d-flex align-items-center gap-3">

                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                            style={{
                              width: '45px',
                              height: '45px',
                              background:
                                'var(--dm-gold-light)',
                            }}
                          >
                            👤
                          </div>

                          <div>
                            <div className="small text-muted">
                              Expense entered by
                            </div>

                            <strong className="text-maroon">
                              Logged-in Committee Member
                            </strong>
                          </div>

                        </div>
                      </div>

                      <div className="form-text">
                        This is automatically recorded from your authenticated committee account.
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-4">
                      <label className="form-label fw-semibold text-maroon">
                        Expense Date
                      </label>

                      <div className="p-3 rounded-3 border border-gold bg-cream-warm">
                        <div className="d-flex align-items-center gap-3">

                          <span style={{ fontSize: '1.4rem' }}>
                            📅
                          </span>

                          <div>
                            <div className="small text-muted">
                              Automatically recorded date
                            </div>

                            <strong className="text-maroon">
                              {new Date(
                                formData.date
                              ).toLocaleDateString(
                                'en-IN',
                                {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric',
                                }
                              )}
                            </strong>
                          </div>

                        </div>
                      </div>

                      <div className="form-text">
                        Date is automatically taken from the current system date.
                      </div>
                    </div>

                    {/* No Categories Rule */}
                    <div className="alert alert-warning border-gold rounded-3 mt-4">
                      <div className="fw-bold text-maroon mb-1">
                        ⚠️ No Expense Categories
                      </div>

                      <div className="small text-secondary">
                        Expenses are recorded exactly as entered.
                        For example:
                        <strong> Banner — ₹1,200 </strong>
                        will remain Banner — ₹1,200.
                        The system will not automatically classify it.
                      </div>
                    </div>

                    {/* Future Cloudinary Information */}
                    <div className="p-3 rounded-3 bg-cream-warm border border-gold mb-4">
                      <div className="fw-bold text-maroon mb-1">
                        📷 Receipt Image
                      </div>

                      <div className="small text-secondary">
                        The receipt image will be securely uploaded to Cloudinary
                        and its URL will be stored with this expense record.
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
                        className="btn btn-maroon btn-lg fw-bold flex-fill expense-submit-btn"
                      >
                        Add Expense
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
    </>
  );
}
export default AddExpense;