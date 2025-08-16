import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Galaxy from '../components/Galaxy';
import GradientText from '../components/GradientText';
import './Pricing.css';

const Pricing = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [visibleSections, setVisibleSections] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.pricing-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleExpanded = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleFaq = (faqIndex) => {
    setOpenFaq(prev => prev === faqIndex ? null : faqIndex);
  };

  const pricingData = [
    {
      id: 'business-assessment',
      title: 'Business Assessment & Growth Roadmap',
      description: 'Comprehensive evaluation and strategic planning for home service businesses seeking growth and optimization.',
      link: '/services/business-assessment',
      packages: [
        {
          id: 'self-assessment',
          name: 'Self-Assessment Package',
          price: '$250',
          description: 'For business owners who want to evaluate their operations independently, we provide a comprehensive business checklist and a 1-hour expert review call.',
          includes: [
            'Home service business assessment checklist',
            '1-hour strategy review with a consultant'
          ]
        },
        {
          id: 'collaborative-audit',
          name: 'Collaborative Audit & Roadmap',
          price: '$750',
          description: 'Work side-by-side with our experts. Receive a complete business audit, a custom growth roadmap, and two strategy sessions tailored to your goals.',
          includes: [
            'In-depth business audit',
            'Customized growth roadmap',
            'Two strategy sessions'
          ]
        },
        {
          id: 'full-service-dive',
          name: 'Full-Service Deep Dive',
          price: 'Starting at $2,000',
          priceNote: '(varies by business size and complexity)',
          description: 'For those seeking a turnkey experience, we deliver a deep-dive assessment, a tailored action plan, and 30 days of follow-up support.',
          includes: [
            'Comprehensive business audit',
            'Custom action plan',
            '30 days of implementation support'
          ]
        }
      ]
    },
    {
      id: 'market-entry',
      title: 'Market Entry & Competitive Analysis',
      description: 'Strategic market research and competitive analysis for home service businesses entering new markets or territories.',
      link: '/services/market-entry',
      packages: [
        {
          id: 'diy-market-research',
          name: 'DIY Market Research',
          price: '$300',
          description: 'Access a proven market research template and receive a 1-hour consulting session to interpret your results.',
          includes: [
            'Market research template',
            '1-hour consult'
          ]
        },
        {
          id: 'collaborative-market',
          name: 'Collaborative Market Analysis',
          price: '$900',
          description: 'Let us guide you through competitor mapping, market analysis, and an entry strategy workshop.',
          includes: [
            'Custom market and competitor analysis',
            'Entry strategy workshop'
          ]
        },
        {
          id: 'turnkey-market-entry',
          name: 'Turnkey Market Entry Solution',
          price: 'Starting at $2,500',
          description: 'Receive a full competitor report, a detailed market entry plan, and ongoing expert feedback.',
          includes: [
            'Comprehensive competitor and market report',
            'Detailed entry plan',
            'Ongoing feedback'
          ]
        }
      ]
    },
    {
      id: 'brand-development',
      title: 'Brand Development & Marketing Strategy',
      description: 'Complete brand transformation and digital marketing strategy development for home service companies.',
      link: '/services/brand-development',
      packages: [
        {
          id: 'brand-audit-starters',
          name: 'Brand Audit for Starters',
          price: '$300',
          description: 'Perfect for new or budget-conscious businesses, this includes a brand audit checklist and a 1-hour consult.',
          includes: [
            'Brand audit checklist',
            '1-hour branding session'
          ]
        },
        {
          id: 'collaborative-brand-refresh',
          name: 'Collaborative Brand Refresh',
          price: '$1,000',
          description: 'Work together to refresh your brand, develop messaging, and build a basic marketing plan with two strategy sessions.',
          includes: [
            'Brand refresh',
            'Messaging strategy',
            'Basic marketing plan',
            'Two consulting sessions'
          ]
        },
        {
          id: 'comprehensive-brand-transformation',
          name: 'Comprehensive Brand Transformation',
          price: '$5,000–$8,000+',
          description: 'For businesses seeking a luxury brand experience, receive a new website, custom brand assets, and a full digital marketing strategy.',
          includes: [
            'Luxury website design',
            'Custom brand assets',
            'Full digital strategy and rollout'
          ]
        }
      ]
    },
    {
      id: 'lead-generation',
      title: 'Lead Generation & Sales Optimization',
      description: 'Advanced lead generation systems and sales process optimization for home service businesses.',
      link: '/services/lead-generation',
      packages: [
        {
          id: 'diy-lead-generation',
          name: 'DIY Lead Generation',
          price: '$250',
          description: 'Get a lead generation checklist and a 1-hour consult to kickstart your sales pipeline.',
          includes: [
            'Lead generation checklist',
            '1-hour consult'
          ]
        },
        {
          id: 'collaborative-funnel',
          name: 'Collaborative Funnel & Sales Optimization',
          price: '$1,200',
          description: 'Receive a custom lead funnel, sales scripting, conversion review, and two strategy sessions.',
          includes: [
            'Custom lead funnel',
            'Sales script',
            'Conversion optimization review',
            'Two sessions'
          ]
        },
        {
          id: 'end-to-end-sales',
          name: 'End-to-End Sales System',
          price: 'Starting at $4,000',
          description: 'Design and automate your entire sales process, with tracking and 30 days of optimization support.',
          includes: [
            'Complete sales system design',
            'Automation and tracking setup',
            '30 days of optimization'
          ]
        }
      ]
    },
    {
      id: 'operations-optimization',
      title: 'Operations & Process Optimization',
      description: 'Streamline operations and optimize business processes for maximum efficiency and growth.',
      link: '/services/operations-optimization',
      packages: [
        {
          id: 'diy-process-audit',
          name: 'DIY Process Audit',
          price: '$300',
          description: 'For those improving operations independently, receive a process audit worksheet and a 1-hour consult.',
          includes: [
            'Process audit worksheet',
            '1-hour consult'
          ]
        },
        {
          id: 'collaborative-sops',
          name: 'Collaborative SOPs & Workflow Mapping',
          price: '$1,200',
          description: 'We\'ll help you map workflows, develop custom SOPs, and provide two coaching sessions.',
          includes: [
            'Custom SOPs',
            'Workflow mapping',
            'Two coaching sessions'
          ]
        },
        {
          id: 'full-operations-overhaul',
          name: 'Full Operations Overhaul',
          price: 'Starting at $3,500',
          description: 'For total transformation, including automation setup and 30 days of ongoing support.',
          includes: [
            'Operations audit',
            'Automation setup',
            '30 days of support'
          ]
        }
      ]
    },
    {
      id: 'customer-experience',
      title: 'Customer Experience & Retention Systems',
      description: 'Build lasting customer relationships and retention systems that drive repeat business and referrals.',
      link: '/services/customer-experience',
      packages: [
        {
          id: 'diy-retention-checklist',
          name: 'DIY Retention Checklist',
          price: '$250',
          description: 'Strengthen client loyalty with a proven retention checklist and a 1-hour consult.',
          includes: [
            'Customer retention checklist',
            '1-hour consult'
          ]
        },
        {
          id: 'collaborative-loyalty',
          name: 'Collaborative Loyalty Program Design',
          price: '$900',
          description: 'Design loyalty programs and feedback systems with expert guidance and two sessions.',
          includes: [
            'Loyalty program design',
            'Feedback system setup',
            'Two consulting sessions'
          ]
        },
        {
          id: 'complete-customer-overhaul',
          name: 'Complete Customer Experience Overhaul',
          price: 'Starting at $2,500',
          description: 'Transform your customer journey with automated retention systems and 30 days of follow-up support.',
          includes: [
            'Customer experience audit',
            'Automated retention systems',
            '30 days of support'
          ]
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'Do you offer payment plans for larger packages?',
      answer: 'Yes, we offer flexible payment plans for packages over $2,000. We can work with you to create a payment schedule that fits your business cash flow needs.'
    },
    {
      question: 'What if I need a custom solution that doesn\'t fit these packages?',
      answer: 'We specialize in creating custom consulting solutions for unique business needs. Contact us for a free consultation to discuss your specific requirements and receive a tailored proposal.'
    },
    {
      question: 'How quickly can we get started once I choose a package?',
      answer: 'Most packages can begin within 1-2 business days of confirmation. Full-service packages may require a brief discovery call to ensure we have everything needed to deliver exceptional results.'
    }
  ];

  return (
    <div className="pricing-page">
      <Galaxy />
      
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="hero-content">
            <GradientText 
              className="hero-title"
              colors={["#A259F7", "#FFD600"]}
            >
              Transparent Consulting Packages
            </GradientText>
            <p className="hero-subtitle">
              Flexible consulting packages designed for every stage of your home service business journey. 
              Whether you're seeking self-guided assessment, collaborative support, or complete transformation, 
              our solutions drive measurable growth for companies in Charlotte, NC and across the U.S.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      {pricingData.map((section, sectionIndex) => (
        <section 
          key={section.id} 
          id={section.id}
          className={`pricing-section ${visibleSections[section.id] ? 'visible' : ''}`}
        >
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-description">{section.description}</p>
            </div>
            
            <div className="pricing-cards">
              {section.packages.map((pkg, pkgIndex) => (
                <div 
                  key={pkg.id}
                  className={`pricing-card ${visibleSections[section.id] ? 'animate' : ''}`}
                  style={{ animationDelay: `${pkgIndex * 0.2}s` }}
                >
                  <div className="card-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-price">
                      <span className="price">{pkg.price}</span>
                      {pkg.priceNote && <span className="price-note">{pkg.priceNote}</span>}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <p className="package-description">{pkg.description}</p>
                    
                    <div className={`package-includes ${expandedCards[pkg.id] ? 'expanded' : ''}`}>
                      <h4>Includes:</h4>
                      <ul>
                        {pkg.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      className="expand-btn"
                      onClick={() => toggleExpanded(pkg.id)}
                    >
                      {expandedCards[pkg.id] ? 'Show Less' : 'Learn More'}
                    </button>
                  </div>
                  
                  <div className="card-footer">
                    <Link to={section.link} className="get-started-btn">
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="section-cta">
              <Link to="/contact" className="consultation-btn">
                Free Consultation
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Common questions about our consulting packages and pricing
            </p>
          </div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
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

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to accelerate your home service business growth?</h2>
            <p>Contact us today for a free initial consultation or to request a custom proposal.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="primary-cta-btn">
                Get Free Consultation
              </Link>
              <Link to="/services" className="secondary-cta-btn">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
