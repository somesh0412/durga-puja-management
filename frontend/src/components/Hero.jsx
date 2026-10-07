import { useState } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  // Vite serves public/images/durga-mata.png at /images/durga-mata.png
  const [imgSrc] = useState('/images/durga-mata.png');
  const [imgFailed, setImgFailed] = useState(false);

  const handleImageError = () => {
    // Show clean fallback placeholder if image fails to load
    setImgFailed(true);
  };

  return (
    <section id="top" className="py-5 bg-maroon-gradient text-light position-relative overflow-hidden">
      {/* Decorative background radial pattern */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x w-100 h-100"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Hero Left Content */}
          <div className="col-lg-7 text-center text-lg-start">
            {/* Auspicious Invocation */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 border border-gold"
                 style={{ background: 'rgba(61, 5, 8, 0.65)' }}>
              <span style={{ color: 'var(--dm-gold)', fontSize: '0.85rem' }}>🪔</span>
              <span className="font-cinzel text-gold fw-semibold" style={{ fontSize: '0.82rem', letterSpacing: '0.5px' }}>
                ॥ श्री दुर्गा देव्यै नमः ॥
              </span>
            </div>

            {/* Main Title & Year */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-2">
              <h1 className="font-cinzel fw-bold mb-0 text-white display-5" style={{ letterSpacing: '0.5px' }}>
                Durga Mata Mitra Mandal
              </h1>
              <span
                className="badge font-cinzel fs-5 px-3 py-2 rounded-3 shadow-sm"
                style={{
                  background: 'var(--dm-gold-gradient)',
                  color: 'var(--dm-maroon-deep)',
                  fontWeight: '800',
                  border: '1px solid #fff',
                }}
              >
                2026
              </span>
            </div>

            {/* Main Tagline */}
            <div
              className="font-cinzel text-gold-bright fw-bold fs-3 mb-3 mt-2"
              style={{ letterSpacing: '0.5px' }}
            >
              Donate. Participate. Stay Connected.
            </div>

            {/* Short Description */}
            <p
              className="lead text-light-emphasis mb-4 mx-auto mx-lg-0"
              style={{ maxWidth: '580px', fontSize: '1.12rem', lineHeight: '1.6' }}
            >
              Transparent and digital financial management for Durga Mata Mitra Mandal 2026.
            </p>

            {/* Quick Hero CTAs */}
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3 mb-4">
              <a
                href="#transparency"
                className="btn btn-gold btn-lg px-4 py-3 text-decoration-none d-inline-flex align-items-center justify-content-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                  <path d="M12 18V6"></path>
                </svg>
                <span>View Financial Transparency</span>
              </a>
              <Link to="/admin/login" className="btn btn-maroon btn-lg px-4 py-3 d-inline-flex align-items-center justify-content-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span>Admin Login</span>
              </Link>
            </div>

            {/* Key Trust Pillars */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-4 pt-3 border-top border-gold"
                 style={{ borderColor: 'rgba(212, 175, 55, 0.25) !important' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="text-gold">✓</span>
                <small className="text-light-emphasis fw-medium">Real-time Fund Tracking</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-gold">✓</span>
                <small className="text-light-emphasis fw-medium">Physical Receipt Sync</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="text-gold">✓</span>
                <small className="text-light-emphasis fw-medium">Strict Devotee Privacy</small>
              </div>
            </div>
          </div>

          {/* Hero Right: Durga Mata Image with Elegant Framing / Fallback Placeholder */}
          <div className="col-lg-5 text-center">
            <div className="durga-frame-wrapper mx-auto">
              <div className="durga-frame-inner">
                {!imgFailed ? (
                  <img
                    src={imgSrc}
                    alt="Durga Mata Mitra Mandal 2026"
                    className="durga-hero-img"
                    onError={handleImageError}
                  />
                ) : (
                  /* Visually Attractive Fallback Placeholder (clean, no dev instructions) */
                  <div className="durga-placeholder" role="region" aria-label="Durga Mata Sacred Deity Placeholder">
                    <div className="halo-ring">
                      {/* Sacred Trishul & Lotus Motif */}
                      <svg width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V22" stroke="var(--dm-gold)" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M7 6C7 11 12 13 12 13C12 13 17 11 17 6" stroke="var(--dm-gold)" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="4" r="1.5" fill="var(--dm-gold)"/>
                        <circle cx="7" cy="6" r="1.2" fill="var(--dm-gold)"/>
                        <circle cx="17" cy="6" r="1.2" fill="var(--dm-gold)"/>
                        <path d="M9 18H15" stroke="var(--dm-gold)" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M10 21H14" stroke="var(--dm-gold)" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>

                    <div className="font-cinzel text-gold fw-bold fs-5 mb-1">
                      ॥ माँ दुर्गा प्रसन्न ॥
                    </div>
                    <div className="font-cinzel text-gold-bright small fw-semibold mb-2">
                      Durga Mata Mitra Mandal 2026
                    </div>
                    <p className="text-light-emphasis small px-3 mb-0" style={{ fontSize: '0.85rem' }}>
                      "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता । नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥"
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <small className="text-light-emphasis fst-italic" style={{ fontSize: '0.78rem' }}>
                ॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके । शरण्ये त्र्यंबके गौरी नारायणि नमोऽस्तु ते ॥
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
