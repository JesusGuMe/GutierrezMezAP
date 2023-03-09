exports = { 
    areaCuadrado: (lado) => {
    return lado * lado;
    },

    areaTriangulo: (base, altura) => {
        return (base * altura) / 2
    },

    areaCirculo: (radio) => {
        return Math.pow((Math.PI * radio), 2);
    }
}


