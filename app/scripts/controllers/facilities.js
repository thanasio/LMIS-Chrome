'use strict';
// jshint camelcase: false

angular.module('lmisChromeApp')
  .controller('FacilitiesCtrl', function($scope, storageService) {

    storageService.get(storageService.FACILITY).then(function(data) {
      $scope.facilities = data;
    });

    $scope.getUser = function(created_by) {
      return created_by.username;
    };

    storageService.loadTableObject(storageService.FACILITY_TYPE).then(function(data) {
      $scope.facility_types = data;
    });

  });
