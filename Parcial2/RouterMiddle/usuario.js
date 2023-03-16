const express = require('express');
const router = express.Router();

router.get('/usuario', (req,res) => {
            res.status(200).json({respuesta: "Petición get a la ruta usuario usando MODULO"});

    }).post('/usuario', (req,res) => {
            res.status(200).json({respuesta: "Petición post a la ruta usuario usando MODULO"});

    }).put('/usuario', (req,res) => {
            res.status(200).json({respuesta: "Petición put a la ruta usuario usando MODULO"});

    }).delete('/usuario', (req,res) => {
            res.status(200).json({respuesta: "Petición delete a la ruta usuario usando MODULO"});
    });

module.exports.router = router;