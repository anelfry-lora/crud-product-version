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
            data: {},
        },
        currentProduct: {
            loading: false,
            data: {},
        }
    },
    getters: {},
    actions: {
        getProduct({ commit }, product) {
            commit('setCurrentProductLoading', true);
            return axiosClient
                .get(`/product/${product}`)
                .then((res) => {
                    commit("setCurrentProduct", res.data);
                    commit("setCurrentProductLoading", false);
                    return res;
                })
                .catch((error) => {
                    commit('setCurrentProductLoading', false);
                    throw error;
                });
        },
        saveProduct({ commit }, product) {
            let response;
            if (product.id) {
                response = axiosClient
                    .put(`/product/${product.id}`, product)
                    .then((res) => {
                        commit("setCurrentProduct", res.data);
                        return res;
                    });
            } else {
                response = axiosClient.post(`/product`, product).then((res) => {
                    commit('setCurrentProduct', res.data);
                    return res;
                });
            }

            return response;
        },
        deleteProduct({ }, id) {
            return axiosClient.delete(`/product/${id}`);
        },
        getProducts({ commit }) {
            commit('setProductsLoading', true);
            return axiosClient
                .get(`/product`)
                .then((res) => {
                    commit("setProducts", res.data);
                    commit("setProductsLoading", false);
                    return res;
                })
                .catch((error) => {
                    commit('setProductsLoading', false);
                    throw error;
                });
        },
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
        setCurrentProductLoading: (state, loading) => {
            state.currentProduct.loading = loading;
        },
        setProductsLoading: (state, loading) => {
            state.products.loading = loading;
        },
        setCurrentProduct: (state, product) => {
            state.currentProduct.data = product.data;
        },
        setProducts: (state, products) => {
            state.products.data = products.data;
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