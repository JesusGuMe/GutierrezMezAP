const express = require('express');
const app = express();
const usuario = require('./usuario.js');

app.use(usuario.router);

app.listen(8082, (req, res) => {
    console.log("Servidor 8082 esta ESCUCHANDO, version MODULO de USUARIO");
})
