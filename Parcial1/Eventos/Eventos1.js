let events = require('events');
let em = new events.EventEmitter();

em.on('saludar', function(data) {
    console.log("Hola al Mundo 1er Listener " + data);
});

em.addListener('saludar', function(data) {
    console.log("Hola al Mundo 2do Listener " + data);
});

em.emit('saludar', 'Jesus');
