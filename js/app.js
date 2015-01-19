angular.module('multistream', [])

.controller('multistreamCtrl', function ($scope, Factory) {
  // Your code here
  $scope.input = {};

  $scope.searchStream = function() {
    Factory.searchStream($scope.input.username);
  }
})
.factory('Factory', function($http) {
  var searchStream = function(username) {
    $http
  };

  return {
    searchStream: searchStream
  };
});
