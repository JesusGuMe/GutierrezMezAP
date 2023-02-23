let path = require('path');
let fs = require('fs');
let archivoLorem = path.join(__dirname, 'Lorem.txt');

// Se usa createReadStream para leer el archivo Lorem, y después, parecido a lo visto anteriormente, 
// cada vez que se haga cambios en el archivo Lorem.txt y se guarden, se registraran en el OUTPUT.
reader = fs.createReadStream(archivoLorem);
 
reader.on('data', function (chunk) {
  
  console.log(chunk.toString()); // Muestra todo el contenido del Lorem.txt en el OUTPUT.
  console.log("Se ha ejecutado el evento para leer el Lorem")
 
});

lor = fs.watch(archivoLorem, function(evento, archivo) {
  console.log(`Sucedio el evento ${evento} en el archivo ${archivo}`)
});

lor.on('change', () => {
  console.log('Se cambio el Archivo')
})