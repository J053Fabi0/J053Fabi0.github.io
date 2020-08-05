class Contacto {
  constructor(nombre, apellidos, telefono) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
  }
}

class ListaContactos {
  constructor() {
    this.agenda = [];
  }

  agregar(nombre, apellidos, telefono) {
    this.agenda.push(new Contacto(nombre, apellidos, telefono));
  }

  buscarContacto(busqueda) {
    var resultados = [];
    for (var i = 0; i < this.agenda.length; i++) {
      const re = new RegExp(busqueda, "i"); // Creo mi expresión regular, con la "i" de que no será case-sensitive
      // Este if compara la expresión regulara contra el nombre, apellido y telefono.toString()
      // El .text es una función de las expresiones regulares que solo devuelve un true o false
      if (re.test(this.agenda[i].nombre) || re.test(this.agenda[i].apellidos) || re.test(this.agenda[i].telefono.toString())) {
        resultados.push(this.agenda[i]);
      }
    }
    return resultados;
  }
}

var agenda = new ListaContactos();
agenda.agregar("Ernseto", "Maldonado", 6246234);
agenda.agregar("Mauricio", "Lenon", 21513461);
agenda.agregar("Brenda", "Quintana", 10198475832);
agenda.agregar("Paulina", "Alamillo", 51438612);

console.log(agenda.buscarContacto("Pau"));
// Output
// [
//   Contacto {
//     nombre: 'Paulina',
//     apellidos: 'Alamillo',
//     telefono: 51438612
//   }
// ]

console.log(agenda.buscarContacto("62"));
// Output
// [
//   Contacto {
//     nombre: 'Ernseto',
//     apellidos: 'Maldonado',
//     telefono: 6246234
//   }
// ]
