document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const feedback = document.getElementById('feedback');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Limpa mensagens anteriores
        feedback.textContent = '';
        feedback.classList.remove('text-danger');

        // Coleta os valores dos campos
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirm-email').value;
        const senha = document.getElementById('senha').value;
        const confirmSenha = document.getElementById('confirm-senha').value;

        // Valida o email
        if (!email.includes('@')) {
            feedback.textContent = 'Email inválido';
            feedback.classList.add('text-danger');
            return;
        }

        // Valida a senha
        if (senha.length < 8) {
            feedback.textContent = 'A senha deve ter pelo menos 8 caracteres';
            feedback.classList.add('text-danger');
            return;
        }

        // Valida se as senhas conferem
        if (senha !== confirmSenha) {
            feedback.textContent = 'As senhas não coincidem';
            feedback.classList.add('text-danger');
            return;
        }

        // Valida se os emails conferem
        if (email !== confirmEmail) {
            feedback.textContent = 'Os emails não coincidem';
            feedback.classList.add('text-danger');
            return;
        }

        // Caso todas as validações passem, você pode enviar o formulário
        feedback.textContent = 'Cadastro realizado com sucesso!';
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
    });

    // Adiciona a função para buscar o CEP e preencher o campo de localização
    document.getElementById('cep').addEventListener('blur', function () {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.erro) {
                        feedback.textContent = 'CEP não encontrado';
                        feedback.classList.add('text-danger');
                    } else {
                        // Preenche o campo de localização com as informações retornadas
                        document.getElementById('localizacao').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                    }
                })
                .catch(() => {
                    feedback.textContent = 'Erro ao buscar CEP';
                    feedback.classList.add('text-danger');
                });
        }
    });
});
