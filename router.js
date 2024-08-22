// Importa funções e componentes necessários para criar o roteamento
import { createRouter, createWebHistory } from 'vue-router'; // Importa funções para criar um roteador e histórico de navegação no Vue
import LoginPage from './pages/LoginPage.vue'; // Importa o componente da página de login
import OpenTicketPage from './pages/OpenTicketPage.vue'; // Importa o componente da página de abrir chamado

// Define as rotas do aplicativo
const routes = [
  { path: '/', component: LoginPage }, // Define a rota inicial '/' que renderiza o componente LoginPage
  { path: '/abrir-chamado', component: OpenTicketPage } // Define a rota '/abrir-chamado' que renderiza o componente OpenTicketPage
];

// Cria a instância do roteador usando o histórico do navegador
const router = createRouter({
  history: createWebHistory(), // Configura o roteamento para usar o histórico da web (URLs "limpas" sem hash)
  routes // Define as rotas criadas anteriormente
});

// Exporta o roteador para que possa ser usado na instância principal da aplicação Vue
export default router;
