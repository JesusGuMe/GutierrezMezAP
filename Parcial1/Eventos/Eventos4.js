let events = require('events').EventEmitter;
let util = require('util');

class Saludo extends events {
    saludar() {
        
        setTimeout(() => {
            this.emit('iniciaSaludo');
            console.log('Hola Mundo');
            this.emit('terminaSaludo');
        }, 1000);
        
        return this;
    }
}

// util.inherits(saludar, events);
let sal = new Saludo();

sal.saludar();

sal.on('iniciaSaludo', function() {
    console.log('La funcion saludar emitio el evento iniciaSaludo');
})

sal.on('terminaSaludo', function() {
    console.log('La funcion saludar emitio el evento terminaSaludo');
})