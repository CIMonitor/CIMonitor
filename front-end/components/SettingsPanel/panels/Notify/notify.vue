<template>
    <div>
        <p><strong>Status sounds:</strong></p>
        <p>
            <button class="option" @click="enableSound" :class="{ current: sound }">
                Enable status sounds
            </button>
            <button class="option" @click="disableSound" :class="{ current: !sound }">
                Disable status sounds
            </button>
        </p>
        <p><strong>Push notifications:</strong></p>
        <p>
            By enabling desktop notifications, you'll receive a push message for every new status pushed to the
            dashboard.
        </p>
        <p>
            <strong>Note:</strong> If you deny the push notification pup-up, you'll have to re-enable them in your
            browser settings. You can disable the dashboard notifications any time you like below.
        </p>
        <button class="option" @click="disableNotifications" :class="{ current: !pushNotifications }">
            Disable desktop notifications
        </button>
        <button class="option" @click="enableNotifications" :class="{ current: pushNotifications }">
            Enable desktop notifications
        </button>
        <ul id="statusSelector" v-if="pushNotifications">
            <li v-for="(enabled, status) in notificationStatuses" :key="status">
                <button class="sub-option" @click="toggleNotificationStatus(status)" :class="{ current: enabled }">
                    Show {{ status }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import CIMonitorLogo from '../../../EmptyBoard/logo.png';
import {
    SETTINGS_SET_NOTIFICATIONS_ON,
    SETTINGS_SET_NOTIFICATIONS_OFF,
    SETTINGS_SET_NOTIFICATION_STATUSES,
    SETTINGS_SET_SOUND_ON,
    SETTINGS_SET_SOUND_OFF,
} from '../../../../store/StaticMutations';

export default {
    methods: {
        enableNotifications() {
            Notification.requestPermission().then(() => {
                new Notification(`CIMonitor`, {
                    body: `Notifications are enabled!`,
                    icon: CIMonitorLogo,
                });
            });
            this.$store.commit(SETTINGS_SET_NOTIFICATIONS_ON);
        },
        disableNotifications() {
            this.$store.commit(SETTINGS_SET_NOTIFICATIONS_OFF);
        },
        enableSound() {
            this.$store.commit(SETTINGS_SET_SOUND_ON);
        },
        disableSound() {
            this.$store.commit(SETTINGS_SET_SOUND_OFF);
        },
        toggleNotificationStatus(status) {
            let statuses = this.$store.state.settings.notificationStatuses;
            statuses[status] = !statuses[status];
            this.$store.commit(SETTINGS_SET_NOTIFICATION_STATUSES, statuses);
        },
    },
    computed: {
        sound() {
            return this.$store.state.settings.sound;
        },
        pushNotifications() {
            return this.$store.state.settings.pushNotifications;
        },
        notificationStatuses() {
            return this.$store.state.settings.notificationStatuses;
        },
    },
};
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.option
    @extend %radio-option

.sub-option
    @extend %check-box

hr
    @extend %line-break

li
    list-style-type: none
    padding-left: 35px
</style>
