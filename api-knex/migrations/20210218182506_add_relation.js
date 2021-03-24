exports.up = function (knex) {
  return knex.schema.table("homes", (table) => {
    // Aquí manupularé la tabla homes

    // Haremos un rename de una columna
    table.renameColumn("description", "detail");

    // Agregar una columna foranea
    table.integer("fk_user").unsigned().references("users.id_user");
  });
};

exports.down = function (knex) {};
