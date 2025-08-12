// Crawler detection utility
export const isCrawler = () => {
  if (typeof window === 'undefined') return true; // Server-side rendering
  
  const userAgent = navigator.userAgent.toLowerCase();
  const crawlerPatterns = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkshare',
    'w3c_validator',
    'redditbot',
    'applebot',
    'whatsapp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'skypeuripreview',
    'nuzzel',
    'discordbot',
    'google page speed',
    'qwantify',
    'pinterestbot',
    'bitrix link preview',
    'xing-contenttabreceiver',
    'chrome-lighthouse',
    'telegrambot'
  ];
  
  return crawlerPatterns.some(pattern => userAgent.includes(pattern));
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
