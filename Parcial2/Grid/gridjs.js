new gridjs.Grid({
    columns: ['id', 'nombre', 'edad', 'semestre'],
    server: {
      url: 'http://localhost:8082/usuario',
      then: data => data.map(usuario => [usuario.id, usuario.nombre, usuario.edad, usuario.semestre])
    } 
  }).render(document.getElementById("wrapper"));;