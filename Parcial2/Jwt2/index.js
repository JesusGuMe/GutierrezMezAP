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

app.get('/sistema2', verificarToken, function(req, res, next) {
    res.json({mensaje: "Acceso concedido a ruta sistema2"});
});

app.listen(8082,(req, res) => {
    console.log("Servidor Express escuchando en el puerto 8082, esta Activo");
});

function verificarToken(req, res, next) {
    let token = req.headers.authorization.substring(7,req.headers.authorization.length);
    console.log(token);
    jsonwebtoken.verify(token, 'claveSecreta', function(err, decoded) {
        if (err) {
            res.json({Error: "Acceso no concedido a ruta de sistema2 del Servidor 2"})
        } else {
            next();
        }
      });
};