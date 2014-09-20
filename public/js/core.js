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
      $scope.path = data.path;
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

    angular.extend($scope, {
                london: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 4
                }
            });
}
