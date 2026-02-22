import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuHouse, LuUser, LuFolderOpen, LuCode, LuClock, LuNewspaper, LuMail } from 'react-icons/lu';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

const NAV_ICONS = {
  home: LuHouse,
  about: LuUser,
  projects: LuFolderOpen,
  skills: LuCode,
  timeline: LuClock,
  blogs: LuNewspaper,
  contact: LuMail,
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navData, setNavData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('/portfolioData.json')
      .then((res) => res.json())
      .then((data) => {
        setNavData(data.navigation);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  if (!navData) return null;

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-surface">
        <div className="header-container">
          <Link to="/" className="logo" onClick={scrollToTop}>
            <h2>{navData.logo}</h2>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navData.menuItems.map((item) => {
                const Icon = NAV_ICONS[item.id];
                const isBlog = item.id === 'blogs';
                const isOnHome = location.pathname === '/';
                if (isBlog) {
                  return (
                    <li key={item.id}>
                      <Link
                        to="/blog"
                        className="nav-btn-with-tooltip"
                        data-tooltip={item.label}
                        aria-label={item.label}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {Icon ? <Icon size={20} /> : item.label}
                      </Link>
                    </li>
                  );
                }
                if (!isOnHome && item.id === 'home') {
                  return (
                    <li key={item.id}>
                      <Link
                        to="/"
                        className="nav-btn-with-tooltip"
                        data-tooltip={item.label}
                        aria-label={item.label}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {Icon ? <Icon size={20} /> : item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => isOnHome ? scrollToSection(item.id) : (window.location.href = `/#${item.id}`)}
                      className="nav-btn-with-tooltip"
                      data-tooltip={item.label}
                      aria-label={item.label}
                    >
                      {Icon ? <Icon size={20} /> : item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="nav-footer">
              <ThemeToggle />
            </div>
          </nav>

          <div className="header-bottom">
            <ThemeToggle />
          </div>

          <div className="header-mobile-controls">
            <ThemeToggle />
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 