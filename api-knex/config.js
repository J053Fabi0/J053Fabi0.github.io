const { NODE_ENV: env = "development" } = process.env;

// env = development / staging / production
const knexfile = require("./knexfile");
const knex = require("knex");

const knexInstance = knex(knexfile[env]);
module.exports = knexInstance;
