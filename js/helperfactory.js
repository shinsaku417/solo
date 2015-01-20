angular.module('hexstream.helperfactory', [])

.factory('HelperFactory', function() {
  var errorFeedback = function(message, formClass) {
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    angular.element(document.body.querySelector(formClass)).append(errorMessage);
    setTimeout(function() {
      errorMessage.parentNode.removeChild(errorMessage);
    }, 1500);
  };

  var setStorage = function(streamers) {
    localStorage["streamers"] = JSON.stringify(streamers);
  };

  return {
    errorFeedback: errorFeedback,
    setStorage: setStorage
  }

});
