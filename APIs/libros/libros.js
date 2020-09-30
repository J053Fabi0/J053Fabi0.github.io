const request = require("request");

function getSearchByKeyword(kw) {
  request.get(
    "http://openlibrary.org/search.json?q=" + encodeURIComponent(kw),
    (_, response, body) => {
      if (
        Math.floor(response.statusCode / 100) === 2 &&
        JSON.parse(body).num_found > 0
      ) {
        console.log(JSON.parse(body).docs[0].title);
        console.log("\nAutores:");
        for (var i = 0; i < JSON.parse(body).docs[0].author_name.length; i++) {
          console.log(" - " + JSON.parse(body).docs[0].author_name[i]);
        }
      } else {
        console.log("No encontré nada.");
      }
    }
  );
}

function getSearchAuthorByKeyword(author) {
  request.get(
    "https://openlibrary.org/search.json?author=" + encodeURIComponent(author),
    (_, response, body) => {
      if (
        Math.floor(response.statusCode / 100) === 2 &&
        JSON.parse(body).docs.length > 0
      ) {
        console.log("Libros:");
        for (var i = 0; i < JSON.parse(body).docs.length; i++) {
          console.log(" - " + JSON.parse(body).docs[i].title_suggest);
        }
      } else {
        console.log("No encontré nada.");
      }
    }
  );
}

function getGenreOfBand(band) {
  request.get(
    "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" +
      encodeURIComponent(band),
    (_, response, body) => {
      if (
        Math.floor(response.statusCode / 100) === 2 &&
        JSON.parse(body).artists.length > 0
      ) {
        console.log(
          `Género de la banda "${JSON.parse(body).artists[0].strArtist}": ${
            JSON.parse(body).artists[0].strGenre
          }`
        );
      } else {
        console.log("No encontré nada.");
      }
    }
  );
}

// getGenreOfBand("muse");
getSearchAuthorByKeyword("asimov");
// getSearchByKeyword("El mago");
