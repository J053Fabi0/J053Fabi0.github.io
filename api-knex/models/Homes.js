// Trae los datos de la base de datos.
const knexInstance = require("../config");

const createModelKnex = require("../utils/createModelUtil");

const table = "homes";
const returningData = ["title", "house_id", "address", "guests", "detail", "created_at", "active", "fk_user"];
const table_id = "house_id";

module.exports = createModelKnex({ knexInstance, table, returningData, table_id });

// Esto hace un join de las tablas con los que tengan fk_user
// igual a su id_user y luego retorna solo el que tiene el
// house_id que buscamos
module.exports.findOneWithUser = (house_id) =>
  knexInstance
    .select(["homes.title", "homes.address", "users.email", "users.id_user"]) // Se usa la notación de . cuando se hace un join
    .from(table)
    .join("users", "users.id_user", "=", "homes.fk_user")
    .where({ house_id });
