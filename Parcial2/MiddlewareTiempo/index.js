const express = require('express');
const app = express();
app.use(express.json());
app.use(express.text());

app.use(function(req, res, next) {
    let fecha = new Date();
    let diaHoy = fecha.getDay()

    console.log(`Hoy es el dia = ${diaHoy}`);
    
    if(diaHoy >= 1 && diaHoy <= 5) {
        next()
    }
    else {
        res.status(401).json({error: "No se puede acceder al servidor porque es fin de semana"});
    }
});

app.get('/pelicula',  (req,res) => {
    res.status(200).json({respuesta: "Petición get a la ruta de Pelicula completada con exito"});

});

app.listen(8082, (req, res) => {
    console.log("Servidor 8082 esta ESCUCHANDO de Pelicula");
})
