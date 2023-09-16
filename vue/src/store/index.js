import { createStore } from "vuex"
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
            // token: null,
        },
        products: {
            loading: false,
            links: [],
            data: {}
        },
    },
    getters: {},
    actions: {
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(res => {
                    commit('logout');
                    return res;
                })
        },
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data);
                    return data;
                })
        },
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {}
            sessionStorage.removeItem('TOKEN');
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {}
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token
            state.user.data.name = userData.name
            state.user.data.email = userData.email
            sessionStorage.setItem('TOKEN', userData.token);
        },
    },
    modules: {}
});

export default store;