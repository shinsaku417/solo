angular.module('hexstream.factory', [])

.factory('Factory', function($http) {
  var streams = [];

  var searchTwitch = function(username) {
    if (streams.length < 6) {
      $http.jsonp('https://api.twitch.tv/kraken/channels/' + username + '?callback=JSON_CALLBACK').success(function(data){
        if (data.error !== "Not Found") {
          var iframe = document.createElement('iframe');
          iframe.src = "http://www.twitch.tv/" + username + "/embed";
          iframe.frameborder = "0";
          iframe.scrolling = "no";
          iframe.height = "378";
          iframe.width = "425";
          document.body.appendChild(iframe);
          streams.push(iframe);
        } else {
          errorFeedback("Username " + username + " not found!");
        }
      }).error(function (data) {
        errorFeedback("Oops! Something went wrong. Try again.");
      });
    } else {
      errorFeedback("Too many streams open!");
    }
  };

  var errorFeedback = function(message) {
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    angular.element(document.body.querySelector('.userInput')).append(errorMessage);
    setTimeout(function() {
      errorMessage.parentNode.removeChild(errorMessage);
    }, 1500);
  };

  var removeStream = function(num) {
    if (streams.length > num) {
      var iframe = streams.splice(num, 1)[0];
      iframe.parentNode.removeChild(iframe);
    }
  };

  return {
    streams: streams,
    searchTwitch: searchTwitch,
    removeStream: removeStream
  };
});
