import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/index.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/inicio', name: 'Inicio', component: Inicio },
  { path: '/login', name: 'Login', component: () => import('../views/login.vue') },
  { path: '/casos', name: 'Casos', component: () => import('@/views/Casos.vue') },
  { path: '/registrar-caso', name: 'RegistrarCaso', component: () => import('@/views/RegistrarCaso.vue') },
  { path: '/casos/:id', name: 'ResumenCaso', component: () => import('@/views/ResumenCaso.vue') },
  { path: '/editar-caso/:id', name: 'EditarCaso', component: () => import('@/views/EditarCaso.vue') } // ✅ Nueva ruta añadida
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
