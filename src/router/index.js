import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/MainLayout.vue'
import HomeView from '@/views/index.vue'
import CasosView from '@/views/Casos.vue'

const routes = [
  { path: '/login', name: 'Login', component: () => import('@/views/login.vue') },

  {
    path: '/app',
    component: MainLayout, // todas las rutas internas usan este layout
    meta: { requiresAuth: true },
    children: [
      // { path: '/', redirect: '/casos' },
      { path: 'home', name: 'Home', component: HomeView },
      { path: 'casos', name: 'Casos', component: CasosView },
      { path: 'registrar-caso', name: 'RegistrarCaso', component: () => import('@/views/RegistrarCaso.vue') },
      { path: 'casos/:id', name: 'ResumenCaso', component: () => import('@/views/ResumenCaso.vue') },
      { path: 'editar-caso/:id', name: 'EditarCaso', component: () => import('@/views/EditarCaso.vue') },
      { path: 'reportes', name: 'Reportes', component: () => import('@/views/Reportes.vue') },
      { path: 'acerca', name: 'Acerca', component: () => import('@/views/AcercaDe.vue') },
      { path: 'recursos', name: 'Recursos', component: () => import('@/views/Recursos.vue') },
      { path: 'configuracion', name: 'Configuracion', component: () => import('@/views/Configuracion.vue') },
      { path: 'ayuda', name: 'Ayuda', component: () => import('@/views/AyudaSoporte.vue') },
    ]
  }



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// navegación protegida
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // o tu lógica de auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router
