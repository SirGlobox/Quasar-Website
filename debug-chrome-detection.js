#!/usr/bin/env node

/**
 * Debug Chrome Detection
 * Test what patterns are matching Chrome's user agent
 */

// Simulate Chrome user agent
const chromeUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

console.log('🔍 DEBUGGING CHROME DETECTION');
console.log('='.repeat(80));
console.log(`Chrome User Agent: ${chromeUserAgent}`);
console.log(`Lowercase: ${chromeUserAgent.toLowerCase()}`);
console.log('='.repeat(80));

// Test patterns from crawler detection (UPDATED - removed 'moz')
const crawlerPatterns = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'applebot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'sintrabot', 'sintra.ai', 'sintra-crawler',
  'sintra ai', 'surferbot', 'surferseo', 'surfer seo', 'marketmuse', 'marketmusebot',
  'brightedge', 'brightedgebot', 'conductor', 'conductorbot', 'seoclarity', 'seoclaritybot',
  'searchmetrics', 'searchmetricsbot', 'contentking', 'contentkingbot', 'oncrawl', 'oncrawlbot',
  'botify', 'botifybot', 'deepcrawl', 'deepcrawlbot', 'ryte', 'rytebot', 'sistrix', 'sistrixbot',
  'semrush', 'semrushbot', 'ahrefs', 'ahrefsbot', 'majestic', 'majesticbot', 'mozbot',
  'spyfu', 'spyfubot', 'ai-seo', 'seo-ai', 'content-ai', 'ai-audit', 'ai-crawler', 'smart-bot',
  'ml-crawler', 'machine-learning', 'neural-crawler', 'cognitive-seo', 'cognitiveseo',
  'headlesschrome', 'puppeteer', 'playwright', 'selenium', 'chromedriver', 'phantomjs',
  'jsdom', 'zombie', 'nightmare', 'screaming frog', 'screamingfrogseospider', 'mj12bot',
  'dotbot', 'seobility', 'sitebulb', 'seolyzer', 'seositecheckup', 'woorank', 'seoptimer',
  'varvy', 'seomator', 'siteliner', 'copyscape', 'plagiarismchecker', 'rogerbot', 'embedly',
  'quora link preview', 'showyoubot', 'outbrain', 'pinterest/0.', 'developers.google.com/+/web/snippet',
  'slackbot', 'vkshare', 'whatsapp', 'flipboard', 'tumblr', 'bitlybot', 'skypeuripreview',
  'nuzzel', 'discordbot', 'telegrambot', 'w3c_validator', 'google page speed', 'chrome-lighthouse',
  'pagespeed', 'gtmetrix', 'pingdom', 'webpagetest', 'dareboost', 'yellowlab', 'webpageanalyzer',
  'keycdn-tools', 'tools.pingdom', 'redditbot', 'qwantify', 'pinterestbot', 'bitrix link preview',
  'xing-contenttabreceiver', 'archive.org_bot', 'ia_archiver', 'wayback', 'heritrix', 'nutch',
  'crawler', 'spider', 'bot/', 'crawl'
];

const userAgentLower = chromeUserAgent.toLowerCase();
const matchingPatterns = [];

crawlerPatterns.forEach(pattern => {
  if (userAgentLower.includes(pattern)) {
    matchingPatterns.push(pattern);
  }
});

console.log('\n🚨 MATCHING PATTERNS:');
if (matchingPatterns.length > 0) {
  matchingPatterns.forEach(pattern => {
    console.log(`   ❌ MATCHES: "${pattern}"`);
  });
  console.log(`\n🔴 RESULT: Chrome would be detected as CRAWLER`);
} else {
  console.log('   ✅ No patterns match');
  console.log(`\n🟢 RESULT: Chrome would be detected as BROWSER`);
}

console.log('\n🔍 ANALYSIS:');
console.log(`Total patterns tested: ${crawlerPatterns.length}`);
console.log(`Patterns that match: ${matchingPatterns.length}`);

if (matchingPatterns.length > 0) {
  console.log('\n💡 SOLUTION: Remove or modify these patterns:');
  matchingPatterns.forEach(pattern => {
    console.log(`   - "${pattern}" should be more specific`);
  });
}
