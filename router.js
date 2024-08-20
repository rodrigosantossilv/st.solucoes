import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import OpenTicketPage from './pages/OpenTicketPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/abrir-chamado', component: OpenTicketPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
