const axios = require("axios");

module.exports = async ({ params: { peopleID } }, req) => {
  try {
    const { data } = await axios.get("https://swapi.dev/api/people/" + peopleID);
    req.send(data);
  } catch (err) {
    console.log(err);
  }
};
