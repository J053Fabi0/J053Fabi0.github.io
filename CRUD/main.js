const request = require("request");

const URI_BASE = "https://goodreads-devf-aaron.herokuapp.com/api/v1";

function createAuthor(nombre, last_name, nacionalidad, biografia, genero, edad) {
  const form = {
    name: nombre,
    last_name: last_name,
    nacionalidad: nacionalidad,
    biography: biografia,
    gender: genero,
    age: edad,
  };

  const objetoConfig = {
    url: `${URI_BASE}/authors/`,
    form: form,
  };

  return new Promise((resolve, reject) => {
    request.post(objetoConfig, (err, response, body) => {
      if (err) return console.log(err);

      if (Math.floor(response.statusCode / 100) == 2) {
        const bodyJSON = JSON.parse(body);

        resolve(bodyJSON);
      } else {
        reject("Error " + response.statusCode);
      }
    });
  });
}

function editAuthor(id, nombre, apellido, nacionalidad, biografia, genero, edad) {
  const form = {};
  if (nombre) form.name = nombre;
  if (apellido) form.last_name = apellido;
  if (nacionalidad) form.nacionalidad = nacionalidad;
  if (biografia) form.biography = biografia;
  if (genero) form.gender = genero;
  if (edad) form.age = edad;

  const objetoConfig = {
    url: `${URI_BASE}/authors/${id}/`,
    form: form,
  };

  return new Promise((resolve, reject) => {
    request.patch(objetoConfig, (err, response, body) => {
      if (err) return console.log(err);

      if (Math.floor(response.statusCode / 100) == 2) {
        const bodyJSON = JSON.parse(body);

        resolve(bodyJSON);
      } else {
        reject("Error " + response.statusCode);
      }
    });
  });
}

function deleteAuthor(id) {
  return new Promise((resolve, reject) => {
    request.delete(`${URI_BASE}/authors/${id}/`, (err, response) => {
      if (err) return console.log(err);

      if (Math.floor(response.statusCode / 100) == 2) {
        resolve(id);
      } else {
        reject("Error " + response.statusCode);
      }
    });
  });
}

function findAuthor(id) {
  return new Promise((resolve, reject) => {
    request.get(`${URI_BASE}/authors/${id}/`, (err, response, body) => {
      if (err) return console.log(err);

      if (Math.floor(response.statusCode / 100) == 2) {
        const bodyJSON = JSON.parse(body);

        resolve(bodyJSON);
      } else {
        reject("Error " + response.statusCode);
      }
    });
  });
}

async function DoS_Attack_await() {
  try {
    for (var i = 0; i < 100; i++) {
      const creado = await createAuthor("A", "B", "MX", "C", "F", -9999);
      console.log(`Creado ${creado.id}`);

      const editado = await editAuthor(creado.id, "Nuevo nombre", "Nuevo apellido");
      console.log(`Se ha modificado a ${editado.id}`);

      const eliminado = await deleteAuthor(editado.id);
      console.log(`Se ha elimiado a ${eliminado}`);
    }
  } catch (err) {
    console.log(err);
  }
}
// DoS_Attack_await();

function DoS_Attack_thens() {
  for (var i = 0; i < 100; i++) {
    createAuthor("A", "B", "MX", "C", "F", -9999)
      .then((doc) => {
        console.log(`Creado ${doc.id}`);
        return editAuthor(doc.id, "Nuevo nombre", "Nuevo apellido");
      })
      .then((doc) => {
        console.log(`Se ha modificado a ${doc.id}`);
        return deleteAuthor(doc.id);
      })
      .then((id) => console.log(`Se ha eliminado a ${id}`))
      .catch((err) => console.log(err));
  }
}
DoS_Attack_thens();
