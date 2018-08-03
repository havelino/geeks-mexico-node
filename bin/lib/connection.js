var Sequelize = require('sequelize');
var config = require('../configuration');

const Connection = new Sequelize(config.get('database:database'), config.get('database:user'), config.get('database:password'), {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: config.get('database:dialect'),
    // custom host; default: localhost
    host: config.get('database:host'),
    // custom port; default: dialect default
    port: config.get('database:port'),
    // disable logging; default: console.log
    logging: false,
    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: { timestamps: false }
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    define: {
      charset: 'latin1',
      timestamps: false
    },
    // pool configuration used to pool database connections
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    //disable operator alliases
    operatorsAliases: false
  })

module.exports = Connection;