angular.module('hexstream', ['hexstream.userfactory', 'hexstream.gamefactory', 'hexstream.helperfactory'])

.controller('hexstreamCtrl', function ($scope, UserFactory, GameFactory, HelperFactory, $http, $window) {
  $scope.data = {};

  $scope.init = function() {
    var storedStreamers = localStorage.getItem("streamers");
    if (storedStreamers !== undefined && storedStreamers !== null) {
      storedStreamers = JSON.parse(storedStreamers);
      for (var i = 0; i < storedStreamers.length; i++) {
        UserFactory.createTwitchStream(storedStreamers[i]);
      }
    }
  }
  $scope.init();

  $scope.search = function(callback, input, formClass) {
    HelperFactory.removeError();
    if ($scope.data[input] !== undefined) {
      callback($scope.data[input]);
      $scope.data[input] = undefined;
    } else {
      HelperFactory.errorFeedback('Please enter something', formClass);
      $scope.data[input] = undefined;
    }
  }

  $scope.searchUser = function() {
    $scope.search(UserFactory.searchUser, "userInput", ".game");
  };

  $scope.searchGame = function(event) {
    HelperFactory.removeError();
    var game;
    if (event) {
      game = event.srcElement.innerHTML;
    } else {
      game = $scope.data.gameInput;
    }
    if (game === undefined) {
      HelperFactory.errorFeedback("Please enter something.", ".game");
    } else {
      $http.jsonp('https://api.twitch.tv/kraken/streams?limit=15&game=' + game + '&callback=JSON_CALLBACK').success(function(data){
        var gameStreams = data.streams;
        var gameStreamers = [];
        if (gameStreams.length > 0) {
          for (var i = 0; i < gameStreams.length; i++) {
            var gameStreamer = gameStreams[i].channel.name;
            gameStreamers.push(gameStreamer);
          }
          $scope.data.gameStreamers = gameStreamers;
        } else {
          HelperFactory.errorFeedback("Looks like " + game + " is not being streamed!", ".game");
        }
      }).error(function (data) {
        HelperFactory.errorFeedback("Oops! Something went wrong. Try again.", ".game");
      });
    }
    $scope.data.gameInput = undefined;
    // $scope.search(GameFactory.searchGame, "gameInput", ".game");
  };

  $scope.makeStream = function(streamer) {
    UserFactory.createTwitchStream(streamer);
  }


  $scope.removeStream = function(num) {
    HelperFactory.removeError();
    UserFactory.removeStream(num);
  };

  $scope.removeTabs = function() {
    HelperFactory.removeError();
    $scope.data.gameStreamers = [];
    $scope.query = "";
  }

  var w = angular.element($window);
  w.bind('resize', function () {
    if (UserFactory.streams) {
      for (var i = 0; i < UserFactory.streams.length; i++) {
        UserFactory.streams[i].width = ($window.innerWidth / 3) - 10;
      }
    }
  });
});
