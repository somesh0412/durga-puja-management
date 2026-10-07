import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-maroon-dark text-light border-bottom border-gold shadow-sm py-2">
      <div className="container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
          onClick={closeNavbar}
        >
          {/* Sacred Trishul / Kalash Motif SVG */}
          <div
            className="d-flex align-items-center justify-content-center rounded-circle border border-gold"
            style={{ width: '38px', height: '38px', background: 'rgba(212, 175, 55, 0.15)' }}
            aria-hidden="true"
          >
            <span style={{ color: 'var(--dm-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>
              ॐ
            </span>
          </div>

          <div>
            <div className="font-cinzel text-gold fw-bold lh-1" style={{ fontSize: '1.08rem' }}>
              Durga Mata Mitra Mandal
            </div>
            <div className="d-flex align-items-center gap-2 mt-1">
              <span
                className="badge rounded-pill"
                style={{
                  background: 'var(--dm-gold-gradient)',
                  color: 'var(--dm-maroon-deep)',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                }}
              >
                2026
              </span>
              <small
                className="text-light-emphasis text-uppercase"
                style={{ fontSize: '0.68rem', letterSpacing: '1px' }}
              >
                Committee Management Portal
              </small>
            </div>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-gold text-gold"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ padding: '6px 10px' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '22px',
              height: '2px',
              background: 'var(--dm-gold)',
              boxShadow: '0 6px 0 0 var(--dm-gold), 0 -6px 0 0 var(--dm-gold)',
              verticalAlign: 'middle',
              margin: '6px 0',
            }}
          ></span>
        </button>

        {/* Navigation Content */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show mt-3 mt-lg-0' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center text-lg-start">
            <li className="nav-item">
              {isHomePage ? (
                <a
                  href="#top"
                  className="nav-link text-light px-3 py-2 fw-medium"
                  onClick={closeNavbar}
                >
                  Home
                </a>
              ) : (
                <Link
                  to="/"
                  className="nav-link text-light px-3 py-2 fw-medium"
                  onClick={closeNavbar}
                >
                  Home
                </Link>
              )}
            </li>

            <li className="nav-item">
              <a
                href={isHomePage ? '#transparency' : '/#transparency'}
                className="nav-link text-light px-3 py-2 fw-medium"
                onClick={closeNavbar}
              >
                Financial Transparency
              </a>
            </li>

            <li className="nav-item">
              <a
                href={isHomePage ? '#about' : '/#about'}
                className="nav-link text-light px-3 py-2 fw-medium"
                onClick={closeNavbar}
              >
                About Mandal
              </a>
            </li>
          </ul>

          {/* Quick Action Links */}
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
            <Link
              to="/admin/login"
              className="btn btn-gold btn-sm w-100 w-sm-auto text-nowrap px-3 py-2 fw-bold"
              onClick={closeNavbar}
            >
              Committee Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
