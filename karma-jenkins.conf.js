// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    files: [
      'node_modules',
      'src/**/*.ts',
      'test/**/*.spec.ts'
    ],
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-junit-reporter'),
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'text-summary', 'lcov' ],
      dir: 'test/.results/coverage',
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'test'
    },
    reporters: ['progress', 'junit', 'coverage-istanbul'],
    junitReporter: {
      outputDir: 'test/.results'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [ '-headless' ],
      },
    },
    singleRun: true
  });
};
