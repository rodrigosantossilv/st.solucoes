const { createApp } = Vue;
const { createRouter, createWebHistory } = VueRouter;

const LoginPage = { template: `<div>Login Page</div>` };
const OpenTicketPage = { template: `<div>Open Ticket Page</div>` };

const routes = [
  { path: '/', component: LoginPage },
  { path: '/abrir-chamado', component: OpenTicketPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp({
    data() {
        return {
            usuario: '',
            password: ''
        };
    },
    methods: {
        async login() {
            if (this.usuario && this.password) {
                try {
                    const response = await fetch('http://localhost:3000/login', { // Atualize a URL se necessário
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            usuario: this.usuario,
                            password: this.password
                        })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert(`Login successful: ${data.message}`);
                        this.$router.push('/abrir-chamado');
                    } else {
                        alert(`Login failed: ${data.error}`);
                    }
                } catch (error) {
                    alert('Erro ao conectar ao servidor: ' + error.message);
                }
            } else {
                alert('Por favor, insira usuário e senha');
            }
        }
    }
}).use(router).mount('#app');
