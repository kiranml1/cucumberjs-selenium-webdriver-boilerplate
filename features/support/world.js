'use strict';

var webdriver = require('selenium-webdriver'),
  driver;

var config = {
  scopeXPath: '//'
};

// baseUrl
config.baseUrl = (process.env.baseUrl) ? process.env.baseUrl : 'https://cucumber.io/';

// debug
config.debug = (process.env.debug) ? process.env.debug : false;

// platform
config.platform = (process.env.platform) ? process.env.platform : 'CHROME';

// stayAlive
config.stayAlive = (process.env.stayAlive) ? process.env.stayAlive : false;

// timeout
config.timeout = (process.env.timeout) ? process.env.timeout : 10000;

// parsing the timeout to a string
config.timeout = parseInt(config.timeout);

// chrome driver configuration
var buildChromeDriver = function() {
  return new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
};

// firefox driver configuration
var buildFirefoxDriver = function() {
  return new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .build();
};

// platform set to config with driver
switch (config.platform) {
  case 'FIREFOX':
    driver = buildFirefoxDriver();
    break;
  default:
    driver = buildChromeDriver();
}

var World = function World() {
  this.webdriver = webdriver;
  this.driver = driver;
};

module.exports.World = World;
module.exports.config = config;