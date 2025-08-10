import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: <Phone />,
      title: "Phone",
      value: "(980) 266-4818",
      link: "tel:+19802664818"
    },
    {
      icon: <Mail />,
      title: "Email",
      value: "devin@thequasarconsultants.com",
      link: "mailto:devin@thequasarconsultants.com"
    },
    {
      icon: <MapPin />,
      title: "Address",
      value: "Charlotte, NC 28202",
      link: "https://maps.google.com/?q=Charlotte,NC"
    },
    {
      icon: <Clock />,
      title: "Business Hours",
      value: "Mon-Fri: 9:00 AM - 5:00 PM",
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Business Consultant Charlotte NC | Quasar Consultants</title>
        <meta name="description" content="Contact Quasar Consultants for expert home service business consulting in Charlotte, NC. Get in touch for a free consultation and transform your business today." />
        <meta name="keywords" content="contact Quasar Consultants, home service consulting Charlotte NC, business consultation, free consultation" />
        <link rel="canonical" href="https://quasarconsultants.com/contact" />
        
        {/* Contact Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Quasar Consultants",
            "description": "Contact us for home service business consulting in Charlotte, NC",
            "mainEntity": {
              "@type": "Organization",
              "name": "Quasar Consultants",
              "telephone": "+1234567890",
              "email": "info@quasarconsultants.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Charlotte",
                "addressRegion": "NC",
                "postalCode": "28202",
                "addressCountry": "US"
              }
            }
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p>Ready to transform your home service business? Get in touch for a free consultation</p>
          </div>
        </section>

        {/* ServiceM8 Booking Form */}
        <section className="section booking-section">
          <div className="container">
            <div className="booking-intro">
              <h2>Book Your Free Consultation</h2>
              <p>Schedule your consultation directly through our booking system. Choose a time that works best for you and we'll be in touch to discuss how we can help transform your home service business.</p>
            </div>
            
            <div className="booking-form-container">
              <div className="booking-frame">
                <iframe
                  src="https://book.servicem8.com/request_service_online_booking?strVendorUUID=a431a5d5-bd2c-4963-b656-21f3c7564fbb&strPreviewServiceUUID=1b07db5f-8582-4b06-8932-231a2e71dc0b#1b07db5f-8582-4b06-8932-231a2e71dc0b"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  title="Book a Consultation - Quasar Consultants"
                  style={{ 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="grid grid-2">
                <div className="contact-details-card card">
                  <h3>Contact Information</h3>
                  <div className="contact-details">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="contact-item">
                        <div className="contact-icon">
                          {info.icon}
                        </div>
                        <div className="contact-text">
                          <h4>{info.title}</h4>
                          {info.link ? (
                            <a href={info.link} className="contact-link">
                              {info.value}
                            </a>
                          ) : (
                            <span>{info.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-areas-card card">
                  <h3>Service Areas</h3>
                  <p>We serve home service businesses throughout the greater Charlotte area within a 30-mile radius:</p>
                  <ul>
                    <li>Charlotte, NC</li>
                    <li>Concord, NC</li>
                    <li>Gastonia, NC</li>
                    <li>Huntersville, NC</li>
                    <li>Matthews, NC</li>
                    <li>Mint Hill, NC</li>
                    <li>Pineville, NC</li>
                    <li>Cornelius, NC</li>
                    <li>Davidson, NC</li>
                    <li>Mooresville, NC</li>
                    <li>Rock Hill, SC</li>
                    <li>Fort Mill, SC</li>
                    <li>Indian Trail, NC</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Contact;
