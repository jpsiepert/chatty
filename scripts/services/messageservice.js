'use strict';

angular.module('chattyApp')
  .service('MessageService', function MessageService($http, $q) {
   
    return {
      getMessages: function(){
        return $http.get('http://localhost:8081');
      },

      postMessage: function(message){
        return $http.post('http://localhost:8081', {text: message});
      }
    }
  });
