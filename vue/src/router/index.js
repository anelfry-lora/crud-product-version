import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/products/List.vue'
import ProductsView from '../views/products/View.vue'
import Orders from '../views/orders/List.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        redirect: '/products',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '/products', name: 'Products', component: Products },
            { path: '/products/create', name: 'ProductCreate', component: ProductsView },
            { path: '/products/:id', name: 'ProductView', component: ProductsView },
            { path: '/orders', name: 'Orders', component: Orders },
            { path: '/category', name: 'Category', component: Orders }
        ]
    },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: { IsGuest: true },
        children: [
            {
                path: '/login', name: 'Login', component: Login
            },
            {
                path: '/register', name: 'Register', component: Register
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' })
    } else if (store.state.user.token && (to.meta.IsGuest)) {
        next({ name: 'Products' })
    } else {
        next()
    }
})

export default router