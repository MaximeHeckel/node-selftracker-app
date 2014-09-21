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
              defaults: {
                tileLayer : 'http://{s}.tiles.mapbox.com/v3/sarasafavi.hjegnofh/{z}/{x}/{y}.png',
                scrollWheelZoom: false,
                zoomControl : false,
                dragging : false,
                keyboard : false,
                attributionControl : false
              },
              run: {
                  lat : 48.58,
                  lng : 7.75,
                  zoom: 13
              },
              path: {
                  p1: {
                      color: '#8AAEFF',
                      weight: 4,
                      zoom : 8,
                      latlngs: positionService.getPos()
                  }
                }
          });
}
