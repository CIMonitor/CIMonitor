const util = require('util');
var StatusModule = require('./StatusModule');
var exec = require('child_process').exec;

/**
 * LedStrip
 *
 * @param {object} config
 * @param {StatusManager} statusManager
 * @constructor
 */
var LedStrip = function(config, statusManager) {
    StatusModule.call(this, config, statusManager);
};
util.inherits(LedStrip, StatusModule);

/**
 * Set the gpio pins to the correct mode on initialisation
 */
LedStrip.prototype.init = function() {
    this.redPin = this.config.gpioPinRed;
    this.greenPin = this.config.gpioPinGreen;
    this.bluePin = this.config.gpioPinBlue;

    this.prepareRelay();
};

LedStrip.prototype.blink = function(red, green, blue) {
    var LedStrip = this;
    for (var i = 0; i <= 6; i++) {
        (function(i) {
            setTimeout(function() {
                console.log('Q.Q : ' + i);
                if (i % 2) {
                    LedStrip.setColor(0, 0, 0);
                } else {
                    LedStrip.setColor(red, green, blue);
                }
            }, 750 * i)
        })(i);
    }
};

LedStrip.prototype.setColor = function(red, green, blue) {
    console.log('[LedStrip] Color red:' + red + ' green:' + green + ' blue:' + blue);
    exec('pigs p ' + this.redPin + ' ' + red);
    exec('pigs p ' + this.greenPin + ' ' + green);
    exec('pigs p ' + this.bluePin + ' ' + blue);
};

/**
 * Handle the incoming statuses
 *
 * @param {object} status
 */
LedStrip.prototype.handleStatus = function(status) {
    if (this.statusManager.hasFailureStatus()) {
        this.blink(80, 0, 0);
        return;
    }

    if (this.statusManager.hasStartedStatus()) {
        this.blink(80, 20, 0);
        return;
    }

    this.setColor(0, 40, 0);
};

/**
 * Prepares the gpio pins. Turns the green light on, turns the orange and red light off.
 */
LedStrip.prototype.prepareRelay = function() {
    this.setColor(0, 50, 50);
};

module.exports = LedStrip;
