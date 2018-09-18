const Connection = require('../lib/connection');
const ServiceError = require('../models/service-error');
const Sequelize = require('sequelize');
const logger  = require('log4js').getLogger();

const Customer = Connection.define('customer', {
  customerNumber: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  customerName: Sequelize.STRING(50),
  contactLastName: Sequelize.STRING(50),
  contactFirstName: Sequelize.STRING(50),
  phone: Sequelize.STRING(50),
  addressLine1: Sequelize.STRING(50),
  addressLine2: Sequelize.STRING(50),
  city: Sequelize.STRING(50),
  state: Sequelize.STRING(50),
  postalCode: Sequelize.STRING(15),
  country: Sequelize.STRING(50),
  salesRepEmployeeNumber: Sequelize.INTEGER,
  creditLimit: Sequelize.DECIMAL(10, 2),
});

const buildCustomerInstance = function (customer,id) {

  let { customerNumber,customerName, contactLastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit } = customer;

  return Customer.build({
    customerNumber : id || customerNumber || 0,
    customerName: customerName || 'anonymous customer',
    contactLastName: contactLastName || '',
    contactFirstName: contactFirstName || '',
    phone: phone || 'xxxx-xxxx',
    addressLine1: addressLine1 || 'address1',
    addressLine2: addressLine1 || 'address2',
    city: city || 'unknown city',
    state: state || 'unknown state',
    postalCode: postalCode || '00000',
    country: country || 'world',
    salesRepEmployeeNumber: salesRepEmployeeNumber || 1,
    creditLimit: creditLimit || 0
  });
};

module.exports = {

 

  findAllCustomers: function () {
    return new Promise(function (resolve, reject) {
      Customer.findAll().then(
        customers => resolve(customers),
        error => reject(error));
    });
  },

  findByCustomerName: function (number = 0) {
    return new Promise(function (resolve, reject) {
      Customer.find({
        where: { customerNumber: number }
      }).then(
        customer => { (customer) ? resolve(customer) : reject(new ServiceError('NOT FOUND', 404)) },
        error => reject(error));
    });
  },

  insertCustomer: function (customer) {
    logger.debug('saving customer',customer);
    return new Promise(function (resolve, reject) {
     
      buildCustomerInstance(customer)
      .save().then((custSaved) => {
          logger.info('success saving...');
          resolve(custSaved);
        }).catch(error => {
          logger.error(error);
          reject(error);
        })
    })
  },

  updateCustomer: function (customer, id) {
    logger.debug('updating customer',customer);
    return new Promise(function (resolve, reject) {
      buildCustomerInstance(customer,id)
      .update().then(() => {
        logger.info('success update...');
        resolve('success update...');
      }).catch(error => {
        logger.error(error);
        reject(error);
      })
    })
  },

  deleteCustomer: function (id) {
    return new Promise(function (resolve, reject) {
      Customer.create({ customerNumber: id })
        .then(customer => {
          resolve(customer.destroy());
        }).catch(error => {
          logger.error(error);
          reject(error);
        })
    })
  }
}




