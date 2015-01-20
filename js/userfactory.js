angular.module('hexstream.userfactory', ['hexstream.helperfactory'])

.factory('UserFactory', function($http, HelperFactory) {
  var streams = [];
  var streamers = [];

  var searchUser = function(username) {
    if (streams.length < 6) {
      $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
        if (data.error !== "Not Found") {
          createTwitchStream(username);
        } else {
          HelperFactory.errorFeedback("Username " + username + " not found!", ".user");
        }
      }).error(function (data) {
        HelperFactory.errorFeedback("Oops! Something went wrong. Try again.", ".user");
      });
    } else {
      HelperFactory.errorFeedback("Too many streams open!", ".user");
    }
  };

  var createTwitchStream = function(username) {
    if (streams.length < 6) {
      var iframe = document.createElement('iframe');
      iframe.src = "http://www.twitch.tv/" + username + "/embed";
      iframe.frameborder = "0";
      iframe.scrolling = "no";
      iframe.height = "370";
      iframe.width = (window.innerWidth / 3) - 10;
      document.body.appendChild(iframe);
      streams.push(iframe);
      streamers.push(username);
      HelperFactory.setStorage(streamers);
    } else {
      HelperFactory.errorFeedback("Too many streams open!", ".user");
    }
  }

  var removeStream = function(num) {
    if (streams.length > num) {
      var iframe = streams.splice(num, 1)[0];
      streamers.splice(num, 1);
      iframe.parentNode.removeChild(iframe);
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
