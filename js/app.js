angular.module('hexstream', ['hexstream.userfactory', 'hexstream.gamefactory', 'hexstream.helperfactory'])

.controller('hexstreamCtrl', function ($scope, UserFactory, GameFactory, HelperFactory) {
  $scope.data = {};
  var streams = UserFactory.streams;
  var streamers = UserFactory.streamers;

  $scope.searchUser = function() {
    $scope.search(UserFactory.searchUser, "userInput", ".user");
  };

  $scope.searchGame = function() {
    $scope.search(GameFactory.searchGame, "gameInput", ".game");
  };

  $scope.search = function(callback, input, formClass) {
    angular.element(document.body.querySelector('p')).remove();
    if ($scope.data[input] !== undefined) {
      callback($scope.data[input]);
      $scope.data[input] = undefined;
    } else {
      HelperFactory.errorFeedback('Please enter something', formClass);
      $scope.dat[input] = undefined;
    }
  }

  $scope.removeStream = function(num) {
    UserFactory.removeStream(num);
  };

  $scope.init = function() {
    var storedStreamers = localStorage.getItem("streamers");
    if (storedStreamers !== 'undefined') {
      storedStreamers = JSON.parse(storedStreamers);
      for (var i = 0; i < storedStreamers.length; i++) {
        UserFactory.createTwitchStream(storedStreamers[i]);
      }
    }
  }

  $scope.init();
});
