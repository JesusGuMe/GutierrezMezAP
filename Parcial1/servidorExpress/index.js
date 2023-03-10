const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json())
app.use(express.text())
app.use(cors())
app.use(morgan('tiny'))

//const accessLogStream = fs.createReadStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))

app.get('/alumnos/:carrera', (req,res) => {
    //console.log(req.params.carrera)
    res.jsonp({alumnos:"Alumnos de la carrera de "+req.params.carrera})
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