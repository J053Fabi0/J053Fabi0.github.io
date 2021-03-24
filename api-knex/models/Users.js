// Trae los datos de la base de datos.
const knexInstance = require("../config");

const createModelKnex = require("../utils/createModelUtil");

const table = "users";
const returningData = [
  "id_user",
  "name",
  "last_name",
  "email",
  "phone",
  "description",
  "active",
  "created_at",
  "rol",
  "password",
];
const table_id = "id_user";

module.exports = createModelKnex({ knexInstance, table, returningData, table_id });
