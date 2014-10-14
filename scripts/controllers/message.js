'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {

 
   
    $scope.getMessages = function(){
       MessageService.getMessages().then(function(data){
          $scope.messages = data.data;
          console.log(data);
          console.log($scope.messages);
       });
    }

    $scope.addMessage = function(){

      MessageService.postMessage($scope.newMessage).then(function(){
        $scope.getMessages();
      })
      $scope.newMessage= ''
    }
     $scope.getMessages();
  });

  