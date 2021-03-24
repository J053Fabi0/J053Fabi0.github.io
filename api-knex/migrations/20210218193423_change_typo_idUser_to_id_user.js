exports.up = function (knex) {
  return knex.schema.table("homes", (table) => {
    table.integer("fk_user").unsigned().references("users.id_user");
  });
};

exports.down = function (knex) {};
