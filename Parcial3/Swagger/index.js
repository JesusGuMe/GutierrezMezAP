const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors')
const app = express();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { SwaggerTheme } = require('swagger-themes');
const path = require('path');
const fs = require('fs')
const redoc = require('redoc-express');

app.use(express.json())
app.use(express.text())
app.use(cors())

const theme = new SwaggerTheme('v3');

const themeoptions = {
    explorer: true,
    customCss: theme.getBuffer('outline')
};

let contenidoReadme = fs.readFileSync(path.join(__dirname)+ '/README.md', {encoding:'utf-8', flag: 'r'});
let apidef_string = fs.readFileSync(path.join(__dirname)+ '/apidef.json', {encoding:'utf-8', flag: 'r'});
let apidef_objeto = JSON.parse(apidef_string);
apidef_objeto.info.description = contenidoReadme

let redocTheme_string = fs.readFileSync(path.join(__dirname)+ '/redocTheme.json', {encoding:'utf-8', flag: 'r'});
let redocTheme_objeto = JSON.parse(redocTheme_string);
const swaggerOptions = {
    definition: apidef_objeto,
    apis: [`${path.join(__dirname,"./index.js")}`],
    };

/**
 * @swagger
 * /usuario/:
 *  get:
 *    tags:
 *      - usuario
 *    summary: Consultar todos los usuarios
 *    description: Petición Get a la ruta de Usuarios
 *    responses:
 *      200:
 *        description: Regresa un arreglo/array con todos los usuarios registrados.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/usuario'   
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/usuario'   
 */
app.get('/usuario/', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario`');
    res.json(rows);
})

/**
 * @swagger
 * /usuario/{id}:
 *  get:
 *    tags:
 *      - usuario
 *    summary: Consultar un usuario en especifico por su ID
 *    description: Petición Get a la ruta de Usuarios donde pedira un id
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID del usuario a consultar
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64  
 *    responses:
 *      200:
 *        description: Regresa la información del usuario en especifico.
 *        content:
 *          application/json:
 *            schema:
 *              type: json
 *              $ref: '#/components/schemas/usuario'   
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/usuario'
 *      400:
 *         description: ID invalido.
 *      404:
 *         description: ID no encontrado.
 */

app.get('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('SELECT * FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.length==0) {
        res.json({registros: "No se encontro usuario"});
    } else {
        res.json(rows);
    }
})

/**
 * @swagger
 * /usuario/:
 *   post:
 *     tags:
 *       - usuario
 *     summary: Registrar un usuario
 *     description: Petición Post a la ruta de Usuarios
 *     requestBody:
 *       description: Crea un nuevo usuario
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *     responses:
 *       200:
 *         description: Status de la operación de inserción de un nuevo usuario.
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuario'   
 *           application/xml:
 *            schema:
 *              $ref: '#/components/schemas/usuario'  
 *       405:
 *         description: Input Invalido.
 */

app.post('/usuario/', async(req,res) => {
    let secuenciasql = `insert into usuario values(${req.body.id}, '${req.body.nombre}', ${req.body.edad}, ${req.body.semestre}, '${req.body.login}', '${req.body.password}')`;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.json({status: "Insercion realizada con exito"});
    }
    else {
        res.json({registros: "No se ha podido agregar el registro"});
    }
});

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     tags:
 *       - usuario
 *     summary: Se borra un usuario
 *     description: Petición Delete a la ruta de Usuarios para borrar un usuario.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a ELIMINAR
 *         required: true
 *         schema:
 *          type: integer
 *          format: int64  
 *     responses:
 *       200:
 *         description: Status exitoso de la operación de eliminación de un usuario.
 *       400:
 *         description: ID invalido.
 *       404:
 *         description: ID no encontrado.
 */

app.delete('/usuario/:id', async(req,res) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute('DELETE FROM `usuario` WHERE `id` = ?', [req.params.id]);
    if(rows.affectedRows == 1) {
        res.json({status: "Registro Eliminado con exito"});
    } else {
        res.json({registros: "No se ha encontrado el registro a Eliminar"});
    }
})

/**
 * @swagger
 * /usuario/:
 *  patch:
 *    tags:
 *      - usuario
 *    summary: Actualizar usuario
 *    description: Petición Patch a la ruta de Usuarios
 *    requestBody:
 *       description: Actualiza un usuario existente
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/usuario'
 *       required: true
 *    responses:
 *      200:
 *        description: Regresa un mensaje de operación de la modificación exitosa.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/usuario'   
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/usuario'  
 *      
 */

app.patch('/usuario/', async(req,res) => {
    let secuenciasql = `UPDATE usuario SET id = ${req.body.id}, nombre ='${req.body.nombre}', edad = ${req.body.edad}, semestre = ${req.body.semestre}, login = '${req.body.login}', password = '${req.body.password}' WHERE id = ${req.body.id}`;
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'prueba_api'});
    const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.json({status: "Actualización realizada con exito"});
    }
    else {
        res.json({registros: "No se ha encontrado el registro a Actualizar"});
    }
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs, themeoptions));

app.get("/docs.json", (req,res) => {
        res.json(swaggerDocs);
})

app.get('/redocs', redoc({
        title: 'API Docs',
        specUrl: '/docs.json',
        nonce: '', // <= it is optional,we can omit this key and value
        // we are now start supporting the redocOptions object
        // you can omit the options object if you don't need it
        // https://redocly.com/docs/api-reference-docs/configuration/functionality/
        redocOptions: {
            theme: { redocTheme_objeto }
        }
    })
);

app.use((req,res) => {
    res.status(404).json({estado: "Pagina o Ruta No Encontrada"})
})

app.listen(8082,()=> {
    console.log("Servidor express corriendo y escuchando en el puerto 8082")
})

/**
 * @swagger
 * components:
 *   schemas:
 *     usuario: 
 *       type: object
 *       properties:
 *         id:
 *           type: smallint
 *           description: Identificador del usuario    
 *           example: 5 
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *           example: Jesús    
 *         edad:
 *           type: int
 *           description: Edad del usuario   
 *           example: 18  
 *         semestre:
 *           type: int
 *           description: Semestre del usuario    
 *           example: 7 
 *         login:
 *           type: string
 *           description: Login de acceso   
 *           example: Jesús125 
 *         password:
 *           type: smallint
 *           description: Clave de Acceso    
 *           example: Jesús123 
 *       
 */