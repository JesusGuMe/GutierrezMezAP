const request = require("supertest");
const url = "localhost:8082"

// request(url)
//     .get('/usuario/')
//     .end(function(err, res) {
//         console.log(res.body);
//     })

describe('Describe Get a la ruta de Usuario con Callback', () => {
    it('debería regresar codigo 200', () => {
        request(url)
        .get('/usuario/')
        .end (function(err, res) {
            expect(res.statusCode).toBe(200);
        });
    });
});

describe('Describe Get a la ruta de Usuario con ASYNC-AWAIT', () => {
    it('debería regresar codigo 200', async () => {
        request(url)
        let response = await request(url).get('/usuario/')
            expect(response.statusCode).toBe(200);

    });
});