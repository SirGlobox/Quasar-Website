const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting (fixes X-Forwarded-For header warning)
app.set('trust proxy', 1);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Log environment variables on startup (without sensitive data)
console.log('🚀 Server starting...');
console.log('📧 Contact email:', process.env.CONTACT_EMAIL);
console.log('🔑 Resend API key configured:', !!process.env.RESEND_API_KEY);
console.log('🌐 Client URL:', process.env.CLIENT_URL);
console.log('🔧 Environment:', process.env.NODE_ENV);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "https://maps.googleapis.com"],
      frameSrc: ["'self'", "https://www.google.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('service').optional().trim(),
  body('website').optional().trim() // Honeypot field
], async (req, res) => {
  console.log('📨 Contact form submission received');
  console.log('📝 Request body:', req.body);
  console.log('🌐 Request IP:', req.ip);
  console.log('📋 Request headers:', req.headers);
  
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { firstName, lastName, email, phone, company, service, message, website } = req.body;

    // Honeypot check - if website field is filled, it's likely spam
    if (website) {
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      company: company ? company.trim() : '',
      service: service ? service.trim() : '',
      message: message.trim()
    };

    // Prepare email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
      <p><strong>Email:</strong> ${sanitizedData.email}</p>
      ${sanitizedData.phone ? `<p><strong>Phone:</strong> ${sanitizedData.phone}</p>` : ''}
      ${sanitizedData.company ? `<p><strong>Company:</strong> ${sanitizedData.company}</p>` : ''}
      ${sanitizedData.service ? `<p><strong>Service Interest:</strong> ${sanitizedData.service}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted from: ${req.ip} at ${new Date().toISOString()}</small></p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Quasar Consultants <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'info@quasarconsultants.com'],
      subject: `New Contact Form Submission - ${sanitizedData.firstName} ${sanitizedData.lastName}`,
      html: emailContent,
      replyTo: sanitizedData.email
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again or contact us directly.' 
      });
    }

    // Send confirmation email to user
    const confirmationContent = `
      <h2>Thank you for contacting Quasar Consultants!</h2>
      <p>Dear ${sanitizedData.firstName},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p>Here's a copy of your message:</p>
      <blockquote>${sanitizedData.message}</blockquote>
      <p>If you need immediate assistance, please call us at (123) 456-7890.</p>
      <p>Best regards,<br>The Quasar Consultants Team</p>
    `;

    await resend.emails.send({
      from: 'Quasar Consultants <onboarding@resend.dev>',
      to: [sanitizedData.email],
      subject: 'Thank you for contacting Quasar Consultants',
      html: confirmationContent
    });

    res.json({ 
      success: true, 
      message: 'Message sent successfully. We\'ll get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again or contact us directly.' 
    });
  }
});

// Sitemap endpoint
app.get('/sitemap.xml', (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://quasarconsultants.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://quasarconsultants.com/services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://quasarconsultants.com/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://quasarconsultants.com/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>https://quasarconsultants.com/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    </urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://quasarconsultants.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
  
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
