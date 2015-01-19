angular.module('hexstream', [])

.controller('hexstreamCtrl', function ($scope, Factory) {
  $scope.input = {};

  $scope.searchTwitch = function() {
    angular.element(document.body.querySelector('p')).remove();
    Factory.searchTwitch($scope.input.username);
    $scope.input.username = "";
  }
})
.factory('Factory', function($http) {
  var searchTwitch = function(username) {
    $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
      if (data.error !== "Not Found") {
        var iframe = document.createElement('iframe');
        iframe.src = "http://www.twitch.tv/" + username + "/embed";
        iframe.frameborder = "0";
        iframe.scrolling = "no";
        iframe.height = "378";
        iframe.width = "450";
        document.body.appendChild(iframe);
      } else {
        errorFeedback("Username " + username + " not found!");
      }
    }).error(function (data) {
      errorFeedback("Oops! Something went wrong. Try again.");
    });
  };

  var errorFeedback = function(message) {
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    angular.element(document.body.querySelector('.userInput')).append(errorMessage);
  }

  return {
    searchTwitch: searchTwitch
  };
});

// <iframe src="http://www.twitch.tv/faceittv/embed" frameborder="0" scrolling="no" height="378" width="620"></iframe>
