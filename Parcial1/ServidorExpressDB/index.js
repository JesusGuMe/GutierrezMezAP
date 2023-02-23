const express = require('express');
// const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json())
app.use(express.text())
// app.use(cors())

app.get('/usuario/', async(req,res) => {
    //console.log(req.params.id)
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario`');
    res.json(rows);
})

app.get('/usuario/:id', async(req,res) => {
    //console.log(req.params.carrera)
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.length==0) {
        res.json({registros: "No se encontro usuario"});
    } else {
        res.json(rows);
    }
    
    // res.json({usuarios:"Usuario: "+req.params.id})
})


app.use((req,res) => {
    res.status(404).json({estado: "Pagina o Ruta No Encontrada"})
    // res.json({estado: "Pagina o Ruta No Encontrada"})
})

app.listen(8082,()=> {
    console.log("Servidor express corriendo y escuchando en el puerto 8082")
})