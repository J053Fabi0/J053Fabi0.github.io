const request = require("request");

function getPeopleById(i) {
  request.get("https://swapi.dev/api/people/" + i, (_, response, body) => {
    if (Math.floor(response.statusCode / 100) === 2) {
      console.log(JSON.parse(body));
    } else {
      console.log("Error: " + response.statusCode);
    }
  });
}

getPeopleById(1);
