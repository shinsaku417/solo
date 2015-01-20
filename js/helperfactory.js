angular.module('hexstream.helperfactory', [])

.factory('HelperFactory', function() {
  var errorFeedback = function(message, formClass) {
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    errorMessage.className = "error";
    angular.element(document.body.querySelector(formClass)).append(errorMessage);
  };

  var setStorage = function(streamers) {
    localStorage["streamers"] = JSON.stringify(streamers);
  };

  var removeError = function() {
    var errorMessages = document.getElementsByClassName("error");
    while (errorMessages.length > 0) {
      errorMessages[0].parentNode.removeChild(errorMessages[0]);
    }
  };

  return {
    errorFeedback: errorFeedback,
    setStorage: setStorage,
    removeError: removeError
  };

});
