// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "ziggy.db.elephantsql.com",
      database: "pfijosth",
      user: "pfijosth",
      password: "D8TfNEdkv9BOTqP_CEn2p_V1q1rI0Guy",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "ziggy.db.elephantsql.com",
      database: "pfijosth",
      user: "pfijosth",
      password: "D8TfNEdkv9BOTqP_CEn2p_V1q1rI0Guy",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "ziggy.db.elephantsql.com",
      database: "pfijosth",
      user: "pfijosth",
      password: "D8TfNEdkv9BOTqP_CEn2p_V1q1rI0Guy",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
