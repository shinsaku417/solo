angular.module('hexstream', ['hexstream.factory'])

.controller('hexstreamCtrl', function ($scope, Factory) {
  $scope.input = {};

  $scope.searchTwitch = function() {
    angular.element(document.body.querySelector('p')).remove();
    Factory.searchTwitch($scope.input.username);
    $scope.input.username = "";
  };

  $scope.removeStream = function(num) {
    Factory.removeStream(num);
  };

  $scope.init = function() {
    var streamers = localStorage.getItem("streamers");
    if (streamers) {
      streamers = JSON.parse(streamers);
      for (var i = 0; i < streamers.length; i++) {
        Factory.createTwitchStream(streamers[i]);
      }
    }
  }

  $scope.init();
});
