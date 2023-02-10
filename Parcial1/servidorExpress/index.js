const express = require('express');
const app = express();

app.use(express.json())
app.use(express.text())

app.get('/alumnos/:carrera', (req,res) => {
    //console.log(req.params.carrera)
    res.json({alumnos:"Alumnos de la carrera de "+req.params.carrera})
})

app.get('/maestros', (req,res) => {
    //console.log(req.query.control)
    res.json({maestro: "Informacion del maestro " + req.query.control})
})

app.post('/administrativos', (req,res) => {
    //console.log(req.body.nombre)
    res.json({admin: "Informacion del personal administrativo " + req.body.nombre})
})

app.use((req,res) => {
    res.status(404).json({estado: "Pagina o Ruta No Encontrada"})
    // res.json({estado: "Pagina o Ruta No Encontrada"})
})

app.listen(8082,()=> {
    console.log("Servidor express corriendo y escuchando en el puerto 8082")
})