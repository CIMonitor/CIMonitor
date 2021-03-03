import {
    SETTINGS_PANEL_TOGGLE,
    SETTINGS_TOGGLE_NOTIFICATIONS,
    SETTINGS_CHECK_AND_SET_PASSWORD,
    SETTINGS_CHECK_PASSWORD_REQUIREMENT,
} from '../StaticActions';
import {
    SETTINGS_SET_PANEL_OPEN,
    SETTINGS_SET_PANEL_CLOSED,
    SETTINGS_SET_NOTIFICATIONS_ON,
    SETTINGS_SET_NOTIFICATIONS_OFF,
    SETTINGS_SET_NOTIFICATION_STATUSES,
    SETTINGS_SET_CURSORHIDDEN_ON,
    SETTINGS_SET_CURSORHIDDEN_OFF,
    SETTINGS_SET_CURSORHIDDEN_TIMEOUT,
    SETTINGS_SET_PASSWORD,
    SETTINGS_CLEAR_PASSWORD,
    SETTINGS_SET_PASSWORD_REQUIRED,
    SETTINGS_SET_SOUND_ON,
    SETTINGS_SET_SOUND_OFF,
    SETTINGS_SET_TOOLBAR_SMALL,
    SETTINGS_SET_TOOLBAR_LARGE,
} from '../StaticMutations';
import API from '../../classes/api.js';

const state = {
    settingsPanelOpen: false,
    pushNotifications: false,
    smallToolbar: false,
    notificationStatuses: {
        info: true,
        warning: true,
        error: true,
        success: true,
    },
    sound: window.Cypress ? false : true,
    cursorHidden: false,
    cursorHiddenTimeout: 5000,
    passwordRequired: null,
    password: null,
};

const getters = {};

const actions = {
    [SETTINGS_PANEL_TOGGLE]({ commit, state }) {
        commit(state.settingsPanelOpen ? SETTINGS_SET_PANEL_CLOSED : SETTINGS_SET_PANEL_OPEN);
    },

    [SETTINGS_TOGGLE_NOTIFICATIONS]({ commit, state }) {
        commit(state.pushNotifications ? SETTINGS_SET_NOTIFICATIONS_OFF : SETTINGS_SET_NOTIFICATIONS_ON);
    },

    [SETTINGS_CHECK_AND_SET_PASSWORD]({ commit }, password) {
        return API.post('/password', { password }).then(() => {
            commit(SETTINGS_SET_PASSWORD, password);
        });
    },

    [SETTINGS_CHECK_PASSWORD_REQUIREMENT]({ commit }) {
        return API.get('/password')
            .then(response => {
                commit(SETTINGS_SET_PASSWORD_REQUIRED, response.data.passwordProtected);
            })
            .catch(() => {
                commit(SETTINGS_SET_PASSWORD_REQUIRED, null);
            });
    },
};

const mutations = {
    [SETTINGS_SET_PANEL_OPEN](state) {
        state.settingsPanelOpen = true;
    },

    [SETTINGS_SET_PANEL_CLOSED](state) {
        state.settingsPanelOpen = false;
    },

    [SETTINGS_SET_PASSWORD](state, password) {
        state.password = password;
    },

    [SETTINGS_CLEAR_PASSWORD](state) {
        state.password = null;
    },

    [SETTINGS_SET_TOOLBAR_SMALL](state) {
        state.smallToolbar = true;
    },

    [SETTINGS_SET_TOOLBAR_LARGE](state) {
        state.smallToolbar = false;
    },

    [SETTINGS_SET_PASSWORD_REQUIRED](state, passwordRequired) {
        state.passwordRequired = passwordRequired;
    },

    [SETTINGS_SET_NOTIFICATIONS_ON](state) {
        state.pushNotifications = true;
    },

    [SETTINGS_SET_NOTIFICATIONS_OFF](state) {
        state.pushNotifications = false;
    },

    [SETTINGS_SET_NOTIFICATION_STATUSES](state, statuses) {
        state.notificationStatuses = statuses;
    },

    [SETTINGS_SET_CURSORHIDDEN_ON](state) {
        state.cursorHidden = true;
    },

    [SETTINGS_SET_CURSORHIDDEN_OFF](state) {
        state.cursorHidden = false;
    },

    [SETTINGS_SET_CURSORHIDDEN_TIMEOUT](state, timeout) {
        state.cursorHiddenTimeout = timeout;
    },

    [SETTINGS_SET_SOUND_ON](state) {
        state.sound = true;
    },

    [SETTINGS_SET_SOUND_OFF](state) {
        state.sound = false;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
