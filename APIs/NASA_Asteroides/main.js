const request = require("request");
const BASE_URI = "https://api.nasa.gov/neo/rest/v1/feed";
const API_KEY = "umuvm4bW9y4XhhxbHNsfoQ3KZu246ighoBelSgfg";

// https://stackoverflow.com/questions/563406/add-days-to-javascript-date
Date.prototype.restDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

function getDateFormat(date) {
  // returns the month (from 0 to 11)
  var month = date.getMonth() + 1;
  // returns the day of the month (from 1 to 31)
  var day = date.getDate();
  // returns the year (four digits)
  var year = date.getFullYear();

  return `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`;
}

function getAsteroisFromNowAnd7Days() {
  const start_date = getDateFormat(new Date().restDays(7));
  const end_date = getDateFormat(new Date());

  request.get(`${BASE_URI}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`, (err, response, body) => {
    if (err) return console.log(err);

    if (response.statusCode === 200) {
      const bodyParsed = JSON.parse(body);

      const near_earth_objects = bodyParsed.near_earth_objects;
      const allDays = Object.keys(near_earth_objects);
      // allDays = [
      //   '2020-09-29',
      //   '2020-09-28',
      //   '2020-09-27',
      //   '2020-09-30',
      //   '2020-09-26',
      //   '2020-09-25',
      //   '2020-09-24',
      //   '2020-09-23'
      // ]

      for (oneDay of allDays) {
        for (oneAsteroid of near_earth_objects[oneDay]) {
          if (oneAsteroid.is_potentially_hazardous_asteroid) console.log(`${oneDay} ${oneAsteroid.name}`);
        }
      }
    } else {
      console.log(`Error ${response.statusCode}`);
    }
  });
}

getAsteroisFromNowAnd7Days();
