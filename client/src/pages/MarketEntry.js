import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Target, Search, MapPin } from 'lucide-react';
import './Services.css';

const MarketEntry = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Comprehensive market research and analysis",
    "Competitive landscape evaluation",
    "Entry strategy development",
    "Risk assessment and mitigation",
    "Local market insights for Charlotte area",
    "Customer behavior analysis"
  ];

  const process = [
    {
      step: "1",
      title: "Market Research",
      description: "In-depth analysis of target markets, customer demographics, and demand patterns"
    },
    {
      step: "2", 
      title: "Competitive Analysis",
      description: "Comprehensive evaluation of competitors, their strategies, strengths, and weaknesses"
    },
    {
      step: "3",
      title: "Entry Strategy",
      description: "Develop customized market entry strategies based on research findings"
    },
    {
      step: "4",
      title: "Implementation Support",
      description: "Ongoing guidance and support during market entry execution"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Market Entry & Competitive Analysis Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Expert market entry and competitive analysis services for home service businesses in Charlotte, NC. Strategic market research, competitor evaluation, and entry planning." />
        <meta name="keywords" content="market entry Charlotte NC, competitive analysis home services, market research Charlotte, business expansion consulting, competitor analysis Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services/market-entry" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Market Entry & Competitive Analysis",
            "description": "Expert market entry and competitive analysis services for home service businesses in Charlotte, NC",
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
            <h1>Market Entry & Competitive Analysis</h1>
            <p>Strategic market research and competitive intelligence to successfully enter new markets in Charlotte, NC</p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section service-overview">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Enter New Markets with Confidence</h2>
                <p>
                  Expanding into new markets or service areas requires careful planning and deep market intelligence. 
                  Our market entry and competitive analysis services provide Charlotte home service businesses with 
                  the insights and strategies needed to successfully penetrate new markets while minimizing risks.
                </p>
                <p>
                  We conduct comprehensive research on target markets, analyze competitive landscapes, and develop 
                  customized entry strategies that leverage your unique strengths while addressing market-specific 
                  challenges and opportunities.
                </p>
                <div className="service-highlights">
                  <div className="highlight-item">
                    <Search size={24} />
                    <span>Market Research</span>
                  </div>
                  <div className="highlight-item">
                    <Target size={24} />
                    <span>Competitive Intelligence</span>
                  </div>
                  <div className="highlight-item">
                    <MapPin size={24} />
                    <span>Local Market Expertise</span>
                  </div>
                </div>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754845695/Market_-_Blog_b9vnsu.png" 
                  alt="Market entry and competitive analysis for Charlotte home service businesses"
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
              <h2>Strategic Advantages</h2>
              <p>Gain the competitive edge with comprehensive market intelligence</p>
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
              <h2>Our Analysis Process</h2>
              <p>Systematic approach to market entry and competitive intelligence</p>
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

        {/* Market Focus Section */}
        <section className="section market-focus">
          <div className="container">
            <div className="section-title">
              <h2>Charlotte Market Expertise</h2>
              <p>Deep local knowledge for successful market penetration</p>
            </div>
            <div className="grid grid-3">
              <div className="focus-item card">
                <Users size={32} />
                <h3>Demographics Analysis</h3>
                <p>Understanding Charlotte's diverse neighborhoods and customer segments for targeted market entry.</p>
              </div>
              <div className="focus-item card">
                <Target size={32} />
                <h3>Competitive Mapping</h3>
                <p>Comprehensive analysis of existing competitors and market gaps in the Charlotte area.</p>
              </div>
              <div className="focus-item card">
                <MapPin size={32} />
                <h3>Geographic Strategy</h3>
                <p>Strategic geographic expansion planning within Charlotte's 30-mile service radius.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Enter New Markets?</h2>
              <p>
                Get comprehensive market intelligence and competitive analysis to successfully 
                expand your home service business in Charlotte and surrounding areas.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Start Market Analysis
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

export default MarketEntry;
