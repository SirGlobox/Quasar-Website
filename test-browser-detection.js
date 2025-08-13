#!/usr/bin/env node

/**
 * Browser Detection Test
 * Verifies that regular browsers are not incorrectly identified as crawlers
 */

// Mock browser environment for testing
global.window = {
  navigator: {
    userAgent: '',
    connection: null
  },
  matchMedia: () => ({ matches: false })
};

global.navigator = global.window.navigator;

// Import the crawler detection function (simulate ES6 import)
const fs = require('fs');
const path = require('path');

// Read and evaluate the crawler detection file
const crawlerDetectionPath = path.join(__dirname, 'client/src/utils/crawlerDetection.js');
const crawlerDetectionCode = fs.readFileSync(crawlerDetectionPath, 'utf8');

// Create a simple module system for the test
const moduleExports = {};
const exportObj = {};

// Replace ES6 exports with our test exports
const testCode = crawlerDetectionCode
  .replace(/export const/g, 'exportObj.')
  .replace(/export \{[^}]+\}/g, '');

// Execute the code in our context
eval(testCode);

const isCrawler = exportObj.isCrawler;
const shouldDisableAnimations = exportObj.shouldDisableAnimations;

// Test user agents
const testCases = [
  // Regular Browsers (should NOT be detected as crawlers)
  {
    name: 'Chrome Desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    expectedCrawler: false
  },
  {
    name: 'Firefox Desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    expectedCrawler: false
  },
  {
    name: 'Safari Desktop',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
    expectedCrawler: false
  },
  {
    name: 'Edge Desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    expectedCrawler: false
  },
  {
    name: 'Chrome Mobile',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    expectedCrawler: false
  },
  {
    name: 'Safari Mobile',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    expectedCrawler: false
  },
  
  // Crawlers and AI Tools (SHOULD be detected as crawlers)
  {
    name: 'Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    expectedCrawler: true
  },
  {
    name: 'Sintra.AI Bot',
    userAgent: 'SintraBot/1.0 (+https://sintra.ai/bot)',
    expectedCrawler: true
  },
  {
    name: 'Screaming Frog',
    userAgent: 'Screaming Frog SEO Spider/18.0',
    expectedCrawler: true
  },
  {
    name: 'AhrefsBot',
    userAgent: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    expectedCrawler: true
  },
  {
    name: 'Headless Chrome',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.114 Safari/537.36',
    expectedCrawler: true
  },
  {
    name: 'Puppeteer',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Puppeteer',
    expectedCrawler: true
  }
];

function runBrowserDetectionTests() {
  console.log('🔍 BROWSER DETECTION VALIDATION');
  console.log('='.repeat(80));
  console.log('Testing crawler detection accuracy...\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  testCases.forEach(testCase => {
    totalTests++;
    
    // Set the user agent for this test
    global.navigator.userAgent = testCase.userAgent;
    
    // Test the detection
    const detectedAsCrawler = isCrawler();
    const animationsDisabled = shouldDisableAnimations();
    
    const passed = detectedAsCrawler === testCase.expectedCrawler;
    
    if (passed) {
      passedTests++;
      console.log(`✅ ${testCase.name}: ${detectedAsCrawler ? 'CRAWLER' : 'BROWSER'} (correct)`);
    } else {
      failedTests.push(testCase);
      console.log(`❌ ${testCase.name}: ${detectedAsCrawler ? 'CRAWLER' : 'BROWSER'} (expected ${testCase.expectedCrawler ? 'CRAWLER' : 'BROWSER'})`);
    }
    
    // Show animation status for browsers
    if (!testCase.expectedCrawler) {
      console.log(`   Animations: ${animationsDisabled ? 'DISABLED' : 'ENABLED'}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(80));
  
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${failedTests.length} ❌`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (failedTests.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    failedTests.forEach(test => {
      console.log(`   - ${test.name}: Expected ${test.expectedCrawler ? 'CRAWLER' : 'BROWSER'}`);
    });
  }

  console.log('\n🎯 BROWSER EXPERIENCE VALIDATION:');
  const browserTests = testCases.filter(t => !t.expectedCrawler);
  const browsersPassed = browserTests.filter(t => {
    global.navigator.userAgent = t.userAgent;
    return !isCrawler();
  }).length;
  
  console.log(`Regular Browsers Correctly Identified: ${browsersPassed}/${browserTests.length}`);
  
  if (browsersPassed === browserTests.length) {
    console.log('🎉 SUCCESS: All regular browsers will get full visual experience!');
    console.log('   - Galaxy background will display');
    console.log('   - Homepage title effects will work');
    console.log('   - All animations will be enabled');
  } else {
    console.log('⚠️ WARNING: Some browsers may get reduced experience');
  }

  console.log('\n🤖 AI TOOL COMPATIBILITY:');
  const crawlerTests = testCases.filter(t => t.expectedCrawler);
  const crawlersPassed = crawlerTests.filter(t => {
    global.navigator.userAgent = t.userAgent;
    return isCrawler();
  }).length;
  
  console.log(`AI Tools/Crawlers Correctly Identified: ${crawlersPassed}/${crawlerTests.length}`);
  
  if (crawlersPassed === crawlerTests.length) {
    console.log('✅ AI SEO tools (including Sintra.AI) will get optimized experience');
  } else {
    console.log('⚠️ Some AI tools may not be properly detected');
  }

  const overallScore = (passedTests / totalTests) * 100;
  console.log(`\n🏆 OVERALL DETECTION ACCURACY: ${overallScore.toFixed(1)}%`);
  
  if (overallScore === 100) {
    console.log('🎉 PERFECT: Detection system is working flawlessly!');
  } else if (overallScore >= 90) {
    console.log('👍 EXCELLENT: Minor issues may need attention');
  } else {
    console.log('⚠️ NEEDS IMPROVEMENT: Detection system requires fixes');
  }
}

// Run the tests
runBrowserDetectionTests();
