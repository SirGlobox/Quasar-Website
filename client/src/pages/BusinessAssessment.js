import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Target, BarChart3 } from 'lucide-react';
import './Services.css';

const BusinessAssessment = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Comprehensive business health evaluation",
    "Custom growth roadmap development",
    "Revenue optimization strategies",
    "Market positioning analysis",
    "Competitive advantage identification",
    "Performance metrics establishment"
  ];

  const process = [
    {
      step: "1",
      title: "Initial Assessment",
      description: "Complete evaluation of your current business operations, finances, and market position"
    },
    {
      step: "2", 
      title: "Analysis & Insights",
      description: "Deep dive analysis to identify strengths, weaknesses, opportunities, and threats"
    },
    {
      step: "3",
      title: "Strategy Development",
      description: "Create customized growth strategies tailored to your specific business goals"
    },
    {
      step: "4",
      title: "Implementation Plan",
      description: "Detailed roadmap with actionable steps, timelines, and success metrics"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Assessment & Growth Roadmap Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Comprehensive business assessment and growth roadmap services for home service companies in Charlotte, NC. Expert analysis, strategic planning, and actionable implementation plans." />
        <meta name="keywords" content="business assessment Charlotte NC, growth roadmap consulting, business analysis Charlotte, strategic planning home services, business evaluation Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services/business-assessment" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Business Assessment & Growth Roadmap",
            "description": "Comprehensive business assessment and growth roadmap services for home service companies in Charlotte, NC",
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
            <h1>Business Assessment & Growth Roadmap</h1>
            <p>Comprehensive evaluation and strategic planning to accelerate your home service business growth in Charlotte, NC</p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section service-overview">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Transform Your Business with Expert Assessment</h2>
                <p>
                  Our comprehensive business assessment service provides Charlotte home service companies with 
                  a complete evaluation of their current operations, market position, and growth potential. 
                  We analyze every aspect of your business to identify opportunities and create a customized 
                  roadmap for sustainable growth.
                </p>
                <p>
                  Whether you're struggling with stagnant revenue, operational inefficiencies, or unclear 
                  growth strategies, our expert assessment will provide the clarity and direction you need 
                  to take your business to the next level.
                </p>
                <div className="service-highlights">
                  <div className="highlight-item">
                    <TrendingUp size={24} />
                    <span>Revenue Growth Analysis</span>
                  </div>
                  <div className="highlight-item">
                    <Target size={24} />
                    <span>Strategic Planning</span>
                  </div>
                  <div className="highlight-item">
                    <BarChart3 size={24} />
                    <span>Performance Metrics</span>
                  </div>
                </div>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754845675/Financial_Planning_-_Blog_ipsnjx.png" 
                  alt="Business assessment and growth planning for Charlotte home service companies"
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
              <h2>What You'll Gain</h2>
              <p>Our business assessment delivers actionable insights and strategic direction</p>
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
              <h2>Our Assessment Process</h2>
              <p>A systematic approach to understanding and improving your business</p>
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

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Assess Your Business Potential?</h2>
              <p>
                Get a comprehensive evaluation of your home service business and a customized 
                growth roadmap designed specifically for the Charlotte market.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Schedule Your Assessment
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

export default BusinessAssessment;
