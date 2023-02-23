let path = require('path');
let fs = require('fs');
let archivoLorem = path.join(__dirname, 'Lorem2.txt');

// En este se usara tanto el createReadStream como el createWriteStream de File System, lo que hace
// es que el archivo Lorem2.txt va a ser copiado con el nombre asignado mas abajo.

const leer = fs.createReadStream(archivoLorem, 'utf-8')
 
leer.pipe(fs.createWriteStream('Lorem2_Copy.txt'))
 
leer.on('data', function (chunk) {
 
//   console.log(chunk.toString()); // Muestra todo el contenido del archivo Lorem en el OUTPUT.
  console.log("Se ha creado una copia del archivo Lorem");
 
});