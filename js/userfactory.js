angular.module('hexstream.userfactory', ['hexstream.helperfactory'])

.factory('UserFactory', function($http, $window, HelperFactory) {
  var streams = [];
  var streamers = [];

  var searchUser = function(username) {
    if (streams.length < 6) {
      $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
        if (data.error !== "Not Found") {
          createTwitchStream(username);
        } else {
          HelperFactory.errorFeedback("Username " + username + " not found!", ".game");
        }
      }).error(function (data) {
        HelperFactory.errorFeedback("Oops! Something went wrong. Try again.", ".game");
      });
    } else {
      HelperFactory.removeError();
      HelperFactory.errorFeedback("Too many streams open!", ".game");
    }
  };

  var createTwitchStream = function(username) {
    if (streams.length < 6) {
      var iframe = document.createElement('iframe');
      iframe.src = "http://www.twitch.tv/" + username + "/embed";
      iframe.frameborder = "0";
      iframe.scrolling = "no";
      iframe.height = "370";
      iframe.width = ($window.innerWidth / 3) - 10;
      angular.element(document.body.querySelector('.streams')).append(iframe);
      streams.push(iframe);
      streamers.push(username);
      HelperFactory.setStorage(streamers);
    } else {
      HelperFactory.removeError();
      HelperFactory.errorFeedback("Too many streams open!", ".game");
    }
  }

  var removeStream = function(num) {
    if (streams.length > num) {
      var iframe = streams.splice(num, 1)[0];
      streamers.splice(num, 1);
      iframe.parentNode.removeChild(iframe);
      HelperFactory.setStorage(streamers);
    }
    if (num === 6) {
      while(streams.length > 0) {
        var iframe = streams.splice(0, 1)[0];
        streamers.splice(0, 1);
        iframe.parentNode.removeChild(iframe);
      }
      HelperFactory.setStorage(streamers);
    }
  };

  return {
    streams: streams,
    streamers: streamers,
    searchUser: searchUser,
    removeStream: removeStream,
    createTwitchStream: createTwitchStream
  };
});
