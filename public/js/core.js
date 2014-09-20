var selftracking = angular.module('selftracking',["leaflet-directive"])
  .service('positionService', function($http){
    return {
      getPos : function(){
        $http.get('/api/lastrun')
          .success(function(data){
            for(var i = 0; i<data.path.length; i++){
              console.log(data.path[1].latitude)
              return data.path[1].latitude;
            }
          });
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
      $scope.path = data.path;
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
                      latlngs: [
                          { lat: 51.50, lng: -0.082 },
                          { lat: 48.83, lng: 2.37 },
                          { lat: positionService.getPos(), lng: 7.723812 }
                      ]
                  }
                }
          });
}
