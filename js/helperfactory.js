angular.module('hexstream.helperfactory', [])

.factory('HelperFactory', function() {
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

  var removeStream = function(streams, streamers, num) {
    if (streams.length > num) {
      var iframe = streams.splice(num, 1)[0];
      streamers.splice(num, 1);
      iframe.parentNode.removeChild(iframe);
      setStorage();
    }
  };

  var setStorage = function(streamers) {
    localStorage["streamers"] = JSON.stringify(streamers);
  };

  return {
    errorFeedback: errorFeedback,
    removeStream: removeStream,
    setStorage: setStorage
  }

});
