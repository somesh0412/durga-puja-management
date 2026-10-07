import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalDonations: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const adminActions = [
    {
      id: 'add-donation',
      title: 'Add Donation',
      desc: 'Record a new donation collected by the Mandal.',
      btnText: 'Add Donation',
      path: '/admin/donations/add',
      icon: '💰',
      badge: 'Donation Entry',
      badgeColor: 'text-success bg-white border border-success-subtle',
      btnClass: 'btn-gold',
    },
    {
      id: 'add-expense',
      title: 'Add Expense',
      desc: 'Record an expense made for the Puja.',
      btnText: 'Add Expense',
      path: '/admin/expenses/add',
      icon: '💸',
      badge: 'Expense Entry',
      badgeColor: 'text-danger bg-white border border-danger-subtle',
      btnClass: 'btn-maroon',
    },
    {
      id: 'donation-report',
      title: 'Donation Report',
      desc: 'View donation records and donation summary.',
      btnText: 'View Donation Report',
      path: '/admin/reports/donations',
      icon: '📋',
      badge: 'Accounts Audit',
      badgeColor: 'text-maroon bg-white border border-gold',
      btnClass: 'btn-outline-secondary',
    },
    {
      id: 'expense-report',
      title: 'Expense Report',
      desc: 'View recorded expenses and expense summary.',
      btnText: 'View Expense Report',
      path: '/admin/reports/expenses',
      icon: '📊',
      badge: 'Expenditure Logs',
      badgeColor: 'text-maroon bg-white border border-gold',
      btnClass: 'btn-outline-secondary',
    },
  ];

  // Fetch dashboard financial summary
  useEffect(() => {
    const fetchDashboardSummary = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(
          `${API_BASE}/api/dashboard/summary`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('admin');
            navigate('/admin/login');
            return;
          }

          throw new Error(
            data.message || 'Failed to fetch dashboard summary'
          );
        }

        setSummary(data.summary);
      } catch (error) {
        console.error('Dashboard summary error:', error);
        setError(
          error.message ||
            'Unable to load dashboard financial summary.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');

    navigate('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-cream">
      <Navbar />

      <main className="flex-grow-1 py-4 py-md-5">
        <div className="container">

          {/* HEADER */}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom border-gold">
            <div>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border border-gold mb-2 shadow-sm">
                <span style={{ color: 'var(--dm-gold-dark)' }}>
                  🛡️
                </span>

                <span
                  className="font-cinzel text-maroon fw-bold small text-uppercase"
                  style={{ letterSpacing: '0.8px' }}
                >
                  Durga Mata Mitra Mandal 2026
                </span>
              </div>

              <h1 className="font-cinzel fw-bold text-maroon-dark display-6 mb-1">
                Committee Dashboard
              </h1>

              <p className="text-secondary small mb-0">
                Manage donations, expenses and financial records of the Mandal.
              </p>
            </div>

            {/* SESSION */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="px-3 py-2 rounded-3 bg-white border border-gold shadow-sm d-flex align-items-center gap-2">
                <span className="text-maroon">🛡️</span>

                <div className="small">
                  <span
                    className="text-muted d-block"
                    style={{ fontSize: '0.72rem' }}
                  >
                    Committee Session
                  </span>

                  <strong className="text-maroon">
                    Authorized Access
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-secondary btn-sm px-3 py-2"
              >
                Sign Out
              </button>

              <Link
                to="/"
                className="btn btn-maroon btn-sm px-3 py-2 shadow-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>

          {/* FINANCIAL SUMMARY */}
          <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="font-cinzel text-maroon-dark fw-bold fs-4 mb-1">
                  Financial Overview
                </h2>

                <p className="text-secondary small mb-0">
                  Current financial position of Durga Mata Mitra Mandal.
                </p>
              </div>

              {!loading && !error && (
                <span className="badge rounded-pill text-success bg-white border border-success-subtle px-3 py-2">
                  Live Data
                </span>
              )}
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <div className="row g-4">

              {/* TOTAL DONATIONS */}
              <div className="col-12 col-md-4">
                <div className="bg-white rounded-4 border border-gold shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-secondary small fw-semibold mb-2">
                        TOTAL DONATIONS
                      </p>

                      <h3 className="font-cinzel text-success fw-bold mb-1">
                        {loading
                          ? 'Loading...'
                          : formatCurrency(summary.totalDonations)}
                      </h3>

                      <p className="text-muted small mb-0">
                        Money received by the Mandal
                      </p>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                      style={{
                        width: '52px',
                        height: '52px',
                        background: 'var(--dm-gold-light)',
                        fontSize: '1.5rem',
                      }}
                    >
                      💰
                    </div>
                  </div>
                </div>
              </div>

              {/* TOTAL EXPENSES */}
              <div className="col-12 col-md-4">
                <div className="bg-white rounded-4 border border-gold shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-secondary small fw-semibold mb-2">
                        TOTAL EXPENSES
                      </p>

                      <h3 className="font-cinzel text-danger fw-bold mb-1">
                        {loading
                          ? 'Loading...'
                          : formatCurrency(summary.totalExpenses)}
                      </h3>

                      <p className="text-muted small mb-0">
                        Money spent for the Puja
                      </p>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                      style={{
                        width: '52px',
                        height: '52px',
                        background: 'var(--dm-gold-light)',
                        fontSize: '1.5rem',
                      }}
                    >
                      💸
                    </div>
                  </div>
                </div>
              </div>

              {/* REMAINING BALANCE */}
              <div className="col-12 col-md-4">
                <div className="bg-maroon-dark rounded-4 border border-gold shadow-sm p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="text-gold small fw-semibold mb-2">
                        REMAINING BALANCE
                      </p>

                      <h3 className="font-cinzel text-white fw-bold mb-1">
                        {loading
                          ? 'Loading...'
                          : formatCurrency(summary.remainingBalance)}
                      </h3>

                      <p className="text-white-50 small mb-0">
                        Donations minus expenses
                      </p>
                    </div>

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                      style={{
                        width: '52px',
                        height: '52px',
                        background: 'rgba(212, 175, 55, 0.2)',
                        fontSize: '1.5rem',
                      }}
                    >
                      🏦
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="mb-5">
            <div className="mb-3">
              <h2 className="font-cinzel text-maroon-dark fw-bold fs-4 mb-1">
                Quick Actions
              </h2>

              <p className="text-secondary small mb-0">
                Manage the Mandal's financial records.
              </p>
            </div>

            <div className="row g-4">
              {adminActions.map((action) => (
                <div
                  key={action.id}
                  className="col-12 col-md-6"
                >
                  <div className="access-card bg-white p-4 h-100 rounded-4 border border-gold shadow-sm d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span
                          className={`badge rounded-pill px-3 py-1 font-cinzel small ${action.badgeColor}`}
                        >
                          {action.badge}
                        </span>

                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                          style={{
                            width: '48px',
                            height: '48px',
                            background: 'var(--dm-gold-light)',
                            fontSize: '1.5rem',
                          }}
                        >
                          {action.icon}
                        </div>
                      </div>

                      <h2 className="font-cinzel text-maroon-dark fw-bold fs-4 mb-2">
                        {action.title}
                      </h2>

                      <p
                        className="text-secondary mb-4"
                        style={{
                          fontSize: '0.98rem',
                          lineHeight: '1.6',
                        }}
                      >
                        {action.desc}
                      </p>
                    </div>

                    <Link
                      to={action.path}
                      className={`btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm ${action.btnClass}`}
                    >
                      <span>{action.btnText}</span>

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                        />

                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AUDIT NOTICE */}
          <div className="privacy-box shadow-sm mb-4">
            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center border border-gold flex-shrink-0"
                style={{
                  width: '42px',
                  height: '42px',
                  background: 'var(--dm-gold-light)',
                  color: 'var(--dm-maroon)',
                }}
              >
                <span className="fs-5">⚖️</span>
              </div>

              <div>
                <h3 className="font-cinzel fw-bold text-maroon fs-6 mb-1">
                  Financial Transparency & Audit Responsibility
                </h3>

                <p className="text-secondary small mb-2 lh-base">
                  Every donation received and expense logged here directly
                  influences the public transparency figures viewed by
                  devotees. Ensure all physical receipt numbers and payment
                  receipts are accounted for accurately.
                </p>

                <div
                  className="small text-muted border-top border-light-subtle pt-2"
                  style={{ fontSize: '0.78rem' }}
                >
                  <strong>Security Note:</strong> Financial records are
                  protected through authenticated committee access.
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

export default AdminDashboard;