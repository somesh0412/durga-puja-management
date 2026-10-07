import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-maroon-dark text-light border-top border-gold pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 justify-content-between mb-4">
          {/* Mandal Brand & Motto */}
          <div className="col-12 col-md-6 col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="text-gold fs-4">ॐ</span>
              <h3 className="font-cinzel text-gold fw-bold fs-4 mb-0">
                Durga Mata Mitra Mandal 2026
              </h3>
            </div>

            <p
              className="font-cinzel text-gold-bright fw-semibold fs-6 mb-3 fst-italic"
              style={{ letterSpacing: '0.5px' }}
            >
              "Together in devotion, transparency and community."
            </p>

            <p className="text-light-emphasis small mb-3" style={{ lineHeight: '1.7', maxWidth: '420px' }}>
              Dedicated to celebrating Durga Puja 2026 with religious sanctity, social service, and an uncompromising standard of public financial transparency for every devotee.
            </p>

            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-gold"
                 style={{ background: 'rgba(0,0,0,0.3)', fontSize: '0.78rem' }}>
              <span className="text-gold">🛡️</span>
              <span className="text-light-emphasis">Official Digital Management Portal</span>
            </div>
          </div>

          {/* Quick Portal Navigation */}
          <div className="col-6 col-md-3 col-lg-3">
            <h4 className="font-cinzel text-gold fs-6 fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
              Portals & Services
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/admin/login" className="text-light-emphasis text-decoration-none hover-gold d-inline-flex align-items-center gap-1">
                  <span>→</span>
                  <span>Committee Member Login</span>
                </Link>
              </li>
              <li>
                <a href="#transparency" className="text-light-emphasis text-decoration-none hover-gold d-inline-flex align-items-center gap-1">
                  <span>→</span>
                  <span>Financial Transparency</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-light-emphasis text-decoration-none hover-gold d-inline-flex align-items-center gap-1">
                  <span>→</span>
                  <span>About Durga Puja 2026</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Festival & Mandal Information */}
          <div className="col-6 col-md-3 col-lg-3">
            <h4 className="font-cinzel text-gold fs-6 fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px' }}>
              Durga Puja 2026
            </h4>
            <div className="small text-light-emphasis d-flex flex-column gap-2">
              <div>
                <span className="text-gold fw-medium">Festival: </span>
                <span>Sharadotsav 2026</span>
              </div>
              <div>
                <span className="text-gold fw-medium">Mandal: </span>
                <span>Durga Mata Mitra Mandal</span>
              </div>
              <div>
                <span className="text-gold fw-medium">Devotion: </span>
                <span>Maa Durga Shodashopachara Puja</span>
              </div>
              <div className="mt-2 text-warning small">
                ॥ जय माता दी ॥
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-top border-gold my-3" style={{ opacity: 0.25 }}></div>

        {/* Copyright & Sign-off */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-center text-md-start pt-2">
          <div className="small text-light-emphasis">
            © 2026 Durga Mata Mitra Mandal. All rights reserved.
          </div>
          <div className="small text-light-emphasis font-cinzel">
            ॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
