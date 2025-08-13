import { NextResponse } from 'next/server';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const url = request.nextUrl.clone();
  
  // List of known crawlers and SEO tools
  const crawlerPatterns = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'applebot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'screaming frog',
    'screamingfrogseospider',
    'ahrefsbot',
    'semrushbot',
    'mj12bot',
    'dotbot',
    'seobility',
    'sitebulb',
    'deepcrawl',
    'oncrawl',
    'botify',
    'ryte',
    'searchmetrics',
    'conductor',
    'brightedge',
    'seolyzer',
    'seositecheckup',
    'woorank',
    'seoptimer',
    'varvy',
    'seomator',
    'siteliner',
    'copyscape',
    'plagiarismchecker',
    'chrome-lighthouse',
    'pagespeed',
    'gtmetrix',
    'pingdom',
    'webpagetest',
    'dareboost',
    'yellowlab',
    'w3c_validator',
    'crawler',
    'spider',
    'bot/',
    'crawl'
  ];
  
  const isCrawler = crawlerPatterns.some(pattern => userAgent.includes(pattern));
  
  // Handle robots.txt requests
  if (url.pathname === '/robots.txt') {
    const robotsContent = `User-agent: *
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

    return new NextResponse(robotsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      }
    });
  }
  
  // Handle sitemap.xml requests
  if (url.pathname === '/sitemap.xml') {
    // Let this pass through to the static file, but ensure proper headers
    const response = NextResponse.next();
    response.headers.set('Content-Type', 'application/xml; charset=utf-8');
    response.headers.set('Cache-Control', 'public, max-age=3600');
    response.headers.set('X-Robots-Tag', 'index, follow');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', '*');
    return response;
  }
  
  // Handle OPTIONS requests (preflight)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  
  // For crawlers, ensure they get proper headers
  if (isCrawler) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', '*');
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    return response;
  }
  
  // For all other requests, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
