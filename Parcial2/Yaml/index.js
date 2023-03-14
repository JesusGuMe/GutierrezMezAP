const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

const archivoObj = fs.readFileSync(path.join(__dirname, '/objeto.yaml'), 'utf-8')
const valorobj = yaml.parse(archivoObj);
console.table(valorobj);

const archivoArr = fs.readFileSync(path.join(__dirname, '/array.yaml'), 'utf-8')
const valorArr = yaml.parse(archivoArr);
console.table(valorArr);

const archivoobjarr = fs.readFileSync(path.join(__dirname, '/objetoArray.yaml'), 'utf-8')
const valorobjarr = yaml.parse(archivoobjarr);
console.table(valorobjarr);

const archivoObjeArray = fs.readFileSync(path.join(__dirname, '/objetoArray.yaml'), 'utf-8')
const valorObjArray = yaml.parse(archivoObjeArray);
console.table(valorObjArray);