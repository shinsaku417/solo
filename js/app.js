angular.module('hexstream', ['hexstream.twitchfactory', 'hexstream.helperfactory'])

.controller('hexstreamCtrl', function ($scope, TwitchFactory, HelperFactory) {
  $scope.input = {};
  var streams = TwitchFactory.streams;
  var streamers = TwitchFactory.streamers;

  $scope.searchTwitch = function() {
    angular.element(document.body.querySelector('p')).remove();
    if ($scope.input.username !== undefined) {
      TwitchFactory.searchTwitch($scope.input.username);
      $scope.input.username = undefined;
    } else {
      HelperFactory.errorFeedback('Please enter something');
      $scope.input.username = undefined;
    }
  };

  $scope.removeStream = function(num) {
    HelperFactory.removeStream(streams, streamers, num);
  };

  $scope.init = function() {
    var storedStreamers = localStorage.getItem("streamers");
    if (storedStreamers) {
      storedStreamers = JSON.parse(storedStreamers);
      for (var i = 0; i < storedStreamers.length; i++) {
        TwitchFactory.createTwitchStream(storedStreamers[i]);
      }
    }
  }

  $scope.init();
});
