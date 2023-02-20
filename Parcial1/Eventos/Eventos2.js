let events = require('events');

function saludar() {
    let em = new events.EventEmitter();

    setTimeout(() => {
        em.emit('iniciaSaludo');
        console.log('Hola Mundo');
        em.emit('terminaSaludo');
    }, 1000);
    
    return em;
}

let sal = saludar();

sal.on('iniciaSaludo', function() {
    console.log('La funcion saludar emitio el evento iniciaSaludo');
})

sal.on('terminaSaludo', function() {
    console.log('La funcion saludar emitio el evento terminaSaludo');
})