import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('~/views/Home.vue')
    },
    {
        path: '/Login',
        name: 'login',
        component: () => import('~/views/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('~/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router