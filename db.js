const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',       
    user: 'root',            
    password: 'sua_senha',   
    database: 'hotel'        
});


db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados bem-sucedida!');
});

module.exports = db;
