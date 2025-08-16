import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Users, Target, CheckCircle } from '../components/Icons';
import './About.css';

const About = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const values = [
    {
      icon: <Target />,
      title: "Results-Driven",
      description: "We focus on delivering measurable outcomes that directly impact your bottom line."
    },
    {
      icon: <Users />,
      title: "Local Expertise",
      description: "Deep understanding of the Charlotte market and home service industry dynamics."
    },
    {
      icon: <Award />,
      title: "Proven Track Record",
      description: "15+ years of experience helping home service businesses scale and succeed."
    }
  ];


  return (
    <>
      <Helmet>
        <title>Expert Business Consultant Charlotte NC | About Quasar Consultants</title>
        <meta name="description" content="Learn about Quasar Consultants, the leading home service business consulting firm in Charlotte, NC. Our expert team helps businesses scale, optimize operations, and dominate the local market." />
        <meta name="keywords" content="about Quasar Consultants, home service consulting Charlotte NC, business consultants Charlotte, local business experts" />
        <link rel="canonical" href="https://quasarconsultants.com/about" />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Quasar Consultants",
            "description": "Home service business consulting in Charlotte, NC",
            "url": "https://quasarconsultants.com",
            "logo": "https://quasarconsultants.com/logo.png",
            "foundingDate": "2008",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Charlotte",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1234567890",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.linkedin.com/company/quasar-consultants",
              "https://www.facebook.com/quasarconsultants"
            ]
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1>About Quasar Consultants</h1>
            <p>Your trusted partner for home service business growth in Charlotte, NC</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section story-section">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Our Story</h2>
                <p>
                  Quasar Consultants was founded out of a simple truth:
                </p>
                <p>
                  There are countless hardworking people in the home and property services world—pressure washing, cleaning, landscaping, HVAC, and more—who have the grit to build something great but don't always have the support, resources, or guidance to get there. We know, because we were one of them.
                </p>
                <p>
                  After spending over a decade in home services, owning and operating our own cleaning, pressure washing, and lawn care companies, we realized we had a knack for helping businesses like these succeed. We've worked every angle: construction, sales, management, operations, and finance. We've seen firsthand how challenging it can be to bootstrap a company, especially when you don't have a big investment or a safety net.
                </p>
                <p>
                  Quasar Consultants exists to be the partner we wish we'd had.
                </p>
                <p>
                  Someone who's been there, done the work, and can deliver real, actionable advice that makes a difference, without the fluff or the hard sell.
                </p>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754761799/About_us_czobhp.png" 
                  alt="Quasar Consultants team - About Us"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="section mission-section">
          <div className="container">
            <div className="section-title">
              <h2>Our Mission & Values</h2>
              <p>Driving success for home service businesses through expert guidance and proven strategies</p>
            </div>
            <div className="grid grid-3">
              {values.map((value, index) => (
                <div key={index} className="value-card card">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="section different-section">
          <div className="container">
            <div className="section-title">
              <h2>What Makes Us Different</h2>
            </div>
            <div className="grid grid-3">
              <div className="different-item card">
                <h3>Hands-on Experience</h3>
                <p>We know the Charlotte market inside and out, and we've worked in the field—not just behind a desk.</p>
              </div>
              <div className="different-item card">
                <h3>Results-Driven</h3>
                <p>We focus on delivering real outcomes and actionable data, not just reports or theory.</p>
              </div>
              <div className="different-item card">
                <h3>+1 Philosophy</h3>
                <p>If you invest in us, you get your money's worth—plus a little extra value, every time.</p>
              </div>
              <div className="different-item card">
                <h3>No Pushy Sales</h3>
                <p>The first consultation is always free and packed with insights. If you see the value, you'll know it.</p>
              </div>
              <div className="different-item card">
                <h3>Personalized Approach</h3>
                <p>Every client receives solutions tailored to their unique business, goals, and challenges—no one-size-fits-all advice.</p>
              </div>
              <div className="different-item card">
                <h3>Affordable, Practical Solutions</h3>
                <p>Our services are accessible and focused on what works for real businesses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="section serve-section">
          <div className="container">
            <div className="section-title">
              <h2>Who We Serve</h2>
              <p>Our clients are blue-collar, home service, and property maintenance businesses—often bootstrapping, hungry to grow, and ready for practical help. Whether you're struggling with revenue, branding, marketing, or operational slowdowns, we've got you covered.</p>
            </div>
          </div>
        </section>

        {/* Why Charlotte */}
        <section className="section charlotte-section">
          <div className="container">
            <div className="image" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <img 
                src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754761432/skyline_no_background_ityrrm.png" 
                alt="Charlotte NC skyline - home service business consulting market"
                loading="lazy"
                style={{ maxWidth: '500px', width: '100%', height: 'auto' }}
              />
            </div>
            <div className="content" style={{ textAlign: 'center' }}>
              <h2>Why We Focus on Charlotte</h2>
              <p>
                Charlotte, NC is one of the fastest-growing cities in the United States, with a 
                thriving home service market that presents unique opportunities and challenges. 
                Our deep local knowledge allows us to provide insights that generic consultants simply can't match.
              </p>
              <ul className="charlotte-benefits" style={{ display: 'inline-block', textAlign: 'left' }}>
                <li>
                  <CheckCircle size={20} />
                  <span>Rapid population growth driving demand for home services</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Strong local economy supporting business growth</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Diverse neighborhoods with varying service needs</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Established network of suppliers and service providers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Work with Our Expert Team?</h2>
              <p>
                Join the hundreds of successful home service businesses in Charlotte who have 
                transformed their operations with Quasar Consultants.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Schedule Your Free Consultation
                </Link>
                <Link to="/services" className="btn btn-secondary btn-large">
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
