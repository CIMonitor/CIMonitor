const moment = require('moment');

const Events = require('../Events');
const EventTrigger = require('../event/EventTrigger');

class StatusManager {
    constructor() {
        this.statuses = [];

        this.setListeners();

        setInterval(() => this.removeOldStatuses(), 1000 * 60 * 60);
    }

    setListeners() {
        Events.watch(Events.event.newStatus, status => this.onNewStatus(status));

        console.log('[StatusManager] Listening to incoming statuses...');
    }

    /**
     * @param {Status} status
     */
    processStatus(status) {
        const existingStatus = this.statuses.find(existingStatus => existingStatus.getKey() === status.getKey());

        if (existingStatus) {
            console.log('[StatusManager] Status already exists, replacing the old status.');
            const index = this.statuses.indexOf(existingStatus);
            this.statuses[index] = status;

            if (existingStatus.getState() !== status.getState()) {
                EventTrigger.fireStatus(status);
            }

            return;
        }

        EventTrigger.fireStatus(status);

        console.log('[StatusManager] Adding new status to the statuses.');
        this.statuses.push(status);
    }

    getRawStatuses() {
        return (
            this.statuses
                // Get raw data only
                .map(status => status.getRawData())
                // Newest updates first
                .sort((statusA, statusB) => moment(statusA.time).isBefore(statusB.time))
        );
    }

    /**
     * @return {Status}
     */
    getStatusByKey(statusKey) {
        return this.statuses.find(status => status.getKey() === statusKey.toLowerCase());
    }

    getGlobalState() {
        if (this.statuses.find(status => status.getState() === 'error')) {
            return 'error';
        }

        if (this.statuses.find(status => status.getState() === 'warning')) {
            return 'warning';
        }

        return 'success';
    }

    removeOldStatuses() {
        const statusCount = this.statuses.length;

        this.statuses = this.statuses.filter(status => !status.isOld());

        // If statuses are removed, push that the statuses are updated
        if (this.statuses.length < statusCount) {
            console.log('[StatusManager] Old statuses have been removed.');
            Events.push(Events.event.statusesUpdated);
        }
    }

    /**
     * @param {Status} status
     */
    onNewStatus(status) {
        console.log('[StatusManager] Received new status.');

        this.processStatus(status);

        Events.push(Events.event.statusesUpdated);
    }

    /**
     * Completely overwrite the statuses
     *
     * @param {Status[]} statuses
     */
    overwriteStatuses(statuses) {
        this.statuses = statuses;

        Events.push(Events.event.statusesUpdated);
    }

    removeStatus(statusKey) {
        const existingStatus = this.statuses.find(existingStatus => existingStatus.getKey() === statusKey);

        if (existingStatus) {
            const index = this.statuses.indexOf(existingStatus);
            this.statuses.splice(index, 1);
            console.log(`[StatusManager] Removed status with key ${statusKey}.`);
            Events.push(Events.event.statusesUpdated);
            return;
        }

        console.log(`[StatusManager] No status found with key ${statusKey}.`);
    }

    reset() {
        this.statuses = [];

        Events.push(Events.event.statusesUpdated);
    }
}

module.exports = new StatusManager();
