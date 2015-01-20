angular.module('hexstream.gamefactory', ['hexstream.userfactory', 'hexstream.helperfactory'])

.factory('GameFactory', function($http, UserFactory, HelperFactory) {
  var searchGame = function(game) {
    $http.jsonp('https://api.twitch.tv/kraken/streams?limit=2&game=' + game + '&callback=JSON_CALLBACK').success(function(data){
      var streams = data.streams;
      if (streams.length > 0) {
        for (var i = 0; i < streams.length; i++) {
          var streamer = streams[i].channel.display_name;
          console.log(streamer);
          var el = document.createElement('a');
          el.innerHTML = streamer + " ";
          el.style.color = "lightblue";
          document.body.appendChild(el);
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
  };
});
