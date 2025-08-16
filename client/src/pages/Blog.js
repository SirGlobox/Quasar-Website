import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const blogPosts = [
    {
      id: 7,
      slug: 'luxury-consulting-charlotte-premium-business',
      title: 'Luxury Consulting Charlotte | Premium Business Consulting | Quasar Consultants',
      excerpt: 'Discover how Quasar Consultants sets the standard for luxury consulting in Charlotte. Explore the features that define premium business consulting and request your exclusive strategy session today.',
      author: 'Quasar Consultants',
      date: '2025-08-04',
      readTime: '12 min read',
      category: 'Luxury Consulting',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1755310731/Blog_2_v2tqpl.png'
    },
    {
      id: 6,
      slug: 'customer-retention-strategies',
      title: 'Customer Retention Strategies That Actually Work',
      excerpt: 'Proven customer retention strategies for home service businesses. Build long-term relationships and increase customer lifetime value.',
      author: 'Quasar Consultants',
      date: '2025-07-28',
      readTime: '5 min read',
      category: 'Customer Service',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754845675/Customer_-_Blog_qhutz0.png'
    },
    {
      id: 5,
      slug: 'charlotte-market-analysis-2024',
      title: 'Charlotte Market Analysis 2024: Opportunities for Home Service Businesses',
      excerpt: 'Comprehensive analysis of the Charlotte market for home service businesses. Understand trends, opportunities, and challenges in the local market.',
      author: 'Quasar Consultants',
      date: '2025-07-21',
      readTime: '10 min read',
      category: 'Market Analysis',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754845695/Market_-_Blog_b9vnsu.png'
    },
    {
      id: 4,
      slug: 'financial-planning-home-service-business',
      title: 'Financial Planning for Home Service Business Success',
      excerpt: 'Essential financial planning strategies to ensure your home service business thrives. From pricing strategies to cash flow management.',
      author: 'Quasar Consultants',
      date: '2025-07-14',
      readTime: '9 min read',
      category: 'Financial Planning',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754845675/Financial_Planning_-_Blog_ipsnjx.png'
    },
    {
      id: 3,
      slug: 'operations-optimization-home-service',
      title: 'Operations Optimization: Streamline Your Home Service Business',
      excerpt: 'Learn how to optimize your operations for maximum efficiency and profitability. Practical tips for scheduling, team management, and customer service.',
      author: 'Quasar Consultants',
      date: '2025-07-07',
      readTime: '7 min read',
      category: 'Operations',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754845696/Operations_Opt_-_Blog_uku5op.png'
    },
    {
      id: 2,
      slug: 'marketing-strategies-local-service-providers',
      title: 'Top Marketing Strategies for Local Service Providers',
      excerpt: 'Effective marketing strategies that work specifically for home service businesses in Charlotte. From digital marketing to local SEO, learn what drives results.',
      author: 'Quasar Consultants',
      date: '2025-06-30',
      readTime: '6 min read',
      category: 'Marketing',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754845695/Top_Marketing_-_Blog_b7oym3.png'
    },
    {
      id: 1,
      slug: 'how-to-grow-home-service-business-charlotte',
      title: 'How to Grow Your Home Service Business in Charlotte, NC',
      excerpt: 'Discover proven strategies to scale your home service business in Charlotte\'s competitive market. Learn from local experts who have helped hundreds of businesses succeed.',
      author: 'Quasar Consultants',
      date: '2025-06-23',
      readTime: '8 min read',
      category: 'Business Growth',
      image: 'https://res.cloudinary.com/dvsiayukf/image/upload/v1754846038/Blog_e31jxn.png'
    }
  ];


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Helmet>
        <title>Blog - Home Service Business Insights & Strategies | Quasar Consultants Charlotte NC</title>
        <meta name="description" content="Expert insights and strategies for home service businesses in Charlotte, NC. Learn about business growth, marketing, operations, and local market trends." />
        <meta name="keywords" content="home service business blog Charlotte NC, business consulting blog, marketing strategies, operations optimization, local business insights" />
        <link rel="canonical" href="https://quasarconsultants.com/blog" />
        
        {/* Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Quasar Consultants Blog",
            "description": "Expert insights and strategies for home service businesses in Charlotte, NC",
            "url": "https://quasarconsultants.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Quasar Consultants",
              "logo": {
                "@type": "ImageObject",
                "url": "https://quasarconsultants.com/logo.png"
              }
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.date,
              "image": post.image,
              "url": `https://quasarconsultants.com/blog/${post.slug}`
            }))
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <section className="page-hero">
          <div className="container">
            <h1>Blog & Insights</h1>
            <p>Expert strategies and insights for home service businesses in Charlotte, NC</p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section blog-posts">
          <div className="container">
            <div className="section-title">
              <h2>Latest Articles</h2>
              <p>Stay updated with the latest strategies and insights for home service businesses</p>
            </div>
            
            <div className="blog-grid">
              {blogPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card-link">
                  <article className="blog-card card">
                    <div className="blog-image">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        loading="lazy"
                      />
                      <div className="category-badge">{post.category}</div>
                    </div>
                    <div className="blog-content">
                      <div className="post-meta">
                        <span className="date">
                          <Calendar size={14} />
                          {formatDate(post.date)}
                        </span>
                        <span className="read-time">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="blog-footer">
                        <span className="author">By {post.author}</span>
                        <span className="read-more">
                          Read More
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
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
                Get expert consulting tailored specifically for home service businesses in Charlotte, NC.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  Book Free Consultation
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

export default Blog;
