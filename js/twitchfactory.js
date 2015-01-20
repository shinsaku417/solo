angular.module('hexstream.twitchfactory', ['hexstream.helperfactory'])

.factory('TwitchFactory', function($http, HelperFactory) {
  var streams = [];
  var streamers = [];

  var searchTwitch = function(username) {
    if (streams.length < 6) {
      $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
        if (data.error !== "Not Found") {
          createTwitchStream(username);
        } else {
          HelperFactory.errorFeedback("Username " + username + " not found!");
        }
      }).error(function (data) {
        HelperFactory.errorFeedback("Oops! Something went wrong. Try again.");
      });
    } else {
      HelperFactory.errorFeedback("Too many streams open!");
    }
  };

  var createTwitchStream = function(username) {
    var iframe = document.createElement('iframe');
    iframe.src = "http://www.twitch.tv/" + username + "/embed";
    iframe.frameborder = "0";
    iframe.scrolling = "no";
    iframe.height = "378";
    iframe.width = "425";
    document.body.appendChild(iframe);
    streams.push(iframe);
    streamers.push(username);
    HelperFactory.setStorage(streamers);
  }

  return {
    streams: streams,
    streamers: streamers,
    searchTwitch: searchTwitch,
    createTwitchStream: createTwitchStream,
  };
});
