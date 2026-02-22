import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const SECTION_IDS = ['home', 'about', 'timeline', 'projects', 'skills', 'contact'];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navData, setNavData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileView, setIsMobileView] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1000px)');
    setIsMobileView(mq.matches);
    const handler = (e) => setIsMobileView(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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

  useEffect(() => {
    if (location.pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e) => {
      const header = document.querySelector('.header');
      if (header && !header.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleScroll = () => setIsMenuOpen(false);
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
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

          {(() => {
            const navContent = (
              <ul className="nav-list">
              {navData.menuItems.map((item) => {
                const Icon = NAV_ICONS[item.id];
                const isBlog = item.id === 'blogs';
                const isOnHome = location.pathname === '/';
                const isActive = isBlog
                  ? location.pathname.startsWith('/blog')
                  : isOnHome && activeSection === item.id;
                const activeClass = isActive ? ' nav-active' : '';
                if (isBlog) {
                  return (
                    <li key={item.id}>
                      <Link
                        to="/blog"
                        className={`nav-btn-with-tooltip${activeClass}`}
                        data-tooltip={item.label}
                        aria-label={item.label}
                        aria-current={isActive ? 'page' : undefined}
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
                        className={`nav-btn-with-tooltip${activeClass}`}
                        data-tooltip={item.label}
                        aria-label={item.label}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {Icon ? <Icon size={20} /> : item.label}
                      </Link>
                    </li>
                  );
                }
                if (isOnHome) {
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`nav-btn-with-tooltip${activeClass}`}
                        data-tooltip={item.label}
                        aria-label={item.label}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {Icon ? <Icon size={20} /> : item.label}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.id}>
                    <Link
                      to="/"
                      state={{ scrollTo: item.id }}
                      className={`nav-btn-with-tooltip${activeClass}`}
                      data-tooltip={item.label}
                      aria-label={item.label}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {Icon ? <Icon size={20} /> : item.label}
                    </Link>
                  </li>
                );
              })}
              </ul>
            );
            const navEl = (
              <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                {navContent}
                <div className="nav-footer">
                  <ThemeToggle />
                </div>
              </nav>
            );
            return isMobileView ? createPortal(navEl, document.body) : navEl;
          })()}

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