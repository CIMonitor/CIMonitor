/**
 * @param {EventEmitter} eventHandler
 * @param {int} cleanUpAfterDays
 * @constructor
 */
var StatusManager = function(eventHandler, cleanUpAfterDays) {
    /** {EventEmitter} */
    this.eventHandler = eventHandler;

    /** {int} */
    this.cleanUpAfterDays = cleanUpAfterDays;

    /** @type {{}} */
    this.statuses = {};
};

/**
 * Processes an incoming status
 *
 * @param {object} status
 */
StatusManager.prototype.newStatus = function(status) {
    this.removeOldStatuses();

    // Add extra attributes to the status object
    status.key = this.getKey(status);
    status.updateTime = new Date().getTime();

    console.log('[StatusManager] New status for ' + status.key + ': ' + status.status);

    // Add the new/updated status to the statuses
    this.statuses[status.key] = status;

    // Fire status event
    this.eventHandler.emit('status', status);

    return true;
};

/**
 * Clean up all the old statuses
 */
StatusManager.prototype.removeOldStatuses = function() {
    var allowedStatusDate = new Date().getTime() - (1000 * 60 * 60 * 24 * this.cleanUpAfterDays);

    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].updateTime < allowedStatusDate) {
            console.log(
                '[StatusManager] Removing status ' + this.statuses[statusKey].key
                + ' because it\'s older then ' + this.cleanUpAfterDays + ' days.'
            );
            delete this.statuses[statusKey];
        }
    }
};

/**
 * Get the unique key for a status
 *
 * @param {object} status
 * @returns {string}
 */
StatusManager.prototype.getKey = function(status) {
    return status.project + '.' + status.type + '.' + status.branch;
};

/**
 * Checks if there is a started status between all statuses
 * Because you don't want all lights green when there is still some service running
 *
 * @returns {string}
 */
StatusManager.prototype.hasStartedStatus = function() {
    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].status === 'started') {
            return true;
        }
    }
    return false;
};

/**
 * Checks if there is a started status between all statuses
 * Because you don't want all lights green when there is still some service running
 *
 * @returns {bool}
 */
StatusManager.prototype.hasStatus = function(status) {
    for (var statusKey in this.statuses) {
        if (this.statuses[statusKey].status === status) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if there is a started status between all statuses
 *
 * @returns {bool}
 */
StatusManager.prototype.hasStartedStatus = function() {
    return this.hasStatus('started');
};

/**
 * Checks if there is a failed status between all statuses
 *
 * @returns {bool}
 */
StatusManager.prototype.hasFailureStatus = function() {
    return this.hasStatus('failure');
};

/**
 * Return all statuses sorted by update time
 *
 * @returns {Array}
 */
StatusManager.prototype.getStatuses = function() {
    var statuses = [];

    for (var statusKey in this.statuses) {
        statuses.push(this.statuses[statusKey]);
    }

    if (statuses.length === 0) {
        return [];
    }

    statuses.sort(this.sortByUpdateTime);

    return statuses;
};

/**
 * Sorting helper function to sort the status array by the update time
 *
 * @param statusA
 * @param statusB
 * @returns {number}
 */
StatusManager.prototype.sortByUpdateTime = function(statusA, statusB) {
    return statusB.updateTime - statusA.updateTime;
};

module.exports = StatusManager;
