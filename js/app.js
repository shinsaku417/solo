angular.module('hexstream', ['hexstream.factory'])

.controller('hexstreamCtrl', function ($scope, Factory) {
  $scope.input = {};

  $scope.searchTwitch = function() {
    angular.element(document.body.querySelector('p')).remove();
    Factory.searchTwitch($scope.input.username);
    $scope.input.username = "";
  };

  $scope.removeStream = function(num) {
    Factory.removeStream(num);
  };
});
