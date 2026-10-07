function AboutSection() {
  const values = [
    {
      title: "Devotion & Tradition",
      hindi: "भक्ति एवं परंपरा",
      desc: "Upholding sacred Vedic rituals, Mahashtami Aarti, Sindoor Khela, and grand cultural celebrations.",
      icon: "🪔",
    },
    {
      title: "Complete Transparency",
      hindi: "पूर्ण पारदर्शिता",
      desc: "Zero ambiguity in fund management — every contribution and expenditure is digitally accounted.",
      icon: "⚖️",
    },
    {
      title: "Community Unity",
      hindi: "सामुदायिक सेवा",
      desc: "Serving thousands of devotees through daily Mahaprasad distribution, blood donation camps, and seva.",
      icon: "🤝",
    },
  ];

  return (
    <section id="about" className="py-5 bg-cream-warm border-top border-gold">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white border border-gold mb-3 shadow-sm">
              <span style={{ color: 'var(--dm-gold-dark)' }}>🚩</span>
              <span className="font-cinzel text-maroon fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                Community & Devotion
              </span>
            </div>

            <h2 className="font-cinzel fw-bold text-maroon-dark display-6 mb-3">
              About Durga Mata Mitra Mandal
            </h2>

            <p className="lead text-dark mb-4" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
              Durga Mata Mitra Mandal is organizing Durga Puja 2026 with the support and contribution of devotees and community members. This platform helps maintain organized financial records and provides transparency regarding the utilization of Mandal funds.
            </p>

            <div className="p-3 rounded-3 bg-white border border-gold shadow-sm mb-4">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-3">🕊️</span>
                <div>
                  <h5 className="font-cinzel fw-bold text-maroon mb-1 fs-6">
                    Our Core Mission
                  </h5>
                  <p className="small text-muted mb-0">
                    To unite devotees in devotion, celebrate our rich cultural heritage with grandeur, and uphold uncompromised honesty and public transparency in every rupee trusted to us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-4 bg-white border border-gold shadow-sm d-flex align-items-start gap-3"
                >
                  <div
                    className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      background: 'var(--dm-gold-light)',
                      border: '1px solid var(--dm-gold-border)',
                      fontSize: '1.5rem',
                      minWidth: '54px',
                      height: '54px',
                    }}
                  >
                    {val.icon}
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h4 className="font-cinzel fw-bold text-maroon fs-6 mb-0">
                        {val.title}
                      </h4>
                      <span className="badge bg-cream-warm text-muted border border-gold font-cinzel small">
                        {val.hindi}
                      </span>
                    </div>
                    <p className="text-secondary small mb-0 lh-base">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
