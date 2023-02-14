const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

fs.writeFile(path.join(__dirname , 'archivoc.txt'), "archivo creado api callback", (err) =>  {
    if(err) {
        console.log(err)
    } else {
        console.log("Archivo creado con el api fs callback")
    }
});

(async () => {
    try {
        await fsp.writeFile(path.join(__dirname , 'archivop.txt'), "archivo creado api promesas");
        console.log("Archivo creado con el api fs promises")
    } catch(err) {
        console.log(err)
    }
    
})();


// console.log(__dirname);
// console.log(__filename)