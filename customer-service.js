var Sequelize = require('sequelize');
var config = require('./config/database');


const sequelize = new Sequelize(config.database, config.user, config.password, {
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
    dialect: config.dialect,
  
    // custom host; default: localhost
    host: config.host,
    // custom port; default: dialect default
    port: config.port,
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
    }
  })


/*
CREATE TABLE `customers` (
  `customerNumber` int(11) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `contactLastName` varchar(50) NOT NULL,
  `contactFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `salesRepEmployeeNumber` int(11) DEFAULT NULL,
  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`customerNumber`),
  KEY `salesRepEmployeeNumber` (`salesRepEmployeeNumber`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/ 




const Customer = sequelize.define('customer',{
    customerNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    customerName: Sequelize.STRING(50),
    contactLastName : Sequelize.STRING(50),
    contactFirstName : Sequelize.STRING(50),
    phone : Sequelize.STRING(50),
    addressLine1 : Sequelize.STRING(50),
    addressLine2 : Sequelize.STRING(50),
    city : Sequelize.STRING(50),
    state : Sequelize.STRING(50),
    postalCode : Sequelize.STRING(15),
    country : Sequelize.STRING(50),
    salesRepEmployeeNumber : Sequelize.INTEGER,
    creditLimit : Sequelize.DECIMAL(10, 2) ,
});

 

module.exports = Customer;