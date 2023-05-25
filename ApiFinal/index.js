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

require('dotenv').config()

const port = process.env.PORT || 8082;
const dbConfig = {
    host: process.env.MYSQLHOST || "localhost",
    port: process.env.MYSQLPORT || "3306",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "api_teatro"
};

const theme = new SwaggerTheme('v3');

const themeoptions = {
    explorer: true,
    customCss: theme.getBuffer('outline')
};

let ContenidoReadme = fs.readFileSync(path.join(__dirname)+'/README.MD',{encoding:'utf8',flag:'r'})
let apidef_string = fs.readFileSync(path.join(__dirname)+'/apidef.json',{encoding:'utf8',flag:'r'})
let apidef_objeto = JSON.parse(apidef_string)
apidef_objeto.info.description=ContenidoReadme;

let redocTheme_string = fs.readFileSync('./redocTheme.json', {encoding:'utf-8', flag: 'r'});
let redocTheme_objeto = JSON.parse(redocTheme_string);

const swaggerOptions = {
    definition: apidef_objeto,
    apis: [`${path.join(__dirname,"./index.js")}`],
    };

/**
 * @swagger
 * /obras/:
 *  get:
 *    tags:
 *      - obra
 *    summary: Consultar todas las obras de teatro
 *    description: Petición Get a la ruta de Obras
 *    responses:
 *      200:
 *        description: Regresa todas las obras de teatro registradas.   
 */

app.get('/obras/', async(req,res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM `obra`');
    res.json(rows);
})

/**
 * @swagger
 * /obras/{id}:
 *  get:
 *    tags:
 *      - obra
 *    summary: Consultar una obra de teatro especifica por su Identificador.
 *    description: Petición Get para la ruta de obras, para buscar una por su respectivo id.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id de la obra que se quiere consultar.
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64 
 *    responses:
 *      200:
 *        description: Regresa un Json con la informacion de la obra que se busco.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/obra'   
 *      400:
 *        description: No se encontro la obra de teatro con ese identificador. 
 */

app.get('/obras/:id', async(req,res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM `obra` WHERE `id` = ?', [req.params.id]);
    if(rows.length==0) {
        res.json({registros: "No se encontro el registro de la obra."});
    } else {
        res.json(rows[0]);
    }
});

/**
 * @swagger
 * /obras/:
 *  post:
 *    tags:
 *      - obra
 *    summary: Registrar una nueva obra de teatro.
 *    description: Petición Post para la ruta de obras, para agregar una nueva obra de teatro.
 *    requestBody:
 *       description: Modificar el body para crear y/o agregar una nueva obra de teatro
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/obra'
 *    responses:
 *      200:
 *        description: Mensaje Inserción Realizada con exito.  
 *      500:
 *        description: Mensaje de error. 
 */

app.post('/obras/', async(req,res) => {
    try {
        let secuenciasql = `insert into obra values(${req.body.id}, '${req.body.titulo}', '${req.body.autor}', '${req.body.grupo}','${req.body.fecha}', '${req.body.lugar}')`;
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.execute(secuenciasql);
    if(rows.affectedRows == 1) {
        res.status(200).send(`Insercion realizada con exito.`);}
    } catch (error) {
    res.status(500).send("Error: " + error.message);
    }
});

/**
 * @swagger
 * /obras/{id}:
 *   delete:
 *     tags:
 *       - obra
 *     summary: Eliminar una obra de teatro de la base de datos.
 *     description: Petición Delete a la ruta de obras para borrar una obra por medio de su id.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id de la obra de teatro a ELIMINAR
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: El registro se elimino correctamente. id.'?'
 *       400:
 *         description: No se ha encontrado el registro a eliminar.
 */

app.delete('/obras/:id', async(req,res) => {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('DELETE FROM `obra` WHERE `id` = ?', [req.params.id]);
    if(rows.affectedRows == 1) {
        res.status(200).send(`El registro se elimino correctamente. \n id: '${[req.params.id]}'`);
    } else {
        res.json({registros: "No se ha encontrado el registro a Eliminar"});
    }
})

/**
 * @swagger
 * /obras/{id}:
 *   put:
 *     tags:
 *       - obra
 *     summary: Actualizar información de una obra.
 *     description: Petición Put a la ruta de obras para modificar la información de un registro.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id de la obra que se desea actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       description: Modifica el body para hacer las modificaciones y actualizar.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/modobras'
 *     responses:
 *       200:
 *         description: Se actualizo correctamente el registro.  id. ?
 *       400:
 *         description: No se encontro el id.
 *       500:
 *         description: Mensaje de error.
 */

app.put('/obras/:id',async(req,res)=>{
    try{
        const connection = await mysql.createConnection(dbConfig);
        const sentenciaSQL = `UPDATE obra SET titulo='${req.body.titulo}',autor='${req.body.autor}', grupo='${req.body.grupo}',fecha='${req.body.fecha}', lugar='${req.body.lugar}' WHERE id = '${[req.params.id]}'`;
        const [rows, fields] = await connection.execute(sentenciaSQL);
    
        if(rows.affectedRows == 1){
            res.status(200).send(`Se actualizado correctamente el registro. \n id: ${[req.params.id]}`);
        }
    
        } catch (error) {
        res.status(500).send("Error: " + error.message);
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

app.use((req,res)=>{
    res.status(404).json({estado:"Pagina no encontrada"})
})

app.listen(port,()=>{
    console.log(`Servidor Express corriendo y escuchando en el puerto ${port}`);
})

/**
 * @swagger
 * components:
 *   schemas:
 *     obra: 
 *       type: object
 *       properties:
 *         id:
 *           type: smallint
 *           description: Identificador de la obra    
 *           example: 10 
 *         titulo:
 *           type: string
 *           description: Titulo de la obra de teatro
 *           example: Macbeth  
 *         autor:
 *           type: string
 *           description: Nombre del autor de la obra   
 *           example: William Shakespeare  
 *         grupo:
 *           type: string
 *           description: Grupo de Teatro o Compania que presenta la obra    
 *           example: HISK Teatro 
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de presentación de la obra
 *           example: "2023-06-15"
 *         lugar:
 *           type: string
 *           description: Lugar de presentación de la obra    
 *           example: Casa de la Cultura, Nuevo Laredo.  
 *     modobras:
 *       type: object
 *       properties: 
 *         titulo:
 *           type: string
 *           description: Titulo de la obra de teatro
 *           example: Santidad de los regalos
 *         autor:
 *           type: string
 *           description: Nombre del autor de la obra   
 *           example: Desconocido  
 *         grupo:
 *           type: string
 *           description: Grupo de Teatro o Compania que presenta la obra    
 *           example: Desconocido 
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de presentación de la obra
 *           example: "2024-12-25"
 *         lugar:
 *           type: string
 *           description: Lugar de presentación de la obra    
 *           example: Teatro de la ciudad.  
 */