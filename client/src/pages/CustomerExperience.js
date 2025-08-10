import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Heart, Users, Star, RefreshCw } from 'lucide-react';
import './Services.css';

const CustomerExperience = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Customer experience improvement strategies",
    "Repeat business optimization",
    "Customer loyalty program development",
    "Referral system implementation",
    "Client satisfaction measurement",
    "CRM and retention system setup"
  ];

  const process = [
    {
      step: "1",
      title: "Experience Audit",
      description: "Comprehensive evaluation of current customer touchpoints and satisfaction levels"
    },
    {
      step: "2", 
      title: "Journey Mapping",
      description: "Map the complete customer journey to identify improvement opportunities"
    },
    {
      step: "3",
      title: "System Design",
      description: "Create retention systems, loyalty programs, and feedback mechanisms"
    },
    {
      step: "4",
      title: "Implementation & Monitoring",
      description: "Deploy systems and continuously monitor customer satisfaction metrics"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Customer Experience & Retention Systems Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Increase customer satisfaction and loyalty in Charlotte. Build powerful retention and referral systems—book your free customer experience audit today!" />
        <meta name="keywords" content="customer retention consultant Charlotte NC, customer experience improvement Charlotte, repeat business Charlotte, customer loyalty Charlotte, referral programs Charlotte, client satisfaction Charlotte, customer feedback Charlotte, loyalty programs Charlotte, home service retention Charlotte, customer journey Charlotte, CRM consultant Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services/customer-experience" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Customer Experience & Retention Systems",
            "description": "Professional customer experience and retention services for home service businesses in Charlotte, NC",
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
            <h1>Customer Experience & Retention Systems</h1>
            <p>Build lasting customer relationships and maximize lifetime value for your Charlotte home service business</p>
          </div>
        </section>

        {/* Service Overview */}
        <section className="section service-overview">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <h2>Transform Customer Relationships Into Lasting Loyalty</h2>
                <p>
                  Acquiring new customers is expensive, but retaining existing ones drives sustainable growth and 
                  profitability. Our customer experience and retention services help Charlotte home service businesses 
                  create exceptional customer experiences that generate repeat business, referrals, and long-term loyalty.
                </p>
                <p>
                  From customer journey optimization and satisfaction measurement to loyalty programs and referral 
                  systems, we develop comprehensive strategies that turn one-time customers into lifelong advocates 
                  for your Charlotte home service business.
                </p>
                <div className="service-highlights">
                  <div className="highlight-item">
                    <Heart size={24} />
                    <span>Customer Experience</span>
                  </div>
                  <div className="highlight-item">
                    <RefreshCw size={24} />
                    <span>Retention Systems</span>
                  </div>
                  <div className="highlight-item">
                    <Star size={24} />
                    <span>Loyalty Programs</span>
                  </div>
                </div>
              </div>
              <div className="image">
                <img 
                  src="https://res.cloudinary.com/dvsiayukf/image/upload/v1754845775/Customer_-_Blog_nxqhqj.png" 
                  alt="Customer experience and retention systems for Charlotte home service businesses"
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
              <h2>Build Customer Loyalty That Lasts</h2>
              <p>Comprehensive customer experience and retention solutions</p>
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
              <h2>Our Customer Experience Process</h2>
              <p>Systematic approach to building exceptional customer relationships</p>
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

        {/* Customer Focus Section */}
        <section className="section market-focus">
          <div className="container">
            <div className="section-title">
              <h2>Complete Customer Solutions</h2>
              <p>End-to-end customer experience and retention strategies</p>
            </div>
            <div className="grid grid-3">
              <div className="focus-item card">
                <Heart size={32} />
                <h3>Experience Design</h3>
                <p>Create exceptional customer experiences at every touchpoint throughout the service journey.</p>
              </div>
              <div className="focus-item card">
                <RefreshCw size={32} />
                <h3>Retention Programs</h3>
                <p>Develop systematic approaches to keep customers coming back for additional services.</p>
              </div>
              <div className="focus-item card">
                <Users size={32} />
                <h3>Referral Systems</h3>
                <p>Build powerful referral programs that turn satisfied customers into active promoters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section results-section">
          <div className="container">
            <div className="section-title">
              <h2>Proven Customer Retention Results</h2>
              <p>Our customer experience strategies deliver measurable improvements</p>
            </div>
            <div className="grid grid-3">
              <div className="result-item card">
                <div className="result-number">85%</div>
                <div className="result-label">Customer Retention Rate</div>
              </div>
              <div className="result-item card">
                <div className="result-number">45%</div>
                <div className="result-label">Repeat Business Increase</div>
              </div>
              <div className="result-item card">
                <div className="result-number">300%</div>
                <div className="result-label">Referral Growth</div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Journey Section */}
        <section className="section customer-journey">
          <div className="container">
            <div className="section-title">
              <h2>Customer Journey Optimization</h2>
              <p>We optimize every stage of the customer experience</p>
            </div>
            <div className="journey-stages">
              <div className="journey-stage card">
                <div className="stage-icon">
                  <Star size={24} />
                </div>
                <h3>First Impression</h3>
                <p>Professional initial contact and service presentation</p>
              </div>
              <div className="journey-stage card">
                <div className="stage-icon">
                  <Heart size={24} />
                </div>
                <h3>Service Delivery</h3>
                <p>Exceptional service execution and customer communication</p>
              </div>
              <div className="journey-stage card">
                <div className="stage-icon">
                  <RefreshCw size={24} />
                </div>
                <h3>Follow-Up</h3>
                <p>Post-service satisfaction and relationship building</p>
              </div>
              <div className="journey-stage card">
                <div className="stage-icon">
                  <Users size={24} />
                </div>
                <h3>Loyalty Building</h3>
                <p>Ongoing engagement and referral generation</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Build Customer Loyalty?</h2>
              <p>
                Create exceptional customer experiences and retention systems that drive repeat 
                business and referrals for your Charlotte home service company.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Start Customer Experience Audit
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

export default CustomerExperience;
