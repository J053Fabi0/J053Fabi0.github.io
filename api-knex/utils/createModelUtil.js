// Tiene como objetivo hacer una abstracción de mis funciones
// que solicitan la información a la base de datos.
module.exports = ({ knexInstance, table, returningData, table_id }) => ({
  // Crear registro en la tabla.
  create: (body) => knexInstance.insert(body).returning(returningData).into(table),

  // Obtiene los datos de los registros
  findAll: () => knexInstance.select(returningData).from(table),

  // El select() sin parámetros entrega todo, como un *
  findOne: (id) =>
    knexInstance
      .select(returningData)
      .from(table)
      .where({ [table_id]: id }),

  find: (query) => knexInstance.select(returningData).from(table).where(query),

  update: (id, updated) =>
    knexInstance
      .update(updated)
      .from(table)
      .where({ [table_id]: id })
      .returning(returningData),

  destroy: (id) =>
    knexInstance
      .del()
      .from(table)
      .where({ [table_id]: id }),

  dilit: (id) =>
    knexInstance
      .update({ active: false })
      .from(table)
      .where({ [table_id]: id }),
});
