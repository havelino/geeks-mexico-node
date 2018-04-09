var express = require('express');
var router = express.Router();
var service = require('../customer-service')

/* GET home page. */
router.get('/', function(req, res, next) {
    service.findAll().then( customers =>{
    res.status(200);
    res.json(customers);
  });
});

module.exports = router;