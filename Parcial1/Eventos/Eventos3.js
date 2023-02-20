let events = require('events').EventEmitter;
let util = require('util');

function saludar() {
    
    setTimeout(() => {
        this.emit('iniciaSaludo');
        console.log('Hola Mundo');
        this.emit('terminaSaludo');
    }, 1000);
    
    return this;
}

util.inherits(saludar, events);
let sal = new saludar();

sal.on('iniciaSaludo', function() {
    console.log('La funcion saludar emitio el evento iniciaSaludo');
})

sal.on('terminaSaludo', function() {
    console.log('La funcion saludar emitio el evento terminaSaludo');
})