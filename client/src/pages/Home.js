import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, TrendingUp, Shield } from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import ScrambledText from '../components/ScrambledText';
import GradientText from '../components/GradientText';
import OptimizedVideo from '../components/OptimizedVideo';
import './Home.css';

const Home = ({ disableAnimations = false }) => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const services = [
    {
      icon: <TrendingUp />,
      title: "Business Strategy",
      description: "Develop winning strategies to scale your home service business in Charlotte, NC"
    },
    {
      icon: <Users />,
      title: "Market Entry",
      description: "Enter new markets with confidence using our proven local market analysis"
    },
    {
      icon: <Shield />,
      title: "Operations Optimization",
      description: "Streamline operations and improve efficiency for maximum profitability"
    }
  ];

  const testimonials = [
    {
      name: "Henry Pagan",
      company: "Super Handy Bros LLC",
      text: "Quasar Consultants helped us double our revenue in just 6 months. Their local market knowledge is unmatched!",
      rating: 5
    },
    {
      name: "Andrew Taronji",
      company: "Gardening Thyme",
      text: "The strategic guidance we received transformed our business. Highly recommend for any home service company in Charlotte.",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Growth Consultant Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Unlock rapid business growth in Charlotte with expert consulting. Accelerate your home service business—book your free strategy session today!" />
        <meta name="keywords" content="home service business consulting Charlotte NC, business consulting Charlotte, home service marketing, business strategy consulting, local business growth Charlotte" />
        <meta property="og:title" content="Quasar Consultants - Home Service Business Consulting Charlotte NC" />
        <meta property="og:description" content="Expert business consulting for home service companies in Charlotte, NC. Transform your business with proven strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quasarconsultants.com" />
        <meta property="og:image" content="https://quasarconsultants.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://quasarconsultants.com" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Quasar Consultants",
            "description": "Home service business consulting in Charlotte, NC",
            "url": "https://quasarconsultants.com",
            "telephone": "+19802664818",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Charlotte",
              "addressRegion": "NC",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "35.2271",
              "longitude": "-80.8431"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "35.2271",
                "longitude": "-80.8431"
              },
              "geoRadius": "50000"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Fr 09:00-17:00"
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text-container">
                <div className="hero-title-container">
                  <h1 className="hero-title">
                    <DecryptedText 
                      text="Home Service Business Consulting Charlotte NC"
                      animateOn="view"
                      sequential={true}
                      speed={50}
                      maxIterations={15}
                      revealDirection="start"
                      className="hero-title-revealed"
                      encryptedClassName="hero-title-encrypted"
                      disableAnimations={disableAnimations}
                    />
                  </h1>
                </div>
                <div className="hero-subtitle-container">
                  <p className="hero-subtitle">
                    <DecryptedText 
                      text="Expert business consulting to help home service companies scale, optimize operations, and dominate the Charlotte market. Proven strategies that deliver results."
                      animateOn="view"
                      sequential={true}
                      speed={30}
                      maxIterations={20}
                      revealDirection="start"
                      className="hero-subtitle-revealed"
                      encryptedClassName="hero-subtitle-encrypted"
                      disableAnimations={disableAnimations}
                    />
                  </p>
                </div>
              </div>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Book Free Consultation
                  <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn btn-secondary btn-large">
                  View Services
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <OptimizedVideo
                src="https://res.cloudinary.com/dvsiayukf/video/upload/v1754623401/Guy_on_Rocket_rucszc.mp4"
                autoPlay={true}
                lazy={false}
                className="hero-video"
                aria-label="Quasar Consultants helping home service businesses grow in Charlotte NC"
              />
            </div>
          </div>
        </section>

        {/* What is a Quasar Section */}
        <section className="section what-is-quasar">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <GradientText
                  colors={["#A259F7", "#FFD600", "#A259F7", "#FFD600", "#A259F7"]}
                  animationSpeed={3}
                  showBorder={false}
                  className="quasar-header"
                >
                  What is a Quasar?
                </GradientText>
                <p className="quasar-description">
                  A Quasar is the brightest object in the universe, powered by a supermassive black hole at the center of a distant galaxy. Emitting extraordinary amounts of energy, quasars outshine entire galaxies and serve as cosmic beacons visible across billions of light-years. In the business world, the concept of a quasar symbolizes unmatched brilliance, energy, and transformative impact—qualities that Quasar Consultants brings to every client engagement. Just as a quasar illuminates the cosmos, our consulting services are designed to help Charlotte-area home service businesses shine brighter, stand out in competitive markets, and achieve stellar growth. By combining data-driven insights, strategic planning, and industry expertise, Quasar Consultants empowers your business to reach new heights and become a guiding light in your field.
                </p>
              </div>
              <div className="video-container">
                <OptimizedVideo
                  src="https://res.cloudinary.com/dvsiayukf/video/upload/v1754885105/Quasar_z0qjx2.mp4"
                  autoPlay={true}
                  lazy={true}
                  className="quasar-video"
                  aria-label="Quasar visualization showing cosmic energy and brilliance"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="section services-preview">
          <div className="container">
            <div className="section-title">
              <h2>
                <ScrambledText
                  className="services-preview-title"
                  radius={120}
                  duration={1.5}
                  speed={0.6}
                  scrambleChars=".:"
                >
                  Expert Consulting Services
                </ScrambledText>
              </h2>
              <p>Comprehensive solutions designed specifically for home service businesses in Charlotte and surrounding areas</p>
            </div>
            <div className="grid grid-3">
              {services.map((service, index) => (
                <Link key={index} to="/services" className="service-card card">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-link">
                    Learn More <ArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section why-choose">
          <div className="container">
            <div className="grid grid-2">
              <div className="content">
                <ScrambledText
                  className="scrambled-header"
                  radius={100}
                  duration={1.2}
                  speed={0.5}
                  scrambleChars=".:"
                >
                  Why Choose Quasar Consultants?
                </ScrambledText>
                <p className="why-choose-description">
                  We specialize exclusively in supporting home service businesses in the Charlotte, NC area. With firsthand experience and deep industry insight, we understand the unique challenges local service providers face. Our tailored consulting solutions are designed to help you streamline operations, accelerate growth, and achieve long-term success in the competitive Charlotte market.
                </p>
                <ul className="why-choose-benefits">
                  <li>Local market expertise in Charlotte, NC</li>
                  <li>Proven track record with home service businesses</li>
                  <li>Custom strategies tailored to your business</li>
                  <li>Ongoing support and implementation guidance</li>
                </ul>
                <Link to="/about" className="btn btn-primary">
                  Learn More About Us
                </Link>
              </div>
              <div className="image">
                <OptimizedVideo
                  src="https://res.cloudinary.com/dvsiayukf/video/upload/v1754701260/Qbot_waving_2.0_knhhjj.mp4"
                  autoPlay={true}
                  lazy={true}
                  className="why-choose-video"
                  aria-label="Quasar Consultants team helping home service businesses"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials">
          <div className="container">
            <div className="section-title">
              <h2>What Our Clients Say</h2>
              <p>Real results from real home service businesses in Charlotte</p>
            </div>
            <div className="grid grid-2">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card card">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="#FFD700" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.company}</span>
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
              <h2>Ready to Transform Your Business?</h2>
              <p>
                Discover how Quasar Consultants can help your home service business in Charlotte reach new heights. Book your free consultation today.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Get Started Today
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

export default Home;
