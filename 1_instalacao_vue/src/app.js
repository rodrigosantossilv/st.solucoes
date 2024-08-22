// Importa funções do Vue e do Vue Router
const { createApp } = Vue;
const { createRouter, createWebHistory } = VueRouter;

// Define o componente da página de Login
const LoginPage = {
    template: `
    <div>
        <h2>Login Page</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="usuario" placeholder="Usuário" required>
            <input type="password" v-model="password" placeholder="Senha" required>
            <button type="submit">Login</button>
        </form>
    </div>`,
    data() {
        return {
            usuario: '', // Armazena o nome de usuário
            password: '' // Armazena a senha
        };
    },
    methods: {
        async login() {
            // Verifica se os campos usuário e senha não estão vazios
            if (this.usuario && this.password) {
                try {
                    // Faz uma requisição POST para o servidor de login
                    const response = await fetch('http://localhost:3000/login', {
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

                    // Verifica se a resposta foi bem-sucedida
                    if (response.ok) {
                        // Exibe um Toast de sucesso com SweetAlert2
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                        });

                        // Redireciona o usuário para a página de abrir chamado
                        this.$router.push('/abrir-chamado');
                    } else {
                        // Exibe um alerta de erro com SweetAlert2
                        Swal.fire({
                            title: 'Erro!',
                            text: `Login failed: ${data.error}`,
                            icon: 'error'
                        });
                    }
                } catch (error) {
                    // Exibe um alerta de erro com SweetAlert2 em caso de falha na conexão
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao conectar ao servidor: ' + error.message,
                        icon: 'error'
                    });
                }
            } else {
                // Exibe um alerta de aviso se os campos usuário e senha estiverem vazios
                Swal.fire({
                    title: 'Aviso!',
                    text: 'Por favor, insira usuário e senha',
                    icon: 'warning'
                });
            }
        }
    }
};

// Define o componente da página de Abrir Chamado
const OpenTicketPage = {
    template: `
    <div>
        <h2>Informe seu problema</h2>
        <form @submit.prevent="reportProblem">
            <input type="text" v-model="bloco" placeholder="Bloco da sala*" required>
            <input type="text" v-model="numeroSala" placeholder="Número da sala*" required>
            <input type="text" v-model="codigoMaquina" placeholder="Código da máquina*" required>
            <textarea v-model="relatarProblema" placeholder="Relatar problema*" rows="4" required></textarea>
            <button type="submit">Relatar Problema</button>
            <div id="feedback" class="mt-2"></div>
        </form>
    </div>`,
    data() {
        return {
            bloco: '', // Armazena o bloco da sala
            numeroSala: '', // Armazena o número da sala
            codigoMaquina: '', // Armazena o código da máquina
            relatarProblema: '' // Armazena a descrição do problema
        };
    },
    methods: {
        async reportProblem() {
            // Verifica se todos os campos foram preenchidos
            if (this.bloco && this.numeroSala && this.codigoMaquina && this.relatarProblema) {
                try {
                    // Faz uma requisição POST para o servidor para relatar o problema
                    const response = await fetch('http://localhost:3000/report-problem', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bloco: this.bloco,
                            numeroSala: this.numeroSala,
                            codigoMaquina: this.codigoMaquina,
                            relatarProblema: this.relatarProblema
                        })
                    });

                    const data = await response.json();

                    // Verifica se a resposta foi bem-sucedida
                    if (response.ok) {
                        // Exibe um alerta de sucesso com SweetAlert2
                        Swal.fire({
                            icon: 'success',
                            title: 'Problema relatado com sucesso',
                            text: data.message
                        });
                        // Redireciona o usuário para a página inicial ou outra página
                        this.$router.push('/');
                    } else {
                        // Exibe um alerta de erro com SweetAlert2
                        Swal.fire({
                            title: 'Erro!',
                            text: `Falha ao relatar o problema: ${data.error}`,
                            icon: 'error'
                        });
                    }
                } catch (error) {
                    // Exibe um alerta de erro com SweetAlert2 em caso de falha na conexão
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao conectar ao servidor: ' + error.message,
                        icon: 'error'
                    });
                }
            } else {
                // Exibe um alerta de aviso se algum campo estiver vazio
                Swal.fire({
                    title: 'Aviso!',
                    text: 'Por favor, preencha todos os campos',
                    icon: 'warning'
                });
            }
        }
    }
};

// Define as rotas da aplicação
const routes = [
    { path: '/', component: LoginPage }, // Rota para a página de login
    { path: '/abrir-chamado', component: OpenTicketPage } // Rota para a página de abrir chamado
];

// Cria o roteador com histórico da web e as rotas definidas
const router = createRouter({
    history: createWebHistory(),
    routes
});

// Cria a aplicação Vue principal
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
                    const response = await fetch('http://localhost:3000/login', {
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
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                        });

                        this.$router.push('/abrir-chamado');
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: `Login failed: ${data.error}`,
                            icon: 'error'
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao conectar ao servidor: ' + error.message,
                        icon: 'error'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Aviso!',
                    text: 'Por favor, insira usuário e senha',
                    icon: 'warning'
                });
            }
        }
    }
})
.use(router) // Usa o roteador na aplicação Vue
.mount('#app'); // Monta a aplicação no elemento com id 'app'
