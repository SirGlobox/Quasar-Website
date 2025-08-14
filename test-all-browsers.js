#!/usr/bin/env node

/**
 * Comprehensive Browser Compatibility Test
 * Tests all major browsers against crawler detection patterns
 */

console.log('🌐 COMPREHENSIVE BROWSER COMPATIBILITY TEST');
console.log('='.repeat(80));

// Real user agent strings from major browsers
const browserUserAgents = [
  {
    name: 'Chrome (Windows)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Chrome (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Safari (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Safari (iOS iPhone)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Safari (iOS iPad)',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Microsoft Edge (Windows)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.121',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Microsoft Edge (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.2210.121',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Firefox (Windows)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Firefox (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/121.0',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Opera (Windows)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    expectedResult: 'BROWSER'
  },
  {
    name: 'Opera (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    expectedResult: 'BROWSER'
  }
];

// Test against legitimate crawlers to ensure they still work
const crawlerUserAgents = [
  {
    name: 'Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    expectedResult: 'CRAWLER'
  },
  {
    name: 'Sintra.AI Bot',
    userAgent: 'SintraBot/1.0 (+https://sintra.ai/bot)',
    expectedResult: 'CRAWLER'
  },
  {
    name: 'AhrefsBot',
    userAgent: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    expectedResult: 'CRAWLER'
  }
];

// Current crawler patterns from our detection system
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

function testUserAgent(userAgent, expectedResult, name) {
  const userAgentLower = userAgent.toLowerCase();
  const matchingPatterns = [];
  
  crawlerPatterns.forEach(pattern => {
    if (userAgentLower.includes(pattern)) {
      matchingPatterns.push(pattern);
    }
  });
  
  const detectedAsCrawler = matchingPatterns.length > 0;
  const actualResult = detectedAsCrawler ? 'CRAWLER' : 'BROWSER';
  const isCorrect = actualResult === expectedResult;
  
  const statusIcon = isCorrect ? '✅' : '❌';
  const resultColor = isCorrect ? '' : ' ⚠️ INCORRECT';
  
  console.log(`${statusIcon} ${name}: ${actualResult}${resultColor}`);
  
  if (matchingPatterns.length > 0) {
    console.log(`   Matching patterns: ${matchingPatterns.join(', ')}`);
  }
  
  return {
    name,
    userAgent,
    expectedResult,
    actualResult,
    isCorrect,
    matchingPatterns
  };
}

// Run tests
console.log('\n🌐 TESTING MAJOR BROWSERS:');
console.log('-'.repeat(60));

const browserResults = browserUserAgents.map(browser => 
  testUserAgent(browser.userAgent, browser.expectedResult, browser.name)
);

console.log('\n🤖 TESTING LEGITIMATE CRAWLERS:');
console.log('-'.repeat(60));

const crawlerResults = crawlerUserAgents.map(crawler => 
  testUserAgent(crawler.userAgent, crawler.expectedResult, crawler.name)
);

// Summary
console.log('\n' + '='.repeat(80));
console.log('📊 TEST RESULTS SUMMARY');
console.log('='.repeat(80));

const allResults = [...browserResults, ...crawlerResults];
const totalTests = allResults.length;
const passedTests = allResults.filter(r => r.isCorrect).length;
const failedTests = allResults.filter(r => !r.isCorrect);

console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests} ✅`);
console.log(`Failed: ${failedTests.length} ❌`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

// Browser-specific analysis
const browserFailures = browserResults.filter(r => !r.isCorrect);
const crawlerFailures = crawlerResults.filter(r => !r.isCorrect);

console.log('\n🌐 BROWSER COMPATIBILITY:');
console.log(`Browsers correctly identified: ${browserResults.filter(r => r.isCorrect).length}/${browserResults.length}`);

if (browserFailures.length > 0) {
  console.log('\n❌ BROWSERS INCORRECTLY FLAGGED AS CRAWLERS:');
  browserFailures.forEach(browser => {
    console.log(`   - ${browser.name}`);
    console.log(`     Problematic patterns: ${browser.matchingPatterns.join(', ')}`);
  });
}

console.log('\n🤖 CRAWLER DETECTION:');
console.log(`Crawlers correctly identified: ${crawlerResults.filter(r => r.isCorrect).length}/${crawlerResults.length}`);

if (crawlerFailures.length > 0) {
  console.log('\n❌ CRAWLERS NOT DETECTED:');
  crawlerFailures.forEach(crawler => {
    console.log(`   - ${crawler.name}`);
  });
}

// Recommendations
console.log('\n🔧 RECOMMENDATIONS:');

if (browserFailures.length > 0) {
  console.log('\n⚠️ CRITICAL ISSUES TO FIX:');
  
  // Collect all problematic patterns
  const problematicPatterns = new Set();
  browserFailures.forEach(browser => {
    browser.matchingPatterns.forEach(pattern => {
      problematicPatterns.add(pattern);
    });
  });
  
  problematicPatterns.forEach(pattern => {
    console.log(`   - Remove or make more specific: "${pattern}"`);
  });
  
  console.log('\n📋 SUGGESTED FIXES:');
  console.log('   1. Remove overly broad patterns that match browser names');
  console.log('   2. Make patterns more specific to target actual crawlers');
  console.log('   3. Test again after each fix to ensure crawlers still work');
} else {
  console.log('✅ All browsers are correctly identified!');
}

const overallScore = (passedTests / totalTests) * 100;
console.log(`\n🏆 OVERALL COMPATIBILITY SCORE: ${overallScore.toFixed(1)}%`);

if (overallScore === 100) {
  console.log('🎉 PERFECT: All browsers and crawlers detected correctly!');
} else if (overallScore >= 80) {
  console.log('👍 GOOD: Minor issues need attention');
} else {
  console.log('⚠️ NEEDS IMMEDIATE ATTENTION: Critical browser compatibility issues');
}
