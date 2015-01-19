angular.module('multistream', [])

.controller('multistreamCtrl', function ($scope, Factory) {
  $scope.searchTwitch = function() {
    Factory.searchTwitch($scope.input.username);
    $scope.input = {};
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
      }
    }).error(function (data) {
      console.log('Got nothing');
    });
  };
  return {
    searchTwitch: searchTwitch
  };
});

// <iframe src="http://www.twitch.tv/faceittv/embed" frameborder="0" scrolling="no" height="378" width="620"></iframe>
