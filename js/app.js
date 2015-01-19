angular.module('multistream', [])

.controller('multistreamCtrl', function ($scope, Factory) {
  // Your code here
  $scope.input = {};

  $scope.searchStream = function() {
    Factory.searchStream($scope.input.username);
  }
})
.factory('Factory', function($http) {
  var searchStream = function(username) {
    $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
      var iframe = document.createElement('iframe');
      iframe.src = "http://www.twitch.tv/" + username + "/embed";
      iframe.frameborder = "0";
      iframe.scrolling = "no";
      iframe.height = "378";
      iframe.width = "400";
      document.body.appendChild(iframe);
    }).error(function (data) {
      // something went wrong :(
      console.log('Got nothing');
    });
  };

  return {
    searchStream: searchStream
  };
});

// <iframe src="http://www.twitch.tv/faceittv/embed" frameborder="0" scrolling="no" height="378" width="620"></iframe>
