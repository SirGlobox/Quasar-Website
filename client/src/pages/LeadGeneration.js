import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, TrendingUp, Users, Zap } from 'lucide-react';
import './Services.css';

const LeadGeneration = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Qualified lead generation systems",
    "Sales process optimization",
    "Conversion rate improvement",
    "Sales funnel development",
    "CRM system implementation",
    "Performance tracking and analytics"
  ];

  const process = [
    {
      step: "1",
      title: "Lead Analysis",
      description: "Evaluate current lead sources, quality, and conversion rates to identify opportunities"
    },
    {
      step: "2", 
      title: "System Design",
      description: "Create optimized lead generation and sales systems tailored to your business"
    },
    {
      step: "3",
      title: "Implementation",
      description: "Deploy lead generation campaigns and sales processes with proper tracking"
    },
    {
      step: "4",
      title: "Optimization",
      description: "Continuously monitor and improve performance for maximum ROI"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Lead Generation & Sales Optimization Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Attract more qualified leads and boost sales in Charlotte. Proven systems for better conversion rates—request your free sales optimization consult now!" />
        <meta name="keywords" content="lead generation consultant Charlotte NC, sales optimization Charlotte, qualified leads Charlotte, sales process improvement Charlotte, conversion rate optimization Charlotte, sales systems Charlotte, business lead generation Charlotte, sales strategy Charlotte, sales funnel Charlotte, home service leads Charlotte, small business sales Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services/lead-generation" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Lead Generation & Sales Optimization",
            "description": "Professional lead generation and sales optimization services for home service businesses in Charlotte, NC",
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
            <h1>Lead Generation & Sales Optimization</h1>
            <p>Attract more qualified leads and boost sales with proven systems designed for Charlotte home service businesses</p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section service-overview">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Transform Your Sales Performance</h2>
                <p>
                  Generating quality leads and converting them into paying customers is the lifeblood of any 
                  successful home service business. Our lead generation and sales optimization services help 
                  Charlotte businesses create systematic approaches to attract, nurture, and convert prospects 
                  into loyal customers.
                </p>
                <p>
                  From lead generation campaigns and sales funnel optimization to CRM implementation and 
                  conversion rate improvement, we develop comprehensive systems that consistently deliver 
                  qualified leads and maximize your sales potential in the Charlotte market.
                </p>
                <div className="service-highlights">
                  <div className="highlight-item">
                    <Target size={24} />
                    <span>Lead Generation</span>
                  </div>
                  <div className="highlight-item">
                    <TrendingUp size={24} />
                    <span>Sales Optimization</span>
                  </div>
                  <div className="highlight-item">
                    <Zap size={24} />
                    <span>Conversion Improvement</span>
                  </div>
                </div>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754845735/Sales_-_Blog_kcqhqj.png" 
                  alt="Lead generation and sales optimization for Charlotte home service businesses"
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
              <h2>Boost Your Sales Performance</h2>
              <p>Comprehensive lead generation and sales optimization solutions</p>
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
              <h2>Our Sales Optimization Process</h2>
              <p>Systematic approach to generating leads and maximizing conversions</p>
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

        {/* Sales Focus Section */}
        <section className="section market-focus">
          <div className="container">
            <div className="section-title">
              <h2>Complete Sales Solutions</h2>
              <p>End-to-end lead generation and sales optimization for home service businesses</p>
            </div>
            <div className="grid grid-3">
              <div className="focus-item card">
                <Target size={32} />
                <h3>Lead Generation</h3>
                <p>Multi-channel lead generation campaigns including digital marketing, referrals, and local outreach.</p>
              </div>
              <div className="focus-item card">
                <TrendingUp size={32} />
                <h3>Sales Funnels</h3>
                <p>Optimized sales funnels that guide prospects from initial contact to closed deals.</p>
              </div>
              <div className="focus-item card">
                <Users size={32} />
                <h3>CRM Systems</h3>
                <p>Customer relationship management systems to track leads and automate follow-up processes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section results-section">
          <div className="container">
            <div className="section-title">
              <h2>Proven Results for Charlotte Businesses</h2>
              <p>Our lead generation and sales optimization strategies deliver measurable improvements</p>
            </div>
            <div className="grid grid-3">
              <div className="result-item card">
                <div className="result-number">150%</div>
                <div className="result-label">Average Lead Increase</div>
              </div>
              <div className="result-item card">
                <div className="result-number">35%</div>
                <div className="result-label">Conversion Rate Improvement</div>
              </div>
              <div className="result-item card">
                <div className="result-number">60%</div>
                <div className="result-label">Sales Cycle Reduction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Generate More Qualified Leads?</h2>
              <p>
                Implement proven lead generation and sales optimization systems that consistently 
                deliver results for your Charlotte home service business.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Start Lead Generation
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

export default LeadGeneration;
