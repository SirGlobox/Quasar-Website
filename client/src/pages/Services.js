import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import TextType from '../components/TextType';
import MagicBento from '../components/MagicBento';
import './Services.css';

const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const faqs = [
    {
      question: "What types of home service businesses do you work with?",
      answer: "We specialize in all types of home service businesses including HVAC, plumbing, electrical, landscaping, cleaning services, pest control, and more. Our expertise covers the full spectrum of home service industries in Charlotte, NC."
    },
    {
      question: "How long does it typically take to see results?",
      answer: "Most clients begin seeing measurable improvements within 30-60 days. However, the timeline varies based on your specific goals and current business situation. We provide detailed progress reports and adjust strategies as needed."
    },
    {
      question: "Do you work with businesses outside of Charlotte?",
      answer: "Yes! We serve home service businesses throughout the greater Charlotte area within a 30-mile radius, including Concord, Gastonia, Huntersville, Matthews, Mint Hill, Pineville, Cornelius, Davidson, Mooresville, Rock Hill, Fort Mill, and Indian Trail. Our local market expertise extends throughout the Charlotte metropolitan region."
    },
    {
      question: "What makes Quasar Consultants different from other business consultants?",
      answer: "We focus exclusively on home service businesses and have deep local market knowledge of Charlotte. Our proven methodologies are specifically designed for this industry, and we provide ongoing support rather than just recommendations."
    },
    {
      question: "Do you offer ongoing support after the initial consultation?",
      answer: "Yes, we provide comprehensive ongoing support including regular check-ins, strategy adjustments, implementation guidance, and access to our team for questions and support. We're committed to your long-term success."
    },
    {
      question: "What is included in the free consultation?",
      answer: "The free consultation includes a comprehensive business assessment, identification of key growth opportunities, preliminary strategy recommendations, and a detailed proposal for how we can help you achieve your goals."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Consulting Services Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Expert home service business consulting services in Charlotte, NC. Specialized in business strategy, marketing, operations, financial planning & market expansion. Transform your business today." />
        <meta name="keywords" content="home service consulting Charlotte NC, business strategy consulting, marketing consulting, operations optimization, financial planning, market expansion Charlotte" />
        <link rel="canonical" href="https://quasarconsultants.com/services" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Home Service Business Consulting",
            "description": "Expert consulting services for home service businesses in Charlotte, NC",
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

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <TextType 
              text={[
                "Our Consulting Services",
                "Expert Business Growth Solutions", 
                "Transform Your Service Company"
              ]}
              as="h1"
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="services-header-typing"
              textColors={["#F9FAFB", "#A259F7", "#FFD600"]}
            />
            <p>Comprehensive solutions designed specifically for home service businesses in Charlotte, NC and surrounding areas</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section services-grid">
          <div className="container">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={22}
              particleCount={12}
              glowColor="162, 89, 247"
            />
          </div>
        </section>

        {/* Process Section */}
        <section className="section process-section">
          <div className="container">
            <div className="section-title">
              <h2>Our Consulting Process</h2>
              <p>A proven methodology that delivers measurable results for home service businesses</p>
            </div>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Assessment & Analysis</h3>
                <p>Comprehensive evaluation of your current business operations, market position, and growth opportunities.</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Strategy Development</h3>
                <p>Custom strategy creation tailored to your specific business goals and Charlotte market conditions.</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Implementation Support</h3>
                <p>Hands-on guidance and support to implement strategies and optimize performance.</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Ongoing Optimization</h3>
                <p>Continuous monitoring, analysis, and strategy adjustments to ensure sustained growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section faq-section">
          <div className="container">
            <div className="section-title">
              <h2>Frequently Asked Questions</h2>
              <p>Common questions about our home service business consulting services</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.question}</span>
                    {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Transform Your Home Service Business?</h2>
              <p>
                Join the hundreds of successful home service businesses in Charlotte who have 
                grown with Quasar Consultants. Start your journey today.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Book Free Consultation
                </Link>
                <a href="tel:+19802664818" className="btn btn-secondary btn-large">
                  Call (980) 266-4818
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
