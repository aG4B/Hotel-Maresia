const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: 'localhost',    
  user: 'root',         
  password: 'Gi18j@26',         
  database: 'cadastro'  
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});


app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;


  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }


  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  

  db.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao salvar usuário:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuário.' });
    }


    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.insertId });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});