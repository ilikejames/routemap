// Karma configuration
// Generated on Tue Jul 14 2015 12:07:15 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    plugins: [
        'karma-jasmine',
        'karma-babel-preprocessor',
        'karma-browserify',
        'karma-chrome-launcher',
        'karma-ng-html2js-preprocessor'
    ],

    // list of files / patterns to load in the browser
    files: [
		'node_modules/angular/angular.js',
		'node_modules/angular-mocks/angular-mocks.js',
        'build/app.js',
		'app/**/*.test.js'
	],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.test.js': ['babel', 'browserify'],
        'app/**/*.html': ['ng-html2js']
    },

    browserify: {
        debug: true,
        transform: [
            'babelify'
        ]
    },

    babelPreprocessor: {
        options: {
            presets: ['es2015']
        }
    },

    ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app/',

        // - setting this option will create only a single module that contains templates
        //   from all the files, so you can load them all with module('foo')
        // - you may provide a function(htmlPath, originalPath) instead of a string
        //   if you'd like to generate modules dynamically
        //   htmlPath is a originalPath stripped and/or prepended
        //   with all provided suffixes and prefixes
        moduleName: 'app.templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging 
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeCanary'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
    
  })
}