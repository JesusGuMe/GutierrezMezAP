const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const app = express();
const mysql = require('mysql2/promise');
const https = require('https');
const md5 = require('md5');
app.use(express.json())
app.use(express.text())

app.post('/login', autenticarUsuario, (req, res) => {
    console.log(req.body);
    req.body.nombreusuario = req.usuario;

    var llavePrivada = fs.readFileSync(path.join(__dirname, '/ssl_keys/privada.pem'))
    var token = jsonwebtoken.sign(req.body, llavePrivada, {algorithm: 'RS256', expiresIn:"1d"});
    
    console.log(token);
    res.json({token});
})

app.get('/sistema1', verificarToken, function(req, res, next) {
    res.json({mensaje: "Acceso concedido a la ruta de sistema al usuario: " + req.login});
});

function verificarToken(req, res, next) {
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    llavePublica = fs.readFileSync(path.join(__dirname, '/ssl_keys/publica.pem'));
    jsonwebtoken.verify(token, llavePublica, function(err, decoded) {
        if (err) {
            res.json({Error: "Acceso no concedido a ruta sistema del Servidor"})
        } else {
            console.log(decoded);
            req.login = decoded.login;
            next();
        }
      });
};

async function autenticarUsuario(req, res, next) {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario` WHERE `login` = ?', [req.body.login]);
    if(rows.length==0) {
        res.json({Error: "No se encontro usuario"});
    } else {

        console.log(rows);
        console.log("Password Req: " + req.body.password);
        console.log("Password MD5: " + md5(req.body.password));
        console.log("Password BD: " + rows[0].password);

        if (md5(req.body.password === rows[0].password)) {
            next();
        } 
        else {
            res.json({Error: "Password no Existe"});
            
        }
    }
}

let opciones = {
    key: fs.readFileSync(path.join(__dirname,'/ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/ssl/cert.pem'))
}

https.createServer(opciones, app).listen(8082, function() {
    console.log("Servidor express 8082 en Linea")
})