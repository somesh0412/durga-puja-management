import { Link } from 'react-router-dom';

function AccessCard() {
  return (
    <section id="portals" className="py-5 bg-cream">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-gold-light border border-gold mb-2">
            <span style={{ color: 'var(--dm-gold-dark)' }}>✦</span>
            <span className="font-cinzel text-maroon fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
              Portal Access
            </span>
          </div>
          <h2 className="font-cinzel fw-bold text-maroon-dark display-6 mb-2">
            Select Your Entry Point
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            Whether you are a devotee checking public financial transparency or an authorized committee member managing records, choose your dedicated portal below.
          </p>
        </div>

        {/* Two Large Main Action Cards */}
        <div className="row g-4 justify-content-center">
          {/* CARD 1: PUBLIC FINANCIAL TRANSPARENCY */}
          <div className="col-12 col-lg-6">
            <div className="access-card card-donor">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span
                    className="badge px-3 py-2 rounded-pill font-cinzel fw-bold"
                    style={{
                      background: 'var(--dm-gold-light)',
                      color: 'var(--dm-maroon)',
                      border: '1px solid var(--dm-gold-border)',
                      fontSize: '0.78rem',
                    }}
                  >
                    Public Transparency
                  </span>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: 'var(--dm-maroon)',
                    }}
                  >
                    {/* Devotee / Heart / Hands icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>

                <h3 className="font-cinzel fw-bold text-maroon display-6 mb-2">
                  Devotee Transparency
                </h3>

                <p className="text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                  Explore verified financial records, festival accounts, and transparency metrics for Durga Puja 2026.
                </p>

                <div className="p-3 rounded-3 bg-cream-warm mb-4 border border-gold">
                  <div className="small fw-semibold text-maroon mb-2">Public Devotee Features:</div>
                  <ul className="list-unstyled mb-0 small text-muted d-flex flex-column gap-2">
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-success fw-bold">✓</span>
                      <span>100% public financial accountability & reporting</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-success fw-bold">✓</span>
                      <span>Verified physical receipt book reconciliation</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-success fw-bold">✓</span>
                      <span>Review real-time aggregated Mandal fund status</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <a
                  href="#transparency"
                  className="btn btn-gold w-100 py-3 fs-5 shadow-sm text-center text-decoration-none d-flex align-items-center justify-content-center gap-2"
                >
                  <span>View Transparency</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <div className="text-center mt-2">
                  <small className="text-muted" style={{ fontSize: '0.78rem' }}>
                    🔒 Zero login required — Open financial transparency for all devotees
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: ADMIN / VOLUNTEER */}
          <div className="col-12 col-lg-6">
            <div className="access-card card-admin">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span
                    className="badge px-3 py-2 rounded-pill font-cinzel fw-bold"
                    style={{
                      background: 'rgba(86, 10, 15, 0.1)',
                      color: 'var(--dm-maroon-dark)',
                      border: '1px solid rgba(86, 10, 15, 0.25)',
                      fontSize: '0.78rem',
                    }}
                  >
                    Committee Portal
                  </span>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center border"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--dm-maroon-gradient)',
                      color: 'var(--dm-gold)',
                      borderColor: 'var(--dm-gold)',
                    }}
                  >
                    {/* Admin / Key / Shield icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                  </div>
                </div>

                <h3 className="font-cinzel fw-bold text-maroon-dark display-6 mb-2">
                  Admin / Volunteer
                </h3>

                <p className="text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                  Manage donations, expenses, financial records and Puja reports.
                </p>

                <div className="p-3 rounded-3 bg-cream-warm mb-4 border border-gold">
                  <div className="small fw-semibold text-maroon mb-2">Committee Management Tools:</div>
                  <ul className="list-unstyled mb-0 small text-muted d-flex flex-column gap-2">
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger fw-bold">★</span>
                      <span>Record cash and online donations with physical receipt numbers</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger fw-bold">★</span>
                      <span>Upload & track Puja expenses with bills & vouchers</span>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="text-danger fw-bold">★</span>
                      <span>Generate committee audit summaries & balance sheets</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Link
                  to="/admin/login"
                  className="btn btn-maroon w-100 py-3 fs-5 shadow-sm text-center"
                >
                  <span>Admin Login</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <div className="text-center mt-2">
                  <small className="text-muted" style={{ fontSize: '0.78rem' }}>
                    🛡️ Restricted to authorized Mandal committee volunteers
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccessCard;
