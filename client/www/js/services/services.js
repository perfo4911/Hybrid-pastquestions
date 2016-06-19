angular.module('app')
.factory('$localStorage', ['$window', function($window) {
  return {
    store: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key,defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    },
      isloggedin: function(key){
          if($window.localStorage[key])return true;
          else return false;
      },
      delete:function(key){
          $window.localStorage[key]="";
      },
      isAdmin:function(key){
          if($window.localStorage[key]==="Admin")return true;
          else return false;
      }
  }
}]);