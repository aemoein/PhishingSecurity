const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'users'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/process', (req, res) => {
    const { email, password } = req.body;
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) throw err;
        res.redirect('http://127.0.0.1:5500/index.html');
    });
});

app.listen(3007, () => {
    console.log('Server running on port 3007');
});