import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import GooeyButton from './GooeyButton';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/services', 
      label: 'Services',
      submenu: [
        { path: '/services/business-assessment', label: 'Business Assessment & Growth Roadmap' },
        { path: '/services/market-entry', label: 'Market Entry & Competitive Analysis' },
        { path: '/services/brand-development', label: 'Brand Development & Marketing Strategy' },
        { path: '/services/lead-generation', label: 'Lead Generation & Sales Optimization' },
        { path: '/services/operations-optimization', label: 'Operations & Process Optimization' },
        { path: '/services/customer-experience', label: 'Customer Experience & Retention Systems' }
      ]
    },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img 
              src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754618209/image_14_yfnes9.png" 
              alt="Quasar Consultants - Home Service Business Consulting Charlotte NC" 
              className="logo"
            />
            <span className="brand-text">Quasar Consultants</span>
          </Link>

          {/* Mobile menu overlay */}
          {isOpen && <div className="mobile-menu-overlay active" onClick={closeMenu}></div>}
          
          <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="service-submenu">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`nav-link ${location.pathname === subItem.path ? 'active' : ''}`}
                        onClick={closeMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="navbar-cta">
            <GooeyButton
              className="phone-link"
              onClick={() => window.location.href = 'tel:+19802664818'}
              particleCount={6}
              particleDistances={[30, 4]}
              particleR={40}
              animationTime={350}
              colors={[1, 2, 1, 2, 1, 2]}
            >
              <Phone size={20} />
              <span className="phone-text">(980) 266-4818</span>
            </GooeyButton>
            <GooeyButton
              className="btn btn-primary"
              onClick={() => {
                closeMenu();
                window.location.href = '/contact';
              }}
              particleCount={8}
              particleDistances={[35, 5]}
              particleR={50}
              animationTime={400}
              colors={[1, 2, 1, 2, 1, 2, 1, 2]}
            >
              Free Consultation
            </GooeyButton>
          </div>

          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
