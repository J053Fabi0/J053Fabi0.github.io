const request = require("request");

function getPokemonInfoById(i) {
  request.get("https://pokeapi.co/api/v2/pokemon/" + i, (_, response, body) => {
    if (Math.floor(response.statusCode / 100) === 2) {
      console.log(`Nombre: ${JSON.parse(body).name}`);
      for (var i = 0; i < JSON.parse(body).types.length; i++) {
        console.log(`Tipos: ${JSON.parse(body).types[i].type.name}`);
      }
    } else {
      console.log("Error: " + response.statusCode);
    }
  });
}

getPokemonInfoById(1);

