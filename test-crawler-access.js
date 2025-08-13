#!/usr/bin/env node

/**
 * SEO Crawler Access Test Script
 * Tests various user agents to ensure 200 responses from the deployed site
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://thequasarconsultants.com';

// Test user agents for different crawlers and SEO tools
const testUserAgents = [
  {
    name: 'Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  },
  {
    name: 'Screaming Frog',
    userAgent: 'Screaming Frog SEO Spider/18.0'
  },
  {
    name: 'AhrefsBot',
    userAgent: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)'
  },
  {
    name: 'SEMrushBot',
    userAgent: 'Mozilla/5.0 (compatible; SemrushBot/7~bl; +http://www.semrush.com/bot.html)'
  },
  {
    name: 'MJ12bot',
    userAgent: 'Mozilla/5.0 (compatible; MJ12bot/v1.4.8; http://mj12bot.com/)'
  },
  {
    name: 'Chrome Lighthouse',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Chrome-Lighthouse'
  },
  {
    name: 'GTmetrix',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 GTmetrix'
  },
  {
    name: 'Regular Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
];

// Test paths
const testPaths = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/services',
  '/about',
  '/contact',
  '/blog'
];

function makeRequest(url, userAgent) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive'
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data.substring(0, 200) // First 200 chars for verification
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runTests() {
  console.log('🔍 Testing SEO Crawler Access to', SITE_URL);
  console.log('=' .repeat(80));
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  for (const agent of testUserAgents) {
    console.log(`\n🤖 Testing: ${agent.name}`);
    console.log('-'.repeat(40));
    
    for (const path of testPaths) {
      totalTests++;
      const fullUrl = SITE_URL + path;
      
      try {
        const result = await makeRequest(fullUrl, agent.userAgent);
        const status = result.statusCode;
        const success = status >= 200 && status < 400;
        
        if (success) {
          passedTests++;
          console.log(`✅ ${path}: ${status} OK`);
        } else {
          failedTests.push({
            agent: agent.name,
            path: path,
            status: status,
            url: fullUrl
          });
          console.log(`❌ ${path}: ${status} FAILED`);
        }
        
        // Check for important headers
        if (path === '/robots.txt' && result.headers['content-type']) {
          const contentType = result.headers['content-type'];
          if (contentType.includes('text/plain')) {
            console.log(`   📄 Content-Type: ${contentType} ✅`);
          } else {
            console.log(`   📄 Content-Type: ${contentType} ⚠️`);
          }
        }
        
        if (path === '/sitemap.xml' && result.headers['content-type']) {
          const contentType = result.headers['content-type'];
          if (contentType.includes('xml')) {
            console.log(`   📄 Content-Type: ${contentType} ✅`);
          } else {
            console.log(`   📄 Content-Type: ${contentType} ⚠️`);
          }
        }
        
      } catch (error) {
        totalTests++;
        failedTests.push({
          agent: agent.name,
          path: path,
          error: error.message,
          url: fullUrl
        });
        console.log(`❌ ${path}: ERROR - ${error.message}`);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests} ✅`);
  console.log(`Failed: ${failedTests.length} ❌`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (failedTests.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    failedTests.forEach(test => {
      console.log(`   ${test.agent} - ${test.path}: ${test.status || test.error}`);
    });
    
    console.log('\n🔧 RECOMMENDATIONS:');
    console.log('- Check Vercel deployment logs');
    console.log('- Verify middleware.js is deployed correctly');
    console.log('- Test individual URLs manually');
    console.log('- Check for any firewall or security rules blocking crawlers');
  } else {
    console.log('\n🎉 ALL TESTS PASSED! SEO crawlers should now have full access.');
  }
}

// Run the tests
runTests().catch(console.error);
