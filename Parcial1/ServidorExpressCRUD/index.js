const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json())
app.use(express.text())

app.get('/usuario/', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario`');
    res.json(rows);
})

app.get('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.length==0) {
        res.json({registros: "No se encontro usuario"});
    } else {
        res.json(rows);
    }
})

app.post('/usuario/', async(req,res) => {
    let secuenciasql = `insert into usuario values(${req.body.id}, '${req.body.nombre}', ${req.body.edad}, ${req.body.semestre})`;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.json({status: "Insercion realizada con exito"});
    }
    else {
        res.json({registros: "No se ha podido agregar el registro"});
    }
});

app.delete('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('DELETE FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.affectedRows == 1) {
        res.json({status: "Registro Eliminado con exito"});
    } else {
        res.json({registros: "No se ha encontrado el registro a Eliminar"});
    }
})

app.patch('/usuario/', async(req,res) => {
    let secuenciasql = `UPDATE usuario SET id = ${req.body.id}, nombre ='${req.body.nombre}', edad = ${req.body.edad}, semestre = ${req.body.semestre} WHERE id = ${req.body.id}`;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.json({status: "Actualización realizada con exito"});
    }
    else {
        res.json({registros: "No se ha encontrado el registro a Actualizar"});
    }
});

app.use((req,res) => {
    res.status(404).json({estado: "Pagina o Ruta No Encontrada"})
})

app.listen(8082,()=> {
    console.log("Servidor express corriendo y escuchando en el puerto 8082")
})