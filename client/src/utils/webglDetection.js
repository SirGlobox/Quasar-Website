/**
 * Advanced WebGL Detection and Performance Testing
 * Comprehensive system capability assessment for Galaxy component
 */

// WebGL capability test results
let webglTestResults = null;

/**
 * Comprehensive WebGL capability testing
 */
export const testWebGLCapabilities = () => {
  if (webglTestResults) return webglTestResults;

  console.log('🔬 Running WebGL capability tests...');
  
  const results = {
    supported: false,
    version: null,
    renderer: null,
    vendor: null,
    maxTextureSize: 0,
    maxVertexAttribs: 0,
    extensions: [],
    performanceScore: 0,
    recommendation: 'fallback',
    issues: [],
    timestamp: Date.now()
  };

  try {
    // Create test canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    // Test WebGL 2.0 first, then WebGL 1.0
    let gl = canvas.getContext('webgl2', { 
      alpha: false, 
      antialias: false, 
      depth: false, 
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });
    
    if (gl) {
      results.version = 'WebGL 2.0';
    } else {
      gl = canvas.getContext('webgl', { 
        alpha: false, 
        antialias: false, 
        depth: false, 
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance'
      });
      
      if (gl) {
        results.version = 'WebGL 1.0';
      }
    }

    if (!gl) {
      results.issues.push('No WebGL context available');
      return cacheResults(results);
    }

    results.supported = true;

    // Get basic info
    results.renderer = gl.getParameter(gl.RENDERER) || 'Unknown';
    results.vendor = gl.getParameter(gl.VENDOR) || 'Unknown';
    results.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
    results.maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) || 0;

    // Get extensions
    const extensions = gl.getSupportedExtensions() || [];
    results.extensions = extensions;

    // Performance benchmarking
    const performanceStart = performance.now();
    
    // Create and test shader compilation
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);
    
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      results.issues.push('Vertex shader compilation failed');
    }

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      results.issues.push('Fragment shader compilation failed');
    }

    // Test program linking
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      results.issues.push('Shader program linking failed');
    }

    // Test buffer creation and data upload
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, 1, 1
    ]), gl.STATIC_DRAW);

    // Test texture creation
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // Performance test - simple draw calls
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Multiple draw calls for performance testing
    for (let i = 0; i < 100; i++) {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // Force GPU sync
    gl.finish();

    const performanceEnd = performance.now();
    results.performanceScore = performanceEnd - performanceStart;

    // Cleanup
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(texture);

    // Determine recommendation based on performance and capabilities
    results.recommendation = determineRecommendation(results);

    console.log('✅ WebGL capability test completed:', results);

  } catch (error) {
    results.issues.push(`WebGL test error: ${error.message}`);
    console.warn('❌ WebGL capability test failed:', error);
  }

  return cacheResults(results);
};

/**
 * Determine the best rendering approach based on test results
 */
const determineRecommendation = (results) => {
  if (!results.supported) return 'fallback';
  if (results.issues.length > 2) return 'fallback';
  
  // Check for known problematic renderers
  const renderer = results.renderer.toLowerCase();
  if (renderer.includes('software') || renderer.includes('llvmpipe')) {
    return 'css'; // Software rendering, use CSS
  }

  // Performance-based recommendations
  if (results.performanceScore > 50) return 'css'; // Slow performance
  if (results.performanceScore > 20) return 'reduced'; // Medium performance
  
  // Check texture size support
  if (results.maxTextureSize < 1024) return 'css';
  if (results.maxTextureSize < 2048) return 'reduced';

  // Check for essential extensions
  const hasFloatTextures = results.extensions.includes('OES_texture_float') || 
                          results.extensions.includes('EXT_color_buffer_float');
  
  if (!hasFloatTextures && results.version === 'WebGL 1.0') {
    return 'reduced';
  }

  return 'full'; // Full WebGL Galaxy
};

/**
 * Cache results to avoid repeated testing
 */
const cacheResults = (results) => {
  webglTestResults = results;
  
  // Store in sessionStorage for persistence across page reloads
  try {
    sessionStorage.setItem('webgl-test-results', JSON.stringify(results));
  } catch (e) {
    // Ignore storage errors
  }
  
  return results;
};

/**
 * Load cached results if available
 */
const loadCachedResults = () => {
  try {
    const cached = sessionStorage.getItem('webgl-test-results');
    if (cached) {
      const results = JSON.parse(cached);
      // Check if results are recent (within 1 hour)
      if (Date.now() - results.timestamp < 3600000) {
        webglTestResults = results;
        return results;
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
  return null;
};

/**
 * Quick WebGL support check (lightweight)
 */
export const hasWebGLSupport = () => {
  if (webglTestResults) return webglTestResults.supported;
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

/**
 * Get system performance tier
 */
export const getPerformanceTier = () => {
  const results = webglTestResults || loadCachedResults();
  if (!results) return 'unknown';
  
  switch (results.recommendation) {
    case 'full': return 'high';
    case 'reduced': return 'medium';
    case 'css': return 'low';
    default: return 'fallback';
  }
};

/**
 * Get detailed system info for debugging
 */
export const getSystemInfo = () => {
  const results = webglTestResults || loadCachedResults();
  
  return {
    webgl: results,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink
    } : null,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio
    }
  };
};

/**
 * Initialize WebGL testing (call this early in app lifecycle)
 */
export const initializeWebGLTesting = () => {
  // Try to load cached results first
  const cached = loadCachedResults();
  if (cached) {
    console.log('📋 Using cached WebGL test results:', cached.recommendation);
    return cached;
  }
  
  // Run tests asynchronously to avoid blocking
  setTimeout(() => {
    testWebGLCapabilities();
  }, 100);
  
  return null;
};

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  initializeWebGLTesting();
}
