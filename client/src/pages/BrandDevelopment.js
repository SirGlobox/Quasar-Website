import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Palette, Target, Megaphone, TrendingUp } from 'lucide-react';
import './Services.css';

const BrandDevelopment = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Professional brand identity development",
    "Comprehensive marketing strategy creation",
    "Digital marketing optimization",
    "Local Charlotte market positioning",
    "Referral marketing system design",
    "Brand awareness campaign development"
  ];

  const process = [
    {
      step: "1",
      title: "Brand Discovery",
      description: "Deep dive into your business values, target audience, and competitive landscape"
    },
    {
      step: "2", 
      title: "Identity Creation",
      description: "Develop compelling brand identity including messaging, visual elements, and positioning"
    },
    {
      step: "3",
      title: "Marketing Strategy",
      description: "Create comprehensive marketing plan covering digital, local, and referral strategies"
    },
    {
      step: "4",
      title: "Implementation & Optimization",
      description: "Launch marketing campaigns and continuously optimize for maximum ROI"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Brand Development & Marketing Strategy Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Build a standout brand and winning marketing plan in Charlotte. Get expert guidance for digital, local, and referral marketing—book your free consult today!" />
        <meta name="keywords" content="brand development consultant Charlotte NC, marketing strategy Charlotte, business branding Charlotte, digital marketing Charlotte, local marketing Charlotte, referral marketing Charlotte, small business branding Charlotte, brand positioning Charlotte, brand identity consultant Charlotte, marketing plan Charlotte, brand awareness Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services/brand-development" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Brand Development & Marketing Strategy",
            "description": "Professional brand development and marketing strategy services for home service businesses in Charlotte, NC",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Quasar Consultants",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlotte",
                "addressRegion": "NC"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Charlotte"
            },
            "serviceType": "Business Consulting"
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1>Brand Development & Marketing Strategy</h1>
            <p>Build a standout brand and winning marketing plan to dominate the Charlotte home service market</p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section service-overview">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Create a Powerful Brand That Drives Results</h2>
                <p>
                  In Charlotte's competitive home service market, a strong brand and strategic marketing approach 
                  are essential for standing out and attracting quality customers. Our brand development and 
                  marketing strategy services help you create a compelling brand identity and comprehensive 
                  marketing plan that resonates with your target audience.
                </p>
                <p>
                  From brand positioning and visual identity to digital marketing and referral systems, we develop 
                  integrated strategies that build brand awareness, generate leads, and drive sustainable growth 
                  for your Charlotte home service business.
                </p>
                <div className="service-highlights">
                  <div className="highlight-item">
                    <Palette size={24} />
                    <span>Brand Identity Design</span>
                  </div>
                  <div className="highlight-item">
                    <Megaphone size={24} />
                    <span>Marketing Strategy</span>
                  </div>
                  <div className="highlight-item">
                    <TrendingUp size={24} />
                    <span>Growth Optimization</span>
                  </div>
                </div>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754845715/Brand_-_Blog_ixqhqj.png" 
                  alt="Brand development and marketing strategy for Charlotte home service businesses"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section benefits-section">
          <div className="container">
            <div className="section-title">
              <h2>Transform Your Brand & Marketing</h2>
              <p>Comprehensive brand development and marketing solutions for home service businesses</p>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item card">
                  <CheckCircle size={24} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section process-section">
          <div className="container">
            <div className="section-title">
              <h2>Our Brand Development Process</h2>
              <p>Strategic approach to building powerful brands and marketing systems</p>
            </div>
            <div className="process-steps">
              {process.map((step, index) => (
                <div key={index} className="process-step card">
                  <div className="step-number">{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Focus Section */}
        <section className="section market-focus">
          <div className="container">
            <div className="section-title">
              <h2>Comprehensive Marketing Solutions</h2>
              <p>Multi-channel marketing strategies designed for Charlotte home service businesses</p>
            </div>
            <div className="grid grid-3">
              <div className="focus-item card">
                <Megaphone size={32} />
                <h3>Digital Marketing</h3>
                <p>SEO, social media, online advertising, and digital presence optimization for maximum visibility.</p>
              </div>
              <div className="focus-item card">
                <Target size={32} />
                <h3>Local Marketing</h3>
                <p>Community engagement, local partnerships, and geographic targeting within Charlotte's market.</p>
              </div>
              <div className="focus-item card">
                <TrendingUp size={32} />
                <h3>Referral Systems</h3>
                <p>Customer referral programs and word-of-mouth marketing strategies for sustainable growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Build Your Standout Brand?</h2>
              <p>
                Create a powerful brand identity and comprehensive marketing strategy that drives 
                results for your Charlotte home service business.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Start Brand Development
                  <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn btn-secondary btn-large">
                  View All Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BrandDevelopment;
