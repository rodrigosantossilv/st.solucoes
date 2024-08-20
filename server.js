const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'nome_do_banco'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Rota para login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuário e senha são necessários' });
  }

  // Verifica as credenciais no banco de dados
  db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
    }

    if (results.length > 0) {
      res.json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
