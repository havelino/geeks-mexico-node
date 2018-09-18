const express = require('express');
const router = express.Router();
const service = require('../services/customer-service');

/* GET all customers*/
router.get('/', function(req, res, next) {
    service.findAllCustomers().then( customers =>{
    res.status(200);
    res.json(customers);},
    err=>res.json(err));
});

/* GET  customer by Id*/
router.get('/customer/:custId', function(req, res, next) {
  console.log(req.params)
  service.findByCustomerName(req.params.custId)
    .then( customer =>{
      res.status(200);
      res.json(customer);},
      err=>res.json(err));
});

router.post('/',function(req,res,next){
  service.insertCustomer(req.body)
  .then(resp=>{
    res.status(201);
    res.send(resp)
  },err=>{
    res.json(err);
  })
});

module.exports = router;