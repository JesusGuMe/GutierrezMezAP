// const { areaTriangulo } = require("../src/modulo");
const modulo = require("../src/modulo.js");
describe("Set de texts al modulo", () => {
    test("Si le mandamos 2 y 3 debe regresar 3", () => {
        // expect(areaTriangulo(2, 3)).toBe(3);
        expect(modulo.areaTriangulo(2, 3)).toBe(3);
    })
});