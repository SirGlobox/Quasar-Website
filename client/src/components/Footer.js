import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Business Strategy', path: '/services' },
      { name: 'Market Entry', path: '/services' },
      { name: 'Marketing & Lead Generation', path: '/services' },
      { name: 'Operations Optimization', path: '/services' },
      { name: 'Financial Planning', path: '/services' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Team', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' }
    ],
    resources: [
      { name: 'Free Consultation', path: '/contact' },
      { name: 'Case Studies', path: '/blog' },
      { name: 'Industry Insights', path: '/blog' },
      { name: 'FAQ', path: '/services' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://www.facebook.com/QuasarConsulting/', label: 'Facebook' },
    { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/quasarconsultants/', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/quasar_consultants/', label: 'Instagram' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-brand">
              <img 
                src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754599315/Logo_No_Background_kibkip.png" 
                alt="Quasar Consultants" 
                className="footer-logo"
              />
            </div>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone size={16} />
                <a href="tel:+19802664818">(980) 266-4818</a>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <a href="mailto:info@thequasarconsultants.com">info@thequasarconsultants.com</a>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Charlotte, NC 28202</span>
              </div>
            </div>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="footer-section">
            <h4>Service Areas</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Serving home service businesses throughout the greater Charlotte area
            </p>
            <div className="service-areas-grid">
              <ul className="footer-links">
                <li>Charlotte, NC</li>
                <li>Concord, NC</li>
                <li>Matthews, NC</li>
                <li>Mooresville, NC</li>
              </ul>
              <ul className="footer-links">
                <li>Gastonia, NC</li>
                <li>Huntersville, NC</li>
                <li>Mint Hill, NC</li>
                <li>Waxhaw, NC</li>
                <li>Weddington, NC</li>
              </ul>
              <ul className="footer-links">
                <li>Pineville, NC</li>
                <li>Cornelius, NC</li>
                <li>Davidson, NC</li>
                <li>Marvin, NC</li>
              </ul>
              <ul className="footer-links">
                <li>Rock Hill, SC</li>
                <li>Fort Mill, SC</li>
                <li>Indian Trail, NC</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Quasar Consultants. All rights reserved. | Web Design by{' '}
              <a 
                href="https://www.digitalmosaicstudios.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="design-credit-link"
              >
                Digital Mosaic Studios
              </a>
              {' & Quasar'}
            </p>
            <div className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Quasar Consultants",
          "description": "Home service business consulting in Charlotte, NC",
          "url": "https://quasarconsultants.com",
          "telephone": "+19802664818",
          "email": "info@thequasarconsultants.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Charlotte",
            "addressRegion": "NC",
            "postalCode": "28202",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "35.2271",
            "longitude": "-80.8431"
          },
          "openingHours": "Mo-Fr 09:00-17:00",
          "priceRange": "$$",
          "sameAs": [
            "https://www.facebook.com/QuasarConsulting/",
            "https://www.linkedin.com/in/quasarconsultants/",
            "https://www.instagram.com/quasar_consultants/"
          ]
        })}
      </script>
    </footer>
  );
};

export default Footer;
