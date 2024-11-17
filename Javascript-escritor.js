const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senha], (err, result) => {
        if (err) throw err;
        res.send('Usuário cadastrado com sucesso!');
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
