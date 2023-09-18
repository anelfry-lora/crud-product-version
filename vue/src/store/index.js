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
        },
        categories: [],
        notification: {
            show: false,
            type: null,
            message: null,
        },
        confirmDeleteModal: {
            isOpen: false,
            productToDelete: null,
        },
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
                        commit("notify", {
                            type: "success",
                            message: res.data.message,
                        });
                        return res;
                    });
            } else {
                response = axiosClient.post(`/product`, product)
                    .then((res) => {
                        commit('setCurrentProduct', res.data);
                        commit("notify", {
                            type: "success",
                            message: res.data.message,
                        });
                        return res;
                    });
            }

            return response;
        },
        deleteProduct({ commit }, id) {
            console.log("Deleting product with id:", id);

            let response = axiosClient.delete(`/product/${id}`)
                .then((res) => {
                    commit("notify", {
                        message: 'Successfully deleted product.',
                    });
                    return res;
                });

            return response;
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
        getCategories({ commit }) {
            return axiosClient.get("/category").then((response) => {
              commit("setCategory", response.data);
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
        notify: (state, { type, message }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;

            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        },
        openConfirmDeleteModal(state, product) {
            state.confirmDeleteModal.isOpen = true;
            state.confirmDeleteModal.productToDelete = product;
        },
        closeConfirmDeleteModal(state) {
            state.confirmDeleteModal.isOpen = false;
            state.confirmDeleteModal.productToDelete = null;
        },
    },
    modules: {}
});

export default store;