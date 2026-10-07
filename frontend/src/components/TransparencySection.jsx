function TransparencySection({
  stats = {
    totalDonations: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  },
  error = '',
}) {
  // Format Indian Rupee currency dynamically
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount ?? 0);
  };

  const metrics = [
    {
      id: 'donations',
      title: 'Total Donations',
      value: formatCurrency(stats.totalDonations),
      desc: 'Cumulative contributions from community devotees',
      badge: 'Income Records',
      colorClass: 'text-success',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 18V6"></path>
        </svg>
      ),
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      desc: 'All audited pandal, prasad & puja management costs',
      badge: 'Expenditure Logs',
      colorClass: 'text-maroon',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      ),
    },
    {
      id: 'balance',
      title: 'Remaining Balance',
      value: formatCurrency(stats.remainingBalance),
      desc: 'Current available balance in Mandal accounts',
      badge: 'Closing Treasury',
      colorClass: 'text-gold-dark',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="transparency" className="py-5 bg-cream position-relative">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border border-gold mb-2 shadow-sm">
            <span style={{ color: 'var(--dm-gold-dark)' }}>⚖️</span>
            <span className="font-cinzel text-maroon fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
              Public Accountability
            </span>
          </div>

          <h2 className="font-cinzel fw-bold text-maroon-dark display-6 mb-2">
            Financial Transparency
          </h2>

          <div className="festive-divider">
            <span className="text-gold">✦ ॐ ✦</span>
          </div>

          <p className="text-muted mx-auto" style={{ maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Our goal is to maintain a clear and organized record of donations and expenses throughout Durga Puja 2026.
          </p>
        </div>

        {/* Three Simple Metric Cards */}
        <div className="row g-4 justify-content-center">
          {metrics.map((card) => (
            <div key={card.id} className="col-12 col-md-4">
              <div className="metric-card d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className="badge rounded-pill px-3 py-1 font-cinzel small"
                      style={{
                        background: 'var(--dm-cream-warm)',
                        color: 'var(--dm-maroon-dark)',
                        border: '1px solid var(--dm-gold-border)',
                      }}
                    >
                      {card.badge}
                    </span>
                    <div
                      className="p-2 rounded-circle border border-gold d-flex align-items-center justify-content-center"
                      style={{
                        width: '42px',
                        height: '42px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: 'var(--dm-maroon)',
                      }}
                    >
                      {card.icon}
                    </div>
                  </div>

                  <h3 className="fs-5 fw-bold text-secondary mb-1">
                    {card.title}
                  </h3>

                  {/* Placeholder value ₹0 (ready for backend API) */}
                  <div className="metric-value font-cinzel my-2">
                    {card.value}
                  </div>
                </div>

                <div className="pt-2 border-top border-light-subtle">
                  <small className="text-muted d-block" style={{ fontSize: '0.82rem' }}>
                    {card.desc}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sync note / Error notice */}
        <div className="text-center mt-4">
          {error ? (
            <small className="text-muted d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white border border-gold shadow-sm">
              <span className="text-warning">⚠️</span>
              <span>{error}</span>
            </small>
          ) : (
            <small className="text-muted d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-white border border-gold shadow-sm">
              <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true" style={{ width: '8px', height: '8px' }}></span>
              <span>Financial Summary — Synced with the Mandal Ledger</span>
            </small>
          )}
        </div>
      </div>
    </section>
  );
}

export default TransparencySection;
