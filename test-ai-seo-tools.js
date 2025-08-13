#!/usr/bin/env node

/**
 * AI SEO Tools Testing Script
 * Specifically designed to test Sintra.AI and other AI-powered SEO audit tools
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const SITE_URL = 'https://thequasarconsultants.com';

// AI SEO Tools and their likely user agent patterns
const aiSeoTools = [
  {
    name: 'Sintra.AI (Primary Target)',
    userAgent: 'SintraBot/1.0 (+https://sintra.ai/bot)',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'X-AI-Tool': 'Sintra.AI',
      'X-Content-Analysis': 'enabled'
    }
  },
  {
    name: 'Sintra.AI Alternative Pattern',
    userAgent: 'Mozilla/5.0 (compatible; Sintra.AI/1.0; +https://sintra.ai)',
    headers: {
      'Accept': '*/*',
      'X-Automated-Tool': 'true'
    }
  },
  {
    name: 'Generic AI SEO Tool',
    userAgent: 'AI-SEO-Audit/1.0',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'X-AI-Analysis': 'true'
    }
  },
  {
    name: 'Surfer SEO',
    userAgent: 'SurferBot/1.0 (+https://surferseo.com/bot)',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  },
  {
    name: 'MarketMuse',
    userAgent: 'MarketMuseBot/1.0 (+https://marketmuse.com/bot)',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  },
  {
    name: 'BrightEdge',
    userAgent: 'BrightEdgeBot/1.0 (+https://brightedge.com/bot)',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  },
  {
    name: 'Headless Chrome (AI Tool)',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.114 Safari/537.36',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  },
  {
    name: 'Puppeteer (AI Crawler)',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Puppeteer',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }
];

// Test paths including API routes and key pages
const testPaths = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/api/robots.txt',
  '/api/sitemap.xml',
  '/services',
  '/services/business-assessment',
  '/about',
  '/contact',
  '/blog'
];

function makeRequest(url, tool, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'GET',
      headers: {
        'User-Agent': tool.userAgent,
        ...tool.headers
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
          contentPreview: data.substring(0, 300),
          hasAIOptimization: res.headers['x-ai-optimized'] === 'true',
          hasContentAnalysis: res.headers['x-content-analysis'] === 'enabled',
          hasStructuredData: res.headers['x-structured-data'] === 'enhanced'
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

async function analyzeAIResponse(result, tool, path) {
  const analysis = {
    aiOptimized: false,
    contentAnalysisEnabled: false,
    structuredDataEnhanced: false,
    robotsOptimized: false,
    sitemapEnhanced: false,
    issues: [],
    insights: []
  };

  // Check for AI optimization headers
  if (result.hasAIOptimization) {
    analysis.aiOptimized = true;
    analysis.insights.push('AI optimization headers detected');
  }

  if (result.hasContentAnalysis) {
    analysis.contentAnalysisEnabled = true;
    analysis.insights.push('Content analysis enabled for AI tools');
  }

  if (result.hasStructuredData) {
    analysis.structuredDataEnhanced = true;
    analysis.insights.push('Enhanced structured data available');
  }

  // Analyze robots.txt content
  if (path.includes('robots.txt')) {
    if (result.contentPreview.includes('AI-Optimized')) {
      analysis.robotsOptimized = true;
      analysis.insights.push('Robots.txt optimized for AI tools');
    }
    if (result.contentPreview.includes('Sintra')) {
      analysis.insights.push('Sintra.AI specifically mentioned in robots.txt');
    }
  }

  // Analyze sitemap.xml content
  if (path.includes('sitemap.xml')) {
    if (result.contentPreview.includes('AI-Optimized')) {
      analysis.sitemapEnhanced = true;
      analysis.insights.push('Sitemap enhanced for AI analysis');
    }
    if (result.contentPreview.includes('AI Analysis:')) {
      analysis.insights.push('AI analysis comments found in sitemap');
    }
  }

  // Check response time for AI tools
  if (result.responseTime > 5000) {
    analysis.issues.push('Slow response time may affect AI tool analysis');
  }

  // Check content length
  if (result.contentLength === 0) {
    analysis.issues.push('Empty response - content not accessible to AI tools');
  }

  return analysis;
}

async function runAIToolTests() {
  console.log('🤖 AI SEO TOOLS TESTING SUITE');
  console.log('='.repeat(80));
  console.log(`Target: ${SITE_URL}`);
  console.log(`AI Tools: ${aiSeoTools.length}`);
  console.log(`Test paths: ${testPaths.length}`);
  console.log(`Total tests: ${aiSeoTools.length * testPaths.length}`);
  console.log('='.repeat(80));

  const results = {};
  const summary = {
    totalTests: 0,
    successfulTests: 0,
    failedTests: 0,
    aiOptimizedResponses: 0,
    sintraCompatible: 0,
    issues: [],
    insights: []
  };

  for (const tool of aiSeoTools) {
    console.log(`\n🤖 Testing: ${tool.name}`);
    console.log('-'.repeat(60));
    
    results[tool.name] = {};
    let toolSuccess = 0;
    let toolTotal = 0;

    for (const path of testPaths) {
      summary.totalTests++;
      toolTotal++;
      
      const fullUrl = SITE_URL + path;
      
      try {
        const result = await makeRequest(fullUrl, tool);
        const analysis = await analyzeAIResponse(result, tool, path);
        
        results[tool.name][path] = { result, analysis };
        
        if (result.statusCode >= 200 && result.statusCode < 400) {
          summary.successfulTests++;
          toolSuccess++;
          
          let statusIcon = '✅';
          let additionalInfo = '';
          
          if (analysis.aiOptimized) {
            summary.aiOptimizedResponses++;
            additionalInfo += ' [AI-OPT]';
          }
          
          if (tool.name.includes('Sintra') && result.statusCode === 200) {
            summary.sintraCompatible++;
            additionalInfo += ' [SINTRA-OK]';
          }
          
          console.log(`${statusIcon} ${path}: ${result.statusCode} (${result.responseTime}ms)${additionalInfo}`);
          
          // Show insights for important paths
          if (analysis.insights.length > 0 && (path.includes('robots') || path.includes('sitemap'))) {
            analysis.insights.forEach(insight => {
              console.log(`   💡 ${insight}`);
            });
          }
          
        } else {
          summary.failedTests++;
          console.log(`❌ ${path}: ${result.statusCode} ${result.statusMessage} (${result.responseTime}ms)`);
        }
        
        // Collect issues and insights
        analysis.issues.forEach(issue => {
          if (!summary.issues.includes(issue)) {
            summary.issues.push(issue);
          }
        });
        
        analysis.insights.forEach(insight => {
          if (!summary.insights.includes(insight)) {
            summary.insights.push(insight);
          }
        });
        
      } catch (error) {
        summary.failedTests++;
        console.log(`❌ ${path}: ERROR - ${error.error} (${error.responseTime}ms)`);
      }
      
      // Delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    
    const successRate = (toolSuccess / toolTotal) * 100;
    console.log(`📊 Success rate: ${successRate.toFixed(1)}% (${toolSuccess}/${toolTotal})`);
    
    if (tool.name.includes('Sintra')) {
      console.log(`🎯 Sintra.AI Compatibility: ${summary.sintraCompatible > 0 ? 'EXCELLENT' : 'NEEDS ATTENTION'}`);
    }
  }

  // Generate comprehensive AI tool report
  console.log('\n' + '='.repeat(80));
  console.log('🤖 AI SEO TOOLS ANALYSIS REPORT');
  console.log('='.repeat(80));
  
  console.log(`Total Tests: ${summary.totalTests}`);
  console.log(`Successful: ${summary.successfulTests} ✅`);
  console.log(`Failed: ${summary.failedTests} ❌`);
  console.log(`Overall Success Rate: ${((summary.successfulTests / summary.totalTests) * 100).toFixed(1)}%`);
  console.log(`AI-Optimized Responses: ${summary.aiOptimizedResponses} 🤖`);
  console.log(`Sintra.AI Compatible: ${summary.sintraCompatible} 🎯`);
  
  console.log('\n🎯 SINTRA.AI SPECIFIC RESULTS:');
  const sintraResults = Object.keys(results).filter(key => key.includes('Sintra'));
  sintraResults.forEach(toolName => {
    const toolResults = results[toolName];
    const successCount = Object.values(toolResults).filter(r => r.result.statusCode >= 200 && r.result.statusCode < 400).length;
    console.log(`   ${toolName}: ${successCount}/${testPaths.length} successful requests`);
  });
  
  console.log('\n💡 AI OPTIMIZATION INSIGHTS:');
  summary.insights.forEach(insight => {
    console.log(`   - ${insight}`);
  });
  
  if (summary.issues.length > 0) {
    console.log('\n⚠️ ISSUES DETECTED:');
    summary.issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
  }
  
  // Provide specific recommendations
  console.log('\n🔧 RECOMMENDATIONS FOR AI SEO TOOLS:');
  
  if (summary.sintraCompatible === 0) {
    console.log('   🚨 CRITICAL: Sintra.AI compatibility issues detected');
    console.log('   - Check if Sintra.AI is using different user agent patterns');
    console.log('   - Verify API routes are accessible');
    console.log('   - Test with actual Sintra.AI tool');
  } else {
    console.log('   ✅ Sintra.AI compatibility confirmed');
  }
  
  if (summary.aiOptimizedResponses > 0) {
    console.log('   ✅ AI optimization headers are working');
  } else {
    console.log('   ⚠️ AI optimization headers not detected - check API routes');
  }
  
  console.log('\n📋 NEXT STEPS:');
  console.log('   1. Run actual Sintra.AI audit to confirm compatibility');
  console.log('   2. Monitor server logs for AI tool requests');
  console.log('   3. Adjust crawler detection patterns if needed');
  console.log('   4. Verify all content is accessible to AI analysis');
  
  const overallScore = (summary.successfulTests / summary.totalTests) * 100;
  console.log(`\n🏆 OVERALL AI TOOL COMPATIBILITY SCORE: ${overallScore.toFixed(1)}%`);
  
  if (overallScore >= 95) {
    console.log('🎉 EXCELLENT: Your website is fully optimized for AI SEO tools!');
  } else if (overallScore >= 80) {
    console.log('👍 GOOD: Minor optimizations may improve AI tool compatibility');
  } else {
    console.log('⚠️ NEEDS IMPROVEMENT: Several issues need to be addressed for AI tools');
  }
}

// Run the AI tool tests
runAIToolTests().catch(console.error);
