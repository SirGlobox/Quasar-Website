// Test script to verify Lighthouse/PageSpeed detection
const { isCrawler, shouldDisableAnimations } = require('./client/src/utils/crawlerDetection');

// Mock different user agents to test detection
const testUserAgents = [
  // Lighthouse variants
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 lighthouse',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 chrome-lighthouse',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 google lighthouse',
  
  // PageSpeed Insights variants
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 google page speed',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 pagespeed insights',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 googlepagespeed',
  
  // Web.dev
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 web.dev',
  
  // Regular user (should NOT be detected)
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
];

console.log('🔍 Testing Lighthouse/PageSpeed Detection:\n');

// Mock window object for Node.js testing
global.window = {
  matchMedia: () => ({ matches: false })
};

// Mock navigator for testing
testUserAgents.forEach((userAgent, index) => {
  global.navigator = { userAgent };
  
  const isDetected = isCrawler();
  const shouldDisable = shouldDisableAnimations();
  
  console.log(`Test ${index + 1}:`);
  console.log(`User Agent: ${userAgent}`);
  console.log(`Detected as Crawler: ${isDetected ? '✅ YES' : '❌ NO'}`);
  console.log(`Should Disable Galaxy: ${shouldDisable ? '✅ YES' : '❌ NO'}`);
  console.log('---');
});

console.log('\n🎯 Expected Results:');
console.log('- Tests 1-7: Should detect as crawlers (Galaxy disabled)');
console.log('- Test 8: Should NOT detect as crawler (Galaxy enabled)');
