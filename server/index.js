const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');
const { Resend } = require('resend');
const path = require('path');
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

// Security middleware - More permissive for crawlers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for better crawler compatibility
  crossOriginEmbedderPolicy: false
}));

// CORS configuration - More permissive for SEO tools
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman, SEO tools)
    if (!origin) return callback(null, true);
    
    // Allow specific origins
    const allowedOrigins = [
      process.env.CLIENT_URL || 'http://localhost:3000',
      'https://thequasarconsultants.com',
      'https://quasarconsultants.com'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow SEO audit tools and crawlers
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent', 'Accept', 'Origin', 'X-Requested-With']
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting - More permissive for crawlers
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased limit for SEO tools
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for known crawlers and SEO tools
    const userAgent = req.get('User-Agent')?.toLowerCase() || '';
    const crawlerPatterns = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
      'screaming frog', 'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot',
      'seobility', 'sitebulb', 'deepcrawl', 'oncrawl', 'botify', 'ryte',
      'chrome-lighthouse', 'pagespeed', 'gtmetrix', 'pingdom', 'webpagetest'
    ];
    return crawlerPatterns.some(pattern => userAgent.includes(pattern));
  }
});

app.use('/api/', limiter);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/build')));

// Contact form rate limiting (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Slightly increased for legitimate use
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
        <loc>https://thequasarconsultants.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://thequasarconsultants.com/services</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://thequasarconsultants.com/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      <url>
        <loc>https://thequasarconsultants.com/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
      <url>
        <loc>https://thequasarconsultants.com/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
      </url>
    </urlset>`;

  res.header('Content-Type', 'application/xml');
  res.header('Access-Control-Allow-Origin', '*');
  res.send(sitemap);
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://thequasarconsultants.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Allow common SEO audit tools
User-agent: Screaming Frog SEO Spider
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: DotBot
Allow: /`;
  
  res.header('Content-Type', 'text/plain');
  res.header('Access-Control-Allow-Origin', '*');
  res.send(robots);
});

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
