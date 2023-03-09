/**
 * Esta función regresa el area de un Cuadrado.
 * @param {Number} lado Medida del lado del Cuadrado 
 * @returns Number Area del Cuadrado
 */

export function areaCuadrado(lado) {
    return lado * lado;
}

/**
 * Esta función calcula el area de un Triangulo
 * @param {Number} base Medida de la base del Triangulo
 * @param {Number} altura Medida de la altura del Triangulo
 * @returns Number Area del Triangulo
 */
export function areaTriangulo(base, altura) {
    return (base * altura) / 2
}

/**
 * Función para calcular el area de un Circulo
 * @param {Number} radio Medida del radio del Circulo
 * @returns Number Area del Circulo
 */
export function areaCirculo(radio) {
    return Math.pow((Math.PI * radio), 2);
}

// module.exports.areaCuadrado = areaCuadrado;
// module.exports.areaTriangulo = areaTriangulo;
// module.exports.areaCirculo = areaCirculo;