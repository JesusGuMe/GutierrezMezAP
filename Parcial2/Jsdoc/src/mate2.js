export const areaCuadrado = (lado) => {
    return lado * lado;
}

export const areaTriangulo = (base, altura) => {
    return (base * altura) / 2
}

export const areaCirculo = (radio) => {
    return Math.pow((Math.PI * radio), 2);
}