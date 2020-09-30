const request = require("request");

function getFirstMovieOfPeopleById(id) {
  request.get("https://swapi.dev/api/people/" + id, (_, response, body) => {
    if (Math.floor(response.statusCode / 100) === 2) {
      const bodyParsed = JSON.parse(body);
      console.log(bodyParsed.name);
      getFilmNameByURL(bodyParsed.films[0]);
    } else {
      console.log("No encontré nada.");
    }
  });
}

function getFilmNameByURL(url) {
  request.get(url, (_, response, body) => {
    if (Math.floor(response.statusCode / 100) === 2) {
      const bodyParsed = JSON.parse(body);
      console.log(bodyParsed.title);
    } else {
      console.log("No encontré nada.");
    }
  });
}

getFirstMovieOfPeopleById(50);
