import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import AdminPage from '../pages/AdminPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import Kids from '../pages/Kids.vue'; 
import Women from '../pages/Women.vue'; 
import Business from '../pages/Business.vue'; 

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminPage,
        },
        {
            path: '/auth',
            name: 'Auth',
            component: AuthPage,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../pages/About.vue'),
        },
        {
            path: '/kids',
            name: 'Kids',
            component: Kids, 
        },
        {
            path: '/women',
            name: 'Women',
            component: Women, 
        },
        {
            path: '/business',
            name: 'Business',
            component: Business, 
        },
    ],
})

export default router
