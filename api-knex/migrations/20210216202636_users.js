exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("users", (table) => {
    table.increments("id_user").primary();
    table.string("name").notNullable();
    table.string("last_name");
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("description");
    table.boolean("active").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
