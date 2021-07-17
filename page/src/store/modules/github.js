import axios from '@/plugins/axios.js';

export default {
    namespaced: true,
    state: {
        limit: 0,
        remaining: 0,
        reset: 0,
        used: 0,
    },
    getters: {
        limit: (state) => {
            return state.limit;
        },
        remaining: (state) => {
            return state.remaining;
        },
        used: (state) => {
            return state.used;
        },
        reset: (state) => {
            return new Date(state.reset * 1000);
        },
    },
    mutations: {
        SET_GITHUB_API_LIMIT_INFO(state, { info }) {
            state.limit = info.rate.limit;
            state.remaining = info.rate.remaining;
            state.reset = info.rate.reset;
            state.used = info.rate.used;
        },
    },
    actions: {
        fetchApiInfo({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'https://api.github.com/rate_limit',
                    method: 'GET',
                }).then((response) => {
                    const info = response.data;
                    commit('SET_GITHUB_API_LIMIT_INFO', {
                        info,
                    });

                    resolve(info);
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    },
};