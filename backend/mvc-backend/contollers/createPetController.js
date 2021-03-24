const Pet = require("../models/Pet");

module.exports = ({ body }, req) => {
  const newPet = new Pet(body.name, body.age);
  req.send(newPet.getPet());
};
