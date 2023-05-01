import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import('@/views/Patients.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
