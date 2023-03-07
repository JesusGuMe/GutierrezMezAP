const express = require('express');
const app = express();
const router = express.Router();

app.use(router);

router.get('/usuario', (req, res) => {
            res.status(200).json({respuesta: "Petición get a la ruta usuario usando ROUTER"});

    }).post('/usuario', (req, res) => {
            res.status(200).json({respuesta: "Petición post a la ruta usuario usando ROUTER"});

    }).put('/usuario', (req, res) => {
            res.status(200).json({respuesta: "Petición put a la ruta usuario usando ROUTER"});

    }).delete('/usuario', (req, res) => {
            res.status(200).json({respuesta: "Petición delete a la ruta usuario usando ROUTER"});
    });

app.listen(8082, (req, res) => {
    console.log("Servidor 8082 esta ESCUCHANDO, version ROUTER");
})
