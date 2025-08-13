#!/usr/bin/env node

/**
 * Comprehensive Website Scraping Diagnostic Tool
 * Identifies specific factors preventing website scraping
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const SITE_URL = 'https://thequasarconsultants.com';

// Comprehensive test scenarios
const testScenarios = [
  {
    name: 'Standard Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none'
    }
  },
  {
    name: 'Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate'
    }
  },
  {
    name: 'Screaming Frog',
    userAgent: 'Screaming Frog SEO Spider/18.0',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  },
  {
    name: 'AhrefsBot',
    userAgent: 'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    headers: {
      'Accept': '*/*'
    }
  },
  {
    name: 'Basic cURL',
    userAgent: 'curl/7.68.0',
    headers: {
      'Accept': '*/*'
    }
  },
  {
    name: 'Python Requests',
    userAgent: 'python-requests/2.28.1',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate'
    }
  },
  {
    name: 'Minimal Headers',
    userAgent: 'TestBot/1.0',
    headers: {}
  },
  {
    name: 'No User-Agent',
    userAgent: '',
    headers: {
      'Accept': 'text/html'
    }
  }
];

// Test paths including API routes
const testPaths = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/api/robots.txt',
  '/api/sitemap.xml',
  '/services',
  '/about',
  '/contact'
];

function makeRequest(url, scenario, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': scenario.userAgent,
        ...scenario.headers
      },
      timeout: timeout
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      let chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
        data += chunk.toString();
      });
      
      res.on('end', () => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          responseTime: responseTime,
          contentLength: Buffer.concat(chunks).length,
          contentPreview: data.substring(0, 500),
          redirected: res.statusCode >= 300 && res.statusCode < 400,
          redirectLocation: res.headers.location || null
        });
      });
    });

    req.on('error', (err) => {
      const endTime = Date.now();
      reject({
        error: err.message,
        code: err.code,
        responseTime: endTime - startTime
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        code: 'TIMEOUT',
        responseTime: timeout
      });
    });

    req.end();
  });
}

async function analyzeResponse(result, scenario, path) {
  const analysis = {
    accessible: result.statusCode >= 200 && result.statusCode < 400,
    issues: [],
    insights: []
  };

  // Status code analysis
  if (result.statusCode === 400) {
    analysis.issues.push('400 Bad Request - Server rejecting the request');
  } else if (result.statusCode === 403) {
    analysis.issues.push('403 Forbidden - Access denied, likely bot blocking');
  } else if (result.statusCode === 429) {
    analysis.issues.push('429 Too Many Requests - Rate limiting active');
  } else if (result.statusCode === 503) {
    analysis.issues.push('503 Service Unavailable - Server overloaded or maintenance');
  } else if (result.statusCode >= 500) {
    analysis.issues.push(`${result.statusCode} Server Error - Internal server issue`);
  }

  // Response time analysis
  if (result.responseTime > 10000) {
    analysis.issues.push('Extremely slow response time (>10s) - possible bot detection delay');
  } else if (result.responseTime > 5000) {
    analysis.issues.push('Slow response time (>5s) - possible throttling');
  }

  // Content analysis
  if (result.contentLength === 0) {
    analysis.issues.push('Empty response body - content blocked or missing');
  } else if (result.contentLength < 100) {
    analysis.issues.push('Very small response - possible error page or blocked content');
  }

  // Header analysis
  const headers = result.headers || {};
  
  if (headers['cf-ray']) {
    analysis.insights.push('Cloudflare detected - may have bot protection');
  }
  
  if (headers['server'] && headers['server'].includes('cloudflare')) {
    analysis.insights.push('Cloudflare server detected');
  }
  
  if (headers['x-vercel-cache']) {
    analysis.insights.push(`Vercel cache status: ${headers['x-vercel-cache']}`);
  }
  
  if (headers['x-vercel-id']) {
    analysis.insights.push('Vercel infrastructure confirmed');
  }

  // Security headers
  if (headers['x-frame-options']) {
    analysis.insights.push(`X-Frame-Options: ${headers['x-frame-options']}`);
  }
  
  if (headers['content-security-policy']) {
    analysis.insights.push('Content Security Policy detected');
  }

  // Bot detection indicators
  if (result.contentPreview.includes('Access denied') || 
      result.contentPreview.includes('Blocked') ||
      result.contentPreview.includes('Bot detected')) {
    analysis.issues.push('Bot detection message in response content');
  }

  // Redirect analysis
  if (result.redirected) {
    analysis.insights.push(`Redirected to: ${result.redirectLocation}`);
  }

  return analysis;
}

async function runDiagnostics() {
  console.log('🔍 COMPREHENSIVE WEBSITE SCRAPING DIAGNOSTICS');
  console.log('='.repeat(80));
  console.log(`Target: ${SITE_URL}`);
  console.log(`Test scenarios: ${testScenarios.length}`);
  console.log(`Test paths: ${testPaths.length}`);
  console.log(`Total tests: ${testScenarios.length * testPaths.length}`);
  console.log('='.repeat(80));

  const results = {};
  const summary = {
    totalTests: 0,
    successfulTests: 0,
    failedTests: 0,
    blockedScenarios: [],
    workingScenarios: [],
    commonIssues: {},
    insights: []
  };

  for (const scenario of testScenarios) {
    console.log(`\n🤖 Testing: ${scenario.name}`);
    console.log('-'.repeat(50));
    
    results[scenario.name] = {};
    let scenarioSuccess = 0;
    let scenarioTotal = 0;

    for (const path of testPaths) {
      summary.totalTests++;
      scenarioTotal++;
      
      const fullUrl = SITE_URL + path;
      
      try {
        const result = await makeRequest(fullUrl, scenario);
        const analysis = await analyzeResponse(result, scenario, path);
        
        results[scenario.name][path] = { result, analysis };
        
        if (analysis.accessible) {
          summary.successfulTests++;
          scenarioSuccess++;
          console.log(`✅ ${path}: ${result.statusCode} (${result.responseTime}ms)`);
        } else {
          summary.failedTests++;
          console.log(`❌ ${path}: ${result.statusCode} ${result.statusMessage} (${result.responseTime}ms)`);
          
          // Track common issues
          analysis.issues.forEach(issue => {
            summary.commonIssues[issue] = (summary.commonIssues[issue] || 0) + 1;
          });
        }
        
        // Collect insights
        analysis.insights.forEach(insight => {
          if (!summary.insights.includes(insight)) {
            summary.insights.push(insight);
          }
        });
        
      } catch (error) {
        summary.failedTests++;
        console.log(`❌ ${path}: ERROR - ${error.error} (${error.responseTime}ms)`);
        
        const errorKey = `Network Error: ${error.error}`;
        summary.commonIssues[errorKey] = (summary.commonIssues[errorKey] || 0) + 1;
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Categorize scenarios
    const successRate = (scenarioSuccess / scenarioTotal) * 100;
    if (successRate > 80) {
      summary.workingScenarios.push(scenario.name);
    } else if (successRate < 20) {
      summary.blockedScenarios.push(scenario.name);
    }
    
    console.log(`📊 Success rate: ${successRate.toFixed(1)}% (${scenarioSuccess}/${scenarioTotal})`);
  }

  // Generate comprehensive report
  console.log('\n' + '='.repeat(80));
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(80));
  
  console.log(`Total Tests: ${summary.totalTests}`);
  console.log(`Successful: ${summary.successfulTests} ✅`);
  console.log(`Failed: ${summary.failedTests} ❌`);
  console.log(`Overall Success Rate: ${((summary.successfulTests / summary.totalTests) * 100).toFixed(1)}%`);
  
  console.log('\n🚫 BLOCKED SCENARIOS:');
  summary.blockedScenarios.forEach(scenario => {
    console.log(`   - ${scenario}`);
  });
  
  console.log('\n✅ WORKING SCENARIOS:');
  summary.workingScenarios.forEach(scenario => {
    console.log(`   - ${scenario}`);
  });
  
  console.log('\n🔍 COMMON ISSUES:');
  Object.entries(summary.commonIssues)
    .sort(([,a], [,b]) => b - a)
    .forEach(([issue, count]) => {
      console.log(`   - ${issue} (${count} occurrences)`);
    });
  
  console.log('\n💡 INFRASTRUCTURE INSIGHTS:');
  summary.insights.forEach(insight => {
    console.log(`   - ${insight}`);
  });
  
  // Provide recommendations
  console.log('\n🔧 RECOMMENDATIONS:');
  
  if (summary.blockedScenarios.length > summary.workingScenarios.length) {
    console.log('   - MAJOR BLOCKING DETECTED: Most scrapers are being blocked');
    console.log('   - Check Vercel project settings for bot protection');
    console.log('   - Consider using browser automation tools (Puppeteer, Selenium)');
    console.log('   - Implement API endpoints for data access');
  }
  
  if (summary.commonIssues['400 Bad Request - Server rejecting the request']) {
    console.log('   - 400 errors indicate server-level request rejection');
    console.log('   - Review server middleware and request validation');
    console.log('   - Check for required headers or authentication');
  }
  
  if (summary.insights.some(i => i.includes('Cloudflare'))) {
    console.log('   - Cloudflare detected - bot protection likely active');
    console.log('   - Consider whitelisting legitimate crawlers in Cloudflare');
    console.log('   - Use Cloudflare API to manage bot protection rules');
  }
  
  console.log('\n📋 NEXT STEPS:');
  console.log('   1. Review the detailed results above');
  console.log('   2. Focus on the most common issues identified');
  console.log('   3. Test fixes with the working scenarios first');
  console.log('   4. Gradually expand to blocked scenarios');
  console.log('   5. Monitor server logs during testing');
}

// Run the diagnostics
runDiagnostics().catch(console.error);
