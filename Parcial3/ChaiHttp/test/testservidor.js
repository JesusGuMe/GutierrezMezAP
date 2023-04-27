let srcindex = require('../src/index.js');
let chai = require('chai')
let chaiHttp = require('chai-http')
const expect = require('chai').expect
chai.use(chaiHttp);
const url = 'localhost:8082';

describe('Mostrar Usuarios', () => {
    it('debería mostrarme los usuarios', (done) => {
        chai.request(url)
                    .get('/usuario/')
                    .end (function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.text).to.be.a('string');
                        done();
                    });
    });
});