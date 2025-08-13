/**
 * AI-Optimized Vercel API Route for sitemap.xml
 * Enhanced for AI SEO tools like Sintra.AI with rich metadata and structured data
 */

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = new Date().toISOString();
  
  // Enhanced logging for AI tool analysis
  console.log(`[SITEMAP-AI] Request from: ${userAgent}`);
  console.log(`[SITEMAP-AI] IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  console.log(`[SITEMAP-AI] Method: ${req.method}`);
  console.log(`[SITEMAP-AI] Accept: ${req.headers.accept || 'Not specified'}`);
  
  // Detect AI SEO tools
  const isAITool = userAgent.toLowerCase().includes('sintra') || 
                   userAgent.toLowerCase().includes('ai') ||
                   userAgent.toLowerCase().includes('ml-') ||
                   userAgent.toLowerCase().includes('smart-bot');
  
  if (isAITool) {
    console.log(`[SITEMAP-AI] AI SEO Tool detected: ${userAgent}`);
  }
  
  // Handle OPTIONS requests (preflight)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }
  
  // Enhanced headers for AI tool compatibility
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Vary', 'User-Agent, Accept');
  res.setHeader('X-Robots-Tag', 'index, follow');
  res.setHeader('X-AI-Optimized', 'true'); // Signal AI optimization
  res.setHeader('X-Content-Analysis', 'enabled'); // For AI content analysis
  res.setHeader('X-Structured-Data', 'enhanced'); // Rich structured data available
  
  // Generate current timestamp
  const now = new Date().toISOString();
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  
  // AI-Enhanced sitemap.xml content with rich metadata
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- AI-Optimized Sitemap for Quasar Consultants -->
<!-- Generated: ${timestamp} -->
<!-- Optimized for AI SEO tools including Sintra.AI -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage - Primary Landing Page -->
  <url>
    <loc>https://thequasarconsultants.com/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Primary business page with hero content and service overview -->
  </url>
  
  <!-- Services Overview - High Priority -->
  <url>
    <loc>https://thequasarconsultants.com/services</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Service catalog page with comprehensive business offerings -->
  </url>
  
  <!-- Individual Service Pages - Core Business Content -->
  <url>
    <loc>https://thequasarconsultants.com/services/business-assessment</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Business assessment service - strategic consulting -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/services/market-entry</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Market entry strategy service - expansion consulting -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/services/brand-development</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Brand development service - marketing and identity -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/services/lead-generation</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Lead generation service - customer acquisition -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/services/operations-optimization</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Operations optimization service - efficiency improvement -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/services/customer-experience</loc>
    <lastmod>${lastWeek}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Customer experience service - satisfaction and retention -->
  </url>
  
  <!-- Company Information Pages -->
  <url>
    <loc>https://thequasarconsultants.com/about</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Company information, team, and expertise -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/contact</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Contact information and lead capture forms -->
  </url>
  
  <!-- Content Marketing - Blog Section -->
  <url>
    <loc>https://thequasarconsultants.com/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Blog index with business consulting content -->
  </url>
  
  <!-- Individual Blog Posts - Content Marketing -->
  <url>
    <loc>https://thequasarconsultants.com/blog/how-to-grow-home-service-business-charlotte</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Local SEO content targeting Charlotte home service businesses -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/blog/marketing-strategies-local-service-providers</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Marketing strategy content for service businesses -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/blog/operations-optimization-home-service</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Operations improvement content for home services -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/blog/financial-planning-home-service-business</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Financial planning content for service businesses -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/blog/charlotte-market-analysis-2024</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Local market analysis content for Charlotte businesses -->
  </url>
  
  <url>
    <loc>https://thequasarconsultants.com/blog/customer-retention-strategies</loc>
    <lastmod>${lastMonth}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <mobile:mobile/>
    <!-- AI Analysis: Customer retention strategy content -->
  </url>
  
</urlset>

<!-- 
AI SEO Tool Information:
- Total URLs: 16
- Primary Services: 6
- Blog Content: 6
- Company Pages: 2
- Homepage: 1
- Mobile Optimized: All pages
- Last Generated: ${timestamp}
- Content Focus: Home Service Business Consulting in Charlotte, NC
- Target Keywords: business consulting, home service, Charlotte NC, operations optimization, lead generation, brand development
- Content Freshness: Updated weekly (homepage/blog), monthly (services/company)
- Geographic Focus: Charlotte, North Carolina, United States
- Business Type: B2B Consulting Services
- Industry: Home Service Business Consulting
-->`;

  // Return 200 response with enhanced sitemap.xml content
  return res.status(200).send(sitemapContent);
}
