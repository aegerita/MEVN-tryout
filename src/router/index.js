import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'create',
    path: '/create',
    component: () => import('@/components/Create.vue'),
  },
  {
    name: 'posts',
    path: '/posts',
    component: () => import('@/components/Index.vue'),
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: () => import('@/components/Edit.vue'),
  },
];

const router = createRouter({
  mode: 'history',
  linkActiveClass: 'active',
  history: createWebHistory(),
  routes,
});

export default router;
