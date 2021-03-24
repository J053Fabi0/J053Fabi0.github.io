// Aquí definiré qué atributo tiene mi tabla home
exports.up = function (knex) {
  // Parámetros: nombre de la tabla, callback
  return knex.schema.createTableIfNotExists("homes", (table) => {
    // Definir mi tabla de homes
    // Primero el tipo de dato("nombre") y luego los atributos
    table.integer("guests");
    table.text("description");
    table.text("address").notNullable();
    table.string("title").notNullable();
    table.increments("house_id").primary();
    table.boolean("active").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("homes");
};
