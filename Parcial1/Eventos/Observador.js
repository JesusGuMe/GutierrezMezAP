let fs = require('fs');
let path = require('path');

let archivoObs = path.join(__dirname, 'observador.txt');
console.log(archivoObs);

obs = fs.watch(archivoObs, function(evento, archivo) {
    console.log(`Sucedio el evento ${evento} en el archivo ${archivo}`)
});

obs.on('change', () => {
    console.log('Se cambio el Archivo')
})

// obs.on('error', () => {
//     console.log('Sucedio un error')
// });