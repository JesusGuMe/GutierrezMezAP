const express = require('express');

const app = express();
app.use(express.json())
app.use(express.text())

app.get('/usuario', (req,res) => {
    res.json({respuesta: "Petición get a la ruta usuario con express"});

})

app.post('/usuario', (req,res) => {
    res.json({respuesta: "Petición post a la ruta usuario con express"});

})

app.put('/usuario', (req, res) => {
    res.json({respuesta: "Petición put a la ruta usuario con express"});

})

app.delete('/usuario', (req, res) => {
    res.json({respuesta: "Petición delete a la ruta usuario con express"});

})

app.listen(8082,(req, res) => {
    console.log("Servidor 8082 esta ESCUCHANDO, version EXPRESS");
})
