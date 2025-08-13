#!/usr/bin/env node

/**
 * Debug Crawler Detection
 * Simple test to see what's happening with the detection logic
 */

// Mock browser environment
global.window = {
  navigator: { userAgent: '' },
  matchMedia: () => ({ matches: false })
};
global.navigator = global.window.navigator;

// Simple test function
function testCrawlerDetection(userAgent) {
  global.navigator.userAgent = userAgent.toLowerCase();
  
  const crawlerPatterns = [
    'googlebot', 'sintrabot', 'screaming frog', 'ahrefsbot', 
    'headlesschrome', 'puppeteer'
  ];
  
  const isMainCrawler = crawlerPatterns.some(pattern => userAgent.toLowerCase().includes(pattern));
  
  console.log(`Testing: ${userAgent}`);
  console.log(`  Lowercase: ${userAgent.toLowerCase()}`);
  console.log(`  Main crawler match: ${isMainCrawler}`);
  
  // Check each pattern individually
  crawlerPatterns.forEach(pattern => {
    if (userAgent.toLowerCase().includes(pattern)) {
      console.log(`  ✅ Matches pattern: ${pattern}`);
    }
  });
  
  console.log('---');
}

// Test cases
const testCases = [
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'SintraBot/1.0 (+https://sintra.ai/bot)',
  'Screaming Frog SEO Spider/18.0',
  'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.114 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Puppeteer'
];

console.log('🔍 DEBUGGING CRAWLER DETECTION PATTERNS');
console.log('='.repeat(60));

testCases.forEach(testCrawlerDetection);
