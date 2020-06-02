module.exports = {

  development : {
    client : 'sqlite3',
    useNullAsDefault : true,
    connection : {
      filename: './database/dev.db3',
    },
    migrations : {
      directory : './database/migrations',
      tableName : 'dbmigrations',
    },
    seeds : {
      directory : './database/seeds',
    },
  },

  testing : {
    client : 'sqlite3',
    useNullAsDefault : true,
    connection : {
      filename: './database/test.db3',
    },
    migrations : {
      directory : './database/migrations',
      tableName : 'dbmigrations',
    },
    seeds : {
      directory : './database/seeds',
    },
  },

}
