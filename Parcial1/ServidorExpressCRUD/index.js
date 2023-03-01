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
        res.status(200).send( "Insercion realizada con exito");
    }
    else {
        res.status(500).send("No se ha podido insertar el usuario");
    }
});

app.delete('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('DELETE FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.affectedRows == 1) {
        res.send("Registro Eliminado con exito");
    } else {
        res.send("No se ha encontrado el registro a Eliminar");
    }
})

app.put('/usuario/', async(req,res) => {
    let secuenciasql = `UPDATE usuario SET nombre ='${req.body.nombre}', edad = ${req.body.edad}, semestre = ${req.body.semestre} WHERE id = ${req.body.id}`;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.status(200).send( "Modificación realizada con exito");
    }
    else {
        res.status(500).send("No se ha encontrado el registro a Modificar");
    }
});

app.patch('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(`UPDATE usuario SET nombre ='${req.body.nombre}', edad = ${req.body.edad}, semestre = ${req.body.semestre} WHERE id = ?`,[req.params.id]);
    if(rows.affectedRows == 1) {
        res.status(200).send( "Actualización realizada con exito");
    }
    else {
        res.status(500).send("No se ha encontrado el registro a Actualizar");
    }
});

app.use((req,res) => {
    res.status(404).json({estado: "Pagina o Ruta No Encontrada"})
})

app.listen(8082,()=> {
    console.log("Servidor express corriendo y escuchando en el puerto 8082")
})