import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminDashboardPlaceholder() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-cream">
      <Navbar />

      <main className="flex-grow-1 py-5 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <div
                className="card shadow-lg border border-gold rounded-4 p-4 p-md-5 bg-white mx-auto"
                style={{ maxWidth: '520px' }}
              >
                {/* Decorative Icon */}
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center border border-gold mb-3 mx-auto"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'var(--dm-maroon-gradient)',
                    color: 'var(--dm-gold)',
                  }}
                >
                  <span className="fs-2">🛡️</span>
                </div>

                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-cream-warm border border-gold mb-3 mx-auto">
                  <span className="font-cinzel text-maroon fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                    Durga Mata Mitra Mandal 2026
                  </span>
                </div>

                {/* Required Heading & Subtitle */}
                <h1 className="font-cinzel text-maroon-dark fw-bold display-6 mb-2">
                  Admin Dashboard
                </h1>

                <p className="text-muted fs-6 mb-4">
                  Backend authorization will be connected here.
                </p>

                <div className="p-3 rounded-3 bg-cream-warm border border-gold mb-4 text-start small text-secondary">
                  <div className="d-flex align-items-center gap-2 text-maroon fw-semibold mb-2">
                    <span>🔒</span>
                    <span>Upcoming Committee Management Capabilities:</span>
                  </div>
                  <ul className="mb-0 ps-3 d-flex flex-column gap-1">
                    <li>Record cash, UPI, and physical receipts</li>
                    <li>Upload & categorize Puja expenses with vouchers</li>
                    <li>Generate audit-ready reports and financial statements</li>
                    <li>Manage volunteer access & committee verification</li>
                  </ul>
                </div>

                <div>
                  <Link
                    to="/"
                    className="btn btn-maroon px-4 py-2 fw-semibold text-decoration-none shadow-sm"
                  >
                    ← Back to Home
                  </Link>
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

export default AdminDashboardPlaceholder;
