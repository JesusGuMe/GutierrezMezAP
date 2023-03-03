let path = require('path');
let fs = require('fs');
let archivoLorem = path.join(__dirname, 'Lorem.txt');

const streamLectura = fs.createReadStream(archivoLorem, 'utf-8');
 
streamLectura.on('data', function (chunk) {
  
  console.log(chunk.toString()); // Muestra todo el contenido del Lorem.txt en el OUTPUT.
  console.log("Se ha ejecutado el evento para leer el Lorem")
 
});

streamLectura.on('error', function (error) {
  console.log(`Ocurrio un Error: ${error.message}`);
  console.log('')
  console.log(error)
})