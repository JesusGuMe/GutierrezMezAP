let modulo = require('../src/modulo.js');
let expect = require('chai').expect

describe("Pruebas a la función areaTriangulo", function() {
    it("Si le mandamos 2 y 3 el resultado debería de regresarme un numero = 3", function() {
        let resultado = modulo.areaTriangulo(2,3);
        expect(resultado).to.be.a("number");
        expect(resultado).to.equal(3);
    })
});