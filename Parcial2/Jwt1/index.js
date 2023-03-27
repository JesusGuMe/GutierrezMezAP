const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
app.use(express.json())
app.use(express.text())

app.post('/login', (req, res) => {
    console.log(req.body);
    var token = jsonwebtoken.sign(req.body, 'claveSecreta');
    console.log(token);
    res.json({token});
})

app.get('/sistema1', verificarToken, function(req, res, next) {
    res.json({mensaje: "Acceso concedido a la ruta de sistema1 del Servidor 1"});
});

app.listen(8081,(req, res) => {
    console.log("Servidor Express 1 escuchando en el puerto 8081");
});

function verificarToken(req, res, next) {
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    console.log(token);
    jsonwebtoken.verify(token, 'claveSecreta', function(err, decoded) {
        if (err) {
            res.json({Error: "Acceso no concedido a ruta sistema1 del Servidor 1"})
        } else {
            next();
        }
      });
};