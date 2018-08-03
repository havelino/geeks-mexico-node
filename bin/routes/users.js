var express = require('express');
var router = express.Router();

//simulation of our resources
var users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});
//Create a new user {"user":#,"name":"something"}
router.post('/user', function(req, res, next) {
  users.push(req.body);
  res.json(req.body);
});

//Update an existing user {"user":#,"name":"something"}
router.put('/user', function(req, res, next) {
  var user = users.filter(function(user){ return user.user==req.body.user}).pop();//find the user
  if(user!= null && user!= undefined){
    console.log("user recovered is:",user);
    user.name=req.body.name;//update name by reference
    res.json(user);
  }else{
    res.status(404);
    res.json("User to update not found");
  }


  
});

module.exports = router;
