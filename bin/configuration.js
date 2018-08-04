var nconf = require('nconf');

function Config() {
  
  var environment = nconf.get('NODE_ENV') || 'development';
  console.log('Loading conf file from: ./config/'+ environment+'.json');
  //The  file location is searched based on root directory
  nconf.argv().env().file({file:'./config/'+environment+'.json'});
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};


module.exports = new Config();