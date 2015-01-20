angular.module('hexstream.helperfactory', [])

.factory('HelperFactory', function() {
  var errorFeedback = function(message, formClass) {
    var errorMessage = document.createElement('p');
    errorMessage.innerHTML = message;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "14px";
    angular.element(document.body.querySelector(formClass)).append(errorMessage);
  };

  var setStorage = function(streamers) {
    localStorage["streamers"] = JSON.stringify(streamers);
  };

  var removeDom = function(nodeType) {
    console.log(angular.element(document.body.querySelector('p')));
    if(angular.element(document.body.querySelector('p')).length > 0) {
      angular.element(document.body.querySelector('p'))[0].remove();
    }
    var domNodes = angular.element(document.body)[0].children[0].childNodes;
    console.log(domNodes);
    for (var i = 0; i < domNodes.length; i++) {
      if (domNodes[i].nodeName === nodeType) {
        console.log('removing ', domNodes[i]);
        domNodes[i].parentNode.removeChild(domNodes[i]);
      }
    }
  }

  return {
    errorFeedback: errorFeedback,
    setStorage: setStorage,
    removeDom: removeDom
  }

});
