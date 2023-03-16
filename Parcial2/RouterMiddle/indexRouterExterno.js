const express = require('express');
const app = express();
const usuario = require('./usuario.js');

app.use(express.json());
app.use(express.text());

//Funcion MiddleWare
//Tiene acceso al request, al response y a la siguiente función, ejecuta codigo generalmente antes de 
//entrar a nuestras rutas, se usa para validaciones, cambiar objeto request, etc.

app.use(function(req, res, next) {
    console.log(req.body.usuario);
    if (typeof req.body.usuario === "undefined") {
        
        res.status(401).json({error: "Usuario no Autorizado"});

    } else {
        if (req.body.usuario === "admin") {
            next();
        } else {
            res.status(401).json({error: "Usuario no Autorizado"});
        }
    } 
});

app.use(usuario.router);

app.listen(8082, (req, res) => {
    console.log("Servidor 8082 esta ESCUCHANDO, version MODULO de USUARIO");
})
