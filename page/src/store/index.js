import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import problems from '@/store/modules/problems';
import github from '@/store/modules/github';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        problems,
        github,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        paths: [
            'problems',
            'github',
        ],
    })],
});