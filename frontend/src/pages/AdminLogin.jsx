import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin');

  const [signInMobile, setSignInMobile] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpMobile, setSignUpMobile] = useState('');

  const [error, setError] = useState('');

  const handleMobileChange = (value, setter) => {
    const numbersOnly = value.replace(/\D/g, '').slice(0, 10);

    setter(numbersOnly);
    setError('');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  // SIGN IN
  const handleSignIn = async (e) => {
  e.preventDefault();

  if (signInMobile.length !== 10) {
    setError('Please enter a valid 10-digit mobile number.');
    return;
  }

  try {
    setError('');

    const response = await fetch(
      'http://localhost:5000/api/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: signInMobile,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed.');
      return;
    }

    // Store authentication information
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('admin', JSON.stringify(data.admin));

    // Go to dashboard
    navigate('/admin/dashboard');
  } catch (error) {
    console.error('Admin login error:', error);
    setError('Unable to connect to the server. Please try again.');
  }
};

  // SIGN UP
  const handleSignUp = async (e) => {
  e.preventDefault();

  if (!firstName.trim()) {
    setError('Please enter your first name.');
    return;
  }

  if (!lastName.trim()) {
    setError('Please enter your last name.');
    return;
  }

  if (signUpMobile.length !== 10) {
    setError('Please enter a valid 10-digit mobile number.');
    return;
  }

  try {
    setError('');

    const response = await fetch(
      'http://localhost:5000/api/admin/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          mobile: signUpMobile,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Registration failed.');
      return;
    }

    // Store authentication information
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('admin', JSON.stringify(data.admin));

    // Go to dashboard
    navigate('/admin/dashboard');
  } catch (error) {
    console.error('Admin signup error:', error);

    setError(
      'Unable to connect to the server. Please try again.'
    );
  }
};

  return (
    <div className="d-flex flex-column min-vh-100 bg-cream">

      <Navbar />

      <main className="flex-grow-1 py-5">

        <div className="container">

          {/* Back to Home */}
          <div className="row justify-content-center">

            <div className="col-12 col-md-8 col-lg-5">

              <div className="mb-3">
                <Link
                  to="/"
                  className="text-decoration-none text-maroon d-inline-flex align-items-center gap-2 fw-semibold small"
                >
                  <span style={{ fontSize: '18px' }}>←</span>
                  <span>Back to Home</span>
                </Link>
              </div>

              {/* Main Card */}
              <div className="card shadow-lg border border-gold rounded-4 overflow-hidden bg-white">

                {/* Header */}
                <div className="bg-maroon-dark text-center py-4 px-3 border-bottom border-gold">

                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center border border-gold mb-2"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <span className="text-gold fs-3">
                      🛡️
                    </span>
                  </div>

                  <h2 className="font-cinzel text-white fs-4 fw-bold mb-1">
                    Committee Portal
                  </h2>

                  <p className="font-cinzel text-gold-bright small mb-0">
                    Durga Mata Mitra Mandal 2026
                  </p>

                </div>

                {/* Tabs */}
                <div className="px-4 pt-4">

                  <div className="d-flex border-bottom border-gold">

                    <button
                      type="button"
                      onClick={() => switchMode('signin')}
                      className={`flex-fill btn rounded-0 py-3 fw-bold ${
                        mode === 'signin'
                          ? 'text-maroon border-bottom border-3 border-gold'
                          : 'text-muted'
                      }`}
                    >
                      Sign In
                    </button>

                    <button
                      type="button"
                      onClick={() => switchMode('signup')}
                      className={`flex-fill btn rounded-0 py-3 fw-bold ${
                        mode === 'signup'
                          ? 'text-maroon border-bottom border-3 border-gold'
                          : 'text-muted'
                      }`}
                    >
                      Sign Up
                    </button>

                  </div>

                </div>

                {/* Form */}
                <div className="card-body p-4 p-md-5">

                  {mode === 'signin' ? (

                    /* =========================
                       SIGN IN
                    ========================= */

                    <form onSubmit={handleSignIn}>

                      <div className="text-center mb-4">

                        <h3 className="fs-4 fw-bold text-maroon mb-2">
                          Welcome Back
                        </h3>

                        <p className="text-muted small mb-0">
                          Enter your registered mobile number to access
                          the Mandal management portal.
                        </p>

                      </div>

                      <div className="mb-4">

                        <label
                          htmlFor="adminSignInMobile"
                          className="form-label fw-semibold text-secondary"
                        >
                          Registered Mobile Number
                        </label>

                        <div className="input-group input-group-lg border border-gold rounded-3 overflow-hidden">

                          <span className="input-group-text bg-cream-warm border-0 font-cinzel fw-bold text-maroon">
                            +91
                          </span>

                          <input
                            id="adminSignInMobile"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="9876543210"
                            value={signInMobile}
                            onChange={(e) =>
                              handleMobileChange(
                                e.target.value,
                                setSignInMobile
                              )
                            }
                            className="form-control border-0 px-3"
                            autoFocus
                            required
                          />

                        </div>

                        <div className="form-text text-muted mt-2">
                          Enter the 10-digit mobile number registered
                          with the Mandal.
                        </div>

                      </div>

                      {error && (
                        <div className="alert alert-danger py-2 small">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-gold w-100 py-3 fw-bold shadow-sm"
                      >
                        Sign In
                        <span className="ms-2">→</span>
                      </button>

                    </form>

                  ) : (

                    /* =========================
                       SIGN UP
                    ========================= */

                    <form onSubmit={handleSignUp}>

                      <div className="text-center mb-4">

                        <h3 className="fs-4 fw-bold text-maroon mb-2">
                          Register Committee Member
                        </h3>

                        <p className="text-muted small mb-0">
                          Enter your details to register for Mandal
                          management access.
                        </p>

                      </div>

                      {/* First Name */}
                      <div className="mb-3">

                        <label
                          htmlFor="adminFirstName"
                          className="form-label fw-semibold text-secondary"
                        >
                          First Name
                        </label>

                        <input
                          id="adminFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setError('');
                          }}
                          className="form-control form-control-lg border-gold"
                          required
                        />

                      </div>

                      {/* Last Name */}
                      <div className="mb-3">

                        <label
                          htmlFor="adminLastName"
                          className="form-label fw-semibold text-secondary"
                        >
                          Last Name
                        </label>

                        <input
                          id="adminLastName"
                          type="text"
                          placeholder="Enter your last name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setError('');
                          }}
                          className="form-control form-control-lg border-gold"
                          required
                        />

                      </div>

                      {/* Mobile Number */}
                      <div className="mb-4">

                        <label
                          htmlFor="adminSignUpMobile"
                          className="form-label fw-semibold text-secondary"
                        >
                          Mobile Number
                        </label>

                        <div className="input-group input-group-lg border border-gold rounded-3 overflow-hidden">

                          <span className="input-group-text bg-cream-warm border-0 font-cinzel fw-bold text-maroon">
                            +91
                          </span>

                          <input
                            id="adminSignUpMobile"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="9876543210"
                            value={signUpMobile}
                            onChange={(e) =>
                              handleMobileChange(
                                e.target.value,
                                setSignUpMobile
                              )
                            }
                            className="form-control border-0 px-3"
                            required
                          />

                        </div>

                      </div>

                      {error && (
                        <div className="alert alert-danger py-2 small">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-gold w-100 py-3 fw-bold shadow-sm"
                      >
                        Create Account
                        <span className="ms-2">→</span>
                      </button>

                    </form>

                  )}

                  {/* Security Notice */}
                  <div className="mt-4 pt-3 border-top">

                    <div className="d-flex align-items-start gap-2">

                      <span className="text-maroon fs-5">
                        🔒
                      </span>

                      <p
                        className="small text-muted mb-0"
                        style={{ lineHeight: '1.5' }}
                      >
                        <strong>Authorized Access Only:</strong> This
                        portal is intended for authorized Durga Mata
                        Mitra Mandal committee members and volunteers.
                      </p>

                    </div>

                  </div>

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

export default AdminLogin;