var selftracking = angular.module('selftracking',["leaflet-directive"]);

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

function mapController($scope,$http){
  angular.extend($scope, {
              london: {
                  lat: 51.505,
                  lng: -0.09,
                  zoom: 4
              },
              path: {
                  p1: {
                      color: 'red',
                      weight: 8,
                      latlngs: [
                          { lat: 51.50, lng: -0.082 },
                          { lat: 48.83, lng: 2.37 },
                          { lat: 41.91, lng: 12.48 }
                      ]
                  },
                  p2: {
                      color: 'green',
                      weight: 8,
                      latlngs: [
                          { lat: 48.2083537, lng: 16.3725042 },
                          { lat: 48.8534, lng: 2.3485 }
                      ]
                  }
                }
          });
}
