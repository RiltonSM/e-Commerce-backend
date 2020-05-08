// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: "hszlqayvocxyjf",
      password: "48942c22388a2179ff8d3da5b4e80d3eb8a0338b3643b74afc4d4134550ac007",
      database: "de0un2mur5f1r8",
      port: 5432,
      host: "ec2-52-71-55-81.compute-1.amazonaws.com",
      ssl: {rejectUnauthorized: false}
    },
    migrations: {
      directory: './src/database/migrations',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_PINK_URL + `?ssl=true`,
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }

};
