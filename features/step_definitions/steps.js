var config = require('../support/world.js').config,
  driver = false;

module.exports = function() {

  this.World = require('../support/world.js').World;

  this.Given(/^the presenter is navigated to "([^"]*)"$/, {
    timeout: config.timeout
  }, function (path, next) {

    driver = driver || this.driver;

    if (config.debug) {
      console.info('Browsing to URL: ' + config.baseUrl + path);
    }

    this.driver
      .get(config.baseUrl + path)
      .then(function () {
        next();
      });
  });

  this.Then(/^the presenter should see a "([^"]*)" containing "([^"]*)"(?: within "([^"]*)" seconds)?$/, function (tag, text, timeout, next) {
    driver = driver || this.driver;

    var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    timeout = timeout || false;
    tag = tag.toLowerCase();

    if (tags.indexOf(tag) > -1) {
      this.driver
        .wait(function() {
          return driver.isElementPresent({ xpath: "//" + tag + "[contains(text(), '" + text + "')]" })
        }, timeout !== false ? parseInt(timeout) * 1000 : config.timeout)
        .then(function() {
          next();
        });
    } else {
      next(new Error('Please enter a valid tag to find on page'));
    }
  });

};