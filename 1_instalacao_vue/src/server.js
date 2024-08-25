// Importa os módulos necessários
const express = require('express'); // Framework web para Node.js
const bodyParser = require('body-parser'); // Middleware para processar dados JSON no corpo das requisições
const mysql = require('mysql2'); // Biblioteca para interagir com o MySQL

// Cria uma aplicação Express
const app = express();
const port = 3000; // Define a porta em que o servidor vai escutar

// Middleware
app.use(bodyParser.json()); // Configura o middleware para interpretar o corpo das requisições como JSON

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost', // Define o host do banco de dados (localhost para uso local)
  user: 'root', // Usuário do banco de dados
  password: 'password', // Senha do banco de dados
  database: 'nome_do_banco' // Nome do banco de dados
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err); // Exibe mensagem de erro caso a conexão falhe
    return;
  }
  console.log('Conectado ao banco de dados.'); // Exibe mensagem de sucesso na conexão
});

// Rota para login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body; // Desestruturação do corpo da requisição para obter usuário e senha

  // Verifica se os campos 'usuario' e 'password' foram preenchidos
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuário e senha são necessários' }); // Retorna erro 400 se faltar algum campo
  }

  // Consulta ao banco de dados para verificar as credenciais
  db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao acessar o banco de dados' }); // Retorna erro 500 se houver problemas com o banco
    }

    // Verifica se encontrou o usuário com as credenciais corretas
    if (results.length > 0) {
      res.json({ message: 'Login bem-sucedido' }); // Se houver correspondência, retorna mensagem de sucesso
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' }); // Se não houver correspondência, retorna erro de autenticação
    }
  });
});

// Inicia o servidor e o coloca em escuta na porta especificada
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`); // Mensagem de confirmação que o servidor está ativo e ouvindo
});
