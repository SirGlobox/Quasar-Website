/**
 * AI-Optimized Vercel API Route for robots.txt
 * Enhanced for AI SEO tools like Sintra.AI with comprehensive crawler support
 */

export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const timestamp = new Date().toISOString();
  
  // Enhanced logging for AI tool analysis
  console.log(`[ROBOTS-AI] Request from: ${userAgent}`);
  console.log(`[ROBOTS-AI] IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  console.log(`[ROBOTS-AI] Method: ${req.method}`);
  console.log(`[ROBOTS-AI] Referer: ${req.headers.referer || 'Direct'}`);
  console.log(`[ROBOTS-AI] Accept: ${req.headers.accept || 'Not specified'}`);
  
  // Detect AI SEO tools
  const isAITool = userAgent.toLowerCase().includes('sintra') || 
                   userAgent.toLowerCase().includes('ai') ||
                   userAgent.toLowerCase().includes('ml-') ||
                   userAgent.toLowerCase().includes('smart-bot');
  
  if (isAITool) {
    console.log(`[ROBOTS-AI] AI SEO Tool detected: ${userAgent}`);
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
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Vary', 'User-Agent, Accept');
  res.setHeader('X-Robots-Tag', 'noindex'); // Don't index the API endpoint itself
  res.setHeader('X-AI-Optimized', 'true'); // Signal AI optimization
  res.setHeader('X-Content-Analysis', 'enabled'); // For AI content analysis
  
  // Comprehensive robots.txt content optimized for AI SEO tools
  const robotsContent = `# AI-Optimized Robots.txt for Quasar Consultants
# Generated: ${timestamp}
# Optimized for AI SEO tools including Sintra.AI

User-agent: *
Allow: /

# Sitemap Location
Sitemap: https://thequasarconsultants.com/sitemap.xml

# Crawl Settings
Crawl-delay: 1

# AI-Powered SEO Tools (Priority Access)
User-agent: SintraBot
Allow: /
Crawl-delay: 0.5

User-agent: Sintra.AI
Allow: /
Crawl-delay: 0.5

User-agent: SurferBot
Allow: /
Crawl-delay: 0.5

User-agent: MarketMuse
Allow: /
Crawl-delay: 0.5

User-agent: BrightEdge
Allow: /
Crawl-delay: 0.5

User-agent: Conductor
Allow: /
Crawl-delay: 0.5

User-agent: seoClarity
Allow: /
Crawl-delay: 0.5

# Traditional SEO Audit Tools
User-agent: Screaming Frog SEO Spider
Allow: /

User-agent: AhrefsBot
Allow: /

User-agent: SemrushBot
Allow: /

User-agent: MJ12bot
Allow: /

User-agent: DotBot
Allow: /

User-agent: SitebulbBot
Allow: /

User-agent: SEOkicks
Allow: /

User-agent: LinkdexBot
Allow: /

User-agent: MajesticSEO
Allow: /

User-agent: MozBot
Allow: /

User-agent: CognitiveSEO
Allow: /

User-agent: OnCrawl
Allow: /

User-agent: Botify
Allow: /

User-agent: DeepCrawl
Allow: /

User-agent: ContentKing
Allow: /

# Performance & Analysis Tools
User-agent: GTmetrix
Allow: /

User-agent: Pingdom
Allow: /

User-agent: WebPageTest
Allow: /

User-agent: Chrome-Lighthouse
Allow: /

User-agent: PageSpeed
Allow: /

# Content Analysis & AI Tools
User-agent: AI-SEO
Allow: /

User-agent: ML-Crawler
Allow: /

User-agent: Smart-Bot
Allow: /

User-agent: Neural-Crawler
Allow: /

# Headless Browser Tools
User-agent: HeadlessChrome
Allow: /

User-agent: Puppeteer
Allow: /

User-agent: Playwright
Allow: /

# Social Media Crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Additional Resources for AI Analysis
# API Endpoints for structured data
# /api/sitemap.xml - Dynamic sitemap
# /api/robots.txt - This file
# All pages optimized for AI content analysis

# Contact Information for AI Tools
# Website: https://thequasarconsultants.com
# Business: Home Service Business Consulting
# Location: Charlotte, NC
# Services: Business Assessment, Market Entry, Brand Development, Lead Generation, Operations Optimization, Customer Experience

# Last Updated: ${timestamp}
# AI-Optimized: Yes
# Machine-Readable: Yes`;

  // Return 200 response with enhanced robots.txt content
  return res.status(200).send(robotsContent);
}
