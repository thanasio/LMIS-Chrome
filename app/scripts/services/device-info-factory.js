'use strict';

angular.module('lmisChromeApp')
  .factory('deviceInfoFactory', function($q, $window) {
    return {
      getDeviceInfo: function() {
        var deferred = $q.defer();

        if(!('cordova' in $window)) {
          deferred.reject('Cordova is not supported on this device');
          return deferred.promise;
        }

        var deviceInfo = $window.cordova.require('cordova/plugin/DeviceInformation');

        var success = function(result) {
          var emailRegxp = '/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9._-]+)/gi';
          var emails = result.match(emailRegxp).join(',');

          deferred.resolve({
            mainAccount: emails.split(',')[0]
          });
        };

        var failure = function(reason) {
          deferred.reject(reason);
        };

        deviceInfo.get(success, failure);
        return deferred.promise;
      }
    };
  });
