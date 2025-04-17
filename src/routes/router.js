import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Recorridos',
    component: () => import('../components/SanJuanDeDios.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router