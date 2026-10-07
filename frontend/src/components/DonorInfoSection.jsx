function DonorInfoSection() {
  const donorCapabilities = [
    {
      id: 1,
      title: "Physical Receipt Accounting",
      desc: "Every contribution corresponds strictly to a physical receipt book voucher issued by the committee.",
      icon: "📜",
    },
    {
      id: 2,
      title: "Hardcopy Verification",
      desc: "Devotees can verify that the physical receipt number issued matches the exact Mandal financial record.",
      icon: "🧾",
    },
    {
      id: 3,
      title: "View Total Mandal Donations",
      desc: "Stay updated on the cumulative collective funds contributed by all devotees for Durga Puja 2026.",
      icon: "💰",
    },
    {
      id: 4,
      title: "View Total Mandal Expenses",
      desc: "Inspect authorized expenses incurred across pandal setup, rituals, prasad, and security.",
      icon: "📊",
    },
    {
      id: 5,
      title: "See How Funds Are Utilized",
      desc: "Review recorded expenditure line items with bill photos and vouchers logged by committee members.",
      icon: "🔍",
    },
    {
      id: 6,
      title: "View Remaining Puja Balance",
      desc: "Monitor the remaining treasury balance in real-time to ensure absolute accountability.",
      icon: "⚖️",
    },
  ];

  return (
    <section id="donor-info" className="py-5 bg-cream-warm border-top border-bottom border-gold">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border border-gold mb-2 shadow-sm">
            <span style={{ color: 'var(--dm-gold-dark)' }}>🪷</span>
            <span className="font-cinzel text-maroon fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
              Devotee Empowerment & Privacy
            </span>
          </div>

          <h2 className="font-cinzel fw-bold text-maroon-dark display-6 mb-2">
            Your Donation. Our Responsibility.
          </h2>

          <div className="festive-divider">
            <span className="text-gold">✦ ॐ ✦</span>
          </div>

          <p className="text-muted mx-auto" style={{ maxWidth: '640px', fontSize: '1.05rem' }}>
            Every rupee offered to Maa Durga is held in sacred trust. We maintain complete financial transparency with physical receipt accountability while fully respecting devotee privacy.
          </p>
        </div>

        {/* 6 Core Devotee Capabilities */}
        <div className="row g-4 mb-5">
          {donorCapabilities.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="p-4 rounded-4 bg-white h-100 border border-gold shadow-sm d-flex flex-column"
                style={{ transition: 'transform 0.2s ease' }}
              >
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '46px',
                      height: '46px',
                      fontSize: '1.4rem',
                      background: 'var(--dm-gold-light)',
                      border: '1px solid var(--dm-gold-border)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h4 className="font-cinzel fw-bold text-maroon fs-6 mb-0">
                    {item.title}
                  </h4>
                </div>
                <p className="text-muted small mb-0 lh-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MANDATORY PRIVACY & CONFIDENTIALITY RULE */}
        <div className="privacy-box shadow-sm">
          <div className="row align-items-center g-4">
            <div className="col-lg-3 text-center text-lg-start">
              <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle bg-white border border-gold shadow-sm mb-2">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="var(--dm-maroon)">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 className="font-cinzel fw-bold text-maroon fs-5 mb-1">
                Devotee Privacy Protected
              </h3>
              <span className="badge bg-maroon text-gold font-cinzel">
                Zero Personal Tracking
              </span>
            </div>

            <div className="col-lg-9">
              <div className="row g-3">
                {/* Never Allowed */}
                <div className="col-md-6">
                  <div className="p-3 rounded-3 bg-white border border-danger-subtle h-100">
                    <div className="d-flex align-items-center gap-2 mb-2 text-danger fw-bold small text-uppercase">
                      <span>✕</span>
                      <span>Devotee Privacy Principles:</span>
                    </div>
                    <ul className="list-unstyled mb-0 small text-secondary d-flex flex-column gap-1">
                      <li>• No phone numbers or mobile contact collected</li>
                      <li>• No passwords, OTPs, or user login required</li>
                      <li>• No third-party data tracking or commercial sharing</li>
                    </ul>
                  </div>
                </div>

                {/* What Donors Can See */}
                <div className="col-md-6">
                  <div className="p-3 rounded-3 bg-white border border-success-subtle h-100">
                    <div className="d-flex align-items-center gap-2 mb-2 text-success fw-bold small text-uppercase">
                      <span>✓</span>
                      <span>Open Financial Transparency:</span>
                    </div>
                    <ul className="list-unstyled mb-0 small text-secondary d-flex flex-column gap-1">
                      <li>• Real-time collective fund collection totals</li>
                      <li>• Transparent ledger of all authorized Puja expenses</li>
                      <li>• Complete treasury balance visibility for the community</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonorInfoSection;
