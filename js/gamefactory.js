angular.module('hexstream.gamefactory', ['hexstream.userfactory', 'hexstream.helperfactory'])

.factory('GameFactory', function($http, UserFactory, HelperFactory) {
  var searchGame = function(game) {
    $http.jsonp('https://api.twitch.tv/kraken/streams?limit=10&game=' + game + '&callback=JSON_CALLBACK').success(function(data){
      var streams = data.streams;
      console.log(streams);
      if (streams.length > 0) {
        for (var i = 0; i < streams.length; i++) {
          var streamer = streams[i].channel.display_name;
          var linkEl = document.createElement('a');
          linkEl.innerHTML = streamer + " ";
          document.body.appendChild(linkEl);
        }
      } else {
        HelperFactory.errorFeedback("Looks like " + game + " is not being streamed!", ".game");
      }
    }).error(function (data) {
      HelperFactory.errorFeedback("Oops! Something went wrong. Try again.", ".game");
    });
  };
  return {
    searchGame: searchGame
  }
});
