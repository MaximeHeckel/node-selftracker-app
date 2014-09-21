var selftracking = angular.module('selftracking',["leaflet-directive"])

  selftracking.service('positionService', function($http){
    var lastrunpos = [];
    $http.get('/api/lastrun')
      .success(function(data){
        angular.forEach(data.path, function (value) {
         lastrunpos.push({lat : value.latitude, lng : value.longitude});
       });
     });
     return {
       getPos : function() {
          return lastrunpos;
       }
     }
  });

function mainController($scope, $http){
  //Get all the last activities in the front page
  $http.get('/api/lastactivity')
    .success(function(data){
      $scope.lastactivity = data;
    })
    .error(function(data){
      console.log('Error: '+ data);
    });
  $http.get('/api/lastrun')
    .success(function(data){
      $scope.lastrun = data;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
}

function mapController($scope, positionService){
  angular.extend($scope, {
              run: {
                  lat: 51.505,
                  lng: -0.09,
                  zoom: 4
              },
              path: {
                  p1: {
                      color: 'red',
                      weight: 8,
                      latlngs: positionService.getPos()
                  }
                }
          });
}
