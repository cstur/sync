// Karma configuration
var path = require('path');
var cwd = process.cwd();

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: 'test.bundle.js', watched: false }
    ],

    exclude: [
    ],
    
    preprocessors: {
      'test.bundle.js': ['webpack']
    },

    webpack: {
      resolve: {
        root: [path.resolve(cwd)],
        modulesDirectories: ['node_modules', 'app', 'test', '.'],
        extensions: ['', '.ts', '.js', '.css'],
        alias: {
          'app': 'app'
        }
      },
      module: {
        loaders: [
          { test: /\.ts$/, loader: 'ts-loader', exclude: [/node_modules/]}
        ]
      },
      stats: {
        colors: true,
        reasons: true
      },
      watch: true,
      debug: true
    },

    webpackServer: {
      noInfo: true
    },
    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  })
}
