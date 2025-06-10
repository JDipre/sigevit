import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/index.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/inicio', name: 'Inicio', component: Inicio },
  { path: '/login', name: 'Login', component: () => import('@/views/login.vue') },
  { path: '/casos', name: 'Casos', component: () => import('@/views/Casos.vue') },
  { path: '/registrar-caso', name: 'RegistrarCaso', component: () => import('@/views/RegistrarCaso.vue') },
  { path: '/casos/:id', name: 'ResumenCaso', component: () => import('@/views/ResumenCaso.vue') },
  { path: '/editar-caso/:id', name: 'EditarCaso', component: () => import('@/views/EditarCaso.vue') },
  { path: '/reportes', name: 'Reportes', component: () => import('@/views/Reportes.vue') },
  { path: '/acerca', name: 'Acerca', component: () => import('@/views/AcercaDe.vue') },
  { path: '/recursos', name: 'Recursos', component: () => import('@/views/Recursos.vue') },
  { path: '/configuracion',  name: 'Configuracion', component: () => import('@/views/Configuracion.vue') },
  { path: '/ayuda', name: 'Ayuda', component: () => import('@/views/AyudaSoporte.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
