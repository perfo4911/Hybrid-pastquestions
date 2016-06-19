module.exports = function(app) { 
  var loopback = require('loopback');
  var ds = loopback.createDataSource({
  connector: require('loopback-component-storage'),
  provider: 'filesystem',
  root: 'storage'
});
var container = ds.createModel('container');
app.model(container); 
};