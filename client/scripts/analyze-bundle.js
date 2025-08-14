const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create a temporary webpack config for analysis
const webpackConfig = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: '../bundle-analysis.html'
    })
  ]
};

// Write temporary config
fs.writeFileSync(
  path.join(__dirname, '../webpack.analyze.js'),
  `module.exports = ${JSON.stringify(webpackConfig, null, 2)};`
);

console.log('🔍 Analyzing bundle size...');
console.log('This will open a browser window with the bundle analysis.');

try {
  // Run webpack with the analysis config
  execSync('npx webpack --config webpack.analyze.js', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('✅ Bundle analysis complete!');
  console.log('📊 Check bundle-analysis.html for detailed breakdown');
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
} finally {
  // Clean up temporary files
  const tempConfig = path.join(__dirname, '../webpack.analyze.js');
  if (fs.existsSync(tempConfig)) {
    fs.unlinkSync(tempConfig);
  }
}
