document.addEventListener('DOMContentLoaded', () => {
    // Aguarda o carregamento completo do DOM antes de executar o código
    const form = document.getElementById('registration-form'); // Seleciona o formulário de cadastro pelo ID
    const feedback = document.getElementById('feedback'); // Seleciona o campo de feedback para exibir mensagens de erro ou sucesso

    // Adiciona um listener para o evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Limpa as mensagens anteriores
        feedback.textContent = ''; // Remove qualquer mensagem de feedback anterior
        feedback.classList.remove('text-danger'); // Remove a classe de erro se houver

        // Coleta os valores dos campos de email e senha
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirm-email').value;
        const senha = document.getElementById('senha').value;
        const confirmSenha = document.getElementById('confirm-senha').value;

        // Validação do email: verifica se contém '@'
        if (!email.includes('@')) {
            feedback.textContent = 'Email inválido'; // Exibe mensagem de erro se o email for inválido
            feedback.classList.add('text-danger'); // Aplica a classe de erro para cor vermelha
            return; // Interrompe o processo de envio do formulário
        }

        // Validação da senha: verifica se tem no mínimo 8 caracteres
        if (senha.length < 8) {
            feedback.textContent = 'A senha deve ter pelo menos 8 caracteres'; // Exibe mensagem de erro se a senha for muito curta
            feedback.classList.add('text-danger'); // Aplica a classe de erro para cor vermelha
            return; // Interrompe o processo de envio do formulário
        }

        // Verifica se as senhas inseridas coincidem
        if (senha !== confirmSenha) {
            feedback.textContent = 'As senhas não coincidem'; // Exibe mensagem de erro se as senhas não forem iguais
            feedback.classList.add('text-danger'); // Aplica a classe de erro para cor vermelha
            return; // Interrompe o processo de envio do formulário
        }

        // Verifica se os emails inseridos coincidem
        if (email !== confirmEmail) {
            feedback.textContent = 'Os emails não coincidem'; // Exibe mensagem de erro se os emails não forem iguais
            feedback.classList.add('text-danger'); // Aplica a classe de erro para cor vermelha
            return; // Interrompe o processo de envio do formulário
        }

        // Se todas as validações forem aprovadas, exibe mensagem de sucesso
        feedback.textContent = 'Cadastro realizado com sucesso!'; // Exibe mensagem de sucesso
        feedback.classList.remove('text-danger'); // Remove a classe de erro
        feedback.classList.add('text-success'); // Adiciona a classe de sucesso para cor verde
    });

    // Adiciona um listener para o campo de CEP quando o foco é perdido (evento 'blur')
    document.getElementById('cep').addEventListener('blur', function () {
        const cep = this.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico do valor do CEP
        if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
            // Faz uma requisição para a API do ViaCEP para buscar o endereço associado ao CEP
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json()) // Converte a resposta em JSON
                .then(data => {
                    if (data.erro) { // Verifica se houve erro ao buscar o CEP
                        feedback.textContent = 'CEP não encontrado'; // Exibe mensagem de erro se o CEP não foi encontrado
                        feedback.classList.add('text-danger'); // Aplica a classe de erro
                    } else {
                        // Preenche o campo de localização com as informações retornadas pela API
                        document.getElementById('localizacao').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                    }
                })
                .catch(() => {
                    feedback.textContent = 'Erro ao buscar CEP'; // Exibe mensagem de erro se houve um problema na requisição
                    feedback.classList.add('text-danger'); // Aplica a classe de erro
                });
        }
    });
});
