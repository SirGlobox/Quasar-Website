module.exports = {
  "mode": "production",
  "entry": "./src/index.js",
  "plugins": [
    {
      "opts": {
        "analyzerMode": "static",
        "analyzerHost": "127.0.0.1",
        "reportFilename": "../bundle-analysis.html",
        "defaultSizes": "parsed",
        "openAnalyzer": true,
        "generateStatsFile": false,
        "statsFilename": "stats.json",
        "statsOptions": null,
        "excludeAssets": null,
        "logLevel": "info",
        "startAnalyzer": true,
        "analyzerPort": 8888
      },
      "server": null,
      "logger": {
        "activeLevels": {}
      }
    }
  ]
};