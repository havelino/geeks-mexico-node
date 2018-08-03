const Connection = require('../lib/connection');
const ServiceError = require('../models/service-error');
const Sequelize = require('sequelize');

const customerDao = Connection.define('customer',{
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

module.exports = {
  findAllCustomers : function(){
    return new Promise( function (resolve, reject){
      customerDao.findAll().then(
        customers =>resolve(customers),
        error=>reject(error));
    });    
  },
  
  findByCustomerName : function(number=0){
    return new Promise(function (resolve, reject){
    customerDao.find({where: {customerNumber: number}
      }).then(
        customer =>{(customer)?resolve(customer):reject(new ServiceError('NOT FOUND',404))},
        error=>reject(error));
    });
  }
}
 



