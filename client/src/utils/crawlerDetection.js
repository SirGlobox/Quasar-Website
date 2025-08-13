// Enhanced Crawler detection utility with AI SEO tool support
export const isCrawler = () => {
  if (typeof window === 'undefined') return true; // Server-side rendering
  
  const userAgent = navigator.userAgent.toLowerCase();
  const headers = typeof window !== 'undefined' && window.navigator ? window.navigator : {};
  
  const crawlerPatterns = [
    // Search Engine Crawlers
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
    
    // AI-Powered SEO Tools (Priority Section)
    'sintrabot',
    'sintra.ai',
    'sintra-crawler',
    'sintra ai',
    'surferbot',
    'surferseo',
    'surfer seo',
    'marketmuse',
    'marketmusebot',
    'brightedge',
    'brightedgebot',
    'conductor',
    'conductorbot',
    'seoclarity',
    'seoclaritybot',
    'searchmetrics',
    'searchmetricsbot',
    'contentking',
    'contentkingbot',
    'oncrawl',
    'oncrawlbot',
    'botify',
    'botifybot',
    'deepcrawl',
    'deepcrawlbot',
    'ryte',
    'rytebot',
    'sistrix',
    'sistrixbot',
    'semrush',
    'semrushbot',
    'ahrefs',
    'ahrefsbot',
    'majestic',
    'majesticbot',
    'moz',
    'mozbot',
    'spyfu',
    'spyfubot',
    
    // AI Content Analysis Tools
    'ai-seo',
    'seo-ai',
    'content-ai',
    'ai-audit',
    'ai-crawler',
    'smart-bot',
    'ml-crawler',
    'machine-learning',
    'neural-crawler',
    'cognitive-seo',
    'cognitiveseo',
    
    // Headless Browser Signatures (Used by AI tools)
    'headlesschrome',
    'puppeteer',
    'playwright',
    'selenium',
    'chromedriver',
    'phantomjs',
    'jsdom',
    'zombie',
    'nightmare',
    
    // Traditional SEO Audit Tools
    'screaming frog',
    'screamingfrogseospider',
    'mj12bot',
    'dotbot',
    'seobility',
    'sitebulb',
    'seolyzer',
    'seositecheckup',
    'woorank',
    'seoptimer',
    'varvy',
    'seomator',
    'siteliner',
    'copyscape',
    'plagiarismchecker',
    
    // Social Media Crawlers
    'rogerbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkshare',
    'whatsapp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'skypeuripreview',
    'nuzzel',
    'discordbot',
    'telegrambot',
    
    // Performance & Validation Tools
    'w3c_validator',
    'google page speed',
    'chrome-lighthouse',
    'pagespeed',
    'gtmetrix',
    'pingdom',
    'webpagetest',
    'dareboost',
    'yellowlab',
    'webpageanalyzer',
    'keycdn-tools',
    'tools.pingdom',
    
    // Other Crawlers
    'redditbot',
    'qwantify',
    'pinterestbot',
    'bitrix link preview',
    'xing-contenttabreceiver',
    'archive.org_bot',
    'ia_archiver',
    'wayback',
    'heritrix',
    'nutch',
    'crawler',
    'spider',
    'bot/',
    'crawl'
  ];
  
  // Check for AI tool specific headers or patterns
  const isAITool = () => {
    // Check for common AI tool headers
    if (typeof window !== 'undefined' && window.navigator) {
      const connection = window.navigator.connection;
      if (connection && connection.effectiveType === 'slow-2g') {
        // AI tools often simulate slow connections
        return true;
      }
    }
    
    // Check for headless browser indicators
    const headlessIndicators = [
      'headless',
      'automated',
      'bot',
      'crawler',
      'scraper',
      'audit',
      'test',
      'monitor'
    ];
    
    return headlessIndicators.some(indicator => userAgent.includes(indicator));
  };
  
  return crawlerPatterns.some(pattern => userAgent.includes(pattern)) || isAITool();
};

// Disable animations for crawlers
export const shouldDisableAnimations = () => {
  return isCrawler() || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get crawler-friendly content
export const getCrawlerContent = (component) => {
  if (!isCrawler()) return component;
  
  // Return static content for crawlers
  return component;
};
